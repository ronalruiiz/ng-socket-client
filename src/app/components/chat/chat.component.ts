import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit,OnDestroy {
  public messages: string[] = []
  public message: string = ''
  @ViewChild('chat',{static:false}) chat: ElementRef;
  public messageSubs: Subscription
  constructor(private _chatService: ChatService) { 
  }

  ngOnInit() {
    this.messageSubs = this._chatService.getMessages().subscribe((msg:any)=>{
      this.messages.push(msg)
      console.log(this.chat.nativeElement.scrollTop)
      this.chat.nativeElement.scrollTop = this.chat.nativeElement.scrollHeight+49
    })
  }

  public send(){
    if(this.message.trim()!== ''){
      this._chatService.sendMessage(this.message);
    }
    this.message = ''
  }

  ngOnDestroy(): void {
    this.messageSubs.unsubscribe();
    
  }


}
