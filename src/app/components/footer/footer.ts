import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [RouterLink, NgOptimizedImage],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  currentYear = signal(new Date().getFullYear());
  
  links = [
    { label: 'About Us', path: '/about-us' },
    { label: 'Adopt', path: '/adopt' },
    { label: 'Donations', path: '/donations' },
    { label: 'Volunteer', path: '/volunteer' },
  ];
}