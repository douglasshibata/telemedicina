import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginPage } from './login.page';

import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let authServiceMock: any;
  let router: Router;

  beforeEach(async(() => {
    authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(Promise.resolve({}))
    };

    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [ IonicModule.forRoot(), FormsModule, RouterTestingModule ],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call auth.login on submit', async () => {
    component.email = 'test@example.com';
    component.password = 'password123';
    component.onSubmitLogin();
    expect(authServiceMock.login).toHaveBeenCalledWith('test@example.com', 'password123');
  });
});
