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
  public messages = [];
  //public message: message;
  public room: any;
  public msg: string;
  constructor(
    private chatService: ChatsService,
    private navparams: NavParams,
    private modalController: ModalController
  ) { }

  ngOnInit() {
    // Fix: Retrieve chat object from navparams before using chat.id
    this.chat = this.navparams.get('chat');
    if (this.chat && this.chat.id) {
      this.chatService.getChatRoom(this.chat.id).subscribe(room => {
        this.room = room;
      });
    }
  }
  closeChat() {
    this.modalController.dismiss();
  }
  sendMessage() {
    if (!this.msg || !this.msg.trim() || !this.chat || !this.chat.id) {
      return;
    }
    const messaje: message = {
      content: this.msg.trim(),
      type: 'text',
      date: new Date()
    };
    this.chatService.sendMsgToFirebase(messaje, this.chat.id);
    this.msg = "";
  }
}
