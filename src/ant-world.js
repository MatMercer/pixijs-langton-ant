class LangtonWorld {
    constructor(size) {
        this.grid = [];

        for (var i = 0; i < size; i += 1) {
            this.grid[i] = new Uint32Array(size);
        }

        this.size = size;
    }

    touchCoord(coord) {
        if (this.grid[coord[0]][coord[1]] === 0) {
            this.resetCoord(coord);
        }
    }

    increment(coord) {
        this.touchCoord(coord);
        this.grid[coord[0]][coord[1]] += 1;
    }

    resetCoord(coord) {
        this.grid[coord[0]][coord[1]] = 1;
    }

    value(coord) {
        return this.grid[coord[0]][coord[1]] - 1;
    }
}

module.exports = LangtonWorld;

