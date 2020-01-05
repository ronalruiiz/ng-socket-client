import { Injectable } from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public socketStatus = false;
  constructor(private socket: Socket) {
    this.checkStatus();
  }

  checkStatus() {
    this.socket.on('connect', () => {
      console.log('Conectado');
      this.socketStatus = true;
    });
    this.socket.on('disconnect', (cliente: Socket) => {
      console.log('desconectado');
    });
  }

  emit(event: string, payload?: any, callback?: any ) {
    this.socket.emit(event, payload, callback);
  }

}
