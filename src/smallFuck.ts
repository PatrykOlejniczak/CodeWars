export function interpreter(code: string, tape: string): string {
    var compiler = new SmallFuck(code, tape);
    return compiler.execute();
}

export class SmallFuck {
    private code: string;

    private tape: string;
    private currentCommandPointer: number;
    private currentTapePointer: number;

    private commands = new Map([
        ['>', this.movePointerRight],
        ['<', this.movePointerLeft],
        ['*', this.flipCurrentBit],
        ['[', this.jump],
        [']', this.jumpBack]
    ]);

    constructor(code: string, tape: string) {
        this.currentCommandPointer = 0;
        this.currentTapePointer = 0;
        this.code = code;
        this.tape = tape;

        this.prepare();
    }

    public execute(): string {
        while (!this.isProgramFinished() && !this.isOutOfTape()) {
            var operation = this.code[this.currentCommandPointer]
            var func = this.commands.get(operation);
            if (func != null) {
                func.call(this)
            }

            this.currentCommandPointer++;
        }

        return this.tape;
    }

    private isProgramFinished(): boolean {
        return this.currentCommandPointer >= this.code.length;
    }

    private isOutOfTape(): boolean {
        return this.currentTapePointer >= this.tape.length || this.currentTapePointer < 0;
    }

    private prepare() {
        for (let command of this.code) {
            if (!this.commands.has(command))
                this.code = this.code.replace(command, "");
        }
    }

    private movePointerRight() {
        this.currentTapePointer++;
    }

    private movePointerLeft() {
        this.currentTapePointer--;
    }

    private flipCurrentBit() {
        var state = this.tape[this.currentTapePointer];
        if (state == "1")
            this.modifyProgramState(this.currentTapePointer, "0")
        else
            this.modifyProgramState(this.currentTapePointer, "1")
    }

    private jump() {
        if (this.tape[this.currentTapePointer] != "0") {
            return;
        }            

        var closingIndex = this.code
            .substring(this.currentCommandPointer)
            .indexOf(']');

        this.currentCommandPointer = this.currentCommandPointer + closingIndex;
    }

    private jumpBack() {
        if (this.tape[this.currentTapePointer] == "0")
            return;

        var openingIndex = this.code
            .substring(0, this.currentCommandPointer)
            .indexOf('[');

        this.currentCommandPointer = openingIndex;
    }

    private modifyProgramState(index: number, replacement: string) {
        var program = this.tape;
        if (index > program.length - 1) {
            return program;
        }

        this.tape = program.substring(0, index) + replacement + program.substring(index + 1);
    }
}