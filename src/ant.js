const LangtonWorld = require('./ant-world');
const AntMath = require("./ant-math");

const UP = [0, 1];
const RIGHT = [1, 0];
const DOWN = [0, -1];
const LEFT = [-1, 0];

const DIRECTION = [
    UP,
    RIGHT,
    DOWN,
    LEFT
];

class LangtonAnt {

    /**
     * Langton Ant with options
     * @param {Object} options - The options that control the ant, like world size
     * @param {int} options.worldSize - Required value of the initial world size
     * @param {array[int]} options.program - A bit array describing the ant program
     */
    constructor(options) {
        this.program = options.program;
        this.world = new LangtonWorld(options.worldSize);
        this.coord = new Uint32Array(2);

        this.ground = 0;
        this.direction = 0;

        // TODO: the user can setup where the ant starts
        this.coord[0] = Math.ceil(this.world.size / 2);
        this.coord[1] = Math.ceil(this.world.size / 2);

        // TODO: the user can pre-render the steps
        this.steps = options.steps || 0;
    }

    next() {
        this._move();
        this.steps += 1;
    }

    previous() {
        this._moveBack();
        this.steps -= 1;
    }

    _move() {
        this._incrementGround();
        this._rotate();
        this._walk();
    }

    _incrementGround() {
        this.ground = this.world.increment(this.coord, this.program.length);
    }
    
    _rotate() {
        this.direction += this._programValue(this.ground) ? 1:-1;
        this._cycleDirection();
    }

    _programValue(index) {
        return this.program[index];
    }

    _cycleDirection() {
        this.direction = AntMath.cycle(0, this.direction, DIRECTION.length - 1);
    }

    _walk() {
        this.coord[0] += DIRECTION[this.direction][0];
        this.coord[1] += DIRECTION[this.direction][1];
    }

    _moveBack() {
        this._walkBack();
        this._rotateBack();
        this._decrementGround();
    }

    _walkBack() {
        this.coord[0] -= DIRECTION[this.direction][0];
        this.coord[1] -= DIRECTION[this.direction][1];
    }

    _rotateBack() {
        this.direction -= this._programValue(this._previousGroundValue()) ? 1:-1;
        this._cycleDirection();
    }

    _previousGroundValue() {
        return this.world.value(this.coord);
    }

    _decrementGround() {
        this.ground = this.world.decrement(this.coord, this.program.length);
    }
}

module.exports = LangtonAnt;
