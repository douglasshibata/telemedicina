import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;

  constructor(
    private auth: AuthService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  onSubmitLogin() {

    this.auth.login(this.email, this.password).then(res => {
        this.router.navigate(['/home']);
    }).catch(err => alert('Os dados estão incorretos ou o usuário inexistente'));

  }
}
