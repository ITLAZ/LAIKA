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

  socialLinks = [
    { icon: 'fa-brands fa-whatsapp', url: 'https://api.whatsapp.com/send?phone=59176708785', label: 'WhatsApp' },
    { icon: 'fa-brands fa-facebook-f', url: 'https://www.facebook.com/CentroDeRescateAnimalLaika', label: 'Facebook' },
    { icon: 'fa-brands fa-instagram', url: 'https://www.instagram.com/centroderescateanimallaika', label: 'Instagram' },
    { icon: 'fa-brands fa-youtube', url: 'https://www.youtube.com/@CentroDeRescateAnimalLaika', label: 'YouTube' },
    { icon: 'fa-brands fa-tiktok', url: 'https://www.tiktok.com/@rescateanimallaika', label: 'TikTok' },
  ];

  contactInfo = {
    address: 'Av. Circunvalacion esquina Calle 8 de Peña Azul, La Paz - Bolivia',
    email: 'centroderescateanimallaika@gmail.com',
    phone: '+591 76708785 - +591 77741020',
    hours: 'Lunes a Domingo: 10am - 6pm'
  };
}