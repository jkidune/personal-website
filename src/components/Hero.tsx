"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";

type HeroProps = {
  trailImages?: Array<{ src: string; alt: string }>;
};

type FloatingObjectProps = {
  src: string;
  className: string;
  rotation?: number;
};

const CALENDLY_URL = "https://calendly.com/kidunejoseph91/30min";
const AVATAR_SCROLL_START = 0.18;
const AVATAR_SCROLL_END = 0.82;

function clamp(value: number, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function easeInOutCubic(value: number) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function ArrowUpRightIcon() {
  return (
    <svg
      aria-hidden="true"
      width="18"
      height="18"
      viewBox="0 0 18 18"
      fill="none"
    >
      <path
        d="M4 14L14 4M7 4H14V11"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function FloatingObject({
  src,
  className,
  rotation = 0,
}: FloatingObjectProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === "touch") return;

    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: position.x,
      originY: position.y,
    };
  }

  function handlePointerMove(event: ReactPointerEvent<HTMLDivElement>) {
    const drag = dragRef.current;

    if (!drag || drag.pointerId !== event.pointerId) return;

    setPosition({
      x: drag.originX + event.clientX - drag.startX,
      y: drag.originY + event.clientY - drag.startY,
    });
  }

  function handlePointerEnd(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    dragRef.current = null;
  }

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-20 select-none md:pointer-events-auto md:touch-none md:cursor-grab md:active:cursor-grabbing ${className}`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) rotate(${rotation}deg)`,
      }}
      onPointerCancel={handlePointerEnd}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerEnd}
    >
      <Image
        src={src}
        alt=""
        fill
        draggable={false}
        sizes="(max-width: 767px) 96px, 144px"
        className="pointer-events-none object-contain"
      />
    </div>
  );
}

function HeroScreen() {
  return (
    <div className="relative h-[100svh] px-5 md:px-8">
      <div className="relative mx-auto h-full max-w-[1180px]">
        <h1 className="absolute left-1/2 top-[49%] w-full -translate-x-1/2 -translate-y-1/2 text-center text-[clamp(4.75rem,15vw,9.6875rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-[#111111] xl:text-[155px] xl:leading-[140px] xl:tracking-[-3.1px]">
          JOSEPH
          <br />
          MASONDA
        </h1>

        <p className="absolute bottom-5 left-0 text-[clamp(3rem,7vw,4.25rem)] font-semibold leading-none tracking-[-0.02em] text-[#111111] xl:text-[68px] xl:leading-[68px] xl:tracking-[-1.36px]">
          ©2026
        </p>

        <div className="absolute bottom-5 right-0 flex flex-col items-end gap-4">
          <Link
            href="/shop"
            className="rounded-full bg-[#111111] px-5 py-2.5 text-sm font-semibold text-[#faf7f3] transition-transform duration-200 hover:scale-[0.97] focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-4 focus-visible:ring-offset-[#faf7f3]"
          >
            View shop
          </Link>

          <p className="text-right text-[18px] font-normal leading-[25px] text-[#111111]">
            /CREATING SINCE 2018
          </p>
        </div>

        <FloatingObject
          src="/body/holo_struck_rounded.png"
          rotation={-12}
          className="left-[5%] top-[25%] h-20 w-20 md:left-[8%] md:top-[24%] md:h-32 md:w-32"
        />

        <FloatingObject
          src="/body/holo_triangle_rounded.png"
          rotation={16}
          className="right-[4%] top-[58%] h-24 w-24 md:right-[6%] md:top-[57%] md:h-36 md:w-36"
        />
      </div>
    </div>
  );
}

