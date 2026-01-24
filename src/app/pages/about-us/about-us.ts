import { Component, ElementRef, OnDestroy, afterNextRender, viewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Import the Carrusel Component
import { Carrusel } from '../../components/carrusel/carrusel'; 

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, Carrusel], // Add to imports
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs implements OnDestroy {
  sectionTwo = viewChild<ElementRef>('sectionTwo');
  private ctx: gsap.Context | undefined;

  // Images for the About Laika section
  aboutLaikaImages = [
    'https://placehold.co/800x800/e0e0e0/333?text=Laika+1',
    'https://placehold.co/800x800/e0e0e0/333?text=Laika+2',
    'https://placehold.co/800x800/e0e0e0/333?text=Laika+3'
  ];

  // (Existing cards array and GSAP logic remain unchanged below...)
  cards = [
    {
      title: 'Donations',
      description: 'Your generous contributions help us provide food, shelter, and medical care.',
      image: 'https://placehold.co/1200x800/17A67D/white?text=Donations',
      link: '/donations',
      linkText: 'Support Us',
      color: 'var(--green)' 
    },
    {
      title: 'Volunteer',
      description: 'Join our team of dedicated volunteers. Your time can make a world of difference.',
      image: 'https://placehold.co/1200x800/0D6BA5/white?text=Volunteer',
      link: '/volunteer',
      linkText: 'Get Involved',
      color: 'var(--blue)' 
    },
    {
      title: 'Adoptions',
      description: 'Find your new best friend. We have dozens of loving animals waiting for a forever home.',
      image: 'https://placehold.co/1200x800/F22148/white?text=Adoptions',
      link: '/adopt',
      linkText: 'Meet Them',
      color: 'var(--red)' 
    },
  ];

  constructor() {
    gsap.registerPlugin(ScrollTrigger);

    afterNextRender(() => {
      this.ctx = gsap.context(() => {
        const section2El = this.sectionTwo()?.nativeElement;
        const navbar = document.querySelector('app-navbar') as HTMLElement;

        if (section2El && navbar) {
          gsap.set(navbar, { opacity: 1, pointerEvents: 'auto' });

          gsap.to(navbar, {
            scrollTrigger: {
              trigger: section2El,
              start: 'top bottom', 
              end: 'top center',
              scrub: true, 
              markers: false, 
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