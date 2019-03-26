const assert = require('assert');
const LangtonAnt = require('../src/ant');

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

            AntTester.permuteAnt(ant, steps);

            const correct = Uint32Array.from(expected);
            const result = AntTester.countBlocks(ant).slice(1, program.length + 1);

            assert.deepStrictEqual(result, correct);
        });
    }

    static testBackResult(program, before, after) {
        let ant = new LangtonAnt({
            worldSize: 1000,
            program: program.program
        });

        AntTester.permuteAnt(ant, before.steps);

        it('must have the right count when going from ' + before.steps + ' to ' + after.steps + ' steps', function () {
            let stepsDifference = before.steps - after.steps;
            for (let i = 0; i < stepsDifference; i += 1) {
                ant.previous();
            }

            let correctAfter = Uint32Array.from(after.expected);
            let result = AntTester.countBlocks(ant).slice(1, program.program.length + 1);

            assert.deepStrictEqual(result, correctAfter);
        })
    }

    static permuteAnt(ant, steps) {
        for (let i = 0; i < steps; i += 1) {
            ant.next();
        }
    }
}

module.exports = AntTester;
