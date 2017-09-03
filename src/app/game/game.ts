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

    // ngOnInit(): void {
    //     this.route.paramMap.switchMap((params: ParamMap) =>
    //       this.gameService.getGame(params.get('id')))
    //         .subscribe(game => this.game = game);
    // }

    ngOnInit() {
        // this.route.paramMap.toPromise().then((params: ParamMap) =>
        //     this.gameService.refresh(params.get('id')));

        this.gameService.awaitData('8a3b0e1c-31c6-4af6-8d2c-13a91c5193c5');

        this.gameService.getData1().subscribe(gs => {
            if (typeof gs !== 'undefined') {
                this.game = gs;
            }
        });

        console.log('Game ' + this.game);
    }
}
