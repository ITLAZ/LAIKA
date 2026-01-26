import { Component, ElementRef, OnDestroy, afterNextRender, viewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Carrusel } from '../../components/carrusel/carrusel';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, Carrusel],
  templateUrl: './about-us.html',
  styleUrl: './about-us.scss',
})
export class AboutUs implements OnDestroy {
  sectionTwo = viewChild<ElementRef>('sectionTwo');
  private ctx: gsap.Context | undefined;

  aboutLaikaImages = [
    '/images/about-us/carrusel-1.png',
    '/images/about-us/carrusel-2.png',
    '/images/about-us/carrusel-3.png',
  ];

  cards = [
    {
      title: 'Donaciones',
      description: 'Transforma tu apoyo en una realidad tangible donando hoy para asegurar el bienestar de los animales del centro.',
      image: '/images/about-us/donaciones.png',
      link: '/donations',
      linkText: 'Conoce más',
      color: 'var(--green)' 
    },
    {
      title: 'Voluntarios',
      description: 'Únete a nuestro equipo de voluntarios y sé parte activa del cambio.',
      image: '/images/about-us/voluntarios.png',
      link: '/volunteer',
      linkText: 'Inscríbete',
      color: 'var(--blue)' 
    },
    {
      title: 'Adopciones',
      description: 'Te invitamos a conocer nuestro proceso para encontrar un compañero leal de manera responsable.',
      image: '/images/about-us/adopciones.png',
      link: '/adopt',
      linkText: 'Ver más',
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
              // FIX: Start fading only when the section hits the CENTER of the viewport.
              // This ensures it is NOT triggered at scroll 0 (since Hero is 80vh).
              start: 'top center', 
              end: 'top top',
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