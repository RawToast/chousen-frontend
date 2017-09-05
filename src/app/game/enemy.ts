import { Component, OnInit } from '@angular/core';
import { GameService } from './game.service';
import { Player, Enemy } from './gameresponse';
import { Defaults } from './defaults';

@Component({
    selector: 'chousen-enemy',
    template: `
    <div id="enemySheet" class="row">
        <div class="row col-sm-12" style="padding: 2px 0px" *ngFor="let e of enemies">
            <div class="col-sm-2">{{e.name}}</div>
            <div class="col-sm-2"></div>
            <div class="col-sm-2">HP {{e.stats.currentHp}}/{{e.stats.maxHp}}</div>
            <div class="col-sm-2">{{ statusMessage(e) }}</div>
            <div class="col-sm-2"></div>
            <div class="col-sm-2">{{e.position}}</div>
        </div>
        <div class="row col-sm-12" style="padding: 2px 0px" *ngFor="let num of additionalLines">
            <div class="col-sm-2"  style="color:#FFFFFF">s</div>
        </div>
    </div>
    `
})

export class EnemyComponent implements OnInit {

    constructor(private gameService: GameService) {}

        enemies: Enemy[] = new Defaults().EMPTY_GAME.currentEncounter.enemies;
        private intialLines: number[] = [0, 1, 2, 3, 4, 5];
        additionalLines: number[] = this.intialLines;

        ngOnInit() {
            this.gameService.getData1().subscribe(gs => {
                if (typeof gs !== 'undefined') {
                    this.enemies = gs.currentEncounter.enemies;
                    const lines = 5 - this.enemies.length;
                    this.additionalLines = this.intialLines.filter(i => lines > i);
                }
            });
        }

        statusMessage(e: Enemy) {
            const effects = e.status.map(s => s.effect);
            if (effects.length > 0) {
                return 'ST: ' + effects.reduce((l, r) => l + ', ' + r);
            } else {
                return '';
            }
        }
}
