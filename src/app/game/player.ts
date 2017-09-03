import { Component, OnInit } from '@angular/core';
import { Player, GameService, GameResponse } from './game.service';
import { SharingService } from './sharing.service';
import { Defaults } from './defaults';

@Component({
    selector: 'chousen-player',
    templateUrl: `./player.html`
})

export class PlayerComponent implements OnInit {

    constructor(private gameService: SharingService) {}

    player: Player = new Defaults().EMPTY_GAME.player;

    ngOnInit() {
        this.gameService.getData1().subscribe(gs => {
            if (typeof gs !== 'undefined') {
                this.player = gs.player;
            }
        });
    }

}
