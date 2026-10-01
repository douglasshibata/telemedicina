import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let service: AuthService;
  let afAuthMock: any;
  let afStoreMock: any;
  let routerMock: any;

  beforeEach(() => {
    afAuthMock = {
      auth: {
        signInWithEmailAndPassword: jasmine.createSpy('signInWithEmailAndPassword').and.returnValue(Promise.resolve({ user: { uid: '123' } })),
        createUserWithEmailAndPassword: jasmine.createSpy('createUserWithEmailAndPassword').and.returnValue(Promise.resolve({ user: { uid: '123' } })),
        signOut: jasmine.createSpy('signOut').and.returnValue(Promise.resolve())
      }
    };

    afStoreMock = {
      collection: jasmine.createSpy('collection').and.returnValue({
        doc: jasmine.createSpy('doc').and.returnValue({
          set: jasmine.createSpy('set').and.returnValue(Promise.resolve())
        })
      })
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthService,
        { provide: AngularFireAuth, useValue: afAuthMock },
        { provide: AngularFirestore, useValue: afStoreMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    service = TestBed.get(AuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login user successfully', async () => {
    const res = await service.login('test@example.com', 'password123');
    expect(afAuthMock.auth.signInWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(res).toBeDefined();
  });

  it('should logout and navigate to /login', async () => {
    await service.logout();
    expect(afAuthMock.auth.signOut).toHaveBeenCalled();
    expect(routerMock.navigate).toHaveBeenCalledWith(['/login']);
  });

  it('should register user and save name in firestore', async () => {
    await service.register('test@example.com', 'password123', 'John Doe');
    expect(afAuthMock.auth.createUserWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123');
    expect(afStoreMock.collection).toHaveBeenCalledWith('users');
  });
});
