const antPrograms = require('./ant-programs');
var AntTester = require('./ant-tester');

describe('Langton Ant', function () {
    describe('#move()', function () {
        antPrograms.forEach(program => {
            program.results.forEach(result => {
                AntTester.testStepsResult(
                    program.wolrdSize, program.program,
                    result.steps, result.expected
                );
            });
        });
    });
});
