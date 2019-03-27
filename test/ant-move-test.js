const assert = require('assert');
const antPrograms = require('./ant-programs');
const AntTester = require('./ant-tester');
const LangtonAnt = require('../src/ant');

describe('Langton Ant', function () {
    describe("#steps", function () {
        const ant = new LangtonAnt({
            worldSize: antPrograms[0].worldSize,
            program: antPrograms[0].program
        });

        it("have the right ammount of steps after permuting fowards", function () {
            AntTester.permuteAntFowards(ant, 1000);
            assert.deepStrictEqual(ant.steps, 1000);
            AntTester.permuteAntFowards(ant, 33);
            assert.deepStrictEqual(ant.steps, 1033);
            AntTester.permuteAntBackwards(ant, 33);
        });

        it("have the right ammount of steps after permuting backwards", function () {
            AntTester.permuteAntBackwards(ant, 500);
            assert.deepStrictEqual(ant.steps, 500);
            AntTester.permuteAntBackwards(ant, 200);
            assert.deepStrictEqual(ant.steps, 300);
        });
    });

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
        antPrograms.forEach(program => {
            let before = program.results[1];
            let after = program.results[0];

            AntTester.testBackResult(program, before, after);
        });
    });
});
