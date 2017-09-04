import { Component, OnInit } from '@angular/core';
import { GameService } from './sharing.service';
import { Defaults } from './defaults';
import { Message, Action, Card } from './gameresponse';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'chousen-cards',
    // template: `
    // <div>
    //     <button *ngFor="let a of hand"
    //          class="btn btn-blk btn-default"> {{ a.name }} </button>
    // </div>`
    template: `
    <div>
        <div class="btn-group" role="group" *ngFor="let a of hand">
            <!-- Single target -->
            <button *ngIf="a.action.request.length === 1" (click)="actionReq(a.action.uri, a.action.request[0])"
                class="btn btn-blk btn-default" [disabled]=!a.playable> {{ a.name }} </button>

            <!-- Multi target -->
            <button *ngIf="a.action.request.length > 1" type="button" class="btn btn-default btn-camp2 dropdown-toggle"
                data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" title="{{ a.description }}">
                {{ a.name }}
                <span class="caret"></span>
            </button>
            <ul *ngIf="a.action.request.length > 1" class="dropdown-menu">
                <li *ngFor="let t of a.action.request" (click)="actionReq(a.action.uri, t)">
                    <a> {{ t.description }} </a>
                </li>
            </ul>
        </div>
    </div>
    `
})
// <button *ngFor="let a of actions" (click)="actionReq(a.uri, a.request[0])"
//          class="btn btn-blk btn-default"> {{ a.name }} </button>

export class CardsComponent implements OnInit {
    constructor(private gameService: GameService, private route: ActivatedRoute,
        private location: Location) { }

        hand: Card[] = new Defaults().EMPTY_GAME.cards.hand;

        gameId = '';

        ngOnInit() {
            this.route.params.subscribe((params: ParamMap) => {
                const gid = params['id'];
                this.gameId = gid;
            });
            this.gameService.getData1().subscribe(gs => {
                if (typeof gs !== 'undefined') {
                    this.hand = gs.cards.hand;
                }
            });
        }

    actionReq(uri: string, req: Action) {
        this.gameService.makeRequest(uri, req)
            .then(gr => this.gameService.refresh2(this.gameId));
    }

    block() {
        this.gameService.makeRequest(`game/${this.gameId}/block`, {})
            .then(gr => this.gameService.refresh2(this.gameId));
    }
}
