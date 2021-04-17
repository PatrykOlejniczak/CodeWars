import solution = require('../src/transpose');

import { assert } from "chai";

describe("solution", function () {
    it("basicTests", function () {
        assert.equal(solution.transposeTwoStrings(['Hello', 'World']), "H W\ne o\nl r\nl l\no d", "Should return H W\ne o\nl r\nl l\no d");
        assert.equal(solution.transposeTwoStrings(['joey', 'louise']), "j l\no o\ne u\ny i\n  s\n  e", "Should return j l\no o\ne u\ny i\n  s\n  e");
        assert.equal(solution.transposeTwoStrings(['a', 'cat']), "a c\n  a\n  t", "Should return a c\n  a\n  t");
        assert.equal(solution.transposeTwoStrings(['cat', '']), "c  \na  \nt  ", "Should return c  \na  \nt  ");
        assert.equal(solution.transposeTwoStrings(['!a!a!', '?b?b']), "! ?\na b\n! ?\na b\n!  ", "Should return ! ?\na b\n! ?\na b\n!  ");
    });
});