import { Component, ElementRef, OnDestroy, afterNextRender, viewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-volunteer',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './volunteer.html',
  styleUrl: './volunteer.scss',
})
export class Volunteer implements OnDestroy {
  // We track the #hero element for the most stable ScrollTrigger reference
  hero = viewChild<ElementRef>('hero');
  private ctx: gsap.Context | undefined;

  constructor() {
    gsap.registerPlugin(ScrollTrigger);

    afterNextRender(() => {
      this.ctx = gsap.context(() => {
        const heroEl = this.hero()?.nativeElement;
        
        // SELECTOR FIX: Target the inner .navbar to correctly handle pointer-events
        const navbarInner = document.querySelector('app-navbar .navbar') as HTMLElement;

        if (heroEl && navbarInner) {
          // Ensure navbar is visible and clickable initially
          gsap.set(navbarInner, { opacity: 1, pointerEvents: 'auto' });

          gsap.to(navbarInner, {
            scrollTrigger: {
              trigger: heroEl,
              // TRIGGER FIX: 'top top' ensures it calculates correctly even on refresh
              start: 'top top', 
              end: 'bottom top', 
              scrub: true, 
              markers: false, 
              invalidateOnRefresh: true,
            },
            opacity: 0,
            pointerEvents: 'none', // Disables clicks when faded out
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