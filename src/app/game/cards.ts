import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Defaults } from './defaults';
import { Action, Card } from './gameresponse';
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
            class="mui-btn mui-btn--flat mui-btn--primary" [disabled]=!a.playable> {{ a.name }} {{ a.charges }}</button>

            <!-- Multi target -->
            <div *ngIf="a.action.request.length > 1" title="{{ a.description }}" class="mui-dropdown">
                <button class="mui-btn mui-btn--flat mui-btn--primary" data-mui-toggle="dropdown">
                    {{ a.name }}
                    <span class="mui-caret"></span>
                </button>
                <ul *ngIf="a.action.request.length > 1" class="mui-dropdown__menu" style="background-color: #1F1F1F">
                    <li *ngFor="let t of a.action.request"><a (click)="actionReq(a.action.uri, t)">{{ t.description }}</a></li>
                </ul>
          </div>

          <button *ngIf="a.action.request.length === 0"
          data-toggle="tooltip" data-placement="top" title="{{ a.description }}"
          class="mui-btn mui-btn--flat mui-btn--primary" disabled> {{ a.name }} {{ a.charges }}</button>
        </div>
    </div>
    <!-- Essences -->
    <div class="btn-group" role="group" *ngFor="let a of essences">
    <button *ngIf="a.action.request.length === 1" (click)="actionReq(a.action.uri, a.action.request[0])"
        data-toggle="tooltip" data-placement="top" title="{{ a.description }}"
        class="mui-btn mui-btn--flat mui-btn--primary" [disabled]=!a.playable> {{ a.name }} {{ a.charges }}</button>

    </div>

    `
})

export class CardsComponent implements OnInit {
    constructor(private gameService: GameService, private route: ActivatedRoute,
        private location: Location) { }

        hand: Card[] = new Defaults().EMPTY_GAME.cards.hand;
        essences: Card[] = [];

        gameId = '';

        ngOnInit() {
            this.route.params.subscribe((params: ParamMap) => {
                const gid = params['id'];
                this.gameId = gid;
            });
            this.gameService.getData1().subscribe(gs => {
                if (typeof gs !== 'undefined') {
                    this.hand = gs.cards.hand.filter(c => !c.name.includes('Essence of'));
                    this.essences = gs.cards.hand.filter(c => c.name.includes('Essence of'));
                }
            });
        }

    actionReq(uri: string, req: Action) {
        this.gameService.makeRequest(uri, req);
    }

    block() {
        this.gameService.makeRequest(`game/${this.gameId}/block`, {});
    }
}
