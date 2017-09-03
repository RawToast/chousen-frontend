
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
