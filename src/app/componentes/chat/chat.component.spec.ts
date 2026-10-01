import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatComponent } from './chat.component';

import { NavParams, ModalController, IonicModule } from '@ionic/angular';
import { ChatsService } from '../../service/chats.service';
import { of } from 'rxjs';
import { FormsModule } from '@angular/forms';

describe('ChatComponent', () => {
  let component: ChatComponent;
  let fixture: ComponentFixture<ChatComponent>;
  let chatsServiceMock: any;
  let navParamsMock: any;
  let modalCtrlMock: any;

  beforeEach(async(() => {
    chatsServiceMock = {
      getChatRoom: jasmine.createSpy('getChatRoom').and.returnValue(of({ messages: [] })),
      sendMsgToFirebase: jasmine.createSpy('sendMsgToFirebase')
    };
    navParamsMock = {
      get: jasmine.createSpy('get').and.returnValue({ id: 'chat123', name: 'General Chat' })
    };
    modalCtrlMock = {
      dismiss: jasmine.createSpy('dismiss')
    };

    TestBed.configureTestingModule({
      declarations: [ ChatComponent ],
      imports: [ IonicModule.forRoot(), FormsModule ],
      providers: [
        { provide: ChatsService, useValue: chatsServiceMock },
        { provide: NavParams, useValue: navParamsMock },
        { provide: ModalController, useValue: modalCtrlMock }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create and load chat room', () => {
    expect(component).toBeTruthy();
    expect(navParamsMock.get).toHaveBeenCalledWith('chat');
    expect(chatsServiceMock.getChatRoom).toHaveBeenCalledWith('chat123');
  });

  it('should dismiss modal on closeChat', () => {
    component.closeChat();
    expect(modalCtrlMock.dismiss).toHaveBeenCalled();
  });

  it('should send message when content is valid', () => {
    component.msg = 'Hello World';
    component.sendMessage();
    expect(chatsServiceMock.sendMsgToFirebase).toHaveBeenCalled();
    expect(component.msg).toBe('');
  });
});
