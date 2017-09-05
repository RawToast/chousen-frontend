import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Defaults } from './defaults';
import { Message, Action, Card } from './gameresponse';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'chousen-cards',
    template: `
    <div>
        <div class="btn-group" role="group" *ngFor="let a of hand">
            <!-- Single target -->
            <button *ngIf="a.action.request.length === 1" (click)="actionReq(a.action.uri, a.action.request[0])"
            data-toggle="tooltip" data-placement="top" title="{{ a.description }}"
                class="btn btn-blk btn-default" [disabled]=!a.playable> {{ a.name }} {{ a.charges }}</button>

            <!-- Multi target -->
            <button *ngIf="a.action.request.length > 1" title="{{ a.description }}" type="button"
            class="btn btn-default dropdown-toggle" data-toggle="dropdown"
            aria-haspopup="true" aria-expanded="false" id="{{a.id}}">
                {{ a.name }} {{ a.charges }}
                <span class="caret"></span>
            </button>
            <div *ngIf="a.action.request.length > 1" class="dropdown-menu" style="background-color: #1F1F1F"
                attr.aria-labelledby="{{a.id}}">
                <a class="dropdown-item c-dropdown" style="white-space: normal; background-color: #202020"
                *ngFor="let t of a.action.request" (click)="actionReq(a.action.uri, t)">
                     {{ t.description }}
                </a>
            </div>
        </div>
    </div>
    `
})


// <div class="btn-group open">
// <button class="btn dropdown-toggle" type="button" id="buttonMenu1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
//   Dropdown
// </button>
// <div class="dropdown-menu" aria-labelledby="buttonMenu1">
//   <a class="dropdown-item" href="#">Action</a>
//   <a class="dropdown-item" href="#">Another action</a>
//   <a class="dropdown-item" href="#">Something else here</a>
// </div>
// </div>

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
