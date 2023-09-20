const emojis = {
    'ALIEN': '👽',
    'GHOST': '👻',
    'CRAB': '👾',
    'ROBOT': '🤖',
    'CLOWN': '🤡',
    'CAT': '🐱',
    'PUMPKIN': '🎃',
};

export default function (name) {
    return emojis[name];
}