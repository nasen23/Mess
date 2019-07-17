const global = require('./global')

cc.Class({
    extends: cc.Component,

    properties: {
        toLevel: 0
    },

    // LIFE-CYCLE CALLBACKS:

    toGame: function () {
        global.level = this.toLevel
        cc.director.loadScene('game')
    }

    // update (dt) {},
})
