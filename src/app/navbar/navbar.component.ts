import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.setActiveLink(event.urlAfterRedirects);
      }
    });
  }

  setActiveLink(url: string): void {
    const links = document.querySelectorAll('.nav-link');
    links.forEach((link) => {
      const href = link.getAttribute('href');
      if (href === url) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
}
