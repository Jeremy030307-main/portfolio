import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register plugins once for the whole app. Importing this module anywhere
// guarantees gsap.to/from + ScrollTrigger + useGSAP are wired up.
gsap.registerPlugin(ScrollTrigger, useGSAP);

// Single source of truth for the motion-design language: a confident, slightly
// snappy ease and a base duration. Reusing these keeps every section feeling
// like it belongs to the same site.
export const EASE = 'power3.out';
export const DUR = 0.9;

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export { gsap, ScrollTrigger, useGSAP };
