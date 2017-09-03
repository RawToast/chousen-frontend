import { Component, OnInit } from '@angular/core';
import { Player, GameService, GameResponse, Equipment } from './game.service';
import { SharingService } from './sharing.service';
import { Defaults } from './defaults';

@Component({
    selector: 'chousen-equipment',
    templateUrl: `./equipment.html`
})

export class EquipmentComponent implements OnInit {

    constructor(private gameService: SharingService) {}

    equipment: Equipment = new Defaults().EMPTY_GAME.player.equipment;

    ngOnInit() {
        this.gameService.getData1().subscribe(gs => {
            if (typeof gs !== 'undefined') {
                this.equipment = gs.player.equipment;
            }
        });
    }

    weapon() {
        if (typeof this.equipment.weapon !== 'undefined') {
            return '';
        } else { return 'Weapon: {{this.equipment.weapon}}'; }
    }

    armour() {
        if (typeof this.equipment.armour !== 'undefined') {
            return '';
        } else { return 'Weapon: ' + this.equipment.armour; }
    }

}
