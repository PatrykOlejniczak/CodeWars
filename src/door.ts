export function door(events: string): string {
    return new DoorMechanism(events).execute();
}

export class DoorMechanism {
    private readonly doorChangeUnit: number = 1;
    private readonly doorStartPosition: number = 0;
    private readonly doorFinishPosition: number = 5;

    private events: string;

    private result: string;
    private currentEventPointer: number;
    private currentState: number;
    private isDoorClosing: boolean | null;
    private isPreviousDoorClosing: boolean | null;

    private commands = new Map([
        ['P', this.buttonPressed],
        ['O', this.obstacle]
    ]);

    constructor(events: string) {
        this.currentEventPointer = 0;
        this.events = events;
        this.result = "";

        this.currentState = 0;
        this.isDoorClosing = null;
        this.isPreviousDoorClosing = null;
    }

    public execute(): string {
        while (!this.isEventsFinished()) {
            var operation = this.events[this.currentEventPointer]
            var func = this.commands.get(operation);
            if (func != null) {
                func.call(this)
            }

            this.idle();
            this.currentEventPointer++;
        }

        return this.result;
    }

    private isEventsFinished(): boolean {
        return this.currentEventPointer >= this.events.length;
    }

    private idle() {
        if (this.isDoorClosing === true && this.currentState < this.doorFinishPosition) {
            this.currentState += this.doorChangeUnit;
        } else if (this.isDoorClosing === false && this.currentState > this.doorStartPosition) {
            this.currentState -= this.doorChangeUnit;
        }

        if (this.currentState == this.doorStartPosition) {
            this.isDoorClosing = null;
        }

        if (this.currentState == this.doorFinishPosition) {
            this.isDoorClosing = null;
        }

        this.result += this.currentState.toString();
    }

    private buttonPressed() {
        var previousState = this.isDoorClosing;

        if (this.isDoorClosing === null || this.isDoorMoving()) {
            this.isDoorClosing = this.getPossibleMove();
        } else {
            this.isDoorClosing = null;
        }

        this.isPreviousDoorClosing = previousState;
    }

    private isDoorMoving() {
        return this.currentState == this.doorStartPosition || this.currentState == this.doorFinishPosition;
    }

    private getPossibleMove() {
        if (this.isDoorOpen()) {
            return true;
        } else if (this.isDoorClosed()) {
            return false;
        } else {
            return this.isPreviousDoorClosing;
        }
    }

    private isDoorOpen() {
        return this.currentState == this.doorStartPosition;
    }

    private isDoorClosed() {
        return this.currentState == this.doorFinishPosition;
    }

    private obstacle() {
        this.isDoorClosing = !this.isDoorClosing;
    }
}