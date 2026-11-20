(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // ---------------------------------------------------------------------------
  // 1. Deferred Google Analytics (loads after window.load / idle)
  // ---------------------------------------------------------------------------
  function loadAnalytics() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag() {
      window.dataLayer.push(arguments);
    };
    window.gtag('js', new Date());
    window.gtag('config', 'G-P23R5QYZG2');

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-P23R5QYZG2';
    document.head.appendChild(script);
  }

  if (document.readyState === 'complete') {
    loadAnalytics();
  } else {
    window.addEventListener(
      'load',
      () => {
        if ('requestIdleCallback' in window) {
          window.requestIdleCallback(loadAnalytics, { timeout: 1500 });
        } else {
          window.setTimeout(loadAnalytics, 0);
        }
      },
      { once: true }
    );
  }

  // ---------------------------------------------------------------------------
  // 2. Google letter cascade flash on load
  // ---------------------------------------------------------------------------
  if (!prefersReducedMotion) {
    const googleWords = document.querySelectorAll('.google-hover');
    window.setTimeout(() => {
      googleWords.forEach((el) => el.classList.add('active'));
      window.setTimeout(() => {
        googleWords.forEach((el) => el.classList.remove('active'));
      }, 500);
    }, 500);
  }

  // ---------------------------------------------------------------------------
  // 3. Matrix character scramble on date/role pills (hover devices only)
  // ---------------------------------------------------------------------------
  if (canHover && !prefersReducedMotion) {
    const CHARSET =
      '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz!@#$%^&*()_+{}[]|;:,.<>?';
    const pills = document.querySelectorAll('.pill');

    pills.forEach((pill) => {
      const originalText = pill.textContent;
      pill.setAttribute('aria-label', originalText);

      const spans = [...originalText].map((char) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.dataset.original = char;
        span.setAttribute('aria-hidden', 'true');
        return span;
      });

      pill.textContent = '';
      spans.forEach((span) => pill.appendChild(span));

      const timers = new Set();

      function clearAllTimers() {
        timers.forEach((id) => window.clearTimeout(id));
        timers.clear();
      }

      function schedule(fn, delay) {
        const id = window.setTimeout(() => {
          timers.delete(id);
          fn();
        }, delay);
        timers.add(id);
      }

      function reset() {
        clearAllTimers();
        spans.forEach((span) => {
          span.style.opacity = '1';
          span.textContent = span.dataset.original;
        });
      }

      pill.addEventListener('mouseenter', () => {
        clearAllTimers();
        spans.forEach((span, index) => {
          let frame = 0;
          const maxFrames = 20 + Math.random() * 30;
          const frameInterval = 80 + Math.random() * 50;

          function tick() {
            if (frame < maxFrames) {
              span.style.opacity = String(0.7 + Math.random() * 0.3);
              if (Math.random() > 0.3) {
                span.textContent = CHARSET[Math.floor(Math.random() * CHARSET.length)];
              }
              frame++;
              schedule(tick, frameInterval);
            } else {
              span.style.opacity = '1';
              span.textContent = span.dataset.original;
            }
          }

          schedule(tick, index * 100);
        });
      });

      pill.addEventListener('mouseleave', reset);
    });
  }

  // ---------------------------------------------------------------------------
  // 4. rAF-throttled 3D tilt (project cards & holographic headshot)
  // ---------------------------------------------------------------------------
  if (canHover && !prefersReducedMotion) {
    function attachTilt(element, onMove, onReset) {
      let rect = null;
      let rafId = 0;
      let lastX = 0;
      let lastY = 0;

      function invalidateRect() {
        rect = null;
      }

      element.addEventListener('pointerenter', () => {
        rect = element.getBoundingClientRect();
        element.classList.add('is-tilting');
      });

      element.addEventListener('pointermove', (e) => {
        lastX = e.clientX;
        lastY = e.clientY;
        if (rafId) return;
        rafId = window.requestAnimationFrame(() => {
          rafId = 0;
          if (!rect) rect = element.getBoundingClientRect();
          onMove(rect, lastX, lastY);
        });
      });

      element.addEventListener('pointerleave', () => {
        if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
        rect = null;
        element.classList.remove('is-tilting');
        onReset();
      });

      window.addEventListener('scroll', invalidateRect, { passive: true });
      window.addEventListener('resize', invalidateRect, { passive: true });
    }

    document.querySelectorAll('.card-media-frame').forEach((card) => {
      attachTilt(
        card,
        (rect, x, y) => {
          const rx = (y - rect.top - rect.height / 2) / 30;
          const ry = (rect.width / 2 - (x - rect.left)) / 30;
          card.style.setProperty('--rx', `${rx}deg`);
          card.style.setProperty('--ry', `${ry}deg`);
        },
        () => {
          card.style.setProperty('--rx', '0deg');
          card.style.setProperty('--ry', '0deg');
        }
      );
    });

    document.querySelectorAll('.hero-portrait').forEach((portrait) => {
      const img = portrait.querySelector('.hero-portrait-img');
      if (!img) return;
      attachTilt(
        portrait,
        (rect, x, y) => {
          const nx = (x - rect.left) / rect.width - 0.5;
          const ny = (y - rect.top) / rect.height - 0.5;
          img.style.transform = `rotateY(${nx * 12}deg) rotateX(${-ny * 12}deg) scale(1.02)`;
        },
        () => {
          img.style.transform = 'rotateY(0deg) rotateX(0deg) scale(1)';
        }
      );
    });
  }

  // ---------------------------------------------------------------------------
  // 5. Lazy on-demand card videos (hover on desktop, tap-to-play on touch)
  // ---------------------------------------------------------------------------
  const frames = document.querySelectorAll('.card-media-frame');
  let activeTouchFrame = null;

  function ensureVideoLoaded(video) {
    if (!video.src && video.dataset.src) {
      video.src = video.dataset.src;
    }
  }

  function startVideo(frame) {
    const video = frame.querySelector('.card-video');
    if (!video) return;

    frame._wantPlay = true;
    ensureVideoLoaded(video);

    if (video.readyState >= 1) {
      video.currentTime = 0;
    }

    const reveal = () => {
      if (frame._wantPlay) {
        video.classList.add('is-playing');
      } else {
        video.pause();
      }
    };

    if (video.readyState >= 2) {
      reveal();
    } else {
      video.addEventListener('playing', reveal, { once: true });
    }

    const playPromise = video.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Ignore expected AbortError if user leaves before playback starts
      });
    }
  }

  function stopVideo(frame) {
    const video = frame.querySelector('.card-video');
    if (!video) return;

    frame._wantPlay = false;
    video.classList.remove('is-playing');
    video.pause();
    if (video.readyState >= 1) {
      video.currentTime = 0;
    }
  }

  frames.forEach((frame) => {
    if (canHover) {
      frame.addEventListener('pointerenter', () => startVideo(frame));
      frame.addEventListener('pointerleave', () => stopVideo(frame));
    } else {
      frame.addEventListener('click', () => {
        if (activeTouchFrame === frame && frame._wantPlay) {
          stopVideo(frame);
          activeTouchFrame = null;
        } else {
          if (activeTouchFrame && activeTouchFrame !== frame) {
            stopVideo(activeTouchFrame);
          }
          startVideo(frame);
          activeTouchFrame = frame;
        }
      });
    }
  });

  if (!canHover) {
    document.addEventListener('click', (e) => {
      if (activeTouchFrame && !activeTouchFrame.contains(e.target)) {
        stopVideo(activeTouchFrame);
        activeTouchFrame = null;
      }
    });
  }
})();
