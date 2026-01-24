import { Component, input, signal, computed, effect, OnDestroy } from '@angular/core';
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
  visibleItems = input<number>(1); // Number of columns/items visible
  height = input<string>('400px'); // Dynamic height
  autoPlay = input<boolean>(false);
  autoPlayInterval = input<number>(3000);

  // State
  currentIndex = signal(0);
  
  // Computed maximum index based on visible items
  maxIndex = computed(() => {
    return Math.max(0, this.images().length - this.visibleItems());
  });

  private intervalId: any;

  constructor() {
    // Handle AutoPlay
    effect(() => {
      if (this.autoPlay()) {
        this.startAutoPlay();
      } else {
        this.stopAutoPlay();
      }
    });
  }

  next() {
    this.currentIndex.update((index) => {
      if (index >= this.maxIndex()) {
        return 0; // Loop back to start
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
    // Clamp index to valid range
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
  }
}