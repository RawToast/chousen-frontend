import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Defaults } from './defaults';
import { Message, Action } from './gameresponse';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'chousen-input',
    template: `
    <div class="btn-group" role="group" *ngFor="let a of actions">
        <button *ngIf="a.request.length === 1" (click)="actionReq(a.uri, a.request[0])"
              class="btn btn-blk btn-default"> {{ a.name }} </button>

        <button *ngIf="a.request.length > 1" type="button" class="btn btn-default btn-camp2 dropdown-toggle"
            data-toggle="dropdown" aria-haspopup="true" aria-expanded="true" title="{{ a.description }}">
            {{ a.name }}
            <span class="caret"></span>
        </button>
        <ul *ngIf="a.request.length > 1" class="dropdown-menu">
            <li *ngFor="let t of a.request" (click)="actionReq(a.uri, t)">
                <a> {{ t.description }} </a>
            </li>
        </ul>
    </div>
        `
})
// <button *ngFor="let a of actions" (click)="actionReq(a.uri, a.request[0])"
//          class="btn btn-blk btn-default"> {{ a.name }} </button>

export class InputComponent implements OnInit {
    constructor(private gameService: GameService, private route: ActivatedRoute,
        private location: Location) { }

    actions: Action[] = new Defaults().EMPTY_GAME.actions;

        gameId = '';

        ngOnInit() {
            this.route.params.subscribe((params: ParamMap) => {
                const gid = params['id'];
                this.gameId = gid;
            });
            this.gameService.getData1().subscribe(gs => {
                if (typeof gs !== 'undefined') {
                    this.actions = gs.actions;
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
