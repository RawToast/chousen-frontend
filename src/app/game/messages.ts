import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Message } from './gameresponse';
import { Defaults } from './defaults';

@Component({
    selector: 'chousen-messages',
    template: `
    <div id="gameMessagesRow" class="row" style="padding: 8px 0px">
        <div id="gameMessagesOffSet" class="col-sm-10">
            <textarea id="gameMessagesText" class="form-control noresize c-messages" rows="12" data-role="none">
{{getMessages()}}
            </textarea>
        </div>
    </div>`
})

export class MessagesComponent implements OnInit {
    constructor(private gameService: GameService) { }

    messages: Message[] = new Defaults().EMPTY_GAME.messages;

    ngOnInit() {
        this.gameService.getData1().subscribe(gs => {
            if (typeof gs !== 'undefined') {
                this.messages = gs.messages;
            }
        });
    }

    getMessages() {
        return this.messages
            .map(msg => msg.text)
            .reduce((p, c) => p + '\r\n' + c);
    }
}
