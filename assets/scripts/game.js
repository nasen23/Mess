const global = require('./global')
const levels = require('./levels/level')

const PLAYER = 9
const PLAYER_BABY = 10
const PLAYER_OLD = 11
const SHE = 8
const EMPTY = 0
const OCCUPIED = 1
const BOX_1 = 2
const BOX_2_H = 3
const BOX_2_V = 4
const BOX_4 = 5
const BOX_3_H = 6
const BOX_3_V = 7

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
        droppingSpeed: 0,
        attract_dist: 0
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
    },

    addBoxes () {
        for (let row = 0; row < this.height; row++) {
            for (let col = 0; col < this.width; col++) {
                const state = this.map[row * this.width + col]
                switch (state) {
                case PLAYER:
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
                    node.width = node.height = this.boxSize
                    node.color = this.boxColor
                    const sprite = node.getComponent(cc.Sprite)
                    node.markType = state

                    // keep tracking of row and col of node
                    node.row = row
                    node.col = col
                    node.size = cc.v2(1, 1)
                    node.logicPos = node.position
                    node.rowDrop = 0

                    switch (state) {
                    case BOX_1: break
                    case BOX_2_H:
                        node.size.x = 2
                        break
                    case BOX_2_V:
                        node.size.y = 2
                        break
                    case BOX_4:
                        node.size.x = node.size.y = 2
                        break
                    case BOX_3_H:
                        node.size.x = 3
                        break
                    case BOX_3_V:
                        node.size.y = 3
                        break
                    case PLAYER:
                        node.size.x = node.size.y = this.meSize
                        const newFrameMe = sprite.spriteFrame.clone()
                        newFrameMe.setTexture(this.textureMe)
                        sprite.spriteFrame = newFrameMe
                        node.type = 'player'
                        this.meNode = node
                        break
                    case PLAYER_OLD:
                        node.size.x = node.size.y = this.meSize
                        const newFrameOld = sprite.spriteFrame.clone()
                        newFrameOld.setTexture(this.textureOld)
                        sprite.spriteFrame = newFrameOld
                        node.type = 'player'
                        this.meNode = node
                        break
                    case PLAYER_BABY:
                        const newFrameBaby = sprite.spriteFrame.clone()
                        newFrameBaby.setTexture(this.textureBaby)
                        sprite.spriteFrame = newFrameBaby
                        node.type = 'player'
                        this.meNode = node
                        break
                    case SHE:
                        node.size.x = node.size.y = 2
                        const newFrameShe = sprite.spriteFrame.clone()
                        newFrameShe.setTexture(this.textureShe)
                        sprite.spriteFrame = newFrameShe
                        node.type = 'she'
                        break
                    default: break
                    }
                    node.height = node.size.y * this.boxSize + (node.size.y - 1) * this.boxPadding * 2
                    node.width = node.size.x * this.boxSize + (node.size.x - 1) * this.boxPadding * 2
                    this.node.addChild(node)

                    break
                default: break
                }
            }
        }
    },

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

    generateAnimation (node) {
        var animation = {
            node: node,
            ax: 0.4,
            ay: 0.4,
            vx: 0,
            vy: 0,
            curX: node.x,
            curY: node.y,
            endX: node.logicPos.x,
            endY: node.logicPos.y
        }
        this.animations.push(animation)
    },

    positionInNode (child, position) {
        return position.x >= child.logicPos.x && position.x <= child.logicPos.x + child.width &&
                position.y <= child.logicPos.y && position.y >= child.logicPos.y - child.height
    },

    matchGrid (position, dist) {
        const grid = this.nearestGrid(position.x, position.y)
        const c = grid.x
        const r = grid.y
        if (Math.abs(this.colToX(c) - position.x) < dist && Math.abs(this.rowToY(r) - position.y) < dist) {
            return [this.colToX(c), this.rowToY(r), true]
        } else {
            return [position.x, position.y, false]
        }
    },

    normalizedPos (node, delta, oldPos) {
        var x = delta.x + oldPos.x
        var y = delta.y + oldPos.y
        if (!this.isGridEmpty(node, x, y)) {
            const grid = this.nearestGrid(oldPos.x, oldPos.y)
            const c = grid.x
            const r = grid.y
            if (Math.abs(delta.x) > Math.abs(delta.y)) {
                if (this.isGridEmpty(node, x, this.rowToY(r))) {
                    y = this.rowToY(r)
                } else if (this.isGridEmpty(node, this.colToX(c), y)) {
                    x = this.colToX(c)
                } else {
                    x = this.colToX(c)
                    y = this.rowToY(r)
                }
            } else {
                if (this.isGridEmpty(node, this.colToX(c), y)) {
                    x = this.colToX(c)
                } else if (this.isGridEmpty(node, x, this.rowToY(r))) {
                    y = this.rowToY(r)
                } else {
                    x = this.colToX(c)
                    y = this.rowToY(r)
                }
            }
        }

        return cc.v2(x, y)
    },

    // returns (col, row)
    nearestGrid (x, y) {
        // this (x, y) is measured from left-bottom cornor, while the grid is measured from left-top cornor
        let c = Math.round(this.xToCol(x))
        if (c < 0) c = 0
        if (c >= this.width) c = this.width
        let r = Math.round(this.yToRow(y))
        if (r < 0) r = 0
        if (r >= this.height) r = this.height
        return cc.v2(c, r)
    },

    isGridEmpty (node, x, y) {
        const cMin = Math.floor(this.xToCol(x) + 1e-4)
        const cMax = Math.ceil(this.xToCol(x) - 1e-4) + node.size.x
        const rMin = Math.floor(this.yToRow(y) + 1e-4)
        const rMax = Math.ceil(this.yToRow(y) - 1e-4) + node.size.y
        if (cMin < 0 || cMax > this.width || rMin < 0 || rMax > this.height) {
            return false
        }
        for (let r = rMin; r < rMax; r++) {
            for (let c = cMin; c < cMax; c++) {
                if (this.map[r * this.width + c] !== 0) {
                    return false
                }
            }
        }
        return true
    },

    markOnMap (node) {
        for (let r = node.row; r < node.row + node.size.y; r++) {
            for (let c = node.col; c < node.col + node.size.x; c++) {
                this.map[r * this.width + c] = 1
            }
        }
        this.map[node.row * this.width + node.col] = node.markType
    },

    removeMarkOnMap (child) {
        for (let r = child.row; r < child.row + child.size.y; r++) {
            for (let c = child.col; c < child.col + child.size.x; c++) {
                this.map[r * this.width + c] = 0
            }
        }
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
            cc.log('try to go to next scene')
        }
    },

    reload () {
        this.init(levels.loadLevelData(global.level))
        this.drawBorderAndFill()
        this.addBoxes()

        cc.log(this.boxSize)

        this.animations = []

        this.node.on(cc.Node.EventType.TOUCH_START, function (touchEvent) {
            this.touching = true
            this.touchPos = touchEvent.touch.getLocation()
        }.bind(this))
        this.node.on(cc.Node.EventType.TOUCH_MOVE, function (touchEvent) {
            this.touching = true
            this.touchPos = touchEvent.touch.getLocation()
        }.bind(this))
        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function () {
            this.touching = false
        }.bind(this))
        this.node.on(cc.Node.EventType.TOUCH_END, function () {
            this.touching = false
        }.bind(this))
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.reload()
    },

    start () {
    },

    update (dt) {
        if (this.touching) {
            this.handleTouch()
        } else {
            this.cancelTouch()
        }
        for (const node of this.node.children) {
            if (node.needGravityAnimation) {
                if (node.y - this.droppingSpeed <= node.logicPos.y) {
                    node.y = node.logicPos.y
                    node.needGravityAnimation = false
                } else {
                    node.y -= this.droppingSpeed
                }
            }
        }
    },

    // these are just for convinience
    colToX (col) {
        return this.borderWidth + this.boxSizeWithPadding * col + this.boxPadding
    },

    rowToY (row) {
        return this.node.height - (this.borderWidth + this.boxSizeWithPadding * row + this.boxPadding)
    },

    // float (need to use Math.round or Math.floor ... to convert to a integer)
    yToRow (y) {
        return (this.node.height - y - this.borderWidth - this.boxPadding) / this.boxSizeWithPadding
    },

    xToCol (x) {
        return (x - this.borderWidth - this.boxPadding) / this.boxSizeWithPadding
    }
})
