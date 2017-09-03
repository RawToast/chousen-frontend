import { Component, OnInit } from '@angular/core';
import { GameService } from './sharing.service';
import { Message } from './gameresponse';
import { Defaults } from './defaults';

@Component({
    selector: 'chousen-messages',
    template: `
    <div id="gameMessagesRow" class="row" style="padding: 8px 0px">
        <div id="gameMessagesOffSet" class="col-xs-10">
            <textarea id="gameMessagesText" class="form-control noresize" style="resize: none" rows="15" data-role="none">
{{getMessages()}}
            </textarea>
        </div>
    </div>`
})

export class MessagesComponent implements OnInit {
    constructor(private gameService: GameService) { }

    messages: Message[] = new Defaults().EMPTY_GAME.messages;
    prevMessages: Message[] = new Defaults().EMPTY_GAME.messages;

    ngOnInit() {
        this.gameService.getData1().subscribe(gs => {
            if (typeof gs !== 'undefined') {
                console.log('prev size ' + this.prevMessages.length );
                const newMsgs = gs.messages
                    .filter(m => this.prevMessages.findIndex(msg => msg.text === m.text) === -1);

                if (newMsgs.length !== 0) {
                    this.prevMessages = gs.messages;
                    this.messages = newMsgs;
                }
            }
        });
    }

    getMessages() {
        return this.messages
            .map(msg => msg.text)
            .reduce((p, c) => p + '\r\n' + c);
    }
}
