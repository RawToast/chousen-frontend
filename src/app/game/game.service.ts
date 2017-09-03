import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class GameService {

    constructor(private http: Http) { }
    // 88107f56-54c4-4e0d-8e1c-41532b0848be
    private rootApiUrl = 'http://localhost:8080';  // URL to web api

    private headers = new Headers({'Content-Type': 'application/json'});

    gameResponse: GameResponse;

    getGame(id: string): Promise<GameResponse> {
        const url = `${this.rootApiUrl}/game/${id}`;
        return this.http.get(url)
          .toPromise()
          .then(response => {
            const result = response.json() as GameResponse;
            this.gameResponse = result;
            return result;
        } )
          .catch(this.handleError);
    }



    observeGameRq(id: string): Observable<GameResponse> {
        return Observable.fromPromise(this.getGame(id));
    }

    create(name: string): Promise<GameResponse> {
        const url = `${this.rootApiUrl}/game/${name}/start`;
        return this.http
          .post(url, JSON.stringify({}))
          .toPromise()
          .then(response => {
            const result = response.json() as GameResponse;
            this.gameResponse = result;
            return result;
        } )
          .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
      console.error('An error occurred', error); // for demo purposes only
      return Promise.reject(error.message || error);
    }
}


export interface Stats {
    maxHp: number;
    currentHp: number;
    strength: number;
    dexterity: number;
    intellect: number;
    vitality: number;
    speed: number;
}

export interface Experience {
    current: number;
    next: number;
    level: number;
}

export interface Equipment {
    weapon?: any;
    armour?: any;
}

export interface Player {
    name: string;
    className: string;
    stats: Stats;
    experience: Experience;
    equipment: Equipment;
    position: number;
    status: any[];
}

export interface Hand {
    name: string;
    description: string;
    charges?: any;
    playable: boolean;
}

export interface Deck {
    name: string;
    description: string;
    charges: string;
    playable: boolean;
}

export interface Passive {
    name: string;
    description: string;
    charges?: any;
    playable: boolean;
}

export interface EquippedCards {
    weapon?: any;
    armour?: any;
    jewelery?: any;
}

export interface Cards {
    hand: Hand[];
    deck: Deck[];
    discard: any[];
    passive: Passive[];
    equippedCards: EquippedCards;
}

export interface Stats2 {
    maxHp: number;
    currentHp: number;
    strength: number;
    dexterity: number;
    intellect: number;
    vitality: number;
    speed: number;
}

export interface Enemy {
    name: string;
    id: string;
    stats: Stats2;
    position: number;
    status: any[];
}

export interface CurrentEncounter {
    enemies: Enemy[];
}

export interface Message {
    text: string;
}

export class GameResponse {
    uuid: string;
    player: Player;
    cards: Cards;
    currentEncounter: CurrentEncounter;
    messages: Message[];
}
