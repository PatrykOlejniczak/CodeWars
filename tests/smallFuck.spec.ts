import { interpreter } from '../src/smallFuck';
import { assert } from 'chai';

describe("Your Interpreter", function () {
    it("should work for some example test cases", function () {
        // Flips the leftmost cell of the tape
        assert.equal(interpreter("*", "00101100"), "10101100");
        // Flips the second and third cell of the tape
        assert.equal(interpreter(">*>*", "00101100"), "01001100");
        // Flips all the bits in the tape
        assert.equal(interpreter("*>*>*>*>*>*>*>*", "00101100"), "11010011");
        // Flips all the bits that are initialized to 0
        assert.equal(interpreter("*>*>>*>>>*>*", "00101100"), "11111111");
        // Goes somewhere to the right of the tape and then flips all bits that are initialized to 1, progressing leftwards through the tape
        assert.equal(interpreter(">>>>>*<*<<*", "00101100"), "00000000");
        // Should return the final state of the tape immediately if the pointer ever goes out of bounds
        assert.equal(interpreter("*>>>*>*>>*>>>>>>>*>*>*>*>>>**>>**", "0000000000000000"), "1001101000000111");
        assert.equal(interpreter("<<<*>*>*>*>*>>>*>>>>>*>*", "0000000000000000"), "0000000000000000");
        // Should work for some simple and nested loops
        assert.equal(interpreter("*[>*]",
            "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"),
            "1111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111111");
        assert.equal(interpreter("*>*>>>*>*>>>>>*>[>*]",
            "0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000"),
            "1100110000100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000");
    });
});