function BioScreen() {
  return (
    <div className="flex h-[100svh] items-end px-5 pb-5 md:px-8">
      <div className="mx-auto hidden h-[459px] w-full max-w-[1180px] grid-cols-[300px_minmax(400px,1fr)_360px] items-stretch xl:grid">
        <div className="flex h-[459px] w-[300px] flex-col justify-between">
          <h2 className="text-[76px] font-semibold leading-[76px] tracking-[-1.52px] text-[#111111]">
            Hey!
          </h2>

          <p className="w-[300px] text-[22px] font-semibold leading-[31px] text-[#111111]">
            And welcome. By now, you probably know my name. I work across
            digital design, storytelling and anything that needs a clear
            strategy and a strong voice.
          </p>
        </div>

        <div aria-hidden="true" />

        <div className="flex h-[459px] w-[360px] flex-col justify-end justify-self-end">
          <div className="space-y-5 text-[18px] font-normal leading-[25px] text-[#111111]">
            <p>
              I am a Senior Strategic Communication Specialist with more than
              seven years of experience delivering visibility, advocacy and
              communication for donor-funded programmes.
            </p>

            <p>
              I combine multimedia storytelling, strategy and digital design to
              turn complex programmes, ideas and brands into clear, relevant
              and visible creative work.
            </p>
          </div>

          <a
            href={CALENDLY_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-5 inline-flex w-fit items-center gap-3 text-[18px] font-normal leading-[25px] text-[#111111] transition-opacity hover:opacity-60 focus-visible:ring-2 focus-visible:ring-[#111111] focus-visible:ring-offset-4 focus-visible:ring-offset-[#faf7f3]"
          >
            <span>Get started</span>
            <span className="grid h-7 w-7 place-items-center rounded-lg border border-[#111111]">
              <ArrowUpRightIcon />
            </span>
          </a>
        </div>
      </div>

      <div className="mx-auto flex h-full w-full max-w-[760px] flex-col justify-start gap-5 pt-16 md:gap-7 md:pt-24 xl:hidden">
        <h2 className="text-[clamp(3.75rem,14vw,5rem)] font-semibold leading-none tracking-[-0.03em] text-[#111111]">
          Hey!
        </h2>

        <div className="grid gap-4 md:grid-cols-2 md:items-end md:gap-8">
          <p className="max-w-[300px] text-[17px] font-semibold leading-[1.28] text-[#111111] md:text-[20px] md:leading-[1.35]">
            And welcome. By now, you probably know my name. I work across
            digital design, storytelling and anything that needs a clear
            strategy and a strong voice.
          </p>

          <div className="max-w-[360px] text-[15px] leading-[1.35] text-[#111111] md:text-[17px] md:leading-[1.45]">
            <p>
              I am a Senior Strategic Communication Specialist with more than
              seven years of experience delivering visibility, advocacy and
              communication for donor-funded programmes.
            </p>

            <p className="mt-3 md:mt-4">
              I combine multimedia storytelling, strategy and digital design to
              turn complex programmes, ideas and brands into clear, relevant
              and visible creative work.
            </p>

            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-flex items-center gap-3 text-[18px] leading-[25px] text-[#111111] md:mt-5"
            >
              <span>Get started</span>
              <span className="grid h-7 w-7 place-items-center rounded-lg border border-[#111111]">
                <ArrowUpRightIcon />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Avatar() {
  const avatarRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative aspect-[400/456]"
      style={{
        perspective: "1200px",
        perspectiveOrigin: "center bottom",
        width: "min(400px, 74vw, calc((100svh - 40px) * 0.877))",
      }}
    >
      <div
        ref={avatarRef}
        data-hero-avatar
        className="relative h-full w-full rounded-[20px] will-change-transform"
        style={{
          transform: "rotateY(0deg) scale(0.5)",
          transformOrigin: "center bottom",
          transformStyle: "preserve-3d",
        }}
      >
        <div
          className="absolute inset-0 overflow-hidden rounded-[20px] bg-[#111111]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          <Image
            src="/body/color-portait.jpg"
            alt="Joseph Masonda"
            fill
            priority
            sizes="(max-width: 1279px) 74vw, 400px"
            className="object-cover grayscale contrast-110"
          />
        </div>

        <div
          className="absolute inset-0 overflow-hidden rounded-[20px] bg-[#111111]"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <Image
            src="/body/color-portait.jpg"
            alt=""
            fill
            sizes="(max-width: 1279px) 74vw, 400px"
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}

export default function Hero(_props: HeroProps) {
  void _props;

  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    const reducedMotionQuery = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    function updateAvatar() {
      const section = sectionRef.current;
      const avatar = section?.querySelector<HTMLDivElement>(
        "[data-hero-avatar]",
      );

      if (!section || !avatar) return;

      const viewportHeight = window.innerHeight || 1;
      const progress = clamp(
        -section.getBoundingClientRect().top /
          Math.max(section.offsetHeight - viewportHeight, 1),
      );

      const rawMotion = clamp(
        (progress - AVATAR_SCROLL_START) /
          (AVATAR_SCROLL_END - AVATAR_SCROLL_START),
      );
      const motion = reducedMotionQuery.matches
        ? 1
        : easeInOutCubic(rawMotion);
      const scale = 0.5 + motion * 0.5;
      const rotateY = motion * 180;

      avatar.style.transform = `rotateY(${rotateY}deg) scale(${scale})`;
      frameRef.current = null;
    }

    function requestUpdate() {
      if (frameRef.current !== null) return;

      frameRef.current = window.requestAnimationFrame(updateAvatar);
    }

    requestUpdate();

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotionQuery.addEventListener("change", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotionQuery.removeEventListener("change", requestUpdate);

      if (frameRef.current !== null) {
        window.cancelAnimationFrame(frameRef.current);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative h-[200svh] bg-[#faf7f3] text-[#111111]"
    >
      <div className="absolute inset-x-0 top-0 z-10 h-[200svh]">
        <HeroScreen />
        <BioScreen />
      </div>

      <div className="pointer-events-none relative z-20 h-[200svh]">
        <div className="sticky top-0 flex h-[100svh] items-end justify-center px-5 pb-5">
          <Avatar />
        </div>
      </div>
    </section>
  );
}
