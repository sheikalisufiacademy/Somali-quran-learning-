/**
 * Telebirr Payment Integration for Baro Quran Academy
 * Based on Telebirr Developer Portal API:
 * POST {base_url}/create/order with { title, amount } -> returns AssembledUrl / payment link.
 */

export interface TelebirrPayOptions {
  title: string; // Name of the selected Quran course or tuition plan
  amount: number | string; // Course price / tuition amount (e.g. 30, 35, 40, 50, 450)
  courseId?: string;
  planId?: string;
  studentName?: string;
  studentEmail?: string;
  studentPhone?: string;
  enrollmentId?: string;
  openInNewTab?: boolean;
}

export interface TelebirrPayResult {
  ok: boolean;
  paymentUrl?: string;
  assembledUrl?: string;
  orderRef?: string;
  title?: string;
  amount?: string;
  error?: string;
}

/**
 * Calls the backend Telebirr API with { title, amount } to create an order
 * and retrieve the AssembledUrl.
 */
export async function createTelebirrOrder(
  options: TelebirrPayOptions
): Promise<TelebirrPayResult> {
  try {
    const cleanTitle = String(options.title || 'Baro Quran Academy Course').trim();
    const cleanAmount = String(options.amount || '30').trim();

    const response = await fetch('/api/telebirr/create-order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: cleanTitle,
        amount: cleanAmount,
        courseId: options.courseId,
        planId: options.planId,
        studentName: options.studentName,
        studentEmail: options.studentEmail,
        studentPhone: options.studentPhone,
        enrollmentId: options.enrollmentId,
      }),
    });

    const data = await response.json();

    if (response.ok && data.ok) {
      const checkoutUrl = data.paymentUrl || data.assembledUrl || '';
      return {
        ok: true,
        paymentUrl: checkoutUrl,
        assembledUrl: checkoutUrl,
        orderRef: data.orderRef,
        title: cleanTitle,
        amount: cleanAmount,
      };
    } else {
      return {
        ok: false,
        error: data.error || 'Khalad ayaa ka dhacay nidaamka Telebirr.',
      };
    }
  } catch (err: any) {
    console.error('Telebirr create order network error:', err);
    return {
      ok: false,
      error: err?.message || 'Xiriirka Telebirr Server waa fashilmay.',
    };
  }
}

/**
 * Initiates Telebirr Payment by sending the Quran course title and price
 * and opening the link safely in a new window/tab to prevent iframe restrictions.
 */
export async function startTelebirrPayment(
  options: TelebirrPayOptions
): Promise<TelebirrPayResult> {
  const result = await createTelebirrOrder(options);

  if (result.ok && result.assembledUrl) {
    try {
      // Always use window.open to prevent iframe sandbox/X-Frame-Options blocking
      const opened = window.open(result.assembledUrl, '_blank', 'noopener,noreferrer');
      if (!opened) {
        // In case popup was blocked by browser
        console.warn('Popup blocked, url is:', result.assembledUrl);
      }
    } catch (e) {
      console.error('Failed to open window for Telebirr URL:', e);
    }
  }

  return result;
}
