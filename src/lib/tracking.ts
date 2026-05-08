/**
 * ============================================================
 * ANALYTICS TRACKING ENGINE — DepaInspect Landing
 * ============================================================
 *
 * PURPOSE:
 *   Behavioral analytics system for measuring visitor engagement.
 *   Focused exclusively on UX & conversion optimization.
 *
 * PRIVACY:
 *   - NO personal data is captured (names, emails, phones).
 *   - NO cookies — uses localStorage only for anonymous visitor ID.
 *   - NO form field values are read or transmitted.
 *   - All data is anonymous behavioral metrics.
 *   - Compliant with privacy-first analytics principles.
 *
 * PERFORMANCE:
 *   - Zero external dependencies.
 *   - All network calls are async and non-blocking.
 *   - Uses IntersectionObserver (native API) for section tracking.
 *   - Uses navigator.sendBeacon for session_end (non-blocking).
 *   - Debounced scroll handler.
 *   - Events are fire-and-forget — failures never affect UI.
 *
 * WEBHOOK:
 *   All events are sent via POST JSON to the n8n webhook.
 *   This is completely separate from the existing lead webhook.
 * ============================================================
 */

// ─── CONFIGURATION ──────────────────────────────────────────
const TRACKING_WEBHOOK_URL =
  'https://aimachristian-n8n.ajcxjb.easypanel.host/webhook/landing-tracking';

const VISITOR_ID_KEY = 'aj_visitor_id';
const SESSION_ID_KEY = 'aj_session_id';
const SESSION_START_KEY = 'aj_session_start';
const VISIT_COUNT_KEY = 'aj_visit_count';

// ─── TYPES ──────────────────────────────────────────────────
interface UTMData {
  source: string;
  medium: string;
  campaign: string;
  content: string;
  term: string;
}

interface DeviceData {
  type: string;
  os: string;
  browser: string;
  screen_width: number;
  screen_height: number;
  language: string;
}

interface TrackingPayload {
  event_name: string;
  visitor_id: string;
  session_id: string;
  timestamp: string;
  page_url: string;
  path: string;
  referrer: string;
  utm: UTMData;
  device: DeviceData;
  traffic_source: string;
  visit_number: number;
  session_duration_seconds?: number;
  section_id?: string;
  button_text?: string;
  button_location?: string;
  scroll_depth?: string;
  faq_question?: string;
  [key: string]: unknown;
}

// ─── ID GENERATORS ──────────────────────────────────────────

