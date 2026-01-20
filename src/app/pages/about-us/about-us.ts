import { Component, ElementRef, OnDestroy, afterNextRender, viewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs implements OnDestroy {
  sectionTwo = viewChild<ElementRef>('sectionTwo');
  private ctx: gsap.Context | undefined; // Reference for GSAP cleanup

  constructor() {
    gsap.registerPlugin(ScrollTrigger);

    afterNextRender(() => {
      // Create a GSAP Context strictly for this component's lifecycle
      this.ctx = gsap.context(() => {
        const section2El = this.sectionTwo()?.nativeElement;
        // Target the navbar globally since it lives in the app shell
        const navbar = document.querySelector('app-navbar') as HTMLElement;

        if (section2El && navbar) {
          // Ensure navbar starts fully visible
          gsap.set(navbar, { opacity: 1, pointerEvents: 'auto' });

          gsap.to(navbar, {
            scrollTrigger: {
              trigger: section2El,
              // Start fading OUT when the top of Section 2 hits the bottom of the viewport
              start: 'top bottom', 
              // Finish fading OUT when the top of Section 2 hits the center of the viewport
              end: 'top center',
              scrub: true, // Smoothly animate with scroll
              markers: false, // Set true to debug trigger lines
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
    // CRITICAL: This reverts the navbar to its original state (opacity: 1)
    // and kills the ScrollTrigger when the user leaves this page.
    this.ctx?.revert();
  }
}