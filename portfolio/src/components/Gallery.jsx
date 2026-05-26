import { useState, useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { X, ChevronLeft, ChevronRight, Play, ImageIcon } from 'lucide-react';
import './Gallery.css';

/*
 * ============================================================
 *  GALLERY ITEMS — Edit this array to add/remove media
 * ============================================================
 *
 *  Each item needs:
 *    - type:        'image' or 'video'
 *    - src:         path to the file (put files in public/ folder)
 *    - alt:         accessibility text
 *    - title:       shown on hover overlay & in lightbox
 *    - description: (optional) short caption
 *    - size:        (optional) 'wide' | 'tall' | leave empty for default 
 *
 *  Examples:
 *    { type: 'image', src: '/gallery/my-photo.jpg', alt: 'My photo', title: 'Project Screenshot' },
 *    { type: 'video', src: '/gallery/demo.mp4', alt: 'Demo video', title: 'Demo', size: 'wide' },
 *    { type: 'image', src: '/gallery/portrait.jpg', alt: 'Portrait', title: 'Portrait', size: 'tall' },
 */
const galleryItems = [
  // Add your items here! Example:
  // { type: 'image', src: '/gallery/screenshot.png', alt: 'Screenshot', title: 'My Project', description: 'A cool thing I built' },
  // { type: 'video', src: '/gallery/demo.mp4', alt: 'Demo', title: 'Live Demo', size: 'wide' },
  {
    type: 'image', src: '/gallery/puzzlebot1.png', alt: 'puzzlebot1', title: 'Puzzle Bot 1', description: 'Puzzlebot being played. During gameplay, reaction buttons left and right are provided for turning the google camera in-game.'
  },
  {
    type: 'video', src: '/gallery/Album.mp4', alt: 'album', title: 'Album', description: 'AI Christmas Album cover using model trained with my own voice.'
  }
];

export default function Gallery() {
  const sectionRef = useScrollReveal();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Zoom & pan state
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const isPanning = useRef(false);
  const panStart = useRef({ x: 0, y: 0 });
  const panOffset = useRef({ x: 0, y: 0 });
  const mediaRef = useRef(null);
  const imgRef = useRef(null);
  const videoRef = useRef(null);

  // Sync mounted state with lightboxOpen with a delay for unmounting
  useEffect(() => {
    if (lightboxOpen) {
      setMounted(true);
    } else {
      const timer = setTimeout(() => setMounted(false), 300);
      return () => clearTimeout(timer);
    }
  }, [lightboxOpen]);

  // Pause video when lightbox is closed
  useEffect(() => {
    if (!lightboxOpen && videoRef.current) {
      videoRef.current.pause();
    }
  }, [lightboxOpen]);

  // Pause video when window loses focus
  useEffect(() => {
    const handleBlur = () => {
      if (videoRef.current && !videoRef.current.paused) {
        videoRef.current.pause();
      }
    };

    window.addEventListener('blur', handleBlur);
    return () => window.removeEventListener('blur', handleBlur);
  }, []);

  // Disable hardware media keys from playing/pausing the video
  useEffect(() => {
    if ('mediaSession' in navigator) {
      navigator.mediaSession.setActionHandler('play', () => { });
      navigator.mediaSession.setActionHandler('pause', () => { });
    }
    return () => {
      if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('play', null);
        navigator.mediaSession.setActionHandler('pause', null);
      }
    };
  }, []);

  // Clamp pan so image edges can't leave the container
  const clampPan = useCallback((px, py, z) => {
    const container = mediaRef.current;
    const img = imgRef.current;
    if (!container || !img) return { x: px, y: py };

    const cw = container.clientWidth;
    const ch = container.clientHeight;
    const iw = img.clientWidth;
    const ih = img.clientHeight;

    // How much the scaled image overflows the container on each side
    const overflowX = Math.max(0, (iw * z - cw) / 2);
    const overflowY = Math.max(0, (ih * z - ch) / 2);

    return {
      x: Math.max(-overflowX, Math.min(overflowX, px)),
      y: Math.max(-overflowY, Math.min(overflowY, py)),
    };
  }, []);

  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    panOffset.current = { x: 0, y: 0 };
  }, []);

  const openLightbox = useCallback((index) => {
    setActiveIndex(index);
    setLightboxOpen(true);
    resetZoom();
    document.body.style.overflow = 'hidden';
  }, [resetZoom]);

  const closeLightbox = useCallback(() => {
    setLightboxOpen(false);
    resetZoom();
    document.body.style.overflow = '';
  }, [resetZoom]);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + galleryItems.length) % galleryItems.length);
    resetZoom();
  }, [resetZoom]);

  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % galleryItems.length);
    resetZoom();
  }, [resetZoom]);

  // Scroll-to-zoom handler
  const handleWheel = useCallback((e) => {
    e.preventDefault();
    setZoom((prev) => {
      const delta = e.deltaY > 0 ? -0.15 : 0.15;
      const next = Math.min(5, Math.max(1, prev + delta));
      if (next <= 1) {
        setPan({ x: 0, y: 0 });
        panOffset.current = { x: 0, y: 0 };
      } else {
        // Re-clamp existing pan at the new zoom level
        setPan((prevPan) => clampPan(prevPan.x, prevPan.y, next));
      }
      return next;
    });
  }, [clampPan]);

  // Drag-to-pan handlers
  const handleMouseDown = useCallback((e) => {
    if (zoom <= 1) return;
    e.preventDefault();
    isPanning.current = true;
    panStart.current = { x: e.clientX, y: e.clientY };
    panOffset.current = { x: pan.x, y: pan.y };
  }, [zoom, pan]);

  const handleMouseMove = useCallback((e) => {
    if (!isPanning.current) return;
    const dx = e.clientX - panStart.current.x;
    const dy = e.clientY - panStart.current.y;
    const rawX = panOffset.current.x + dx;
    const rawY = panOffset.current.y + dy;
    setPan(clampPan(rawX, rawY, zoom));
  }, [zoom, clampPan]);

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  // Double-click to reset zoom
  const handleDoubleClick = useCallback(() => {
    resetZoom();
  }, [resetZoom]);

  // Keyboard navigation
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKey = (e) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxOpen, closeLightbox, goToPrev, goToNext]);

  const activeItem = galleryItems[activeIndex];

  return (
    <section className="gallery section" id="gallery" ref={sectionRef}>
      <div className="container">
        <div className="section-header reveal">
          <span className="section-label">Gallery</span>
          <h2 className="section-title">Photos & Videos</h2>
          <p className="section-subtitle">
            Snapshots from projects, events, and everything in between.
          </p>
        </div>

        <div className="gallery__grid">
          {galleryItems.length === 0 ? (
            <div className="gallery__empty reveal">
              <div className="gallery__empty-icon">
                <ImageIcon size={48} />
              </div>
              <p className="gallery__empty-text">
                Gallery items coming soon! Add photos and videos to the{' '}
                <code>galleryItems</code> array in <code>Gallery.jsx</code>.
              </p>
            </div>
          ) : (
            galleryItems.map((item, index) => (
              <div
                key={`${item.src}-${index}`}
                className={`gallery__item reveal reveal-delay-${(index % 3) + 1}${item.size ? ` gallery__item--${item.size}` : ''
                  }`}
                onClick={() => openLightbox(index)}
                role="button"
                tabIndex={0}
                aria-label={`View ${item.title || item.alt}`}
                onKeyDown={(e) => e.key === 'Enter' && openLightbox(index)}
              >
                {item.type === 'video' ? (
                  <>
                    <video src={item.src} alt={item.alt} muted preload="metadata" />
                    <div className="gallery__play-btn" aria-hidden="true">
                      <Play size={24} fill="currentColor" />
                    </div>
                  </>
                ) : (
                  <img src={item.src} alt={item.alt} loading="lazy" />
                )}

                <div className="gallery__overlay">
                  {item.title && (
                    <span className="gallery__overlay-title">{item.title}</span>
                  )}
                  {item.description && (
                    <span className="gallery__overlay-desc">{item.description}</span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Lightbox */}
      {galleryItems.length > 0 && mounted && createPortal(
        <div
          className={`gallery__lightbox${lightboxOpen ? ' open' : ''}`}
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Media viewer"
        >
          <div
            className="gallery__lightbox-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="gallery__lightbox-close"
              onClick={closeLightbox}
              aria-label="Close viewer"
            >
              <X size={20} />
            </button>

            {galleryItems.length > 1 && (
              <>
                <button
                  className="gallery__lightbox-nav gallery__lightbox-nav--prev"
                  onClick={goToPrev}
                  aria-label="Previous item"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  className="gallery__lightbox-nav gallery__lightbox-nav--next"
                  onClick={goToNext}
                  aria-label="Next item"
                >
                  <ChevronRight size={22} />
                </button>
              </>
            )}

            {activeItem && (
              <>
                <div
                  ref={mediaRef}
                  className="gallery__lightbox-media"
                  onWheel={handleWheel}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onDoubleClick={handleDoubleClick}
                  style={{ cursor: zoom > 1 ? (isPanning.current ? 'grabbing' : 'grab') : 'zoom-in' }}
                >
                  {activeItem.type === 'video' ? (
                    <video
                      key={activeItem.src}
                      ref={videoRef}
                      src={activeItem.src}
                      controls
                      style={{ maxWidth: '90vw', maxHeight: '75vh' }}
                    />
                  ) : (
                    <img
                      ref={imgRef}
                      src={activeItem.src}
                      alt={activeItem.alt}
                      draggable={false}
                      style={{
                        transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                        transition: isPanning.current ? 'none' : 'transform 0.15s ease-out',
                      }}
                    />
                  )}
                  {zoom > 1 && (
                    <div className="gallery__zoom-indicator">
                      {Math.round(zoom * 100)}%
                    </div>
                  )}
                </div>

                {(activeItem.title || activeItem.description) && (
                  <div className="gallery__lightbox-caption">
                    {activeItem.title && <h4>{activeItem.title}</h4>}
                    {activeItem.description && <p>{activeItem.description}</p>}
                  </div>
                )}
              </>
            )}
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
