import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../_services/websocket.service';
import { Log } from '../_models/log.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { dtOptions } from '@pages/shared/globals';
import { trigger, transition, query, stagger, animate, style, state } from '@angular/animations';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.scss'],
  animations: [
    trigger('listAnimation', [
      transition('* => *', [
        // each time the binding value changes
        query(':leave', [stagger(100, [animate('0.5s', style({ opacity: 0 }))])], { optional: true }),
        query(':enter', [style({ opacity: 0 }), stagger(100, [animate('0.5s', style({ opacity: 1 }))])], {
          optional: true,
        }),
      ]),
    ]),
    trigger('enterAnimation', [
      transition(':enter', [
        style({ transform: 'translateX(100%)', opacity: 0 }),
        animate('500ms', style({ transform: 'translateX(0)', opacity: 1, 'overflow-x': 'hidden' })),
      ]),
      transition(':leave', [
        style({ transform: 'translateX(0)', opacity: 1 }),
        animate('500ms', style({ transform: 'translateX(100%)', opacity: 0 })),
      ]),
    ]),
    trigger('slideIn', [
      state('*', style({ 'overflow-y': 'hidden' })),
      state('void', style({ 'overflow-y': 'hidden' })),
      transition('* => void', [style({ height: '*' }), animate(250, style({ height: 0 }))]),
      transition('void => *', [style({ height: '0' }), animate(250, style({ height: '*' }))]),
    ]),
  ],
})
export class LogComponent implements OnInit {
  constructor(private websocketService: WebsocketService, private modalService: NgbModal) {}

  logs: Log[] = [];
  payloadModal: any;
  closeResult: string = '';
  payload: string = '';
  dtTrigger = new Subject<any>();
  dtOptions: any = {};
  triggered: boolean = false;
  ngOnInit(): void {
    this.dtOptions = dtOptions;
    this.dtTrigger.next(null);

    this.websocketService.connect();
    this.websocketService.getLogs().subscribe((logMessage) => {
      this.logs.unshift(logMessage);
      if (!this.triggered) {
        this.dtTrigger.next(null);
        this.triggered = true;
      }
    });
  }

  open(content: any, payload: string) {
    this.payload = payload;
    this.payloadModal = JSON.parse(payload);

    this.modalService.open(content, { ariaLabelledBy: 'Payload', centered: true }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      () => {
        this.closeResult = `Dismissed`;
      }
    );
  }

  public trackItem(index: number, item: Log) {
    return item.id;
  }

  getObjectProperties(): any[] {
    return Object.entries(this.payloadModal);
  }
}
