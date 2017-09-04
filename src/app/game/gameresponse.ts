
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

export interface Equipment { }

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
    playable: boolean;
}

export interface Deck {
    name: string;
    description: string;
    playable: boolean;
    charges: string;
}

export interface Passive {
    name: string;
    description: string;
    playable: boolean;
}

export interface EquippedCards {}

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

export interface CampfireActionRequest {
    action: string;
    cardId: string;
}

export interface BlockRequest { }

export interface Request {
    CampfireActionRequest: CampfireActionRequest;
    BlockRequest: BlockRequest;
}

export interface Action {
    name: string;
    description: string;
    uri: string;
    request: Request[];
}

export interface Message {
    text: string;
}

export class GameResponse {
    uuid: string;
    player: Player;
    cards: Cards;
    currentEncounter: CurrentEncounter;
    actions: Action[];
    messages: Message[];
}
