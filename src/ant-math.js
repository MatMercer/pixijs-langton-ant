class AntMath {
    static cycle(min, x, max) {
        return x < min ? max : x > max ? min : x;
    }

    static generateGrid(array, size) {
        for (let i = 0; i < size; i += 1) {
            array[i] = new Uint32Array(size);
        }

        return array;
    }
}

module.exports = AntMath;
