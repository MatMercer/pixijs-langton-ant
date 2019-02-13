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

class LangtonAnt {
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

const ant = new LangtonAnt({
    worldSize: 1000,
    program: [0, 0, 0, 1, 0]
});

for (i = 0; i < 170000; i += 1) {
    ant.next();
}

const count = new Uint32Array(ant.program.length + 1);
for (i = 0; i < 1000; i += 1) {
    for (j = 0; j < 1000; j += 1) {
        count[ant.world.grid[i][j]] += 1;
    }
}

console.log("Final results");
console.log(count);
