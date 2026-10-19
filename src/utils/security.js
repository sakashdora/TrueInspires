/**
 * TrueInspires Client-Side Security & Anti-Inspection Shield
 * Protects code integrity, disables inspection shortcuts, prevents source viewing
 */

export function initSecurityShield() {
  if (typeof window === 'undefined') return;

  // 1. Disable Right-Click Context Menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  }, { capture: true });

  // 2. Disable DevTools & View-Source Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    // F12
    if (e.key === 'F12' || e.keyCode === 123) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+Shift+I / Cmd+Option+I (Inspect)
    // Ctrl+Shift+J / Cmd+Option+J (Console)
    // Ctrl+Shift+C / Cmd+Option+C (Inspect Element)
    const isCtrlShift = (e.ctrlKey || e.metaKey) && (e.shiftKey || e.altKey);
    const key = (e.key || '').toLowerCase();

    if (isCtrlShift && (key === 'i' || key === 'j' || key === 'c' || key === 'k')) {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+U / Cmd+U (View Source)
    if ((e.ctrlKey || e.metaKey) && key === 'u') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }

    // Ctrl+S / Cmd+S (Save Page)
    if ((e.ctrlKey || e.metaKey) && key === 's') {
      e.preventDefault();
      e.stopPropagation();
      return false;
    }
  }, { capture: true });

  // 3. In Production: Disable Console & Implement DevTools Detection Trap
  if (import.meta.env.PROD) {
    try {
      const noop = () => {};
      ['log', 'debug', 'info', 'warn', 'error', 'table', 'trace', 'dir'].forEach((method) => {
        try {
          console[method] = noop;
        } catch (_) {}
      });

      // Clear any previous logs
      try {
        console.clear();
      } catch (_) {}

      // Periodic check for DevTools dock/undock via window outer vs inner difference
      const threshold = 160;
      const checkDevTools = () => {
        const widthDiff = window.outerWidth - window.innerWidth > threshold;
        const heightDiff = window.outerHeight - window.innerHeight > threshold;
        if (widthDiff || heightDiff) {
          try {
            console.clear();
          } catch (_) {}
        }
      };

      window.addEventListener('resize', checkDevTools);
      setInterval(checkDevTools, 2000);
    } catch (_) {}
  }
}
