

var item8Layer = cc.Layer.extend({
    sprite:null,
    isRun:false,
    counter:0,
    a1:null,
    a2:null,
    isBig:false,
    isFAdeIn:false,
    hello:null,
    hellorect:null,
    ctor: async function () {

        this._super();



        this.hello = new cc.Sprite(res.bg_jpg);
        this.hello.attr({
            x:cc.winSize.width /2,
            y:cc.winSize.height /2
        });


        this.addChild(this.hello);
        this.hello.scaleX=4;
        this.hello.scaleY=4;



        var item1 = new cc.MenuItemFont("test1",this.item1,this);
        var item2 = new cc.MenuItemFont("test2",this.item2,this);
        var item3 = new cc.MenuItemFont("test3",this.item3,this);
        var item4 = new cc.MenuItemFont("test4",this.item4,this);
        var item5 = new cc.MenuItemFont("test5",this.item5,this);
        var item6 = new cc.MenuItemFont("test6",this.item6,this);
        var item7 = new cc.MenuItemFont("test7",this.item7,this);
        item1.attr({x:-240,y:240});
        item2.attr({x:-400,y:240});
        item3.attr({x:-100,y:240});
        item4.attr({x:40,y:240});
        item5.attr({x:120,y:240});
        item6.attr({x:220,y:240});
        item7.attr({x:300,y:240});
        var menu = new cc.Menu(item1,item2,item3,item4,item5,item6,item7);
        this.addChild(menu);



        this.sprite = new cc.Sprite(res.s1_0025_png);
        this.sprite.attr({
            x:cc.winSize.width /2,
            y:cc.winSize.height /2
        });
        this.addChild(this.sprite);

        var ff = cc.Follow.create(this.sprite);
        this.hello.runAction(ff);

        //相對位置
        //絕對位置 moveBy
        cc.spriteFrameCache.addSpriteFrames(res.s1_plist,res.s1_png);
        var animFrames = [];
        for (var i=1; i<=25; i++){
            var str = "s1_00" + (i>=10?'':'0') + i + ".png";
            var frame = cc.spriteFrameCache.getSpriteFrame(str);
            animFrames.push(frame);
        }
        var anim = new cc.Animation(animFrames, 1/15, 1);
        var anims = new cc.Animate(anim);   // Action


        await sleep(1*1000);



            this.a1 = cc.moveTo(3,cc.p(3,100,100));
            this.a2 = cc.repeatForever(anims);
            this.sprite.runAction(this.a1);
        this.sprite.runAction(this.a2);

            this.scheduleUpdate();



        return true;
    },
    update : function(){

        // if(this.counter % 10 ==0){
        //     this.isRun = ! this.isRun;
        //     this.sprite.runAction(new cc.flipX(this.isRun));
        // }
        // this.counter ++;
        // if(this.counter == 10)
        //     this.counter = 0;

    },
    item1: function(){
        this.sprite.stopAllActions();
    },
    item2:function(){
      // this.sprite.stopAction(this.a2);
        this.sprite.stopAction(this.a1);
    },
    item3:function(){
        var moveLeftTop = cc.moveTo(0.5,
            this.sprite.x,
            cc.winSize.height - this.sprite.height /2);

        var moveRightTop = cc.moveTo(0.5,
            cc.winSize.width- this.sprite.width/2,
            cc.winSize.height-this.sprite.height/2);

        var moveRightButton = cc.moveTo(0.5,
            cc.winSize.width- this.sprite.width/2,
            this.sprite.height/2);

        var moveLeftButtom = cc.moveTo(0.5,
            this.sprite.width/2,
            this.sprite.height/2
            );
        var moveCenter = cc.moveTo(0.5,
            cc.winSize.width/2,
            cc.winSize.height/2
            );

        var moves = [moveLeftTop,moveRightTop,
            moveRightButton,moveLeftButtom,moveCenter];

        var acts = new cc.Sequence(moves); //=>retrun action
        this.sprite.runAction(acts);

},
    item4:function(){
        var moveLeftTop = cc.moveTo(0.5,
            this.sprite.x,
            cc.winSize.height - this.sprite.height /2);

        //這裡的this參數就是代表作用的那個東西也就是sprite

        var i1 = new cc.CallFunc(this.f1,this,"1");
        var moveRightTop = cc.moveTo(0.5,
            cc.winSize.width- this.sprite.width/2,
            cc.winSize.height-this.sprite.height/2)

        var i2 = new  cc.CallFunc(this.f1,this,"2");
        var moveRightButton = cc.moveTo(0.5,
            cc.winSize.width- this.sprite.width/2,
            this.sprite.height/2);

        var i3 = new cc.CallFunc(this.f1,this,"3");
        var moveLeftButtom = cc.moveTo(0.5,
            this.sprite.width/2,
            this.sprite.height/2);

        var i4 = new cc.CallFunc(this.f1,this,"4");
        var moveCenter = cc.moveTo(0.5,
            cc.winSize.width/2,
            cc.winSize.height/2);

        var moves = [moveLeftTop,i1,moveRightTop,i2,
            moveRightButton,i3,moveLeftButtom,i4,moveCenter];

        var acts = new cc.Sequence(moves); //=>retrun action
        this.sprite.runAction(acts);

    },
    f1:function(target,mesg){
        //target 就是現在的sprite

        cc.log("f1:" + mesg);
        if(mesg == "2"){
           target.stopAction(target.getParent().a2);
           //  cc.log(this); // 這裡的this是layer
        }
    },
    item5:function(){
        // 花幾秒的時間 寬 高
        this.isBig = !this.isBig;
        var ab = new cc.scaleTo(0.5,2,2);
        var as = new cc.scaleTo(0.5,0.5,0.5);
        this.sprite.runAction(this.isBig?ab:as);

    },
    item6:function(){
        // 花幾秒的時間 寬 高
        this.isFAdeIn = !this.isFAdeIn;
        var ii = new cc.FadeIn(0.5);
        var oo = new cc.FadeOut(0.5);
        this.sprite.runAction(this.isFAdeIn?ii:oo);

    },
    item7: function(){
        //一秒內閃10次
        // // this.sprite.runAction(new cc.Blink(1,10));
        // var a3 = cc.moveTo(2,400,400);
        // //(什麼動作,加速)
        // var a4 = new cc.EaseIn(a3,10);
        // var a5 = new cc.Speed(a3,4);
        //
        // this.sprite.runAction(a5)

        //音效
        // cc.audioEngine.playMusic(res.win,false);
        //
        // this.sprite.runAction(cc.jumpTo(1,
        //     cc.p(this.sprite.x,this.sprite.y),250,1));

        var a6 = new cc.ProgressTo(10,100);
        var timer =  new cc.ProgressTimer(this.sprite);
        timer.setType(cc.ProgressTimer.TYPE_BAR);
        timer.setPosition(cc.p(100,cc.winSize.height/2));
        this.addChild(timer);
        timer.runAction(a6);

    },

});

var item8Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new item8Layer();
        this.addChild(layer);
    }
});
function sleep(){

    // return new Promise()
};

