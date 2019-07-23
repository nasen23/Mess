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

    toLevel (event, level) {
        global.level = Number(level)
        window.sceneAnimator.switchToScene('game', 0.5, { opacity: { from: 255, to: 0 } }, 0.5, { opacity: { from: 0, to: 255 } })
    },

    backToCover () {
        window.sceneAnimator.switchToScene('startMenu', 0.5, { opacity: { from: 255, to: 0 } }, 0.5, { opacity: { from: 0, to: 255 } })
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    }

    // update (dt) {},
})
