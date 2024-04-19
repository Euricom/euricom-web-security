import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { DemoHTMLEscaping } from './component/HTMLEscaping/DemoHTMLEscaping';
import { DemoRenderURL } from './component/RenderURL/DemoRenderURL';
import { DemoRenderHTML } from './component/RenderHTML/DemoRenderHTML';
import { DemoRenderHTMLRef } from './component/RenderHTML/DemoRenderHTMLRef';
import { DemoRenderHTMLBypass } from './component/RenderHTML/DemoRenderHTMLBypass';
import { HTMLEscaping } from './component/HTMLEscaping';
import { RenderHTML } from './component/RenderHTML';
import { RenderURL } from './component/RenderURL';

import { MenubarModule } from 'primeng/menubar';
import { CardModule } from 'primeng/card';

import { Routes, provideRouter } from '@angular/router';

export const routes: Routes = [
  {
    path: 'html-escaping',
    component: HTMLEscaping,
    children: [{ path: 'regular', component: DemoHTMLEscaping }],
  },
  {
    path: 'render-url',
    component: RenderURL,
    children: [{ path: 'regular', component: DemoRenderURL }],
  },
  {
    path: 'render-html',
    component: RenderHTML,
    children: [
      { path: 'regular', component: DemoRenderHTML },
      { path: 'ref', component: DemoRenderHTMLRef },
      { path: 'bypass', component: DemoRenderHTMLBypass },
    ],
  },
];

@NgModule({
  declarations: [
    AppComponent,
    DemoHTMLEscaping,
    DemoRenderURL,
    DemoRenderHTML,
    DemoRenderHTMLRef,
    DemoRenderHTMLBypass,
    HTMLEscaping,
    RenderHTML,
    RenderURL,
  ],
  imports: [BrowserModule, FormsModule, MenubarModule, CardModule],
  providers: [provideRouter(routes)],
  bootstrap: [AppComponent],
})
export class AppModule {}
