// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const global = require('../global')

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
    },

    clearGraphicsThing () {
        const panel = this.node.getChildByName('panel')
        const graphics = panel.getComponent(cc.Graphics)
        graphics.clear()
    },

    backToChapterMenu () {
        // also reset level data
        global.level = 1
        window.sceneAnimator.switchToScene('choiceMenu', 0.5, { opacity: { from: 255, to: 0 } },
            0.5, { opacity: { from: 0, to: 255 } })
        this.clearGraphicsThing()
    },

    restart () {
        window.sceneAnimator.switchToScene('game', 1, { opacity: { from: 255, to: 0 } },
            1, { opacity: { from: 0, to: 255 } })
    },

    setProperHeightForPanel () {
        
    },

    resetButtonPosition () {

    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    // update (dt) {},
})
