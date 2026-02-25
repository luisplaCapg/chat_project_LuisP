import { Injectable, inject } from '@angular/core';
import { Auth, authState, signInWithPopup, signOut, GoogleAuthProvider, User } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private auth: Auth;
  userData?: User | null;

  constructor() {
    // Inyectar Auth dentro del constructor para estar en el contexto correcto
    this.auth = inject(Auth);
    
    // Capturar el estado de autenticación
    authState(this.auth).subscribe((user: User | null) => {
      this.userData = user || null;
    });
  }

  /**
   * Inicia sesión con Google usando signInWithPopup
   */
  async loginWithGoogle(): Promise<void> {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(this.auth, provider);
    } catch (error) {
      console.error('Error al hacer login:', error);
      throw error;
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      throw error;
    }
  }
}
