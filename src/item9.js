var item9Layer = cc.Layer.extend({
    sprite:null,
    space:null,
    ctor:function () {
        this._super();

        this.initPhysics();
        this.setUpmymouse(this);
        this.scheduleUpdate();

        return true;
    },

    initPhysics: function () {
        this.space = new cp.Space();
        this.space.gravity = cp.v(0, -10000);

        var staticBody = this.space.staticBody;
        var walls = [
            new cp.SegmentShape(staticBody, cp.v(0, 0),
                cp.v(cc.winSize.width, 0), 0),
            new cp.SegmentShape(staticBody, cp.v(0, 0),
                cp.v(0, cc.winSize.height), 0),
            new cp.SegmentShape(staticBody, cp.v(0, cc.winSize.height),
                cp.v(cc.winSize.width, cc.winSize.height), 0),
            new cp.SegmentShape(staticBody, cp.v(cc.winSize.width, cc.winSize.height),
                cp.v(cc.winSize.width, 0), 0),
        ];

        for (var i=0; i<walls.length; i++){
            var wall = walls[i];
            wall.setElasticity(0);
            wall.setFriction(100);
            this.space.addStaticShape(wall);
        }


        var stick2 = new cc.DrawNode;
        stick2.drawSegment(cc.p(cc.winSize.width/2,cc.winSize.height/2)
            ,cc.p(cc.winSize.width /2,0),4,cc.color(255,0,0));
        this.addChild(stick2);
        var staticBody2 = this.space.staticBody;
        var shape2 = new cp.SegmentShape(staticBody2,
            cp.v(cc.winSize.width/2,cc.winSize.height/2)
            ,cp.v(cc.winSize.width /2,0),4);
        shape2.setElasticity(0);
        shape2.setFriction(500);
        this.space.addStaticShape(shape2);


    },

    setUpmymouse: function(layer){
        if ('mouse' in cc.sys.capabilities){
            var mouseListener = {
                event: cc.EventListener.MOUSE,
                onMouseDown: function (event) {
                    layer.addBox(event.getLocation());

                },
            };
            cc.eventManager.addListener(mouseListener,this);
        }
    },

    addBox : function(p){

        var body = new cp.Body(1,cp.momentForBox(1,64,64));
        body.setPos(p);
        this.space.addBody(body);

        var shape = new cp.BoxShape(body,64,64);
        shape.setElasticity(1);
        shape.setFriction(30);
        this.space.addShape(shape);

        var boxSprite = new cc.PhysicsSprite(res.box_png);
        boxSprite.setBody(body);
        boxSprite.setPosition(cc.p(p.x,p.y));

        this.addChild(boxSprite);

    },
    update : function(){

        this.space.step(0.01);

    },



});

var item9Scene = cc.Scene.extend({
    onEnter:function () {
        this._super();
        var layer = new item9Layer();
        this.addChild(layer);
    }
});