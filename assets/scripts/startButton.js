cc.Class({
    extends: cc.Component,

    properties: {

    },

    // LIFE-CYCLE CALLBACKS:

    toChoiceMenu: function () {
        cc.director.loadScene('choiceMenu')
    }

    // update (dt) {},
})
