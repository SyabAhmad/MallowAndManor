import { useState, useEffect, useRef } from "react";

export default function OfferHeadline({
  text = "Free Delivery on Orders Over Rs. 5,000",
  speed = 22,
}) {
  const [isPaused, setIsPaused] = useState(false);
  const trackRef = useRef(null);
  const repeats = 24;

  return (
    <div
      className="w-full overflow-hidden"
      style={{
        background: "linear-gradient(90deg, #7f1d1d 0%, #b91c1c 45%, #e11d48 100%)",
        padding: "12px 0",
        boxShadow: "0 4px 20px rgba(185, 28, 28, 0.25)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-label="Offer banner"
    >
      <div
        ref={trackRef}
        className="flex w-max whitespace-nowrap"
        style={{
          animationName: "marquee",
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          animationDuration: `${speed}s`,
          animationPlayState: isPaused ? "paused" : "running",
          willChange: "transform",
        }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {Array.from({ length: repeats }).map((_, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2.5 px-8 text-white text-xs font-extrabold tracking-[0.18em] uppercase select-none"
              >
                <span
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: "#fcd34d" }}
                />
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
