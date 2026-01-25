import { Component, input, signal, computed, effect, OnDestroy, afterNextRender } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-carrusel',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './carrusel.html',
  styleUrl: './carrusel.scss',
})
export class Carrusel implements OnDestroy {
  // Inputs
  images = input.required<string[]>();
  visibleItems = input<number>(1);
  height = input<string>('400px');
  autoPlay = input<boolean>(false);
  autoPlayInterval = input<number>(3000);

  // State
  currentIndex = signal(0);
  isMobile = signal(false); // Tracks mobile state

  // Computed: Forces 1 column on mobile, otherwise uses input
  actualVisibleItems = computed(() => this.isMobile() ? 1 : this.visibleItems());

  // Max index calculation now uses the DYNAMIC actualVisibleItems
  maxIndex = computed(() => {
    return Math.max(0, this.images().length - this.actualVisibleItems());
  });

  private intervalId: any;
  private resizeListener: (() => void) | undefined;

  constructor() {
    // Handle AutoPlay
    effect(() => {
      if (this.autoPlay()) {
        this.startAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    });

    // Safety: Clamp index when resizing (e.g., switching from 1 col -> 3 cols)
    // If we are at index 5 on mobile, but desktop max is 3, we must jump back to 3.
    effect(() => {
      const current = this.currentIndex();
      const max = this.maxIndex();
      if (current > max) {
        this.currentIndex.set(max);
      }
    }, { allowSignalWrites: true });

    // Detect Screen Size (Browser Only)
    afterNextRender(() => {
      this.checkMobile();
      this.resizeListener = () => this.checkMobile();
      window.addEventListener('resize', this.resizeListener);
    });
  }

  checkMobile() {
    // Standard mobile breakpoint
    this.isMobile.set(window.innerWidth <= 768);
  }

  next() {
    this.currentIndex.update((index) => {
      if (index >= this.maxIndex()) {
        return 0; // Loop back
      }
      return index + 1;
    });
  }

  prev() {
    this.currentIndex.update((index) => {
      if (index <= 0) {
        return this.maxIndex(); // Loop to end
      }
      return index - 1;
    });
  }

  goTo(index: number) {
    const target = Math.min(Math.max(index, 0), this.maxIndex());
    this.currentIndex.set(target);
  }

  startAutoPlay() {
    this.stopAutoPlay();
    this.intervalId = setInterval(() => {
      this.next();
    }, this.autoPlayInterval());
  }

  stopAutoPlay() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  ngOnDestroy() {
    this.stopAutoPlay();
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }
}