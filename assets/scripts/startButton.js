cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    toMenu: function () {
        cc.director.loadScene('choiceMenu')
    }

    // update (dt) {},
})
