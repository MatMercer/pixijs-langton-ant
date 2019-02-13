class LangtonWorld {
    constructor(size) {
        this.grid = [];

        for (var i = 0; i < size; i += 1) {
            this.grid[i] = new Int8Array(size);
        }

        this.size = size;
    }

    increment(coord) {
        this.grid[coord[0]][coord[1]] += 1;
    }

    resetCoord(coord) {
        this.grid[coord[0]][coord[1]] = 0;
    }

    value(coord) {
        return this.grid[coord[0]][coord[1]];
    }
}

class LangtonAnt {
    constructor(options) {
        // Allocate world
        this.world = new LangtonWorld(options.worldSize);

        this.program = options.program;

        this.coord = new Uint8Array(2);
        this.ground = 0;

        this.rotArr = [
            [0, 1], // UP
            [1, 0], // RIGHT
            [0, -1], // DOWN
            [-1, 0], // LEFT
        ];

        this.coord[0] = Math.abs(this.world.size / 2) - 1;
        this.coord[1] = Math.abs(this.world.size / 2) - 1;
    }

    next() {
        this.world.increment(this.coord);
        this.ground = this.world.value(this.coord);

        if (this.ground === this.program.length) {
            this.world.resetCoord(this.coord);
        }

        this.move(this.program[this.world.value(this.coord)]);
    }

    move(command) {
        console.log(this.coord);
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
        console.log(dir);
        this.coord[0] += dir[0];
        this.coord[1] += dir[1];
    }
}

const ant = new LangtonAnt({
    worldSize: 10,
    program: [1, 0]
});

for (i = 1; i < 20; i += 1) {
    ant.next();
}

console.table(ant.world.grid);
