cc.Class({
    extends: cc.Component,

    properties: {
        
    },

    // LIFE-CYCLE CALLBACKS:

    toGame : function() {
        cc.director.loadScene("game")
    }

    // update (dt) {},
});
