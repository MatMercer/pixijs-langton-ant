(function($, window, document) {
    const UP = vec2.fromValues(0.0, -1.0);
    const DOWN = vec2.fromValues(0.0, 1.0);
    const RIGHT = vec2.fromValues(1.0, 0.0);
    const LEFT = vec2.fromValues(-1.0, 0.0);

    const colors = [
        "#44a5ae",
        "#d87e1d",
        "#bb394f",
        "#cf1ad3",
        "#9f438d",
        "#56a2a2",
        "#4c2879",
        "#69decc",
        "#d4857f",
        "#b7b00c",
        "#967f18",
        "#40d1b1"
    ];

    const canvasParentSelector = "#app";
    const canvasSize = [1000, 1000];
    const canvasRatio = canvasSize[0] / canvasSize[1];

    let app;

    function Ant(ctx) {
        // Sprite setup
        const antTex = PIXI.utils.TextureCache['ant'];
        const ant = new PIXI.Sprite(antTex);
        ant.anchor.set(0.5);

        // Step is how much the ant walks each time
        ant.step = vec2.fromValues(antTex.width, antTex.height);

        // Relative coord
        ant.coord = vec2.create();

        // Rotate magic table
        const rotTable = [UP, RIGHT, DOWN, LEFT];

        ant.walk = function(dir, delta) {
            // Increases the coordinate by direction
            vec2.add(this.coord, this.coord, dir);

            // Stores the last Dir
            this.lastDir = dir;

            // Pixi srpite position
            let pos = vec2.fromValues(this.x, this.y);
            let deltaStep = this.step;

            deltaStep.x *= delta;
            deltaStep.y *= delta;
            vec2.add(pos, vec2.multiply([], deltaStep, dir), pos);

            this.x = pos[0];
            this.y = pos[1];

            // Rotate based on the movement
            this._rotate_dir(dir, delta);
        };

        ant.move = function(rightOrLeft, delta) {
            let rotIdx = rotTable.indexOf(this.lastDir);

            if (rightOrLeft) {
                rotIdx += 1;
            } else {
                rotIdx -= 1;
            }

            if (rotIdx == rotTable.length) {
                rotIdx = 0;
            } else if (rotIdx < 0) {
                rotIdx = rotTable.length - 1;
            }

            this.walk(rotTable[rotIdx], delta);
        }

        ant._rotate_dir = function(dir, delta) {
            // PI * (x + y) * ((x - (y / 2)) - 0.5)
            this.rotation = Math.PI * (dir[0] + dir[1]) * ((dir[0] - (dir[1] / 2)) - 0.5);
        }

        ant.reset = function() {
            this.lastDir = UP;
            this.coord[0] = Math.abs(ctx.gridSize / 2) - 1;
            this.coord[1] = Math.abs(ctx.gridSize / 2) - 1;

            this.x = app.screen.width / 2;
            this.y = app.screen.height / 2;

            // Fix x axis centering
            this.x += this.step[0] / 2;
        }

        // Initial values
        ant.reset();
        return ant;
    }

    function LangtonAnt(worldSprite, g, canvas) {
        const self = this;

        self.grid = [];
        self.gridSize = 1000;

        self.now = Date.now();
        self.lastAntStep = self.now;
        self.antDelay = 1000;
        self.antStep = 1000;
        self.totalSteps = 0;
        self.maxSteps = NaN;
        self.worldSprite = worldSprite;
        self.zoom = 1.0;

        self.ant = new Ant(this);

        //self.prog = [1, 0, 1, 1, 0, 1, 0];
        //self.prog = [1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0];
        //self.prog = [1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1];
        //self.prog = [1, 1, 1, 0, 1];
        self.prog = [1, 1, 1, 0, 1, 0, 0, 1, 0, 1];
        //self.prog = [1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 1, 1];
        //self.prog = [1, 0];

        // generate the world grid
        createGrid();

        function createGrid() {
            for (var i = 0; i < self.gridSize; i += 1) {
                self.grid[i] = new Int8Array(self.gridSize);
            }
        }

        function drawRect(color) {
            g.fillStyle = color;
            g.fillRect(self.ant.coord[0], self.ant.coord[1], 1, 1);
        }

        function antBrain(delta) {
            self.grid[self.ant.coord[0]][self.ant.coord[1]] += 1;
            if (self.grid[self.ant.coord[0]][self.ant.coord[1]] == self.prog.length) {
                self.grid[self.ant.coord[0]][self.ant.coord[1]] = 0;
            }

            let curVal = self.grid[self.ant.coord[0]][self.ant.coord[1]];
            drawRect(colors[curVal]);
            self.ant.move(self.prog[curVal], delta);
        }

        self.tick = function(delta) {
            self.now = Date.now();

            if (self.lastAntStep + self.antDelay < self.now && self.totalSteps != self.maxSteps) {
                let i = self.antStep;

                while (i--) {
                    self.lastAntStep = self.now;

                    antBrain(delta);

                    self.totalSteps += 1;
                    if (self.totalSteps == self.maxSteps) {
                        break;
                    }
                }

                worldSprite.texture.update();
            }

            self.applyZoom();
        }

        self.reset = function() {
            // Clear canvas
            g.clearRect(0, 0, canvas.width, canvas.height);
            worldSprite.texture.update();
            // Clear grid
            createGrid();

            // Reset the ant
            self.ant.reset();
        }

        self.applyZoom = function() {
            self.worldSprite.scale.x = self.zoom;
            self.worldSprite.scale.y = self.zoom;
        }

        // Initial values
        self.reset();
    }

    function resize() {
        if (window.innerWidth / window.innerHeight >= canvasRatio) {
            var w = window.innerHeight * canvasRatio;
            var h = window.innerHeight;
        } else {
            var w = window.innerWidth;
            var h = window.innerWidth / canvasRatio;
        }
        app.renderer.view.style.width = w + 'px';
        app.renderer.view.style.height = h + 'px';
    }

    function startPixi() {
        app = new PIXI.Application(canvasSize[0], canvasSize[1], {
            backgroundColor: 0xFFFFFF
        });

        const $canvasParent = $(canvasParentSelector);

        const worldCanvas = $('<canvas>')[0];
        worldCanvas.width = app.screen.width;
        worldCanvas.height = app.screen.height;

        const canvasSprite = new PIXI.Sprite(PIXI.Texture.fromCanvas(worldCanvas));
        canvasSprite.anchor.x = 0.5;
        canvasSprite.anchor.y = 0.5;
        canvasSprite.position.x = canvasSize[0] / 2;
        canvasSprite.position.y = canvasSize[1] / 2;

        canvasSprite.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

        let ctx = worldCanvas.getContext("2d");

        $canvasParent.empty();
        $canvasParent.append(app.view);

        const langton = new LangtonAnt(canvasSprite, ctx, worldCanvas);
        window.langton = langton;

        app.stage.addChild(canvasSprite);
        app.stage.addChild(langton.ant);

        app.ticker.add(langton.tick);

        const $controls = $("#controls");
        $controls.removeClass('d-none');
        new ControlController(langton, $controls, app.view);
    }

    function loadAssets() {
        const loader = new PIXI.loaders.Loader();
        loader.add('ant', 'assets/ant.svg');
        loader.once('complete', startPixi);

        loader.load();
    }

    $(function() {
        window.setTimeout(loadAssets, 1000);
    });
}(window.jQuery, window, document));

// TODO: use vueJS for 2 way data binding
function ControlController(langton, $controls, canvas) {
    const $canvas = $(canvas);

    const $resetBtn = $controls.find('.reset');

    const $iDelay = $controls.find('#delayRange');

    const zoomSpeed = 0.05;
    const zoomMin = 0.02;

    $iDelay.val(langton.antDelay);
    
    function onCanvasWheel(e) {
        let scrollAmm = -e.originalEvent.deltaY;
        e.preventDefault();

        if (scrollAmm < 0) {
            scrollAmm = -1;
        }
        else {
            scrollAmm = 1;
        }

        langton.zoom += scrollAmm * zoomSpeed;

        langton.zoom = Math.max(langton.zoom, zoomMin);
    }

    function onReset() {
        langton.reset();
    }

    function onDelayChange(e) {
        let newDelay = e.target.value;
        langton.antDelay = parseInt(newDelay);
    }

    $canvas.on('wheel', onCanvasWheel);
    $resetBtn.on('click', onReset);
    $iDelay.on('input', onDelayChange);
}
