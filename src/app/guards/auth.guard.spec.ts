import { TestBed, async, inject } from '@angular/core/testing';

import { AuthGuard } from './auth.guard';

import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let afAuthMock: any;
  let routerMock: any;

  beforeEach(() => {
    afAuthMock = {
      authState: of({ uid: '123' })
    };
    routerMock = {
      navigate: jasmine.createSpy('navigate')
    };

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: AngularFireAuth, useValue: afAuthMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    guard = TestBed.get(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation when user is logged in', (done) => {
    (guard.canActivate({} as any, {} as any) as any).subscribe((allowed: boolean) => {
      expect(allowed).toBe(true);
      done();
    });
  });
});
