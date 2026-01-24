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
    { label: 'About Us', path: '/about-us' },
    { label: 'Donations', path: '/donations' },
    { label: 'Volunteer', path: '/volunteer' },
    { label: 'Adopt', path: '/adopt' },
    { label: 'Contact Us', path: null, action: 'contact' },
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