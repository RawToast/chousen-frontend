import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { GameService } from '../game/game.service';
import { Router } from '@angular/router';

@Component({
    selector: 'chousen-create',
    template: `<div class="mui-textfield">
                    <input id ="namebox" type="text" class="form-control" placeholder="Character Name" (keyup)="onKey($event)">
                </div>
                <div class="mui-radio">
                    <label><input type="radio" name="charc" value="2" (click)="classChoice(1)" checked> Fighter</label>
                    <label><input type="radio" name="charc" value="3" (click)="classChoice(2)"> Berserker</label>
                    <label><input type="radio" name="charc" value="4" (click)="classChoice(3)"> Chieftain</label>
                    <label><input type="radio" name="charc" value="4" (click)="classChoice(4)"> Rogue</label>
                    <label><input type="radio" name="charc" value="5" (click)="classChoice(5)"> Trickster</label>
                    <label><input type="radio" name="charc" value="6" (click)="classChoice(6)"> Mage</label>
                    <label><input type="radio" name="charc" value="7" (click)="classChoice(7)"> Wizard</label>
                    <label><input type="radio" name="charc" value="8" (click)="classChoice(8)"> Alchemist</label>
                </div>`,
})

export class CreateGameComponent implements OnInit {
    constructor(private gameService: GameService, private router: Router) { }

    class = 1;
    ngOnInit() { }

    onKey(event: any) {
        if (event.which === 13) {
            event.preventDefault();

            this.gameService.create(event.target.value, this.class)
                .then(gr => {
                this.router.navigate([gr.uuid]);
            });
        }
    }

    classChoice(i: number) {
        this.class = i;
    }
}
