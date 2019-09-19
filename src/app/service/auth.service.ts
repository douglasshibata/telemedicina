import { Injectable } from '@angular/core';
import{AngularFireAuth}from '@angular/fire/auth';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private Afauth: AngularFireAuth
  ) { }
    //25:24
  login(email,password){
    this.Afauth.auth.signInWithEmailAndPassword(email,password)
  }
}
