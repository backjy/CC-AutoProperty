// Learn TypeScript:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] https://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property, inspector} = cc._decorator;

@ccclass
@inspector("packages://autoproperty/inspector.js")
export default class Test extends cc.Component {

    @property(cc.Node)
    tArray: cc.Node[] = []

    @property(cc.Sprite)
    tArrayS: cc.Sprite[] = []

    @property( cc.Sprite)
    tSprite: cc.Sprite = null

    @property( cc.Label)
    tLabel: cc.Label = null

    @property( cc.Node)
    testnode: cc.Node = null

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}
}
