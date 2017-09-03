
import { GameResponse } from './game.service';

export class Defaults {

    EMPTY_GAME: GameResponse = {
        'uuid': '99999999-9999-9999-9999-999999999999',
        'player': {
            'name': 'UNKNOWN PLAYER',
            'className': 'UNKNOWN',
            'stats': {
                'maxHp': 70,
                'currentHp': 65,
                'strength': 7,
                'dexterity': 6,
                'intellect': 6,
                'vitality': 8,
                'speed': 8
            },
            'experience': {
                'current': 0,
                'next': 3,
                'level': 1
            },
            'equipment': {
                'weapon': null,
                'armour': null
            },
            'position': 120,
            'status': []
        },
        'cards': {
            'hand': [],
            'deck': [],
            'discard': [],
            'passive': [],
            'equippedCards': {
                'weapon': null,
                'armour': null,
                'jewelery': null
            }
        },
        'currentEncounter': {
            'enemies': []
        },
        'messages': [
            {
                'text': 'the game has not loaded'
            }
        ]
    };

}
