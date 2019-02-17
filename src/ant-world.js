const AntMath = require('./ant-math');

class LangtonWorld {
    constructor(size) {
        this.grid = [];

        for (let i = 0; i < size; i += 1) {
            this.grid[i] = new Uint32Array(size);
        }

        this.size = size;
    }

    increment(coord, maxInc) {
        this.grid[coord[0]][coord[1]] = AntMath.cicle(1, Math.max(1, this.grid[coord[0]][coord[1]]) + 1, maxInc);

        return this.grid[coord[0]][coord[1]] - 1;
    }

    value(coord) {
        return this.grid[coord[0]][coord[1]] - 1;
    }
}

module.exports = LangtonWorld;

