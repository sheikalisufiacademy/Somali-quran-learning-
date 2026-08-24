/**
 * Lemon Squeezy Official Checkout Configuration & Helpers
 * Baro Quran Academy
 */

// Default / fallback checkout URL
export const LEMON_SQUEEZY_BASE_CHECKOUT_URL = 
  'https://baroquranacademy.lemonsqueezy.com/checkout/buy/088582ea-8fd1-4bd0-b2b1-b14fe3b44f31';

/**
 * Variant-specific checkout URLs for each pricing plan
 * In Lemon Squeezy, each variant has its own unique checkout buy URL path.
 */
export const PLAN_CHECKOUT_URLS: Record<string, string> = {
  // Annual Plan (matches the variant ID from user checkout)
  'annual-full-year': 'https://baroquranacademy.lemonsqueezy.com/checkout/buy/088582ea-8fd1-4bd0-b2b1-b14fe3b44f31',
  
  // Monthly plans (can be customized with exact variant UUIDs from your Lemon Squeezy dashboard)
  'basic-2days': 'https://baroquranacademy.lemonsqueezy.com/checkout/buy/088582ea-8fd1-4bd0-b2b1-b14fe3b44f31',
  'standard-3days': 'https://baroquranacademy.lemonsqueezy.com/checkout/buy/088582ea-8fd1-4bd0-b2b1-b14fe3b44f31',
  'advanced-4days': 'https://baroquranacademy.lemonsqueezy.com/checkout/buy/088582ea-8fd1-4bd0-b2b1-b14fe3b44f31',
  'intensive-5days': 'https://baroquranacademy.lemonsqueezy.com/checkout/buy/088582ea-8fd1-4bd0-b2b1-b14fe3b44f31',
};

declare global {
  interface Window {
    createLemonSqueezy?: () => void;
    LemonSqueezy?: {
      Url?: {
        Open: (url: string) => void;
        Close: () => void;
      };
      Setup?: (options: Record<string, unknown>) => void;
      Refresh?: () => void;
    };
  }
}

export interface CheckoutParamOptions {
  checkoutUrl?: string;
  courseId?: string;
  courseTitle?: string;
  planId?: string;
  planName?: string;
  studentName?: string;
  parentName?: string;
  name?: string;
  email?: string;
  phone?: string;
  daysCount?: number;
  monthlyPrice?: number;
  useOverlay?: boolean;
}

/**
 * Builds a Lemon Squeezy checkout URL with custom tracking/metadata & pre-filled fields
 */
export function getLemonSqueezyCheckoutUrl(options?: CheckoutParamOptions): string {
  try {
    const rawBaseUrl = 
      options?.checkoutUrl || 
      (options?.planId && PLAN_CHECKOUT_URLS[options.planId]) || 
      LEMON_SQUEEZY_BASE_CHECKOUT_URL;

    const url = new URL(rawBaseUrl);

    // If overlay is preferred, embed=1 enables Lemon Squeezy Modal
    if (options?.useOverlay !== false) {
      url.searchParams.set('embed', '1');
    }

    if (options?.email && options.email.trim()) {
      url.searchParams.set('checkout[email]', options.email.trim());
    }

    const customerName = options?.name || options?.studentName || options?.parentName;
    if (customerName && customerName.trim()) {
      url.searchParams.set('checkout[name]', customerName.trim());
    }

    if (options?.courseTitle) {
      url.searchParams.set('checkout[custom][course]', options.courseTitle);
    }

    if (options?.planName) {
      url.searchParams.set('checkout[custom][plan]', options.planName);
    }

    if (options?.monthlyPrice) {
      url.searchParams.set('checkout[custom][price]', `$${options.monthlyPrice}`);
    }

    return url.toString();
  } catch {
    return LEMON_SQUEEZY_BASE_CHECKOUT_URL;
  }
}

/**
 * Triggers Lemon Squeezy Checkout (attempts Overlay first, falls back to direct new tab)
 */
export function openLemonSqueezyCheckout(options?: CheckoutParamOptions): void {
  const checkoutUrl = getLemonSqueezyCheckoutUrl(options);

  // Initialize Lemon Squeezy if needed
  if (typeof window !== 'undefined') {
    if (window.createLemonSqueezy) {
      try {
        window.createLemonSqueezy();
      } catch (e) {
        console.warn('Lemon Squeezy initialization error:', e);
      }
    }

    // Try using LemonSqueezy.Url.Open if available
    if (window.LemonSqueezy?.Url?.Open) {
      try {
        window.LemonSqueezy.Url.Open(checkoutUrl);
        return;
      } catch (e) {
        console.warn('Lemon Squeezy Url.Open error, opening directly:', e);
      }
    }

    // Fallback: Open in new tab securely
    window.open(checkoutUrl, '_blank', 'noopener,noreferrer');
  }
}
