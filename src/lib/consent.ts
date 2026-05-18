export type ConsentState = 'accepted' | 'rejected' | null;

const KEY = 'wasabi-cookie-consent';
const EVENT = 'wasabi-consent-change';

export const getConsent = (): ConsentState => {
  if (typeof window === 'undefined') return null;
  const v = window.localStorage.getItem(KEY);
  return v === 'accepted' || v === 'rejected' ? v : null;
};

export const setConsent = (value: 'accepted' | 'rejected'): void => {
  window.localStorage.setItem(KEY, value);
  window.dispatchEvent(new CustomEvent<ConsentState>(EVENT, { detail: value }));
};

export const onConsentChange = (handler: (v: ConsentState) => void): (() => void) => {
  const listener = (e: Event) => handler((e as CustomEvent<ConsentState>).detail);
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
};
