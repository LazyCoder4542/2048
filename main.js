var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function sleep(ms) {
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
}
function debounce(func, timeout) {
    var _this = this;
    if (timeout === void 0) { timeout = 300; }
    var timer;
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        clearTimeout(timer);
        timer = setTimeout(function () { func.apply(_this, args); }, timeout);
    };
}
function getRandomItem(list) {
    return list[Math.floor(Math.random() * list.length)];
}
var directions = {
    "up": [-1, 0],
    "down": [1, 0],
    "left": [0, -1],
    "right": [0, 1]
};
var colors = {
    "2": {
        "bg": "#eee4da",
        "color": "#776e65",
    },
    "4": {
        "bg": "#ede0c8",
        "color": "#776e65",
    },
    "8": {
        "bg": "#f2b179",
        "color": "#f9f6f2",
    },
    "16": {
        "bg": "#f59563",
        "color": "#f9f6f2",
    },
    "32": {
        "bg": "#f67c5f",
        "color": "#f9f6f2",
    },
    "64": {
        "bg": "#f65e3b",
        "color": "#f9f6f2",
    },
    "128": {
        "bg": "#edcf72",
        "color": "#f9f6f2",
    },
    "256": {
        "bg": "#edcc61",
        "color": "#f9f6f2",
    },
    "512": {
        "bg": "#edc850",
        "color": "#f9f6f2",
    },
    "1024": {
        "bg": "#edc53f",
        "color": "#f9f6f2",
    },
    "2048": {
        "bg": "#edc22e",
        "color": "#f9f6f2",
    },
};
var Game = /** @class */ (function () {
    function Game(settings) {
        var _this = this;
        this.running = true;
        this.newTiles = [];
        this.moving = false;
        this.elem = settings.container;
        this.settings = settings;
        this.emptyCells = Math.pow(this.settings.size, 2);
        this.board = Array.from({ length: this.settings.size }, function (_, id) {
            return Array.from({ length: _this.settings.size }, function (_, id) { return null; });
        });
        this.init();
    }
    Game.prototype.getRandomEmptyCell = function () {
        var count = 0;
        var index = Math.floor(Math.random() * this.emptyCells);
        var res = null;
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[i].length; j++) {
                var d = this.board[i][j];
                if (d == null) {
                    if (count === index) {
                        res = [i, j];
                    }
                    count++;
                }
                else {
                    d.combined = false;
                }
            }
        }
        if (res === null) {
            return [0, 0];
        }
        this.newTiles.push(res);
        return res;
    };
    Game.prototype.swipe = function (dir) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var movement, _b, a, b, isMoveMade, i, j, _c, x, y, _d, mX, mY, _e, p, q, nTile, bool;
            var _f, _g, _h;
            var _this = this;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        this.newTiles = [];
                        movement = Array.from({ length: this.settings.size }, function (_, id) {
                            return Array.from({ length: _this.settings.size }, function (_, id2) { return null; });
                        });
                        _b = directions[dir], a = _b[0], b = _b[1];
                        isMoveMade = false;
                        for (i = 0; i < this.board.length; i++) {
                            for (j = 1; j < this.board[i].length; j++) { // j start from 1 to ignore lines farthest in direction of movement and limit out of index error
                                _c = directions[dir].reduce(function (a, b) { return a + b; }) == -1 ? [i, j] : [i, (this.settings.size - 1) - j], x = _c[0], y = _c[1];
                                if (directions[dir][1] === 0)
                                    _f = [y, x], x = _f[0], y = _f[1];
                                if (this.board[x][y]) {
                                    _d = [x, y], mX = _d[0], mY = _d[1];
                                    while (true) {
                                        _e = [x + a, y + b], p = _e[0], q = _e[1];
                                        if ([p, q].some(function (x) { return (x < 0 || x >= _this.settings.size); }))
                                            break;
                                        nTile = this.board[p][q];
                                        if (nTile) {
                                            if (nTile.value === ((_a = this.board[x][y]) === null || _a === void 0 ? void 0 : _a.value)) {
                                                if (nTile.combined) {
                                                    nTile.combined = false;
                                                }
                                                else {
                                                    nTile.value *= 2;
                                                    nTile.combined = true;
                                                    this.board[x][y] = null;
                                                    this.emptyCells++;
                                                    isMoveMade = true;
                                                    this.newTiles.push([p, q]);
                                                    _g = [p, q], x = _g[0], y = _g[1];
                                                }
                                            }
                                            break;
                                        }
                                        this.board[p][q] = this.board[x][y];
                                        this.board[x][y] = null;
                                        _h = [p, q], x = _h[0], y = _h[1];
                                        isMoveMade = true;
                                    }
                                    if (x !== mX || y !== mY) {
                                        movement[mX][mY] = [(x - mX), (y - mY)];
                                    }
                                }
                            }
                        }
                        if (!isMoveMade) return [3 /*break*/, 2];
                        this.animateMove(movement, 200);
                        this.moving = true;
                        return [4 /*yield*/, sleep(200)];
                    case 1:
                        _j.sent();
                        this.moving = false;
                        this.InsertNewTile();
                        if (this.emptyCells == 0) {
                            bool = this.checkGameOver();
                            if (bool) {
                                setTimeout(function () { return alert("Game Over"); }, 0);
                            }
                        }
                        this.drawBoard();
                        _j.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    Game.prototype.checkGameOver = function () {
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[i].length; j++) {
                var d = Object.values(directions);
                for (var a = 0; a < d.length; a++) {
                    var dir = d[a];
                    var curr = this.board[i][j];
                    if (curr && i + dir[0] >= 0 && i + dir[0] < this.settings.size && j + dir[1] >= 0 && j + dir[1] < this.settings.size) {
                        var nhb = this.board[i + dir[0]][j + dir[1]];
                        if (nhb && curr.value == nhb.value)
                            return false;
                    }
                }
            }
        }
        return true;
    };
    Game.prototype.animateMove = function (arr, ms) {
        var _this = this;
        arr.flatMap(function (val) { return val; }).forEach(function (val, idx) {
            if (val) {
                var tile = _this.elem.children[idx];
                tile.style.transform = "translate(calc((12px + 100%) * ".concat(val[1], "), calc((12px + 100%) * ").concat(val[0], "))");
                tile.style.transitionTimingFunction = "linear";
                tile.style.transitionDuration = ms + "ms";
            }
        });
    };
    Game.prototype.InsertNewTile = function () {
        var _a = this.getRandomEmptyCell(), row = _a[0], col = _a[1]; // also reset combined status
        this.board[row][col] = new Tile(getRandomItem([2, 2, 2, 4]));
        this.emptyCells--;
    };
    Game.prototype.init = function () {
        //this.styleContainer()
        this.InsertNewTile();
        this.InsertNewTile();
        this.drawBoardConsole();
        //this.startConsole()
    };
    Game.prototype.styleContainer = function () {
        this.elem.style.width = (50 * this.settings.size) + "px";
        this.elem.style.height = (50 * this.settings.size) + "px";
        this.elem.style.position = "relative";
        this.elem.style.backgroundColor = "red";
    };
    Game.prototype.drawBoardConsole = function () {
        var _a;
        for (var i = 0; i < this.board.length; i++) {
            var line = "";
            for (var j = 0; j < this.board[i].length; j++) {
                line += (this.board[i][j] ? (_a = this.board[i][j]) === null || _a === void 0 ? void 0 : _a.value : "-") + "  ";
            }
            console.log(line);
        }
    };
    Game.prototype.drawBoard = function () {
        this.elem.textContent = "";
        var _loop_1 = function (i) {
            var _loop_2 = function (j) {
                var cell = this_1.board[i][j];
                div = document.createElement("div");
                // div.style.position = "absolute";
                // div.style.top = (50 * i) + "px";
                // div.style.left = (50 * j) + "px";
                div.style.width = "100px";
                div.style.height = "100px";
                if (cell) {
                    div.style.backgroundColor = colors[cell.value].bg;
                    div.style.color = colors[cell.value].color;
                    div.textContent = cell.value.toString();
                    div.style.display = "flex";
                    div.style.justifyContent = "center";
                    div.style.alignItems = "center";
                    div.style.borderRadius = "4px";
                    div.className = "tile";
                    if (this_1.newTiles.find(function (_a) {
                        var a = _a[0], b = _a[1];
                        return (i === a && j === b);
                    })) {
                        div.style.animationName = "pop";
                    }
                }
                this_1.elem.appendChild(div);
            };
            for (var j = 0; j < this_1.board[i].length; j++) {
                _loop_2(j);
            }
        };
        var this_1 = this, div;
        for (var i = 0; i < this.board.length; i++) {
            _loop_1(i);
        }
    };
    Game.prototype.startConsole = function () {
        while (true) {
            var input = prompt("Swipe (a = 'left', d = 'right', w = 'up', s = 'down')");
            switch (input) {
                case "a":
                    this.swipe("left");
                    break;
                case "s":
                    this.swipe("down");
                    break;
                case "d":
                    this.swipe("right");
                    break;
                case "w":
                    this.swipe("up");
                    break;
                default:
                    console.error("Invalid input");
                    continue;
            }
            this.drawBoardConsole();
            if (this.emptyCells == 0)
                break;
        }
    };
    return Game;
}());
var Tile = /** @class */ (function () {
    function Tile(val) {
        this.combined = false;
        this.value = val;
    }
    return Tile;
}());
var board = document.getElementById("board");
var testSettings = {
    size: 4,
    container: board
};
var newGame = new Game(testSettings);
newGame.drawBoard();
// CONTROLS
function detectswipe(func) {
    var swipe_det = { sX: 0, sY: 0, eX: 0, eY: 0 };
    var min_x = 30; //min x swipe for horizontal swipe
    var max_x = 30; //max x difference for vertical swipe
    var min_y = 50; //min y swipe for vertical swipe
    var max_y = 60; //max y difference for horizontal swipe
    var direc = "";
    var ele = board;
    ele.addEventListener('touchstart', function (e) {
        var t = e.touches[0];
        swipe_det.sX = t.screenX;
        swipe_det.sY = t.screenY;
    }, false);
    ele.addEventListener('touchmove', function (e) {
        e.preventDefault();
        var t = e.touches[0];
        swipe_det.eX = t.screenX;
        swipe_det.eY = t.screenY;
    }, false);
    ele.addEventListener('touchend', function (e) {
        //horizontal detection
        if ((((swipe_det.eX - min_x > swipe_det.sX) || (swipe_det.eX + min_x < swipe_det.sX)) && ((swipe_det.eY < swipe_det.sY + max_y) && (swipe_det.sY > swipe_det.eY - max_y) && (swipe_det.eX > 0)))) {
            if (swipe_det.eX > swipe_det.sX)
                direc = "ArrowRight";
            else
                direc = "ArrowLeft";
        }
        //vertical detection
        else if ((((swipe_det.eY - min_y > swipe_det.sY) || (swipe_det.eY + min_y < swipe_det.sY)) && ((swipe_det.eX < swipe_det.sX + max_x) && (swipe_det.sX > swipe_det.eX - max_x) && (swipe_det.eY > 0)))) {
            if (swipe_det.eY > swipe_det.sY)
                direc = "ArrowDown";
            else
                direc = "ArrowUp";
        }
        if (direc != "") {
            if (typeof func == 'function')
                func(direc);
        }
        direc = "";
        swipe_det.sX = 0;
        swipe_det.sY = 0;
        swipe_det.eX = 0;
        swipe_det.eY = 0;
    }, false);
}
function swipeF(e) {
    if (!newGame.moving) {
        switch (e) {
            case "ArrowRight":
                newGame.swipe("right");
                break;
            case "ArrowLeft":
                newGame.swipe("left");
                break;
            case "ArrowUp":
                newGame.swipe("up");
                break;
            case "ArrowDown":
                newGame.swipe("down");
                break;
        }
    }
}
window.addEventListener("keydown", function (e) {
    swipeF(e.key);
});
detectswipe(swipeF);
