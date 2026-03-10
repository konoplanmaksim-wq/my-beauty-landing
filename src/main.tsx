import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

(window as any).__pushDL = (event: string, data: Record<string, any> = {}) => {
  const w = window as any;
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...data });
};

(window as any).__formStartSent = (window as any).__formStartSent || {};
(window as any).__pushFormStartOnce = (form_id: string) => {
  const w = window as any;
  w.__formStartSent = w.__formStartSent || {};
  if (!w.__formStartSent[form_id]) {
    w.__pushDL?.("form_input_start", { form_id });
    w.__formStartSent[form_id] = true;
  }
};



(() => {
  if (/Telegram/i.test(navigator.userAgent)) {
    document.body.classList.add("tg-inapp");
  }
  const fired: Record<number, boolean> = { 25: false, 50: false, 75: false, 100: false };
  const onScroll = () => {
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || (document.body ? document.body.scrollTop : 0);
    const max = Math.max(doc.scrollHeight - doc.clientHeight, 1);
    const pct = Math.min(100, Math.round((scrollTop / max) * 100));
    [25, 50, 75].forEach((t) => { if (!fired[t] && pct >= t) { (window as any).__pushDL("scroll_depth", { percent: t }); fired[t] = true; } });
    if (!fired[100] && pct >= 100) { (window as any).__pushDL("scroll_depth", { percent: 100 }); fired[100] = true; }
  };
  window.addEventListener("scroll", onScroll, { passive: true });

  const pricing = document.getElementById("pricing");
  if (pricing) {
    const obs = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) { (window as any).__pushDL("view_pricing", {}); obs.disconnect(); }
    }, { threshold: 0.3 });
    obs.observe(pricing);
  }

  document.addEventListener(
    "pointerdown",
    (e) => {
      const el = e.target as HTMLElement;
      const form = el.closest("form") as HTMLFormElement | null;
      const id = form?.id;
      if (id && id.startsWith("form_")) {
        (window as any).__pushFormStartOnce?.(id);
      }
    },
    { capture: true }
  );
})();

(window as any).__pushDL?.("page_loaded", { path: location.pathname });
createRoot(document.getElementById("root")!).render(<App />);
