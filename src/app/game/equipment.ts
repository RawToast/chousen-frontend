import { Component, OnInit } from '@angular/core';
import { Player, GameResponse, Equipment } from './gameresponse';
import { GameService } from './game.service';
import { Defaults } from './defaults';

@Component({
    selector: 'chousen-equipment',
    template: `<div class="row" style="padding: 0.5em 0px">
                <div *ngIf="equipment.weapon !== null" class="col-sm-4">{{ weapon() }}</div>
                <div class="col-sm-4">{{ armour() }}</div>
            </div>`
})

export class EquipmentComponent implements OnInit {

    constructor(private gameService: GameService) {}

    equipment: Equipment = new Defaults().EMPTY_GAME.player.equipment;

    ngOnInit() {
        this.gameService.getData1().subscribe(gs => {
            if (typeof gs !== 'undefined') {
                this.equipment = gs.player.equipment;
            }
        });
    }

    weapon() {
        if (typeof this.equipment.weapon === 'undefined') {
            return '';
        } else if (this.equipment.weapon === null) {
            return '';
        }{ return 'Weapon: ' + this.equipment.weapon.name; }
    }

    armour() {
        if (typeof this.equipment.armour === 'undefined') {
            return '';
        } else if (this.equipment.armour === null) {
            return '';
        } else { return 'Armour: ' + this.equipment.armour.name; }
    }

}