function generateId(prefix: string): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let id = prefix + '_';
  for (let i = 0; i < 10; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

function getOrCreateVisitorId(): string {
  try {
    let id = localStorage.getItem(VISITOR_ID_KEY);
    if (!id) {
      id = generateId('visitor');
      localStorage.setItem(VISITOR_ID_KEY, id);
    }
    return id;
  } catch {
    return generateId('visitor');
  }
}

function createSessionId(): string {
  const id = generateId('session');
  try {
    sessionStorage.setItem(SESSION_ID_KEY, id);
    sessionStorage.setItem(SESSION_START_KEY, new Date().toISOString());
  } catch {
    // sessionStorage unavailable — continue with generated ID
  }
  return id;
}

function getSessionId(): string {
  try {
    return sessionStorage.getItem(SESSION_ID_KEY) || createSessionId();
  } catch {
    return createSessionId();
  }
}

function incrementVisitCount(): number {
  try {
    const count = parseInt(localStorage.getItem(VISIT_COUNT_KEY) || '0', 10) + 1;
    localStorage.setItem(VISIT_COUNT_KEY, String(count));
    return count;
  } catch {
    return 1;
  }
}

// ─── UTM DETECTION ──────────────────────────────────────────

function getUTMParams(): UTMData {
  try {
    const params = new URLSearchParams(window.location.search);
    return {
      source: params.get('utm_source') || '',
      medium: params.get('utm_medium') || '',
      campaign: params.get('utm_campaign') || '',
      content: params.get('utm_content') || '',
      term: params.get('utm_term') || '',
    };
  } catch {
    return { source: '', medium: '', campaign: '', content: '', term: '' };
  }
}

function detectTrafficSource(utm: UTMData, referrer: string): string {
  // UTM parameters take priority
  if (utm.source) return `utm_${utm.source}`;

  if (!referrer) return 'direct';

  const ref = referrer.toLowerCase();

  // Google
  if (ref.includes('google.com') || ref.includes('google.co')) return 'organic_google';

  // Bing
  if (ref.includes('bing.com')) return 'organic_bing';

  // Meta (Facebook / Instagram)
  if (
    ref.includes('facebook.com') ||
    ref.includes('fb.com') ||
    ref.includes('instagram.com') ||
    ref.includes('l.facebook.com') ||
    ref.includes('lm.facebook.com')
  )
    return 'social_meta';

  // TikTok
  if (ref.includes('tiktok.com')) return 'social_tiktok';

  // LinkedIn
  if (ref.includes('linkedin.com')) return 'social_linkedin';

  // YouTube
  if (ref.includes('youtube.com') || ref.includes('youtu.be')) return 'social_youtube';

  // Twitter / X
  if (ref.includes('twitter.com') || ref.includes('t.co') || ref.includes('x.com'))
    return 'social_x';

  return 'referral';
}

// ─── DEVICE DETECTION ───────────────────────────────────────

function detectDevice(): DeviceData {
  const ua = navigator.userAgent || '';
  const uaLower = ua.toLowerCase();

  // Device type
  let type = 'desktop';
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    type = 'tablet';
  } else if (/mobile|iphone|ipod|android.*mobile|windows phone|blackberry/i.test(ua)) {
    type = 'mobile';
  }

  // OS
  let os = 'unknown';
  if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/windows/i.test(ua)) os = 'Windows';
  else if (/macintosh|mac os/i.test(ua)) os = 'MacOS';
  else if (/linux/i.test(ua)) os = 'Linux';

  // Browser
  let browser = 'unknown';
  if (uaLower.includes('edg/') || uaLower.includes('edge/')) browser = 'Edge';
  else if (uaLower.includes('opr/') || uaLower.includes('opera')) browser = 'Opera';
  else if (uaLower.includes('chrome') && !uaLower.includes('edg')) browser = 'Chrome';
  else if (uaLower.includes('safari') && !uaLower.includes('chrome')) browser = 'Safari';
  else if (uaLower.includes('firefox')) browser = 'Firefox';

  return {
    type,
    os,
    browser,
    screen_width: window.screen?.width || window.innerWidth,
    screen_height: window.screen?.height || window.innerHeight,
    language: navigator.language || 'unknown',
  };
}

// ─── CORE TRACK EVENT ───────────────────────────────────────

let _visitorId: string;
let _sessionId: string;
let _utm: UTMData;
let _device: DeviceData;
let _trafficSource: string;
let _visitNumber: number;

/**
 * Send a tracking event to n8n.
 * - Async, non-blocking
 * - Silent on failure (never breaks UI)
 * - Uses sendBeacon for session_end events
 */
export async function trackEvent(
  eventName: string,
  payload: Record<string, unknown> = {}
): Promise<void> {
  try {
    const data: TrackingPayload = {
      event_name: eventName,
      visitor_id: _visitorId,
      session_id: _sessionId,
      timestamp: new Date().toISOString(),
      page_url: window.location.href,
      path: window.location.pathname,
      referrer: document.referrer || '',
      utm: _utm,
      device: _device,
      traffic_source: _trafficSource,
      visit_number: _visitNumber,
      ...payload,
    };

    // For session_end, prefer sendBeacon (guaranteed delivery on page close)
    if (eventName === 'session_end' && navigator.sendBeacon) {
      const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
      navigator.sendBeacon(TRACKING_WEBHOOK_URL, blob);
      return;
    }

    // Standard async fetch (fire and forget)
    fetch(TRACKING_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true,
    }).catch(() => {
      // Silent fail — tracking must never break the landing
    });
  } catch {
    // Silent fail
  }
}

// ─── SECTION TRACKING (IntersectionObserver) ────────────────

const _trackedSections = new Set<string>();

