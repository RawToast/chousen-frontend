import { Component, OnInit } from '@angular/core';
import { Player, GameResponse, Equipment } from './gameresponse';
import { GameService } from './game.service';
import { Defaults } from './defaults';

@Component({
    selector: 'chousen-equipment',
    templateUrl: `./equipment.html`
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
        if (typeof this.equipment.weapon === 'undefined' || this.equipment.weapon.name !== 'null') {
            return '';
        } else { return 'Weapon: ' + this.equipment.weapon.name; }
    }

    armour() {
        if (typeof this.equipment.armour === 'undefined' || this.equipment.weapon.name !== 'null') {
            return '';
        } else { return 'Armour: ' + this.equipment.armour.name; }
    }

}
