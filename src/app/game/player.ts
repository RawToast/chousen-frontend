import { Component, OnInit } from '@angular/core';
import { Player, GameResponse } from './gameresponse';
import { GameService } from './game.service';
import { Defaults } from './defaults';

@Component({
    selector: 'chousen-player',
    templateUrl: `./player.html`
})

export class PlayerComponent implements OnInit {

    constructor(private gameService: GameService) {}

    player: Player = new Defaults().EMPTY_GAME.player;

    statusMsg: string;

    ngOnInit() {
        this.gameService.getData1().subscribe(gs => {
            if (typeof gs !== 'undefined') {
                this.player = gs.player;
                this.updateStatus();
            }
        });
    }

    private updateStatus() {
        const effects = this.player.status.map(s => s.effect);
        if (effects.length > 0) {
            this.statusMsg = effects.reduce((l, r) => l + ', ' + r);
        } else {
            this.statusMsg = '';
        }
    }

}
