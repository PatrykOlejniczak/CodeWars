import solution = require('../src/movie');
import {assert} from "chai";

function testing(card: number, ticket: number, perc: number, expected: number) {
  assert.equal(solution.G964.movie(card, ticket, perc), expected);
}

describe("Fixed Tests movie", function() {
    it("Basic tests", function() {        
        testing(500, 15, 0.9, 43);
        testing(100, 10, 0.95, 24);
        testing(0, 10, 0.95, 2);
    });
});