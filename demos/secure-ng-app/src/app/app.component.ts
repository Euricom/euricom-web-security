import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { logoEuricom } from '../images';

@Component({
  selector: 'app-root',
  template: `
    <div class="topBar">
      <h1>XSS demo (Angular)</h1>
    </div>
    <div class="content">
      <!-- <html-escaping /> -->
      <!-- <render-url /> -->
      <!-- <render-html /> -->
    </div>
  `,
})
export class AppComponent {}
