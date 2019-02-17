class AntMath {
    static cicle(min, x, max) {
        return x < min ? max : x > max ? min : x;
    }
}

module.exports = AntMath;
