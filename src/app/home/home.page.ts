import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton } from '@ionic/angular/standalone';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButton],
})
export default class HomePage {
  private authService = inject(AuthService);
  private router = inject(Router);

  constructor() {}

  async login() {
    try {
      await this.authService.loginWithGoogle();
      console.log('Login exitoso');
      this.router.navigate(['/chat']);
    } catch (error) {
      console.error('Error en el login:', error);
    }
  }
}
