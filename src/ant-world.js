const AntMath = require('./ant-math');

class LangtonWorld {
    constructor(size) {
        this.size = size;
        this._generateGrid();
    }

    increment(coord, maxInc) {
        return this._incrementPos(coord, maxInc) - 1;
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
}

module.exports = LangtonWorld;

