import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Location } from '@angular/common';

import { GameService, GameResponse } from './game.service';
import { SharingService } from './sharing.service';

import 'rxjs/add/operator/switchMap';
import { Defaults } from './defaults';

@Component({
    selector: 'chousen-game',
    template: `

    <h1>{{game.uuid}}</h1>

    <chousen-player></chousen-player>
    `
})

export class GameComponent implements OnInit {

    game: GameResponse = new Defaults().EMPTY_GAME;

    constructor(private gameService: SharingService,
        private route: ActivatedRoute, private location: Location) { }

    ngOnInit() {
        this.route.params.subscribe((params: ParamMap) => {
            const gid = params['id'];
            console.log('gid' + gid);
            this.gameService.awaitData(gid);
            this.gameService.getData1().subscribe(gs => {
                if (typeof gs !== 'undefined') {
                    this.game = gs;
                }
            });
        });
    }
}
