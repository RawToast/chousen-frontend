
import { GameResponse } from './gameresponse';

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
        'actions': [
            {
                'name': 'Attack Sloth',
                'description': 'Use a basic attack on Sloth',
                'uri': 'game/e02c84a3-8d95-4df2-b8d0-56f065ebc0ba/attack',
                'request': [
                    {
                        'targetId': '7daa7e57-ef61-4cc9-95d5-13fd773d75c9'
                    }
                ]
            },
            {
                'name': 'Attack Slime',
                'description': 'Use a basic attack on Slime',
                'uri': 'game/e02c84a3-8d95-4df2-b8d0-56f065ebc0ba/attack',
                'request': [
                    {
                        'targetId': '1254c142-ec4a-475e-a9f8-1c63f7b28b5b'
                    }
                ]
            },
            {
                'name': 'Block',
                'description': 'Block for one turn, greatly increasing defense',
                'uri': 'game/e02c84a3-8d95-4df2-b8d0-56f065ebc0ba/block',
                'request': [
                    {}
                ]
            }
        ],
        'messages': [
            {
                'text': 'the game has not loaded'
            }
        ]
    };

}
