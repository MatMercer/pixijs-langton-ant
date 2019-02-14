var assert = require('assert');
var LangtonAnt = require('../src/ant');

describe('Langton Ant', function () {
    describe('#move()', function () {
        function countBlocks(ant) {
            const count = new Uint32Array(ant.program.length + 1);
            for (let i = 0; i < 1000; i += 1) {
                for (let j = 0; j < 1000; j += 1) {
                    count[ant.world.grid[i][j]] += 1;
                }
            }
            return count;
        }

        function testAntProgram(worldSize, steps, program, expected) {
            it('have the right amount of blocks in the world when doing ' + steps + ' steps with prog ' + program, function () {
                const ant = new LangtonAnt({
                    worldSize: worldSize,
                    program: program
                });

                for (let i = 0; i < steps; i += 1) {
                    ant.next();
                }

                const correct = Uint32Array.from(expected);
                const result = countBlocks(ant).slice(1, program.length + 1);

                assert.deepStrictEqual(result, correct);

            });
        }

        testAntProgram(1000, 917761, [0, 0, 1], [7798, 9880, 9489]);
        testAntProgram(1000, 28000, [0, 1, 1, 0], [232, 128, 338, 60]);
    });
});
