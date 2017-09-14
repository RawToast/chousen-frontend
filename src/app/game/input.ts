import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GameService } from './game.service';
import { Defaults } from './defaults';
import { Action } from './gameresponse';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

@Component({
    selector: 'chousen-input',
    template: `
    <div class="btn-group" role="group" *ngFor="let a of actions">

        <button *ngIf="a.request.length === 1" (click)="actionReq(a.uri, a.request[0])"
            data-toggle="tooltip" data-placement="top" title="{{ a.description }}"
            class="mui-btn mui-btn--flat mui-btn--primary"> {{ a.name }} </button>

        <!-- Multi target -->
        <div *ngIf="a.request.length > 1" title="{{ a.description }}" class="mui-dropdown">
            <button class="mui-btn mui-btn--flat mui-btn--primary" data-mui-toggle="dropdown">
                {{ a.name }}
                <span class="mui-caret"></span>
            </button>
            <ul *ngIf="a.request.length > 1" class="mui-dropdown__menu" style="background-color: #1F1F1F">
                <li *ngFor="let t of a.request"><a (click)="actionReq(a.uri, t)">{{ t.description }}</a></li>
            </ul>
        </div>
    </div>
    `
})

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
        this.gameService.makeRequest(uri, req);
    }

    block() {
        this.gameService.makeRequest(`game/${this.gameId}/block`, {});
    }
}
