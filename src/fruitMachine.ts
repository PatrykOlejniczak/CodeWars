export function fruit(reels: string[][], spins: number[]): number {
    var machine = new FruitMachine(reels);
    return machine.getResult(spins);
}

export class FruitMachine {
    private readonly bonus = "Wild";
    private readonly result = new Map([
        ['Wild', 10],
        ['Star', 9],
        ['Bell', 8],
        ['Shell', 7],
        ['Seven', 6],
        ['Cherry', 5],
        ['Bar', 4],
        ['King', 3],
        ['Queen', 2],
        ['Jack', 1]
    ]);

    private readonly defaultResult = 0;
    private readonly wildCardModifier = 2;
    private readonly fullSameModifier = 10;

    private reels: string[][];

    constructor(reels: string[][]) {
        this.reels = reels;
    }

    public getResult(spins: number[]): number {
        var slots = [];
        for (var i = 0; i < spins.length; i++) {
            slots.push(this.reels[i][spins[i]]);
        }

        var result = this.groupBy(slots);
        if (result.size < spins.length) {
            if (result.size == 1) {
                var multipler = this.result.get(result.keys().next().value) ?? this.defaultResult;
                return multipler * this.fullSameModifier;
            } else {
                var pointSlot = [...result.entries()].find(v => v[1] == 2);
                var multipler = this.result.get(pointSlot?.[0]) ?? this.defaultResult;

                var shouldApllyBonus = [...result.entries()].find(v => v[0] == this.bonus);
                if (pointSlot?.[0] != this.bonus && shouldApllyBonus) {
                    multipler *= this.wildCardModifier;
                }

                return multipler;
            }
        }
        
        return this.defaultResult;
    }

    private groupBy(elements: string[]) {
        var map = new Map();
        elements.forEach((item) => {
             var currentState = map.get(item);
             if (!currentState) {
                 map.set(item, 1);
             } else {
                 map.set(item, ++currentState);
             }
        });

        return map;
    }
}