import { Component, OnInit } from '@angular/core';
import { Player, GameResponse } from './gameresponse';
import { GameService } from './sharing.service';
import { Defaults } from './defaults';

@Component({
    selector: 'chousen-player',
    templateUrl: `./player.html`
})

export class PlayerComponent implements OnInit {

    constructor(private gameService: GameService) {}

    player: Player = new Defaults().EMPTY_GAME.player;

    statusMsg: string = this.player.status
        .map(s => s.effect)
        .reduce((l, r) => l + ', ' + r);

    ngOnInit() {
        this.gameService.getData1().subscribe(gs => {
            if (typeof gs !== 'undefined') {
                this.player = gs.player;
            }
        });
    }

}
