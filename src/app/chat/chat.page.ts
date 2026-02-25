import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonButtons, IonItem, IonInput, IonList, IonLabel, IonFooter } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';
import { ChatService } from '../services/chat.service';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Message } from '../interfaces/message';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonContent, 
    IonButton, 
    IonButtons,
    IonItem,
    IonInput,
    IonList,
    IonLabel,
    IonFooter
  ]
})
export default class ChatPage implements OnInit {
  private authService = inject(AuthService);
  private chatService = inject(ChatService);
  private router = inject(Router);

  messages$!: Observable<Message[]>;
  messageControl = new FormControl('', [Validators.required]);
  currentUser: string = 'Anonimo';

  constructor() {}

  ngOnInit() {
    this.messages$ = this.chatService.getMessages();
    this.currentUser = this.authService.userData?.email || 'Anonimo';
  }

  async sendMessage() {
    if (this.messageControl.valid && this.messageControl.value) {
      const message: Message = {
        user: this.currentUser,
        date: new Date().toISOString(), // Usamos ISO string para la fecha
        text: this.messageControl.value
      };

      try {
        await this.chatService.sendMessage(message);
        this.messageControl.reset();
      } catch (error) {
        console.error('Error al enviar mensaje:', error);
      }
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigate(['/home']);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  }
}
