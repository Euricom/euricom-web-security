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
  imports: [BrowserModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
