const AntMath = require('./ant-math');

class LangtonWorld {
    constructor(size) {
        this.size = size;
        this.grid = [];
        this.hitMap = [];
        this._generateGrid();
    }

    increment(coord, maxInc) {
        this._hitCoord(coord);
        return this._incrementPos(coord, maxInc) - 1;
    }

    _hitCoord(coord) {
        this.hitMap[coord[0]][coord[1]] += 1;
    }

    _getHits(coord) {
        return this.hitMap[coord[0]][coord[1]];
    }

    _dehitCoord(coord) {
        Math.max(0, this.hitMap[coord[0]][coord[1]] -= 1);
    }

    _hited(coord) {
        return this.hitMap[coord[0]][coord[1]] !== 0;
    }

    decrement(coord, maxInc) {
        return this._decrementPos(coord, maxInc) - 1;
    }

    value(coord) {
        return this.grid[coord[0]][coord[1]] - 1;
    }

    _generateGrid() {
        this._initiateGrid(this.grid, this.size);
        this._initiateGrid(this.hitMap, this.size);
    }

    _initiateGrid(array, size) {
        for (let i = 0; i < size; i += 1) {
            array[i] = new Uint32Array(size);
        }
    }

    _incrementPos(coord, maxInc) {
        return this.grid[coord[0]][coord[1]] =
            AntMath.cicle(1, Math.max(1, this.grid[coord[0]][coord[1]]) + 1, maxInc);
    }

    _decrementPos(coord, maxInc) {
        this._dehitCoord(coord);

        if (this._hited(coord)) {
            this.grid[coord[0]][coord[1]] = AntMath.cicle(1, Math.max(1, this.grid[coord[0]][coord[1]]) - 1, maxInc);
        }
        else {
            this.grid[coord[0]][coord[1]] = 0;
        }

        return this.grid[coord[0]][coord[1]];
    }
}

module.exports = LangtonWorld;
