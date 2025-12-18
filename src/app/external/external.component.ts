import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-external',
  templateUrl: './external.component.html',
})
export class ExternalComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    console.log('external');
  }
}
