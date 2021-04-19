export class SingletonCounter {
    private static instance: SingletonCounter;
    count: number;

    private constructor(count: number = 0) {
        this.count = count;
    }

    static getInstance(): SingletonCounter {
        if (!SingletonCounter.instance) {
            SingletonCounter.instance = new SingletonCounter();
        }

        return SingletonCounter.instance;
    }

    inc(): number {
        return ++this.count;
    }
}