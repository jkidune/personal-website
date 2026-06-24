'use client'

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/profile";

type TrailItem = {
  id: number;
  src: string;
  alt: string;
  x: number;
  y: number;
  rotation: number;
};

type HeroProps = {
  trailImages: Array<{ src: string; alt: string }>;
};

export default function Hero({ trailImages }: HeroProps) {
  const [items, setItems] = useState<TrailItem[]>([]);
  const lastPoint = useRef({ x: 0, y: 0 });
  const imageIndex = useRef(0);
  const idRef = useRef(0);
  const disabled = useRef(false);

  useEffect(() => {
    disabled.current =
      window.matchMedia("(pointer: coarse)").matches ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  function onPointerMove(event: React.PointerEvent<HTMLElement>) {
    if (disabled.current || event.pointerType !== "mouse") return;
    const dx = event.clientX - lastPoint.current.x;
    const dy = event.clientY - lastPoint.current.y;
    if (Math.hypot(dx, dy) < 64) return;

    lastPoint.current = { x: event.clientX, y: event.clientY };
    const pool = trailImages.length > 0 ? trailImages : [{ src: profile.images.portrait, alt: "Joseph Masonda portrait" }];
    const image = pool[imageIndex.current % pool.length];
    imageIndex.current += 1;
    const id = idRef.current++;

    setItems((current) => [
      ...current.slice(-5),
      {
        id,
        src: image.src,
        alt: image.alt,
        x: event.clientX,
        y: event.clientY,
        rotation: ((id % 5) - 2) * 3,
      },
    ]);

    window.setTimeout(() => {
      setItems((current) => current.filter((item) => item.id !== id));
    }, 1150);
  }

  return (
    <section
      className="relative isolate flex min-h-screen items-end overflow-hidden bg-night px-4 pb-10 pt-28 md:pb-14"
      onPointerMove={onPointerMove}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.05]" aria-hidden="true">
        <div className="h-full w-full bg-[linear-gradient(to_right,#f4f1eb_1px,transparent_1px),linear-gradient(to_bottom,#f4f1eb_1px,transparent_1px)] bg-[size:12vw_12vw]" />
      </div>

      {items.map((item) => (
        <div
          key={item.id}
          className="pointer-events-none fixed z-10 h-40 w-56 animate-[trailFade_1.15s_ease_forwards] overflow-hidden bg-graphite"
          style={{
            left: item.x,
            top: item.y,
            transform: `translate(-50%, -50%) rotate(${item.rotation}deg)`,
          }}
        >
          <Image src={item.src} alt="" fill sizes="224px" className="object-cover" />
        </div>
      ))}

      <div className="site-shell relative z-20">
        <div className="grid gap-8 md:grid-cols-[1fr_0.34fr] md:items-end">
          <div>
            <p className="section-label mb-5">{profile.role} / {profile.location}</p>
            <h1 className="max-w-[12ch] text-[clamp(3.65rem,16vw,19rem)] font-black uppercase leading-[0.75] tracking-[-0.09em] text-ink">
              JOSEPH
              <br />
              MASONDA
            </h1>
          </div>
          <div className="max-w-sm pb-2 text-base font-bold leading-tight text-muted md:text-lg">
            <p>{profile.shortLine}</p>
            <div className="mt-8 h-px w-full bg-line" />
            <p className="mt-4 text-xs uppercase tracking-[0.16em] text-dim">Scroll to view selected work</p>
          </div>
        </div>
      </div>
    </section>
  );
}
