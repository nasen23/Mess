const global = require('./global')
const levels = require('./levels/level')

const PLAYER = 9
const PLAYER_BABY = 10
const PLAYER_OLD = 11
const SHE = 8
const BOX_1 = 2
const BOX_2_H = 3
const BOX_2_V = 4
const BOX_4 = 5
const BOX_3_H = 6
const BOX_3_V = 7

var WIDTH = 0
var HEIGHT = 0

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        borderWidth: 0,

        fillColor: new cc.Color(),
        boxColor: new cc.Color(),

        boxPadding: 0,
        boxPrefab: {
            default: null,
            type: cc.Prefab
        },

        textureMe: {
            default: null,
            type: cc.Texture2D
        },
        textureOld: {
            default: null,
            type: cc.Texture2D
        },
        textureBaby: {
            default: null,
            type: cc.Texture2D
        },
        textureShe: {
            default: null,
            type: cc.Texture2D
        },

        duration: 0,
        droppingSpeed: 0
    },

    drawBorderAndFill () {
        const halfWidth = this.borderWidth / 2

        const graphics = this.getComponent(cc.Graphics)
        graphics.lineWidth = this.borderWidth

        graphics.moveTo(halfWidth, halfWidth)
        graphics.lineTo(this.node.width - halfWidth, halfWidth)
        // draw out right exit
        if (this.exitDirection === 'right') {
            graphics.lineTo(this.node.width - halfWidth, this.exitPosition.y + this.boxPadding - this.boxSizeWithPadding * this.meSize)
            graphics.moveTo(this.node.width - halfWidth, this.exitPosition.y + this.boxPadding)
        }
        graphics.lineTo(this.node.width - halfWidth, this.node.height - halfWidth)
        graphics.lineTo(halfWidth, this.node.height - halfWidth)
        // draw out left exit
        if (this.exitDirection === 'left') {
            graphics.lineTo(halfWidth, this.exitPosition.y + this.boxPadding)
            graphics.moveTo(halfWidth, this.exitPosition.y + this.boxPadding - this.boxSizeWithPadding * this.meSize)
        }
        graphics.lineTo(halfWidth, 0)
        graphics.stroke()
    },

    // calculating width and other basic datas
    init (levelData) {
        // width and height measured by box count
        this.width = levelData.width
        this.height = levelData.height

        // width and height by px, border excluded
        this.innerHeight = this.node.height - 2 * this.borderWidth
        this.boxSizeWithPadding = this.innerHeight / this.height
        this.boxSize = this.boxSizeWithPadding - 2 * this.boxPadding
        // calculating node width
        this.node.width = this.width * this.boxSizeWithPadding + 2 * this.borderWidth

        // the position of the first cell in panel
        this.initx = this.borderWidth + this.boxPadding
        this.inity = this.initx + this.boxSize

        // the position of the final cell in panel
        // this.endx = this.node.width - this.inity
        // this.endy = this.node.height - this.initx

        this.audio = levelData.audio
        this.words = levelData.words
        this.exit = levelData.exit
        this.exitDirection = levelData.exitDirection
        this.map = levelData.map

        this.meSize = levelData.meSize
        // calculating exit position (coordinate of top left cornor of player)
        if (this.exitDirection === 'right') {
            this.exitPosition = cc.v2(
                this.node.width - this.borderWidth - this.meSize * this.boxSizeWithPadding + this.boxPadding,
                this.node.height - (this.borderWidth + this.boxSizeWithPadding * this.exit.y + this.boxPadding)
            )
        } else if (this.exitDirection === 'left') {
            this.exitPosition = cc.v2(
                this.borderWidth + this.boxPadding,
                this.node.height - (this.borderWidth + this.boxSizeWithPadding * this.exit.y + this.boxPadding)
            )
        } else {
            cc.error('unknown exit direction')
        }

        cc.log(this.exitPosition)
        WIDTH = this.node.width
        HEIGHT = this.node.height
    },

    addBoxes () {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                const state = this.map[row * this.width + col]
                switch (state) {
                case PLAYER:
                case PLAYER_BABY:
                case PLAYER_OLD:
                case SHE:
                case BOX_1:
                case BOX_2_H:
                case BOX_2_V:
                case BOX_4:
                case BOX_3_H:
                case BOX_3_V:
                    // (x, y) of box in panel (left top cornor of the actual box)
                    const x = this.borderWidth + col * this.boxSizeWithPadding + this.boxPadding
                    let y = this.borderWidth + row * this.boxSizeWithPadding + this.boxPadding
                    y = this.node.height - y

                    const node = cc.instantiate(this.boxPrefab)
                    node.setPosition(x, y)

                    node.state = state
                    node.width = node.height = this.boxSize
                    node.color = this.boxColor
                    const sprite = node.getComponent(cc.Sprite)

                    // if item can go to
                    node.left = false
                    node.right = false
                    node.up = false
                    node.down = false

                    node.holding = false // holding or not
                    node.droping = false // droping or not

                    switch (state) {
                    case BOX_1: break
                    case BOX_2_H:
                        node.width = 2 * this.boxSize + 2 * this.boxPadding
                        break
                    case BOX_2_V:
                        node.height = 2 * this.boxSize + 2 * this.boxPadding
                        break
                    case BOX_4:
                        node.height = 2 * this.boxSize + 2 * this.boxPadding
                        node.width = 2 * this.boxSize + 2 * this.boxPadding
                        break
                    case BOX_3_H:
                        node.width = 3 * this.boxSize + 4 * this.boxPadding
                        break
                    case BOX_3_V:
                        node.height = 3 * this.boxSize + 4 * this.boxPadding
                        break
                    case PLAYER:
                        node.height = this.meSize * this.boxSize + 2 * this.boxPadding
                        node.width = this.meSize * this.boxSize + 2 * this.boxPadding
                        const newFrameMe = sprite.spriteFrame.clone()
                        newFrameMe.setTexture(this.textureMe)
                        sprite.spriteFrame = newFrameMe
                        this.meNode = node
                        break
                    case PLAYER_OLD:
                        node.height = this.meSize * this.boxSize + 2 * this.boxPadding
                        node.width = this.meSize * this.boxSize + 2 * this.boxPadding
                        const newFrameOld = sprite.spriteFrame.clone()
                        newFrameOld.setTexture(this.textureOld)
                        sprite.spriteFrame = newFrameOld
                        this.meNode = node
                        break
                    case PLAYER_BABY:
                        const newFrameBaby = sprite.spriteFrame.clone()
                        newFrameBaby.setTexture(this.textureBaby)
                        sprite.spriteFrame = newFrameBaby
                        this.meNode = node
                        break
                    case SHE:
                        node.height = 2 * this.boxSize + 2 * this.boxPadding
                        node.width = 2 * this.boxSize + 2 * this.boxPadding
                        const newFrameShe = sprite.spriteFrame.clone()
                        newFrameShe.setTexture(this.textureShe)
                        sprite.spriteFrame = newFrameShe
                        break
                    default: break
                    }
                    this.node.addChild(node)

                    break
                default: break
                }
            }
        }
    },

    /* updateChildrenState (child) {
        // judge if it can go to
        child.left = child.right = child.up = child.down = true

        // between other bricks
        for (const item of this.node.children) {
            if (child !== item) {
                // update states
                if (child.x + child.width + this.boxPadding * 2 >= item.x - this.boxPadding / 2 &&
                    child.x + child.width + this.boxPadding * 2 <= item.x + this.boxPadding / 2 &&
                    child.y >= item.y - item.height && child.y <= item.y + child.height) {
                    // brick right
                    child.right = false
                }
                if (child.x - this.boxPadding * 2 - item.width <= item.x + this.boxPadding / 2 &&
                    child.x - this.boxPadding * 2 - item.width >= item.x - this.boxPadding / 2 &&
                    child.y >= item.y - item.height && child.y <= item.y + child.height) {
                    // brick left
                    child.left = false
                }
                if (child.y - this.boxPadding * 2 - child.height <= item.y + this.boxPadding / 2 &&
                    child.y - this.boxPadding * 2 - child.height >= item.y - this.boxPadding / 2 &&
                    child.x >= item.x - child.width && child.x <= item.x + item.width) {
                    // brick down
                    child.down = false
                }
                if (child.y + this.boxPadding * 2 + item.height >= item.y - this.boxPadding / 2 &&
                    child.y + this.boxPadding * 2 + item.height <= item.y + this.boxPadding / 2 &&
                    child.x >= item.x - child.width && child.x <= item.x + item.width) {
                    // brick up
                    child.up = false
                }

                // when in other bricks
                if (child.x + child.width + this.boxPadding * 2 >= item.x &&
                    child.x + child.width + this.boxPadding * 2 <= item.x + this.boxSize / 2 &&
                    child.y >= item.y - item.height && child.y <= item.y + child.height) {
                    child.x = item.x - child.width - this.boxPadding * 2
                    child.right = false
                }
                if (child.x - this.boxPadding * 2 >= item.x + item.width - this.boxSize / 2 &&
                    child.x - this.boxPadding * 2 <= item.x + item.width &&
                    child.y >= item.y - item.height && child.y <= item.y + child.height) {
                    child.x = item.x + item.width + this.boxPadding * 2
                    child.left = false
                }
                if (child.y - this.boxPadding * 2 - child.height <= item.y &&
                    child.y - this.boxPadding * 2 - child.height >= item.y - this.boxSize / 2 &&
                    child.x >= item.x - child.width && child.x <= item.x + item.width) {
                    child.y = item.y + this.boxPadding * 2 + child.height
                    child.down = false
                }
                if (child.y + this.boxPadding * 2 >= item.y - item.height &&
                    child.y + this.boxPadding * 2 <= item.y - item.height + this.boxSize / 2 &&
                    child.x >= item.x - child.width && child.x <= item.x + item.width) {
                    child.y = item.y - item.height - this.boxPadding * 2
                    child.up = false
                }
            }
        }
        // between panel
        if (child.x - this.boxPadding - this.borderWidth <= 0) {
            // wall left
            child.left = false
        }
        if (child.x + this.boxPadding + child.width + this.borderWidth >= this.node.width) {
            // wall right
            child.right = false
        }
        if (child.y - this.boxPadding - child.height - this.borderWidth <= 0) {
            // wall down
            child.down = false
        }
        if (child.y + this.boxPadding + this.borderWidth >= this.node.height) {
            // wall up
            child.up = false
        }

        // when out of panel
        if (child.x - this.boxPadding - this.borderWidth < 0) {
            child.x = this.borderWidth + this.boxPadding
            child.left = false
        } else if (child.x + child.width + this.boxPadding + this.borderWidth > this.node.width) {
            child.x = this.node.width - this.borderWidth - this.boxPadding - child.width
            child.right = false
        }

        if (child.y - this.boxPadding - this.borderWidth - child.height < 0) {
            child.y = this.borderWidth + this.boxPadding + child.height
            child.down = false
        } else if (child.y + this.boxPadding + this.borderWidth > this.node.height) {
            child.y = this.node.height - this.borderWidth - this.boxPadding
            child.up = false
        }
    },

    updateChildrenStillPosition (child) {
        child.x = this.initx +
                  Math.floor((Math.floor((child.x - this.initx) / (this.boxSizeWithPadding / 2)) + 1) / 2) * this.boxSizeWithPadding
        child.y = this.inity +
                  Math.floor((Math.floor((child.y - this.inity) / (this.boxSizeWithPadding / 2)) + 1) / 2) * this.boxSizeWithPadding
    },

    updateChildrenMovingPosition (child) {
        var dirx = child.x - this.initx
        var diry = child.y - this.inity
        var rx = dirx % this.boxSizeWithPadding
        var ry = diry % this.boxSizeWithPadding
        if ((rx > this.boxSizeWithPadding / 3 || rx < this.boxSizeWithPadding * 2 / 3) ||
            ry > this.boxSizeWithPadding / 3 || ry < this.boxSizeWithPadding * 2 / 3) {
            if (rx <= 20 || rx >= this.boxSizeWithPadding - 20) {
                child.x = this.initx + Math.round(dirx / this.boxSizeWithPadding) * this.boxSizeWithPadding
            }
            if (ry <= 20 || ry >= this.boxSizeWithPadding - 20) {
                child.y = this.inity + Math.round(diry / this.boxSizeWithPadding) * this.boxSizeWithPadding
            }
        }
    },
    */

    handleTouch () {
        switch (this.touchTarget) {
        case undefined:
        case null:
        {
            const newTouchPoint = this.touchPos
            const pos = this.node.convertToNodeSpace(newTouchPoint)
            for (const child of this.node.children) {
                if (child.markType === SHE) continue
                if (this.positionInNode(child, pos)) {
                    this.touchTarget = child
                    this.latestTouchPoint = newTouchPoint
                    this.ignoreGrids = true
                    this.removeMarkOnMap(child)
                    break
                }
            }
            break
        }
        default:
            this.moveNode()

            break
        }
    },

    cancelTouch () {
        if (this.touchTarget) {
            const node = this.touchTarget
            this.touchTarget = null
            const grid = this.nearestGrid(node.position.x, node.position.y)
            node.logicPos.x = this.colToX(grid.x)
            node.logicPos.y = this.rowToY(grid.y)
            node.position = node.logicPos
            node.row = grid.y
            node.col = grid.x
            this.markOnMap(node)
            this.checkGravityMoves()
        }
    },

    moveNode () {
        const newTouchPoint = this.touchPos
        const delta = newTouchPoint.sub(this.latestTouchPoint)
        this.latestTouchPoint = newTouchPoint

        // try to find legal place to move
        const oldPos = this.touchTarget.logicPos
        const legalPos = this.normalizedPos(this.touchTarget, delta, oldPos)
        if (legalPos.x < 0) {
            cc.log(legalPos)
        }
        const gridState = this.matchGrid(legalPos, this.attract_dist)
        this.touchTarget.x = gridState[0]
        this.touchTarget.y = gridState[1]
        this.touchTarget.logicPos = legalPos

        // check for gravity moves
        if (gridState[2]) {
            if (!this.ignoreGrids) {
                const grid = this.nearestGrid(legalPos.x, legalPos.y)
                this.touchTarget.col = grid.x
                this.touchTarget.row = grid.y
                this.markOnMap(this.touchTarget)
                this.checkGravityMoves()
                this.removeMarkOnMap(this.touchTarget)
            }
            this.ignoreGrids = true
        } else {
            this.ignoreGrids = false
        }
    },

    checkGravityMoves () {
        let loop = true
        while (loop) {
            loop = false
            for (const node of this.node.children) {
                if (node.markType === SHE || node === this.touchTarget) continue
                let hasSpace = false

                let r = node.row + node.size.y
                if (r < this.height) {
                    hasSpace = true
                    for (let c = node.col; c < node.col + node.size.x; c++) {
                        if (this.map[r * this.width + c] > 0) {
                            hasSpace = false
                            break
                        }
                    }
                }

                if (hasSpace) {
                    this.removeMarkOnMap(node)
                    r = node.row
                    node.row = r + 1
                    node.rowDrop += 1
                    const y = this.rowToY(node.row)
                    node.logicPos.y = y
                    node.logicPos.x = node.x
                    node.needGravityAnimation = true
                    this.markOnMap(node)
                    loop = true
                }
            }
        }

        // for (const node of this.node.children) {
        //     if (node.needGravityAnimation) {
        //         cc.log(node.markType, node.rowDrop)
        //         node.runAction(cc.moveTo(0.1 * node.rowDrop, node.logicPos))
        //         node.needGravityAnimation = false
        //         node.rowDrop = 0
        //     }
        // }

    // this.generateAnimation(node)
    },

    checkGameEnd () {
        if (this.meNode.x === this.exitPosition.x && this.meNode.y === this.exitPosition.y) {
            this.checkComplete = true
            global.level++
            var move = cc.moveBy(
                this.duration,
                cc.v2(this.boxSize * this.meSize + 2 * this.boxPadding + 20, 0)
            ).easing(cc.easeCubicActionInOut())
            var fade = cc.fadeOut(this.duration)
            this.meNode.runAction(move)
            this.node.runAction(fade)

            // wait for animations to complete
            cc.director.loadScene('game')
        }
    },

    reload () {
        this.init(levels.loadLevelData(global.level))
        this.drawBorderAndFill()
        this.addBoxes()

        cc.log(this.exitPosition, this.meNode.position)

        for (const child of this.node.children) {
            // add event of touch_move
            child.on(cc.Node.EventType.TOUCH_MOVE, function (event) {
                child.holding = true
                var delta = event.touch.getDelta()
                if (child.state === SHE) {
                    // SHE donn't move
                } else if (child.state === PLAYER_OLD) {
                    // OLD only moves to left and right
                    if ((delta.x > 0 && child.right) || (delta.x < 0 && child.left)) {
                        if (child.x + delta.x - this.boxPadding - this.borderWidth <= 0) {
                            child.x = this.initx
                            child.left = false
                        } else if (child.x + delta.x + child.width + this.boxPadding + this.borderWidth >= WIDTH) {
                            child.x = this.endx - this.boxSize + child.width
                            child.right = false
                        } else {
                            child.x += delta.x
                        }
                    }
                } else {
                    if ((delta.x > 0 && child.right) || (delta.x < 0 && child.left)) {
                        if (child.x + delta.x - this.boxPadding - this.borderWidth <= 0) {
                            child.x = this.initx
                            child.left = false
                        } else if (child.x + delta.x + child.width + this.boxPadding + this.borderWidth >= WIDTH) {
                            child.x = this.endx - this.boxSize + child.width
                            child.right = false
                        } else {
                            child.x += delta.x
                        }
                    }
                    if ((delta.y > 0 && child.up) || (delta.y < 0 && child.down)) {
                        if (child.y + delta.y - this.boxPadding - this.borderWidth <= 0) {
                            child.y = this.inity - this.boxSize + child.height
                            child.down = false
                        } else if (child.y + delta.y + this.boxPadding + this.borderWidth >= HEIGHT) {
                            child.y = this.endy
                            child.up = false
                        } else {
                            child.y += delta.y
                        }
                    }
                }
            }, this.node)

            // add event of touch_cancel
            child.on(cc.Node.EventType.TOUCH_CANCEL, function (event) {
                child.holding = false
            }, this.node)

            // add event of touch_end
            child.on(cc.Node.EventType.TOUCH_END, function (event) {
                child.holding = false
            }, this.node)
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.reload()
    },

    start () {
    },

    update (dt) {
        for (const child of this.node.children) {
            this.updateChildrenState(child)

            if (child.holding) {
                // this.updateChildrenMovingPosition(child)
            } else if (child.down) {
                child.y -= this.droppingSpeed
            } else {
                this.updateChildrenStillPosition(child)
            }
        }
        if (!this.checkComplete) this.checkGameEnd()
    }
})
