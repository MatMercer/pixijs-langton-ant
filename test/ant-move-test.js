const assert = require('assert');
const antPrograms = require('./ant-programs');
const AntTester = require('./ant-tester');
const LangtonAnt = require('../src/ant');

describe('Langton Ant', function () {
    describe('#move()', function () {
        antPrograms.forEach(program => {
            program.results.forEach(result => {
                AntTester.testStepsResult(
                    program.worldSize, program.program,
                    result.steps, result.expected
                );
            });
        });
    });

    describe('#moveBack()', function () {
        it('must have the right count when going back 1 time', function () {
            this.timeout(1e9);

            antPrograms.forEach(program => {
                const ant = new LangtonAnt({
                    worldSize: 1000,
                    program: [0, 1]
                });

                const expectedBefore =  [1, 3];
                const expectedAfter = [0, 4];
                const stepsDifference = 5 - 4;

                for (let i = 0; i < 5; i += 1) {
                    ant.next();
                }

                let correctBefore = Uint32Array.from(expectedBefore);
                let result = AntTester.countBlocks(ant).slice(1, program.program.length + 1);

                assert.deepStrictEqual(result, correctBefore);

                for (let i = 0; i < stepsDifference; i += 1) {
                    ant.previous();
                }

                correctAfter = Uint32Array.from(expectedAfter);
                result = AntTester.countBlocks(ant).slice(1, program.program.length + 1);

                assert.deepStrictEqual(result, correctAfter);
            });
        });
        it('must have the right count when going back 10 times', function () {
            this.timeout(1e9);

            antPrograms.forEach(program => {
                const ant = new LangtonAnt({
                    worldSize: 1000,
                    program: [0, 1]
                });

                const expectedBefore =  [1, 6];
                const expectedAfter = [1, 3];
                const stepsDifference = 10 - 5;

                for (let i = 0; i < 10; i += 1) {
                    ant.next();
                }

                let correctBefore = Uint32Array.from(expectedBefore);
                let result = AntTester.countBlocks(ant).slice(1, program.program.length + 1);

                assert.deepStrictEqual(result, correctBefore);

                for (let i = 0; i < stepsDifference; i += 1) {
                    ant.previous();
                }

                correctAfter = Uint32Array.from(expectedAfter);
                result = AntTester.countBlocks(ant).slice(1, program.program.length + 1);

                assert.deepStrictEqual(result, correctAfter);
            });
        });
    });
});
