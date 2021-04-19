import { SingletonCounter } from "../src/singletonCounter";
import { expect } from "chai";

describe("The SingletonCounter class", () => {
    var count = 4;

    it("should have correct inc() method", () => {
        var counter = SingletonCounter.getInstance();
        expect(counter.inc()).to.equal(1);
        expect(counter.inc()).to.equal(2);
        expect(counter.inc()).to.equal(3);
        expect(counter.inc()).to.equal(4);
    });

    it("should work as a singleton", () => {
        var counter1 = SingletonCounter.getInstance();
        var counter2 = SingletonCounter.getInstance();
        expect(counter1.inc()).to.equal(++count);
        expect(counter2.inc()).to.equal(++count);
        expect(counter1.inc()).to.equal(++count);
        expect(counter2.inc()).to.equal(++count);
    });
});