function initSectionTracking(): void {
  // Sections to observe — matches the landing page structure
  const sectionSelectors = [
    '#hero',
    '#que-revisamos',
    '#como-funciona',
    '#beneficios',
    '#testimonios',
    '#preguntas',
    '[data-section="problema"]',
    '[data-section="comparacion"]',
    '[data-section="final-cta"]',
    '[data-section="footer"]',
  ];

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          const sectionId = el.id || el.dataset.section || 'unknown';

          // Only fire once per section per session
          if (!_trackedSections.has(sectionId)) {
            _trackedSections.add(sectionId);
            void trackEvent('section_view', { section_id: sectionId });
          }
        }
      });
    },
    { threshold: 0.5 } // 50% visible
  );

  // Use requestIdleCallback to defer observation setup
  const setupObservers = () => {
    sectionSelectors.forEach((selector) => {
      const el = document.querySelector(selector);
      if (el) observer.observe(el);
    });
  };

  if ('requestIdleCallback' in window) {
    (window as unknown as { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(
      setupObservers
    );
  } else {
    setTimeout(setupObservers, 200);
  }
}

// ─── SCROLL DEPTH TRACKING ─────────────────────────────────

const _trackedDepths = new Set<number>();
const SCROLL_THRESHOLDS = [25, 50, 75, 100];

function getScrollPercent(): number {
  const scrollTop = window.scrollY || document.documentElement.scrollTop;
  const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  if (docHeight <= 0) return 0;
  return Math.round((scrollTop / docHeight) * 100);
}

function handleScroll(): void {
  const percent = getScrollPercent();

  for (const threshold of SCROLL_THRESHOLDS) {
    if (percent >= threshold && !_trackedDepths.has(threshold)) {
      _trackedDepths.add(threshold);
      void trackEvent('scroll_depth', { scroll_depth: `${threshold}%` });
    }
  }
}

let _scrollTimer: ReturnType<typeof setTimeout> | null = null;

function debouncedScrollHandler(): void {
  if (_scrollTimer) clearTimeout(_scrollTimer);
  _scrollTimer = setTimeout(handleScroll, 150);
}

function initScrollTracking(): void {
  window.addEventListener('scroll', debouncedScrollHandler, { passive: true });
}

// ─── CTA / BUTTON CLICK TRACKING ───────────────────────────

function getClosestSectionId(el: HTMLElement): string {
  const section = el.closest('section[id], section[data-section], header, footer');
  if (!section) return 'unknown';
  return (
    (section as HTMLElement).id ||
    (section as HTMLElement).dataset.section ||
    section.tagName.toLowerCase()
  );
}

function getButtonText(el: HTMLElement): string {
  // Get clean text from button/link
  return (el.innerText || el.textContent || el.getAttribute('aria-label') || '').trim().slice(0, 80);
}

function initClickTracking(): void {
  document.addEventListener(
    'click',
    (e) => {
      const target = e.target as HTMLElement;

      // Find the closest clickable element (button or link)
      const clickable = target.closest(
        'a[href], button, [role="button"]'
      ) as HTMLElement | null;

      if (!clickable) return;

      const tag = clickable.tagName.toLowerCase();
      const href = clickable.getAttribute('href') || '';
      const buttonText = getButtonText(clickable);
      const sectionId = getClosestSectionId(clickable);

      // ── WhatsApp clicks ──
      if (href.includes('wa.me') || href.includes('whatsapp')) {
        void trackEvent('whatsapp_click', {
          button_text: buttonText,
          button_location: sectionId,
          section_id: sectionId,
        });
        return;
      }

      // ── Calendly clicks ──
      if (href.includes('calendly.com')) {
        void trackEvent('calendly_click', {
          button_text: buttonText,
          button_location: sectionId,
          section_id: sectionId,
        });
        return;
      }

      // ── Outbound clicks ──
      if (tag === 'a' && href.startsWith('http') && !href.includes(window.location.hostname)) {
        void trackEvent('outbound_click', {
          button_text: buttonText,
          button_location: sectionId,
          section_id: sectionId,
          outbound_url: href,
        });
        return;
      }

      // ── CTA button clicks (buttons with specific IDs or class patterns) ──
      const id = clickable.id || '';
      const className = clickable.className || '';

      const isCTA =
        id === 'header-cta' ||
        id === 'hero-cta-primary' ||
        id === 'finalcta-main' ||
        className.includes('btn-primary') ||
        className.includes('modal-submit') ||
        className.includes('mobile-nav-cta') ||
        className.includes('finalcta-btn-main');

      if (isCTA) {
        void trackEvent('cta_click', {
          button_text: buttonText,
          button_location: sectionId,
          section_id: sectionId,
          button_id: id || undefined,
        });
        return;
      }

      // ── FAQ open/close ──
      if (
        className.includes('faq-question') ||
        clickable.closest('.faq-question')
      ) {
        const faqItem = clickable.closest('.faq-item');
        const questionText = faqItem?.querySelector('.faq-q-text')?.textContent?.trim() || buttonText;
        void trackEvent('faq_open', {
          faq_question: questionText,
          section_id: 'preguntas',
        });
        return;
      }
    },
    { passive: true, capture: true }
  );
}

// ─── FORM TRACKING (interaction only — NO data capture) ─────

function initFormTracking(): void {
  let heroFormStarted = false;
  let modalFormStarted = false;

  // Detect form interaction start (focus on first field)
  document.addEventListener(
    'focusin',
    (e) => {
      const target = e.target as HTMLElement;
      if (target.tagName !== 'INPUT' && target.tagName !== 'SELECT') return;

      const form = target.closest('form');
      if (!form) return;

      // Hero form
      if (form.classList.contains('hero-form') && !heroFormStarted) {
        heroFormStarted = true;
        void trackEvent('form_start', {
          section_id: 'hero',
          button_location: 'hero',
        });
      }

      // Modal form
      if (form.classList.contains('modal-form') && !modalFormStarted) {
        modalFormStarted = true;
        void trackEvent('form_start', {
          section_id: 'modal',
          button_location: 'modal',
        });
      }
    },
    { passive: true }
  );

  // Detect form submission
  document.addEventListener(
    'submit',
    (e) => {
      const form = e.target as HTMLFormElement;
      if (!form) return;

      let location = 'unknown';
      if (form.classList.contains('hero-form')) location = 'hero';
      else if (form.classList.contains('modal-form')) location = 'modal';
      else return; // Not a tracked form

      void trackEvent('form_submit', {
        section_id: location,
        button_location: location,
      });
    },
    { passive: true, capture: true }
  );
}

// ─── SESSION MANAGEMENT ─────────────────────────────────────

function getSessionDuration(): number {
  try {
    const start = sessionStorage.getItem(SESSION_START_KEY);
    if (!start) return 0;
    return Math.round((Date.now() - new Date(start).getTime()) / 1000);
  } catch {
    return 0;
  }
}

function initSessionEnd(): void {
  // Fires on page unload / tab close / navigate away
  const sendSessionEnd = () => {
    void trackEvent('session_end', {
      session_duration_seconds: getSessionDuration(),
    });
  };

  // visibilitychange is more reliable than beforeunload on mobile
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      sendSessionEnd();
    }
  });

  // Fallback for desktop
  window.addEventListener('beforeunload', sendSessionEnd);
}

// ─── INITIALIZATION ─────────────────────────────────────────

let _initialized = false;

export function initTracking(): void {
  if (_initialized) return;
  if (typeof window === 'undefined') return;

  _initialized = true;

  // Core IDs
  _visitorId = getOrCreateVisitorId();
  _sessionId = getSessionId();
  _utm = getUTMParams();
  _device = detectDevice();
  _trafficSource = detectTrafficSource(_utm, document.referrer || '');
  _visitNumber = incrementVisitCount();

  // Session start
  void trackEvent('session_start', {
    visit_number: _visitNumber,
  });

  // Page view
  void trackEvent('page_view', {
    visit_number: _visitNumber,
  });

  // Initialize subsystems (deferred to not block first paint)
  if ('requestIdleCallback' in window) {
    const ric = (window as unknown as { requestIdleCallback: (cb: () => void) => void })
      .requestIdleCallback;
    ric(() => {
      initSectionTracking();
      initScrollTracking();
      initClickTracking();
      initFormTracking();
      initSessionEnd();
    });
  } else {
    setTimeout(() => {
      initSectionTracking();
      initScrollTracking();
      initClickTracking();
      initFormTracking();
      initSessionEnd();
    }, 300);
  }
}
