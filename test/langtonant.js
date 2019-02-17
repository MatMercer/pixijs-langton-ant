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
                const result = countBlocks(ant).slice(1, program.length + 1);

                assert.deepStrictEqual(result, correct);
            });
        }

        testAntProgram(1000, 12560, [0, 1], [911, 1014]);
        testAntProgram(1000, 28000, [0, 1, 1, 0], [232, 128, 338, 60]);
        testAntProgram(1000, 328983, [0, 0, 0, 1, 0], [492, 53308, 937, 594, 131]);
        testAntProgram(1000, 917761, [0, 0, 1], [7798, 9880, 9489]);
        testAntProgram(1000, 1370573, [0, 0, 1, 1], [8201, 8319, 25504, 7870]);
        testAntProgram(1000, 20061055, [0, 1, 1, 0], [12782, 7842, 13130, 5387]);
    });
});
