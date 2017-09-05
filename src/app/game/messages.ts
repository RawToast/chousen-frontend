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
    prevMessages: Message[] = new Defaults().EMPTY_GAME.messages;

    prevSize = 0;

    ngOnInit() {
        this.gameService.getData1().subscribe(gs => {
            if (typeof gs !== 'undefined') {
                const newMsgs = gs.messages
                    .filter(m => this.prevMessages.findIndex(msg => msg.text === m.text) === -1);

                const msgs = gs.messages.slice(this.prevSize, gs.messages.length);
                this.prevSize = gs.messages.length;

                this.messages = msgs;
            }
        });
    }

    getMessages() {
        return this.messages
            .map(msg => msg.text)
            .reduce((p, c) => p + '\r\n' + c);
    }
}
