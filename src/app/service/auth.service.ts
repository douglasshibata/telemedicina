import { Injectable } from '@angular/core';
import{AngularFireAuth}from '@angular/fire/auth';
import { Router} from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private Afauth: AngularFireAuth,
    private router: Router
  ) { }
    //25:24
  login(email:string,password:string){

    return new Promise((resolve,rejected)=>{
      this.Afauth.auth.signInWithEmailAndPassword(email,password).then(user =>{
        resolve(user);
      }).catch(err => rejected(err));
    });
    
  }
  logout(){
    this.Afauth.auth.signOut().then(auth=>{
      this.router.navigate(['/login']);
    });
  }
}
