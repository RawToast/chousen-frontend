import { Component, OnInit } from '@angular/core';
import { GameService } from './sharing.service';
import { Defaults } from './defaults';
import { Message } from './gameresponse';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'chousen-input',
    template: `
    <button id="block-button" type="button" class="btn btn-blk btn-default" (click)=block()> Block </button>`
})

export class InputComponent implements OnInit {
    constructor(private gameService: GameService, private route: ActivatedRoute,
        private location: Location) { }

    messages: Message[] = new Defaults().EMPTY_GAME.messages;

        gameId = '';

        ngOnInit() {
            this.route.params.subscribe((params: ParamMap) => {
                const gid = params['id'];
                this.gameId = gid;

                // this.gameService.getData1().subscribe(gs => {
                //     if (typeof gs !== 'undefined') {
                //         this.game = gs;
                //     }
                // });

            });
            this.gameService.getData1().subscribe(gs => {
                if (typeof gs !== 'undefined') {
                    this.messages = gs.messages;
                }
            });
        }

    block() {
        console.log('blocking');
        this.gameService.makeRequest(`game/${this.gameId}/block`, {})
            .then(gr => this.gameService.refresh2(this.gameId));
        console.log('blocked');
    }
}
