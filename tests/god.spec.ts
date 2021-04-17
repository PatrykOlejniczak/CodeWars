import { God, Man, Woman, Human } from "../src/god";
import { assert } from "chai";

describe("solution", function () {
    describe("GodTest", function () {
        it("Adam should be a Man", function () {
            let humans = God.create()
            assert.equal(humans[0] instanceof Man, true, 'Expected Adam to be a Man');
        });
    });
});