

var menuLayer = cc.Layer.extend({
    sprite:null,
    isFlipY:false,
    isShow:false,

    ctor:function () {

        this._super();

        this.sprite = new cc.Sprite(res.HelloWorld_png);
        this.sprite.attr({
           x:cc.winSize.width/2,
           y:cc.winSize.height*6/8
        });
        this.addChild(this.sprite);

        this.isShow = true;

        var item1 = new cc.MenuItemFont("test1",this.item1,this);
        var item2 = new cc.MenuItemFont("test2",this.item2,this);
        var item3 = new cc.MenuItemFont("test3",this.item3,this);
        var item4 = new cc.MenuItemFont("test4",this.item4,this);
        var item5 = new cc.MenuItemFont("test5",this.item5,this);
        var item6 = new cc.MenuItemFont("test6",this.item6,this);
        var item7 = new cc.MenuItemFont("test7",this.item7,this);
        var item8 = new cc.MenuItemFont("test8",this.item8,this);



        item1.attr({x:-240,y:-200});
        item2.attr({x:-160,y:-200});
        item3.attr({x:-80,y:-200});
        item4.attr({x:0,y:-200});
        item5.attr({x:80,y:-200});
        item6.attr({x:160,y:-200});
        item7.attr({x:-240,y:-240});
        item8.attr({x:-150,y:-240});

        var menu = new cc.Menu(item1,item2,item3,item4,item5
            ,item6,item7,item8);
        this.addChild(menu);




        return true;
    },
    item1:function(){
        //place改變位置
        this.sprite.runAction(

            cc.place(new cc.Point(this.sprite.x -100,this.sprite.y-400))


        );
    },
    item2:function(){
        this.isFlipY = !this.isFlipY;
        this.sprite.runAction(
            cc.flipY(this.isFlipY)
        );
    },
    item3:function(){
        this.isShow = !this.isShow;
        this.sprite.runAction(
           this.isShow?cc.show():cc.hide()
        );
    },
    item4:function(){
        var strong = cc.sys.localStorage;
        strong.setItem("stage","4");
        strong.setItem("username","name");
    },
    item5:function(){
        var strong = cc.sys.localStorage;
        var stage = strong.getItem("stage");
        var username = strong.getItem("username");
        cc.log(stage+"+"+username);
    },
    item6:function(){
        var strong = cc.sys.localStorage;
        strong.removeItem("stage","4");
        strong.removeItem("username","name");
    },
    item7:function() {
      c
    },
    item8:function(){
        cc.director.pushScene(new item8Scene());
    },
});

var menuScene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new menuLayer();
        this.addChild(layer);
    }
});

