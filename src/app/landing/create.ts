import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { GameService } from '../game/sharing.service';
import { Router } from '@angular/router';

@Component({
    selector: 'chousen-create',
    template: `<input id ="namebox" type="text" class="form-control" placeholder="Character Name" (keyup)="onKey($event)">

                <br>
                <fieldset class="form-group">
                    <input type="radio" name="charc" value="1" checked> Fighter
                    <input type="radio" name="charc" value="2"> Berserker
                    <input type="radio" name="charc" value="3"> Rogue
                    <input type="radio" name="charc" value="4"> Trickster
                    <input type="radio" name="charc" value="5"> Mage
                    <input type="radio" name="charc" value="6"> Chieftan

                </fieldset>`,
})

export class CreateGameComponent implements OnInit {
    constructor(private gameService: GameService, private router: Router) { }

    ngOnInit() { }

    onKey(event: any) {
        if (event.which === 13) {
            event.preventDefault();

            this.gameService.create(event.target.value)
                .then(gr => {
                this.router.navigate(['game', gr.uuid]);
            });
        }
    }
}
