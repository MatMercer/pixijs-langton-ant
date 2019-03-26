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
        antPrograms.forEach(program => {
            let before = program.results[1];
            let after = program.results[0];

            AntTester.testBackResult(program, before, after);
        });
    });
});
