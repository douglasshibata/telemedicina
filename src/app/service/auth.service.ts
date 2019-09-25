import { Injectable } from '@angular/core';
import{AngularFireAuth}from '@angular/fire/auth';
import { Router} from '@angular/router';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private Afauth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore
  ) { }
    
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
  register(email:string,password:string, nome:string){
    return new Promise((resolve,reject)=>{
      this.Afauth.auth.createUserWithEmailAndPassword(email,password).then(res =>{
          const uid = res.user.uid
          this.db.collection('users').doc(res.user.uid).set({
            name: name,
            uid: uid
          })
        resolve(res)
      }).catch(err=>reject(err))
    });
    
  }
}
