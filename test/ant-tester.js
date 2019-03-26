var assert = require('assert');
var LangtonAnt = require('../src/ant');

class AntTester {
    static countBlocks(ant) {
        const count = new Uint32Array(ant.program.length + 1);
        for (let i = 0; i < 1000; i += 1) {
            for (let j = 0; j < 1000; j += 1) {
                count[ant.world.grid[i][j]] += 1;
            }
        }
        return count;
    }

    static testStepsResult(worldSize, program, steps, expected) {
        it('have ' + expected + ' squares in the world when doing ' + steps + ' steps with prog ' + program, function () {
            this.timeout(1e9);
            const ant = new LangtonAnt({
                worldSize: worldSize,
                program: program
            });

            for (let i = 0; i < steps; i += 1) {
                ant.next();
            }

            const correct = Uint32Array.from(expected);
            const result = AntTester.countBlocks(ant).slice(1, program.length + 1);

            assert.deepStrictEqual(result, correct);
        });
    }
}

module.exports = AntTester;
