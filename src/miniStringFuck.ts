export function myFirstInterpreter(code: string): string {
    var compiler = new MiniStringFuck(code);
    return compiler.execute();
}

export class MiniStringFuck {
    private code: string;
    private currentProgramState: string;
    private currentCommandState: number;

    private commands = new Map([
        ['+', this.incrementCommand],
        ['.', this.outputCommand]
    ]);

    constructor(code: string) {
        this.currentProgramState = "";
        this.currentCommandState = 0;
        this.code = code;

        this.prepare();
    }

    public execute(): string {
        for (let operation of this.code) {
            var func = this.commands.get(operation);
            if (func != null)
                func.call(this)
        }

        return this.currentProgramState;
    }

    private prepare() {
        for (let command of this.code) {
            if (!this.commands.has(command))
                this.code = this.code.replace(command, "");
        }
    }
    
    private incrementCommand() {
        this.currentCommandState++;
        if (this.currentCommandState == 256) {
            this.currentCommandState = 0;
        }
    }

    private outputCommand() {
        this.currentProgramState += String.fromCharCode(this.currentCommandState);
    }
}