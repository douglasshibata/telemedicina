import { Component, OnInit } from '@angular/core';
import { NavParams, ModalController } from "@ionic/angular";
import { message } from "../../models/message";
import { ChatsService } from "../../service/chats.service";
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
})
export class ChatComponent implements OnInit {

  public chat: any;
  public mensagens = [];
  public message: message;
  public room: any;
  constructor(
    private chatService: ChatsService,
    private navparams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    //16:02
    this.chatService.getChatRoom(this.chat.id).subscribe(room=>{
      this.room = room;
    })
    this.chat = this.navparams.get('chat');
  }
  closeChat() {
    this.modalController.dismiss();
  }
  sendMessage() {
    this.mensagens.push(this.message);
  }
}
