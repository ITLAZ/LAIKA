import { Component, ElementRef, OnDestroy, afterNextRender, viewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-donations',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './donations.html',
  styleUrl: './donations.scss',
})
export class Donations implements OnDestroy {
  // Use the Hero section as the reference point for stability
  hero = viewChild<ElementRef>('hero');
  private ctx: gsap.Context | undefined;

  constructor() {
    gsap.registerPlugin(ScrollTrigger);

    afterNextRender(() => {
      this.ctx = gsap.context(() => {
        const heroEl = this.hero()?.nativeElement;
        
        // FIX 1: Select the inner '.navbar' class.
        // Selecting just 'app-navbar' targeted the host (which is pointer-events: none),
        // but the child '.navbar' (pointer-events: auto) was still capturing clicks.
        const navbarInner = document.querySelector('app-navbar .navbar') as HTMLElement;

        if (heroEl && navbarInner) {
          // Ensure it starts visible
          gsap.set(navbarInner, { opacity: 1, pointerEvents: 'auto' });

          gsap.to(navbarInner, {
            scrollTrigger: {
              trigger: heroEl,
              // FIX 2: Trigger based on Hero position. 
              // 'top top' = Start animation when Hero top is at Viewport top (Scroll 0)
              // 'bottom top' = End animation when Hero bottom leaves the top of Viewport
              start: 'top top', 
              end: 'bottom top', 
              scrub: true,
              markers: false,
              invalidateOnRefresh: true,
            },
            opacity: 0,
            pointerEvents: 'none',
            ease: 'power1.inOut'
          });
        }
      });
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}