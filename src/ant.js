const LangtonWorld = require('./ant-world');
const AntMath = require("./ant-math");

class LangtonAnt {
    /**
     * Langton Ant with options
     * @param {Object} options - The options that control the ant, like wolrd size
     * @param {int} options.worldSize - Required value of the initial world size
     * @param {array[int]} options.program - A bit array describing the ant program
     */
    constructor(options) {
        // Allocate world
        this.world = new LangtonWorld(options.worldSize);

        this.program = options.program;

        this.coord = new Uint32Array(2);
        this.ground = 0;

        this.rotArr = [
            [0, 1], // UP
            [1, 0], // RIGHT
            [0, -1], // DOWN
            [-1, 0] // LEFT
        ];
        this.rotIdx = 0;

        this.coord[0] = Math.ceil(this.world.size / 2);
        this.coord[1] = Math.ceil(this.world.size / 2);

        // TODO: the user can pre-render the steps
        this.steps = options.steps || 0;
    }

    next() {
        this.ground = this.world.increment(this.coord, this.program.length);

        this.move(this.program[this.ground]);

        this.steps += 1;
    }

    move(command) {
        this.rotIdx += command === 0 ? -1 : 1;
        this.rotIdx = AntMath.cicle(0, this.rotIdx, 3);

        this.incrementCoord(this.rotArr[this.rotIdx]);
    }

    incrementCoord(dir) {
        this.coord[0] += dir[0];
        this.coord[1] += dir[1];
    }
}

module.exports = LangtonAnt;
