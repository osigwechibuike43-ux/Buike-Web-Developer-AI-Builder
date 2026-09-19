import type { MouseEvent } from 'react';

/**
 * Helper to ensure clicking WhatsApp links takes the user straight to
 * Buike's WhatsApp contact (+234 916 814 4059) directly on both mobile devices and desktop.
 */
export function openDirectWhatsApp(e?: MouseEvent, customMessage?: string) {
  if (e) {
    e.preventDefault();
  }

  const phone = '2349168144059';
  const textParam = customMessage ? `&text=${encodeURIComponent(customMessage)}` : '';
  const webUrl = customMessage 
    ? `https://wa.me/${phone}?text=${encodeURIComponent(customMessage)}`
    : `https://wa.me/${phone}`;
  const appUrl = `whatsapp://send?phone=${phone}${textParam}`;

  const isMobile = typeof navigator !== 'undefined' && /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

  if (isMobile) {
    // Open directly in the WhatsApp mobile application
    window.location.href = appUrl;
    // Fallback if app is not installed or blocked by browser
    setTimeout(() => {
      window.open(webUrl, '_blank', 'noopener,noreferrer');
    }, 800);
  } else {
    // Desktop: open WhatsApp Web / App directly in a new tab
    const win = window.open(webUrl, '_blank', 'noopener,noreferrer');
    if (!win) {
      window.location.href = webUrl;
    }
  }
}
