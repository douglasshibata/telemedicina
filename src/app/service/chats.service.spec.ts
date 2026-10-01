import { TestBed } from '@angular/core/testing';
import { ChatsService } from './chats.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { of } from 'rxjs';

describe('ChatsService', () => {
  let service: ChatsService;
  let afStoreMock: any;

  beforeEach(() => {
    afStoreMock = {
      collection: jasmine.createSpy('collection').and.returnValue({
        snapshotChanges: jasmine.createSpy('snapshotChanges').and.returnValue(of([])),
        doc: jasmine.createSpy('doc').and.returnValue({
          valueChanges: jasmine.createSpy('valueChanges').and.returnValue(of({})),
          update: jasmine.createSpy('update').and.returnValue(Promise.resolve())
        })
      })
    };

    TestBed.configureTestingModule({
      providers: [
        ChatsService,
        { provide: AngularFirestore, useValue: afStoreMock }
      ]
    });

    service = TestBed.get(ChatsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get chat rooms', () => {
    service.getChatRooms().subscribe(rooms => {
      expect(rooms).toEqual([]);
    });
    expect(afStoreMock.collection).toHaveBeenCalledWith('chatsRooms');
  });

  it('should get single chat room', () => {
    service.getChatRoom('room123');
    expect(afStoreMock.collection).toHaveBeenCalledWith('chatsRooms');
  });
});
