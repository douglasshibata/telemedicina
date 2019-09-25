import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../service/auth.service";
import { Router } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  public email: string;
  public password: string;
  public nome :string;
  constructor(private auth: AuthService, private router:Router) { }

  ngOnInit() {
  }
  onSubmitRegister() {
    this.auth.register(this.email, this.password, this.nome).then(auth=>{
      this.router.navigate(['home']);
    }).catch(err => console.log(err))
  }
}
