import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, Renderer2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ScriptService {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  public loadJsScriptIntroJS(renderer: Renderer2): HTMLScriptElement {
    const SCRIPT_PATH = 'https://cdnjs.cloudflare.com/ajax/libs/intro.js/7.0.1/intro.js';
    const script = renderer.createElement('script');
    script.type = 'text/javascript';
    script.src = SCRIPT_PATH;
    renderer.appendChild(this.document.body, script);
    return script;
  }

  public loadCssLinkIntroJS(renderer: Renderer2): HTMLScriptElement {
    const CSS_PATH = 'https://cdnjs.cloudflare.com/ajax/libs/intro.js/7.0.1/introjs.css';
    const link = renderer.createElement('link');
    link.rel = 'stylesheet';
    link.href = CSS_PATH;
    renderer.appendChild(this.document.body, link);
    return link;
  }

  public loadIntroJS(renderer: Renderer2) {
    const scriptElement = this.loadJsScriptIntroJS(renderer);
    const cssElement = this.loadCssLinkIntroJS(renderer);

    scriptElement.onload = () => {
      console.log('IntroJS Script Loaded');
    };
    scriptElement.onerror = () => {
      console.log('IntroJS Script Load Error!');
    };

    cssElement.onload = () => {
      console.log('IntroJS CSS Loaded');
    };
    cssElement.onerror = () => {
      console.log('IntroJS CSS Load Error!');
    };
  }
}
