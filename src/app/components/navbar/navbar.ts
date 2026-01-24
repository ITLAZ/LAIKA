import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  isMenuOpen = signal(false);

  menuItems = [
    { label: 'Inicio', path: '/about-us' },
    { label: 'Donaciones', path: '/donations' },
    { label: 'Voluntarios', path: '/volunteer' },
    { label: 'Adopciones', path: '/adopt' },
    { label: 'Contáctanos', path: null, action: 'contact' },
  ];

  toggleMenu() {
    this.isMenuOpen.update((value) => !value);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }

  handleItemClick(item: any) {
    this.closeMenu();
    if (item.action === 'contact') {
      this.scrollToContact();
    }
  }

  scrollToContact() {
    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}