import { splitTheBill } from '../src/splitTheBill';
import { assert } from "chai";

describe("solution", function () {
    it("Basic Tests", function () {
        assert.deepEqual(splitTheBill({ A: 20, B: 15, C: 10 }), { A: 5, B: 0, C: -5 });
        assert.deepEqual(splitTheBill({ A: 40, B: 25, X: 10 }), { A: 15, B: 0, X: -15 });
    });
});