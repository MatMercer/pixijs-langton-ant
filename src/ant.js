const LangtonWorld = require('./ant-world');

class LangtonAnt {
    /**
     * Assign the project to an employee.
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

        this.coord[0] = Math.ceil(this.world.size / 2);
        this.coord[1] = Math.ceil(this.world.size / 2);

        // TODO: the user can pre-render the steps
        this.steps = options.steps || 0;
    }

    next() {
        this.world.increment(this.coord);
        this.ground = this.world.value(this.coord);

        if (this.ground === this.program.length) {
            this.world.resetCoord(this.coord);
        }

        this.move(this.program[this.world.value(this.coord)]);

        this.steps += 1;
    }

    move(command) {
        if (command === 0) {
            this.rotArr.push(
                this.rotArr.shift()
            );
        } else {
            this.rotArr.unshift(
                this.rotArr.pop()
            );
        }

        this.incrementCoord(this.rotArr[0]);
    }

    incrementCoord(dir) {
        this.coord[0] += dir[0];
        this.coord[1] += dir[1];
    }
}

module.exports = LangtonAnt;
