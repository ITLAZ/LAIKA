import { Component, ElementRef, OnDestroy, afterNextRender, viewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common'; // Added NgOptimizedImage
import { RouterLink } from '@angular/router'; // Added RouterLink for the cards
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs implements OnDestroy {
  // We keep this reference for the Navbar fade-out animation
  sectionTwo = viewChild<ElementRef>('sectionTwo');
  private ctx: gsap.Context | undefined;

  // Data for the full-width alternating cards
  cards = [
    {
      title: 'Donations',
      description: 'Your generous contributions help us provide food, shelter, and medical care.',
      image: 'https://placehold.co/800x600/0D6BA5/white?text=Donations', // Replace with /images/donations.jpg
      link: '/donations',
      linkText: 'Support Us'
    },
    {
      title: 'Volunteer',
      description: 'Join our team of dedicated volunteers. Your time can make a world of difference.',
      image: 'https://placehold.co/800x600/17A67D/white?text=Volunteer', // Replace with /images/volunteer.jpg
      link: '/volunteer',
      linkText: 'Get Involved'
    },
    {
      title: 'Adoptions',
      description: 'Find your new best friend. We have dozens of loving animals waiting for a forever home.',
      image: 'https://placehold.co/800x600/F27040/white?text=Adoptions', // Replace with /images/adoptions.jpg
      link: '/adopt',
      linkText: 'Meet Them'
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