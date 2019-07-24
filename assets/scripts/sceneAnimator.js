// Learn cc.Class:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://docs.cocos2d-x.org/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] https://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

var SceneAnimator = cc.Class({
    name: 'SceneAnimator',

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

    switchToScene (sceneName, finishDuration, finishAnimations, startDuration, startAnimations) {
        cc.director.preloadScene(sceneName)

        this.finishCurrentScene(finishDuration, finishAnimations, sceneName, startDuration, startAnimations)
    },

    finishCurrentScene (duration, animations, ...args) {
        const scene = cc.director.getScene()
        const canvas = scene.getChildByName('Canvas')

        const target = {}
        for (const property in animations) {
            canvas[property] = animations[property].from
            target[property] = animations[property].to
        }
        cc.tween(canvas).to(duration, target).call(function () {
            this.startNextScene(...args)
        }.bind(this)).start()
    },

    startNextScene (sceneName, duration, animations) {
        cc.director.loadScene(sceneName, function () {
            const scene = cc.director.getScene()
            const canvas = scene.getChildByName('Canvas')

            const target = {}
            for (const property in animations) {
                canvas[property] = animations[property].from
                target[property] = animations[property].to
            }
            cc.tween(canvas).to(duration, target).start()
        })
    }

})

window.sceneAnimator = new SceneAnimator()
