const AntMath = require('./ant-math');

class LangtonWorld {
    constructor(size) {
        this.size = size;
        this.grid = AntMath.generateGrid([], size);
        this.hitMap = new WorldHitmap(this);
    }

    increment(coord, maxInc) {
        this.hitMap.hit(coord);
        return this._incrementPos(coord, maxInc) - 1;
    }

    decrement(coord, maxInc) {
        this.hitMap.dehit(coord);
        return this._decrementPos(coord, maxInc) - 1;
    }

    value(coord) {
        return this.grid[coord[0]][coord[1]] - 1;
    }

    _incrementPos(coord, maxInc) {
        return this.grid[coord[0]][coord[1]] =
            AntMath.cycle(1, Math.max(1, this.grid[coord[0]][coord[1]]) + 1, maxInc);
    }

    _decrementPos(coord, maxInc) {
        if (this.hitMap.isHited(coord))
            return this.grid[coord[0]][coord[1]] =
                AntMath.cycle(1, Math.max(1, this.grid[coord[0]][coord[1]]) - 1, maxInc);

        return this.grid[coord[0]][coord[1]] = 0;
    }
}

// TODO: Use observer pattern here
class WorldHitmap {
    constructor(world) {
        this.world = world;
        this.hitMap = AntMath.generateGrid([], world.size);
    }

    hit(coord) {
        this.hitMap[coord[0]][coord[1]] += 1;
    }

    dehit(coord) {
        Math.max(0, this.hitMap[coord[0]][coord[1]] -= 1);
    }

    isHited(coord) {
        return this.getHits(coord) !== 0;
    }

    getHits(coord) {
        return this.hitMap[coord[0]][coord[1]];
    }
}

module.exports = LangtonWorld;
