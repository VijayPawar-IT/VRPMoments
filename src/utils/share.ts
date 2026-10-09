import { BirthdayData } from '../types/birthday';

export function encodeBirthdayToUrl(data: BirthdayData): string {
  if (typeof window === 'undefined') return '';
  const baseUrl = `${window.location.origin}${window.location.pathname}`;
  const params = new URLSearchParams();

  params.set('mode', 'view');
  if (data.recipientName) params.set('to', data.recipientName);
  if (data.senderName) params.set('from', data.senderName);
  if (data.age) params.set('age', data.age);
  if (data.birthday) params.set('bday', data.birthday);
  if (data.cake) params.set('cake', data.cake);

  // Encode reasons
  if (data.reasons && data.reasons.length > 0) {
    try {
      params.set('reasons', JSON.stringify(data.reasons));
    } catch {
      // safe fallback
    }
  }

  // Encode letter
  if (data.letter) {
    params.set('letter', encodeURIComponent(data.letter));
  }

  return `${baseUrl}?${params.toString()}`;
}

export function decodeBirthdayFromUrl(): Partial<BirthdayData> | null {
  if (typeof window === 'undefined') return null;
  const search = window.location.search;
  if (!search) return null;

  const params = new URLSearchParams(search);
  const to = params.get('to') || params.get('name');
  if (!to) return null;

  const from = params.get('from') || '';
  const age = params.get('age') || '';
  const birthday = params.get('bday') || '';
  const cake = (params.get('cake') as 'midnight-chocolate' | 'strawberry-blush' | 'vanilla-gold') || 'midnight-chocolate';

  let reasons: string[] | undefined;
  const reasonsParam = params.get('reasons');
  if (reasonsParam) {
    try {
      reasons = JSON.parse(reasonsParam);
    } catch {
      // fallback
    }
  }

  let letter: string | undefined;
  const letterParam = params.get('letter');
  if (letterParam) {
    try {
      letter = decodeURIComponent(letterParam);
    } catch {
      letter = letterParam;
    }
  }

  return {
    recipientName: to,
    senderName: from,
    age,
    birthday,
    cake,
    ...(reasons ? { reasons } : {}),
    ...(letter ? { letter } : {}),
  };
}

export function getWhatsAppShareUrl(recipientName: string, shareUrl: string): string {
  const text = `Hey ${recipientName}! ✨ I made a special personalized birthday surprise for you. Open it here: ${shareUrl}`;
  return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
}

export async function shareLink(title: string, text: string, url: string): Promise<'shared' | 'copied' | 'failed'> {
  if (typeof navigator !== 'undefined' && navigator.share) {
    try {
      await navigator.share({ title, text, url });
      return 'shared';
    } catch (err: unknown) {
      if ((err as { name?: string }).name === 'AbortError') {
        return 'failed';
      }
      // If Web Share fails, fallback to clipboard
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(url);
      return 'copied';
    } catch {
      return 'failed';
    }
  }

  return 'failed';
}
