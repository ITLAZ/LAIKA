import { Component, ElementRef, OnDestroy, afterNextRender, viewChild } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink } from '@angular/router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Carrusel } from '../../components/carrusel/carrusel';

@Component({
  selector: 'app-adopt',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, RouterLink, Carrusel],
  templateUrl: './adopt.html',
  styleUrl: './adopt.scss',
})
export class Adopt implements OnDestroy {
  hero = viewChild<ElementRef>('hero');
  private ctx: gsap.Context | undefined;

  // Images for the Carousel
  adoptablePets = [
    'https://placehold.co/600x800/e0e0e0/333?text=Max',
    'https://placehold.co/600x800/e0e0e0/333?text=Luna',
    'https://placehold.co/600x800/e0e0e0/333?text=Bella',
    'https://placehold.co/600x800/e0e0e0/333?text=Charlie',
    'https://placehold.co/600x800/e0e0e0/333?text=Lucy',
    'https://placehold.co/600x800/e0e0e0/333?text=Cooper',
  ];

  requisites = [
    'Ser mayor de edad',
    'Tener casa propia o autorización del dueño por escrito para tener mascota en caso de alquilar, anticretico, etc.',
    'Fotocopia de Carnet de Identidad.',
    'Fotocopia de una factura de servicio (Luz, Agua, Gas, etc).',
    'Llenar el formulario de Solicitud de adopción responsable en Línea.',
    'Aceptar el documento de adopción responsable.',
  ];

  constructor() {
    gsap.registerPlugin(ScrollTrigger);

    afterNextRender(() => {
      this.ctx = gsap.context(() => {
        const heroEl = this.hero()?.nativeElement;

        // Correct selector to target the inner navbar for pointer-events handling
        const navbarInner = document.querySelector('app-navbar .navbar') as HTMLElement;

        if (heroEl && navbarInner) {
          gsap.set(navbarInner, { opacity: 1, pointerEvents: 'auto' });

          gsap.to(navbarInner, {
            scrollTrigger: {
              trigger: heroEl,
              start: 'top top',
              end: 'bottom top',
              scrub: true,
              markers: false,
              invalidateOnRefresh: true,
            },
            opacity: 0,
            pointerEvents: 'none',
            ease: 'power1.inOut',
          });
        }
      });
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
