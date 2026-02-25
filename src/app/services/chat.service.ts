import { Injectable, inject } from '@angular/core';
import { Database, listVal, push, ref, objectVal } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private database: Database = inject(Database);

  constructor() {}

  /**
   * Obtiene la lista de mensajes en tiempo real
   */
  getMessages(): Observable<Message[]> {
    const messagesRef = ref(this.database, 'messages');
    return listVal<Message>(messagesRef);
  }

  /**
   * Envía un nuevo mensaje a la base de datos
   * @param message El mensaje a enviar
   */
  sendMessage(message: Message) {
    const messagesRef = ref(this.database, 'messages');
    return push(messagesRef, message);
  }
}
