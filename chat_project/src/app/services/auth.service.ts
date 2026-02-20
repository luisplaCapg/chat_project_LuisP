import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, User } from '@angular/fire/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private auth: Auth, private firestore: Firestore) {}

  async register(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
    // Guardar datos del usuario en Firestore
    await setDoc(doc(this.firestore, 'usuarios', userCredential.user.uid), {
      email: email,
      uid: userCredential.user.uid
    });
    return userCredential.user;
  }

  async login(email: string, password: string) {
    const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
    return userCredential.user;
  }

  async logout() {
    await signOut(this.auth);
  }

  get currentUser(): User | null {
    return this.auth.currentUser;
  }
}