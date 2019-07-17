// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const PLAYER = 9
const SHE = 8
const EMPTY = 0
const OCCUPIED = 1
const BOX_1 = 2
const BOX_2_H = 3
const BOX_2_V = 4
const BOX_4 = 5

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
        textureShe: {
            default: null,
            type: cc.Texture2D
        }
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
                    // (x, y) of box in panel (left top cornor of the actual box)
                    const x = this.borderWidth + col * this.boxSizeWithPadding + this.boxPadding
                    let y = this.borderWidth + row * this.boxSizeWithPadding + this.boxPadding
                    y = this.node.height - y

                    const node = cc.instantiate(this.boxPrefab)
                    node.setPosition(x, y)
                    node.width = node.height = this.boxSize
                    node.color = this.boxColor
                    const sprite = node.getComponent(cc.Sprite)
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
                    case PLAYER:
                        node.height = 2 * this.boxSize + 2 * this.boxPadding
                        node.width = 2 * this.boxSize + 2 * this.boxPadding
                        const newFrameMe = sprite.spriteFrame.clone()
                        newFrameMe.setTexture(this.textureMe)
                        sprite.spriteFrame = newFrameMe
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

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.init({
            audio: 0,
            words: 'day',
            width: 4,
            height: 5,
            exit: cc.v2(2, 2),
            exitDirection: 'right',
            map: [
                0, 0, 0, 0,
                0, 0, 0, 0,
                0, 0, 5, 1,
                9, 1, 1, 1,
                1, 1, 2, 2
            ],
            meSize: 2
        })
        this.drawBorderAndFill()
        this.addBoxes()
    },

    start () {

    }

    // update (dt) {},
})
