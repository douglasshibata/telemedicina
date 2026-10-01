import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HomePage } from './home.page';

import { AuthService } from '../service/auth.service';
import { ChatsService } from '../service/chats.service';
import { ModalController, ActionSheetController } from '@ionic/angular';
import { of } from 'rxjs';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let authServiceMock: any;
  let chatsServiceMock: any;
  let modalCtrlMock: any;
  let actionSheetCtrlMock: any;

  beforeEach(async(() => {
    authServiceMock = {
      logout: jasmine.createSpy('logout')
    };
    chatsServiceMock = {
      getChatRooms: jasmine.createSpy('getChatRooms').and.returnValue(of([{ id: 'room1', name: 'General' }]))
    };
    modalCtrlMock = {
      create: jasmine.createSpy('create').and.returnValue(Promise.resolve({ present: jasmine.createSpy('present') }))
    };
    actionSheetCtrlMock = {
      create: jasmine.createSpy('create').and.returnValue(Promise.resolve({ present: jasmine.createSpy('present') }))
    };

    TestBed.configureTestingModule({
      declarations: [ HomePage ],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: ChatsService, useValue: chatsServiceMock },
        { provide: ModalController, useValue: modalCtrlMock },
        { provide: ActionSheetController, useValue: actionSheetCtrlMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create and fetch chat rooms', () => {
    expect(component).toBeTruthy();
    expect(chatsServiceMock.getChatRooms).toHaveBeenCalled();
    expect(component.chatRooms.length).toBe(1);
  });

  it('should call authService.logout on onLogout', () => {
    component.onLogout();
    expect(authServiceMock.logout).toHaveBeenCalled();
  });
});
