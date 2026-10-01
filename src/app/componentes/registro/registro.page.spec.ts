import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroPage } from './registro.page';

import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let authServiceMock: any;
  let router: Router;

  beforeEach(async(() => {
    authServiceMock = {
      register: jasmine.createSpy('register').and.returnValue(Promise.resolve({}))
    };

    TestBed.configureTestingModule({
      declarations: [ RegistroPage ],
      imports: [ IonicModule.forRoot(), FormsModule, RouterTestingModule ],
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    router = TestBed.get(Router);
    spyOn(router, 'navigate');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should prevent submit if passwords mismatch', () => {
    spyOn(window, 'alert');
    component.nome = 'User';
    component.email = 'test@example.com';
    component.password = '123456';
    component.confirmPassword = '654321';
    component.onSubmitRegister();
    expect(window.alert).toHaveBeenCalledWith('As senhas não coincidem!');
    expect(authServiceMock.register).not.toHaveBeenCalled();
  });

  it('should register successfully when valid data provided', () => {
    component.nome = 'User';
    component.email = 'test@example.com';
    component.password = '123456';
    component.confirmPassword = '123456';
    component.onSubmitRegister();
    expect(authServiceMock.register).toHaveBeenCalledWith('test@example.com', '123456', 'User');
  });
});
