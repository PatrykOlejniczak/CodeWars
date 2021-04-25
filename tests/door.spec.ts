import { door } from '../src/door';
import { assert } from 'chai';

describe("Normal operation", function () {
    it("should start opening on buttonpress", function () {
        assert.equal(door('P'), '1', 'P');
        assert.equal(door('P..'), '123', 'P..');
    });

    it("should open completely and stay open", function () {
        assert.equal(door('P....'), '12345');
    });

    it("should open completely, then stay open, then close", function () {
        assert.equal(door('P......P......'),
            '12345554321000');
    });
});

describe("Pause", function () {
    it("should start opening and pause on second buttonpress", function () {
        assert.equal(door('P.P..'),
            '12222');
    });
});

describe("Obstacle", function () {
    it("should reverse while opening", function () {
        assert.equal(door('P.O....'),
            '1210000');
    });
});

describe("Example", function () {
    it("should start opening and reverse when obstacle", function () {
        assert.equal(door('..P...O.....'),
            '001234321000');
    });
});

describe("Pause", function () {
    it("should resume closing on third buttonpress", function () {
        assert.equal(door('.....P......P.P..P....'),
            '0000012345554333321000');
    });
});

describe("Obstacle + Pause", function () {
    it("should reverse while opening (and allow pause)", function () {
        assert.equal(door('P..OP..P..'),
            '1232222100');
    });
});