import { useEffect, useRef } from "react";

export const useReveal = () => {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right, .reveal-scale");
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const delay = Number(e.target.dataset.delay || 0);
          setTimeout(() => e.target.classList.add("visible"), delay);
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "-60px" });
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  });
};

export const useBarAnimate = (ref) => {
  useEffect(() => {
    if (!ref.current) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        ref.current.querySelectorAll("[data-width]").forEach((bar) => {
          bar.style.width = bar.dataset.width;
        });
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
};
