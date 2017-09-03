import { Component, OnInit } from '@angular/core';
import { GameService } from './sharing.service';
import { Player, Enemy } from './gameresponse';
import { Defaults } from './defaults';

@Component({
    selector: 'chousen-enemy',
    template: `
    <div id="enemySheet" class="row">
        <div class="row" style="padding: 2px 0px" *ngFor="let e of enemies">
            <div class="col-xs-2 col-sm-2 col-md-2">{{e.name}}</div>
            <div class="col-xs-2 col-sm-2 col-md-2"></div>
            <div class="col-xs-2 col-sm-2 col-md-2">HP {{e.stats.currentHp}}/{{e.stats.maxHp}}</div>
            <div class="col-xs-2 col-sm-2 col-md-2">ST: na</div>
            <div class="col-xs-2 col-sm-2 col-md-2"></div>
            <div class="col-xs-2 col-sm-2 col-md-2">{{e.position}}</div>
        </div>
    </div>
    `
})

export class EnemyComponent implements OnInit {

    constructor(private gameService: GameService) {}

        enemies: Enemy[] = new Defaults().EMPTY_GAME.currentEncounter.enemies;

        ngOnInit() {
            this.gameService.getData1().subscribe(gs => {
                if (typeof gs !== 'undefined') {
                    this.enemies = gs.currentEncounter.enemies;
                }
            });
        }
}
