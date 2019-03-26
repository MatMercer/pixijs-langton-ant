const AntMath = require('./ant-math');

class LangtonWorld {
    constructor(size) {
        this.size = size;
        this._generateGrid();
    }

    increment(coord, maxInc) {
        return this._incrementPos(coord, maxInc) - 1;
    }

    decrement(coord, maxInc) {
        return this._decrementPos(coord, maxInc) - 1;
    }

    value(coord) {
        return this.grid[coord[0]][coord[1]] - 1;
    }

    _generateGrid() {
        this.grid = [];

        for (let i = 0; i < this.size; i += 1) {
            this.grid[i] = new Uint32Array(this.size);
        }
    }

    _incrementPos(coord, maxInc) {
        return this.grid[coord[0]][coord[1]] =
            AntMath.cicle(1, Math.max(1, this.grid[coord[0]][coord[1]]) + 1, maxInc);
    }

    _decrementPos(coord, maxInc) {
        console.log("Before");
        console.log(this.grid[coord[0]][coord[1]]);
        this.grid[coord[0]][coord[1]] = this.grid[coord[0]][coord[1]] - 1;

        console.log("After");
        console.log(this.grid[coord[0]][coord[1]]);
        return this.grid[coord[0]][coord[1]];
    }
}

module.exports = LangtonWorld;
