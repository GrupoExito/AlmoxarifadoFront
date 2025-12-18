import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-bi-visualizar',
  templateUrl: './bi-visualizar.component.html',
  styleUrls: ['./bi-visualizar.component.scss'],
})
export class BiVisualizarComponent implements OnInit {
  private baseUrl =
    'https://app.powerbi.com/view?r=eyJrIjoiYTliNmZjYTgtMjIyMC00MjJiLTg0NmYtNTk1NzEwOWZiOTJjIiwidCI6Ijc1NTFkM2QzLWMzOTAtNDExOS05NzI1LWViMmMzMTFiOTMzOCJ9';

  safeUrl!: SafeResourceUrl;
  rawUrl!: string;

  headerHeight = 80;

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    const sep = this.baseUrl.includes('?') ? '&' : '?';
    this.rawUrl = `${this.baseUrl}${sep}filterPaneEnabled=false&navContentPaneEnabled=false`;
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.rawUrl);

    document.documentElement.style.setProperty('--app-header-h', `${this.headerHeight}px`);
  }

  abrirNovaAba() {
    window.open(this.rawUrl, '_blank', 'noopener,noreferrer');
  }
}
