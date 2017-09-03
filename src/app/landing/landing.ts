import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'chousen-landing',
    template: `
        <chousen-create></chousen-create>

        <chousen-notes></chousen-notes>
    `
})

export class LandingComponent implements OnInit {
    constructor() { }

    ngOnInit() { }
}
