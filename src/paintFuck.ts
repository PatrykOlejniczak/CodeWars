export function interpreter(code: string, iterations: number, width: number, height: number): string {
    var compiler = new PaintFuck(code, iterations, width, height);
    return compiler.execute();
}

export class PaintFuck {
    private code: string;
    private iternations: number;

    private width: number;
    private height: number;

    private pointerX: number = 0;
    private pointerY: number = 0;
    private state: number[][] = [];
    private currentCommandPointer: number;

    constructor(code: string, iterations: number, width: number, height: number) {
        this.code = code;
        this.iternations = iterations;
        this.currentCommandPointer = 0;

        this.width = width;
        this.height = height;

        this.prepareInput();
    }

    private commands = new Map([
        ['n', this.moveUp],
        ['e', this.moveRight],
        ['s', this.moveDown],
        ['w', this.moveLeft],
        ['*', this.flipCurrentBit],
        ['[', this.jump],
        [']', this.jumpBack]
    ]);

    public execute(): string {
        while (!this.isProgramFinished() && !this.isOutOfTape()){
            var operation = this.code[this.currentCommandPointer]
            var func = this.commands.get(operation);
            if (func != null) {
                func.call(this)
            }

            this.currentCommandPointer++;
            this.iternations--;
        }

        return this.prepareOutput();
    }

    private isProgramFinished(): boolean {
        return this.iternations == 0 || this.currentCommandPointer >= this.code.length;
    }

    private isOutOfTape(): boolean {
        return this.pointerX < 0 
            || this.pointerY < 0
            || this.pointerX > this.width
            || this.pointerY > this.height;
    }

    private prepareOutput(): string {
        var output = "";
        for (var i = 0; i < this.state.length; i++) {
            if (i != 0) {
                output += "\r\n";
            }

            for (var j = 0; j < this.state[i].length; j++) {
                output += this.state[i][j];
            }
        }

        return output;
    }

    private prepareInput() {
        for (var i = 0; i < this.height; i++) {
            this.state[i] = [];
            for (var j = 0; j < this.width; j++) {
                this.state[i][j] = 0;
            }
        }

        for (let command of this.code) {
            if (!this.commands.has(command))
                this.code = this.code.replace(command, "");
        }
    }

    private moveUp() {
        if (this.pointerY == 0) {
            this.pointerY = this.height - 1;
        } else {
            this.pointerY--;
        }
    }

    private moveRight() {
        if (this.pointerX == this.width - 1) {
            this.pointerX = 0;
        } else {
            this.pointerX++;
        }
    }

    private moveDown() {
        if (this.pointerY == this.height - 1) {
            this.pointerY = 0;
        } else {
            this.pointerY++;
        }
    }

    private moveLeft() {
        if (this.pointerX == 0) {
            this.pointerX = this.width - 1;
        } else {
            this.pointerX--;
        }
    }

    private flipCurrentBit() {
        var currentState = this.state[this.pointerY][this.pointerX];
        if (currentState == 0) {
            this.state[this.pointerY][this.pointerX] = 1;
        } else {
            this.state[this.pointerY][this.pointerX] = 0;
        }
    }

    private jump() {
        if (this.state[this.pointerY][this.pointerX] != 0) {
            return;
        }            

        var closingIndex = this.code
            .substring(this.currentCommandPointer)
            .indexOf(']');

        this.currentCommandPointer = this.currentCommandPointer + closingIndex;
    }

    private jumpBack() {
        if (this.state[this.pointerY][this.pointerX] == 0)
            return;

        var openingIndex = this.code
            .substring(0, this.currentCommandPointer)
            .indexOf('[');

        this.currentCommandPointer = openingIndex;
    }
}