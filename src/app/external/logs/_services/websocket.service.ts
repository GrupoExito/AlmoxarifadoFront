import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Log } from '../_models/log.model';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  private socket: WebSocket;
  private logSubject: Subject<Log> = new Subject<Log>();
  constructor() {}

  connect() {
    this.socket = new WebSocket('wss://localhost:44343/ws');

    this.socket.onopen = () => {
      console.log('WebSocket connection established.');
    };

    this.socket.onmessage = (event) => {
      const logMessage = JSON.parse(event.data);
      this.logSubject.next(logMessage);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };
  }

  disconnect() {
    if (this.socket) {
      this.socket.close();
    }
  }

  getLogs(): Observable<Log> {
    return this.logSubject.asObservable();
  }
}
