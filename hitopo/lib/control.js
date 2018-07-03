function convertBoolValue(v) {
    if (typeof v != "undefined") {
        if (typeof v == 'string')
            return (v == "1" || v == "true");
        else if (typeof v == 'number')
            return v != 0;
        else if (typeof v == 'boolean')
            return v;
    }
    else
        return false;
}

ht.Default.setImage('Pump', {
    "width": 138,
    "height": 138,
    "author": "",
    "note": "",
    "comps": [
        {
            "type": "circle",
            "rect": [4.42, 5.12, 128, 128],
            "background": {
                func: function (data) {
                    var v = data.a("tagvalue");
                    var on = data.a('oncolor'), off = data.a('offcolor');
                    if (convertBoolValue(v))
                        return on || '#FF0000';
                    else
                        return off || '#00FF00';
                },
                value: 'red'
            },
            "borderWidth": { "func": "attr@borderWidth", value: 2 },
            "borderColor": {
                "value": "#000",
                "func": "attr@borderColor"
            },
            "gradient": { "func": "attr@gradient" },
            "gradientColor": {
                "value": "#FFF",
                "func": "attr@gradientColor"
            },
            "pivot": [0.5, 0.5]
        },
        {
            "type": "shape",
            "rect": [6.42, 25.12, 109.75, 86.49],
            "points": [115, 25, 6, 68, 116, 112],
            "segments": [1, 2, 2],
            "background": "rgba(255,255,255,0)",
            "borderWidth": { "func": "attr@borderWidth", value: 2 },
            "borderColor": {
                "value": "#000",
                "func": "attr@borderColor"
            },
            "borderCap": "butt",
            "borderJoin": "round",
            "gradient": "",
        }
    ]
});

ht.Default.setImage('Pump1', {
    "width": 138,
    "height": 138,
    "author": "",
    "note": "",
    "comps": [
        {
            "type": "circle",
            "rect": [4.42, 5.12, 128, 128],
            "borderWidth": { "func": "attr@borderWidth", value: 4 },
            "borderColor": {
                func: function (data) {
                    var v = data.a("tagvalue");
                    var on = data.a('oncolor'), off = data.a('offcolor');
                    if (convertBoolValue(v))
                        return on || '#FF0000';
                    else
                        return off || '#00FF00';
                },
                value: 'red'
            },
            "pivot": [0.5, 0.5]
        },
        {
            "type": "shape",
            "rect": [6.42, 25.12, 109.75, 86.49],
            "points": [115, 25, 6, 68, 116, 112],
            "segments": [1, 2, 2],
            "borderWidth": { "func": "attr@borderWidth", value: 4 },
            "borderColor": {
                func: function (data) {
                    var v = data.a("tagvalue");
                    var on = data.a('oncolor'), off = data.a('offcolor');
                    if (convertBoolValue(v))
                        return on || '#FF0000';
                    else
                        return off || '#00FF00';
                },
                value: 'red'
            },
            "borderCap": "butt",
            "borderJoin": "round"
        }
    ]
});

ht.Default.setImage('Valve', {
    "width": 50,
    "height": 40,
    "author": "",
    "note": "",
    "comps": [
        {
            "type": "shape",
            "rect": [5, 5, 40, 30],
            "points": [5, 5, 40, 30, 40, 5, 5, 30],
            "segments": [1, 2, 2, 2, 5],
            "background": {
                func: function (data) {
                    var v = data.a("tagvalue");
                    var on = data.a('oncolor'), off = data.a('offcolor');
                    if (convertBoolValue(v))
                        return on || '#FF0000';
                    else
                        return off || '#00FF00';
                },
                value: 'red'
            },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": {
                "value": "#000",
                "func": "attr@borderColor"
            },
            "gradient": { "func": "attr@gradient" },
            "gradientColor": {
                "value": "#FFF",
                "func": "attr@gradientColor"
            },
            "pivot": [0.5, 0.5]
        }
    ]
});

ht.Default.setImage('Valve1', {
    "width": 50,
    "height": 40,
    "author": "",
    "note": "",
    "comps": [
        {
            "type": "shape",
            "rect": [5, 5, 40, 30],
            "points": [5, 5, 40, 30, 40, 5, 5, 30],
            "segments": [1, 2, 2, 2, 5],
            "background": {
                func: function (data) {
                    var v = data.a("tagvalue");
                    var on = data.a('oncolor'), off = data.a('offcolor');
                    if (convertBoolValue(v))
                        return on || '#FF0000';
                    else
                        return off || '#00FF00';
                },
                value: 'red'
            },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": {
                "value": "#000",
                "func": "attr@borderColor"
            },
            "gradient": { "func": "attr@gradient" },
            "gradientColor": {
                "value": "#FFF",
                "func": "attr@gradientColor"
            },
            "pivot": [0.5, 0.5]
        },
        {
            type: 'oval',
            "background": {
                func: function (data) {
                    var v = data.a("tagvalue");
                    var on = data.a('oncolor'), off = data.a('offcolor');
                    if (convertBoolValue(v))
                        return on || '#FF0000';
                    else
                        return off || '#00FF00';
                },
                value: 'red'
            },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": {
                "value": "#000",
                "func": "attr@borderColor"
            },
            rect: [20, 8, 10, 24]
        }
    ]
});

ht.Default.setImage('Valve2', {
    "width": 50,
    "height": 40,
    "author": "",
    "note": "",
    "comps": [
        {
            "type": "shape",
            "points": [5, 5, 25, 20, 5, 35],
            "segments": [1, 2, 2, 5],
            "background": {
                func: function (data) {
                    if (data.values) {
                        var on = data.a('oncolor') || '#FF0000', off = data.a('offcolor') || '#00FF00';
                        if (data.values[1])
                            return off;
                        else
                            return on;
                    }
                },
                value: 'red'
            },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": {
                "value": "#000",
                "func": "attr@borderColor"
            },
            "gradient": { "func": "attr@gradient" },
            "gradientColor": {
                "value": "#FFF",
                "func": "attr@gradientColor"
            },
            "pivot": [0.5, 0.5]
        },
        {
            "type": "shape",
            "points": [25, 20, 45, 5, 45, 35],
            "segments": [1, 2, 2, 5],
            "background": {
                func: function (data) {
                    if (data.values) {
                        var on = data.a('oncolor') || '#FF0000', off = data.a('offcolor') || '#00FF00';
                        if (data.values[0])
                            return on;
                        else
                            return off;
                    }
                },
                value: '#00FF00'
            },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": {
                "value": "#000",
                "func": "attr@borderColor"
            },
            "gradient": { "func": "attr@gradient" },
            "gradientColor": {
                "value": "#FFF",
                "func": "attr@gradientColor"
            },
            "pivot": [0.5, 0.5]
        }
    ]
});

ht.Default.setImage('Valve3', {
    "width": 50,
    "height": 40,
    "author": "",
    "note": "",
    "comps": [
        {
            "type": "shape",
            "rect": [5, 5, 40, 30],
            "points": [5, 5, 40, 30, 40, 5, 5, 30],
            "segments": [1, 2, 2, 2, 5],
            "background": {
                func: function (data) {
                    var v = data.a("tagvalue");
                    var on = data.a('oncolor'), off = data.a('offcolor');
                    if (convertBoolValue(v))
                        return on || '#FF0000';
                    else
                        return off || '#00FF00';
                },
                value: 'red'
            },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": {
                "value": "#000",
                "func": "attr@borderColor"
            },
            "gradient": { "func": "attr@gradient" },
            "gradientColor": {
                "value": "#FFF",
                "func": "attr@gradientColor"
            },
            "pivot": [0.5, 0.5]
        },
        {
            type: 'rect',
            "background": {
                func: function (data) {
                    var v = data.a("tagvalue");
                    var on = data.a('oncolor'), off = data.a('offcolor');
                    if (convertBoolValue(v))
                        return on || '#FF0000';
                    else
                        return off || '#00FF00';
                },
                value: 'red'
            },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": {
                "value": "#000",
                "func": "attr@borderColor"
            },
            rect: [20, 8, 10, 24]
        }
    ]
});

ht.Default.setImage('圆形指示灯', {
    "width": 60,
    "height": 60,
    "author": "",
    "note": "",
    "comps": [
        {
            "type": { "func": "attr@type", value: "circle" },//   "circle",
            "rect": [5, 5, 50, 50],
            "background": {
                func: function (data) {
                    var v = data.a("tagvalue");
                    var on = data.a('oncolor'),
                        off = data.a('offcolor');
                    if (convertBoolValue(v))
                        return on || '#FF0000';
                    else
                        return off || '#00FF00';
                },
                value: 'red'
            },
            "borderWidth": { "func": "attr@borderWidth", value: 2 },
            "borderColor": {
                "value": "#000",
                "func": "attr@borderColor"
            },
            "gradient": { "func": "attr@gradient" },
            "gradientColor": {
                "value": "#FFF",
                "func": "attr@gradientColor"
            },
            "pivot": [0.5, 0.5]
        }
    ]
});

ht.Default.setImage('矩形指示灯', {
    "width": 40,
    "height": 40,
    "author": "",
    "note": "",
    "comps": [
        {
            "type": { "func": "attr@type", value: "rect" },//"rect",
            "rect": [5, 5, 30, 30],
            "background": {
                func: function (data) {
                    var v = data.a("tagvalue");
                    var on = data.a('oncolor'), off = data.a('offcolor');
                    if (convertBoolValue(v))
                        return on || '#FF0000';
                    else
                        return off || '#00FF00';
                },
                value: 'red'
            },
            "borderWidth": { "func": "attr@borderWidth", value: 2 },
            "borderColor": {
                "value": "#000",
                "func": "attr@borderColor"
            },
            "gradient": { "func": "attr@gradient" },
            "gradientColor": {
                "value": "#FFF",
                "func": "attr@gradientColor"
            },
            "pivot": [0.5, 0.5]
        }
    ]
});

ht.Default.setImage("单只叶片", {
    "width": 15,
    "height": 90,
    "author": "",
    "note": "",
    "comps": [
        {
            "type": "shape",
            "rect": [2, 80, 10, 8],
            "points": [5, 88, 6, 83, 2, 80, 12, 80, 12, 88, 5, 88],
            "segments": [1, 3, 2, 2, 2],
            "background": {
                "value": "rgb(180, 180, 180)",
                "func": "attr@background"
            },
            "borderWidth": 0,
            "gradient": "spread.west",
            "gradientColor": {
                "value": "#FFF",
                "func": "attr@gradientColor"
            }
        },
        {
            "type": "shape",
            "rect": [7, 1, 5, 79],
            "points": [7, 1, 7, 80, 12, 80, 12, 71, 11, 35, 7, 1],
            "segments": [1, 2, 2, 4],
            "background": {
                "value": "rgb(180, 180, 180)",
                "func": "attr@background"
            },
            "borderWidth": 0,
            "gradient": "spread.east",
            "gradientColor": {
                "value": "#FFF",
                "func": "attr@gradientColor"
            }
        },
        {
            "type": "shape",
            "rect": [2, 1, 5, 79],
            "points": [2, 80, 7, 62, 7, 23, 7, 1, 7, 80],
            "segments": [1, 4, 2],
            "background": {
                "value": "rgb(180, 180, 180)",
                "func": "attr@background"
            },
            "borderWidth": 0,
            "gradient": "spread.west",
            "gradientColor": {
                "value": "#FFF",
                "func": "attr@gradientColor"
            }
        }
    ]
});

ht.Default.setImage('风机头', {
    "width": 190,
    "height": 190,
    "author": "",
    "note": "",
    "comps": [
        {
            "type": "image",
            "name": "单只叶片",
            "rect": [86.35, 3.7, 15, 90]
        },
        {
            "type": "image",
            "name": "单只叶片",
            "rect": [128.46, 72.24, 15, 90],
            "rotation": 2.09
        },
        {
            "type": "image",
            "name": "单只叶片",
            "rect": [47.86, 73.82, 15, 90],
            "rotation": 4.19
        },
        {
            "type": "circle",
            "rect": [90, 90, 10, 10],
            "background": {
                "value": "rgb(180, 180, 180)",
                "func": "attr@background"
            },
            "borderWidth": 0,
            "gradient": "radial.center",
            "gradientColor": {
                "value": "#FFF",
                "func": "attr@gradientColor"
            },
            "pivot": [0.5, 0.5]
        }
    ]
});

ht.Default.setImage("风机整机", {
    "width": 200,
    "height": 240,
    "author": "",
    "note": "",
    "comps": [
        {
            "type": "trapezoid",
            "rect": [89.75, 104.64, 10.42, 127.95],
            "background": "rgb(180, 180, 180)",
            "borderWidth": 0,
            "gradient": "linear.west",
            "gradientColor": "#FFF",
            "pivot": [0.5, 0.5]
        },
        {
            "type": "trapezoid",
            "rect": [85.21, 232.24, 20, 2.93],
            "background": "rgb(180, 180, 180)",
            "borderWidth": 0,
            "gradient": "linear.west",
            "gradientColor": "#FFF",
            "pivot": [0.5, 0.5]
        },
        {
            "type": "roundRect",
            "rect": [81.62, 94.75, 20, 10],
            "background": "rgb(180, 180, 180)",
            "borderWidth": 0,
            "gradient": "radial.east",
            "gradientColor": "#FFF",
            "rotation": 0.09,
            "pivot": [0.5, 0.5]
        },
        {
            "type": "image",
            "name": { func: "attr@fanheadname", value: "风机头" },
            "rect": [5.07, 5.42, 190, 190],
            "rotation": {
                "func": "attr@rotation", value: 0
            }
        }
    ]
});

ht.Chart = function (option) {
    var self = this,
        view = self._view = document.createElement('div');
    view.style.position = 'absolute';
    view.style.setProperty('box-sizing', 'border-box', null);
    self._option = option;
    self._chart = echarts.init(self.getView());
    if (option)
        self._chart.setOption(option);
    self._FIRST = true;
};

ht.Default.def('ht.Chart', Object, {
    ms_v: 1,
    ms_fire: 1,
    ms_ac: ['chart', 'option', 'isFirst', 'view'],
    validateImpl: function () {
        var self = this,
            chart = self._chart;
        chart.resize();
        if (self._FIRST) {
            self._FIRST = false;
        }
    },
    setSize: function (w, h) {
        var view = this._view;
        view.style.width = w + 'px';
        view.style.height = h + 'px';
    }
});

ht.Image = function () {
    ht.Node.superClass.constructor.call(this);
    this.setSize(60, 60);
};

ht.Default.def('ht.Image', ht.Node, {
    onAttrChanged: function (name, oldValue, newValue) {
        if (name == "tagvalue") {
            var onimage = this.a("onimage") || null;
            var offimage = this.a("offimage") || null;
            if (typeof newValue != "undefined") {
                if (typeof newValue == 'string') {
                    if (newValue == "true") {
                        if (onimage == null && offimage == null) {
                            this.s("2d.visible", true);
                        }
                        else {
                            onimage = onimage || this.getImage();
                            if (this.getImage() != onimage)
                                this.setImage(onimage);
                        }
                    }
                    else {
                        if (onimage == null && offimage == null) {
                            this.s("2d.visible", false);
                        }
                        else {
                            if (this.getImage() != offimage)
                                this.setImage(offimage);
                        }
                    }
                }
                else if (typeof newValue == 'boolean') {
                    if (newValue) {
                        if (onimage == null && offimage == null) {
                            this.s("2d.visible", true);
                        }
                        else {
                            onimage = onimage || this.getImage();
                            if (this.getImage() != onimage)
                                this.setImage(onimage);
                        }
                    }
                    else {
                        if (onimage == null && offimage == null) {
                            this.s("2d.visible", false);
                        }
                        else {
                            if (this.getImage() != offimage)
                                this.setImage(offimage);
                        }
                    }
                }
                else if (typeof newValue == 'number') {
                    if (newValue != 0) {
                        if (onimage == null && offimage == null) {
                            this.s("2d.visible", true);
                        }
                        else {
                            onimage = onimage || this.getImage();
                            if (this.getImage() != onimage)
                                this.setImage(onimage);
                        }
                    }
                    else {
                        if (onimage == null && offimage == null) {
                            this.s("2d.visible", false);
                        }
                        else {
                            if (this.getImage() != offimage)
                                this.setImage(offimage);
                        }
                    }
                }
            }
        }
    }
});

ht.Default.setImage('CirTri', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'circle',
            borderWidth: 6,
            borderColor: {
                func: function (data) { return data.a('borderColor'); },
                value: 'white'
            },
            rect: [5, 5, 90, 90]
        },
        {
            type: 'triangle',
            borderWidth: 6,
            borderColor: {
                func: function (data) { return data.a('borderColor'); },
                value: 'white'
            },
            rect: {
                func: function (data) {
                    var height = 100,
                        width = 100,
                        size = Math.min(width, height);

                    var width3 = (size - 10) / 3,
                        cos = Math.cos(Math.PI / 6),
                        h = width3 * cos,
                        h3 = h / 3;

                    return [
                        size * 0.5 - width3 * 0.5, size * 0.5 - h3 * 2,
                        width3, h
                    ];
                }
            }
        }
    ]
});

ht.Default.setImage('CirLine', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'circle',
            borderWidth: 6,
            borderColor: {
                func: function (data) { return data.a('borderColor'); },
                value: 'white'
            },
            rect: [5, 5, 90, 90]
        },
        {
            type: 'shape',
            borderWidth: 6,
            borderColor: {
                func: function (data) { return data.a('borderColor'); },
                value: 'white'
            },
            points: {
                func: function (data) {
                    var height = 100,
                        width = 100,
                        size = Math.min(width, height),
                        center = { x: width * 0.5, y: height * 0.5 };

                    var length = (size - 10) * 0.25,
                        cos = Math.cos(Math.PI / 6),
                        sin = 0.5,
                        dx = length * cos,
                        dy = length * sin;

                    return [
                        center.x, center.y - length,
                        center.x, center.y,
                        center.x + dx, center.y + dy,

                        center.x, center.y,
                        center.x - dx, center.y + dy
                    ];
                }
            },
            segments: [1, 2, 2, 1, 2]
        }
    ]
});

//页面脚本
ht.Script = function () {
    ht.Node.superClass.constructor.call(this);
    this.setName('Script');
    this.setSize(60, 30);
    this.s({
        'label.position': 17,
        'label.font': '12px arial, sans-serif'
    });
};

ht.Default.def('ht.Script', ht.Node, {
    _image: null,
    _icon: 'script',
    setImage: function () { }
});

//页面脚本
ht.Html = function () {
    ht.Node.superClass.constructor.call(this);
    this.setName('Html');
    this.setSize(60, 30);
    this.s({
        'label.position': 17,
        'label.font': '12px arial, sans-serif'
    });
};

ht.Default.def('ht.Html', ht.Node, {
    _image: null,
    _icon: 'html',
    setImage: function () { },
    padding: { func: 'attr@padding', value: 6 },
    scalable: { func: 'attr@scalable', value: false }
});

//子画面
ht.iFrame = function () {
    ht.Node.superClass.constructor.call(this);
    this.setName('子画面');
    this.setSize(60, 30);
    this.s({
        'label.position': 17,
        'label.font': '12px arial, sans-serif'
    });
};

ht.Default.def('ht.iFrame', ht.Node, {
    _image: null,
    setImage: function () { }
});


//画面连接
ht.LinkImg = function () {
    ht.Node.superClass.constructor.call(this);
    this.setName('链接画面');
    this.setSize(60, 30);
    this.s({
        'label.position': 17,
        'label.font': '12px arial, sans-serif'
    });
};

ht.Default.def('ht.LinkImg', ht.Node, {
    _image: null,
    setImage: function () { }
});


//子画面
ht.alarm = function () {
    ht.Node.superClass.constructor.call(this);
    this.setName('报警控件');
    this.setSize(600, 200);
    this.s({
        'label.position': 17,
        'label.font': '12px arial, sans-serif'
    });
};

ht.Default.def('ht.alarm', ht.Node, {
    _image: null,
    setImage: function () { }
});

//标签值
ht.Default.setImage('TagValue', {
    width: { func: 'field@_width', value: 40 },
    height: { func: 'field@_height', value: 20 },
    _icon: 'number',
    comps: [
        {
            type: 'text',
            rect: {
                func: function (data, view) {
                    var width = data.getWidth(),
                        height = data.getHeight();
                    return [0, 0, width, height];
                }
            },
            text: {
                func: function (data, view) {
                    //toFixed
                    //'attr@point'
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var u = data.a('unit');
                            if (u && u != "")
                                return v + u;
                            else
                                return v;
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('ontext'), off = data.a('offtext');
                            if (on && off && on != "" && off != "") {
                                return v ? on : off;
                            }
                            else
                                return v.toString();
                        }
                        else if (typeof v == 'number') {
                            var u = data.a('unit');
                            if (u && u != "")
                                return v.toFixed(data.a('digcount')) + u;
                            else
                                return v.toFixed(data.a('digcount'));
                        }
                    }
                }
                , value: "0.0"
            },
            font: { func: 'style@font', value: 'bold 18px Arial' },
            align: { func: 'style@align', value: 'left' },
            vAlign: { func: 'style@vAlign', value: 'middle' },
            color: {
                func: function (data, view) {
                    if (data.tag) {
                        if (data.tag.status == 1) {
                            if (data.tag.alarm > 0) {
                                var s = data.a("alarm.color");
                                if (s != null && s != "") {
                                    if (data.a("flash")) {
                                        return sys_blink ? s : data.s("color");
                                    }
                                    else
                                        return s;
                                }
                            }
                            else
                                return data.s("color");
                        }
                        else
                            return "#FF00FF";
                    }
                    return data.s("color");
                }, value: 'black'
            },
            digcount: { func: 'attr@digcount', value: 2 },
            unit: { func: 'attr@unit', value: '' },
            ontext: { func: 'attr@ontext', value: '' },
            offtext: { func: 'attr@offtext', value: '' }
        }
    ]
});
// 标签值
ht.Default.setImage('TagValue1', {
    width: { func: 'field@_width', value: 50 },
    height: { func: 'field@_height', value: 24 },
    _icon: 'number',
    comps: [
        {
            "type": "rect",
            "rect": {
                func: function (data, view) {
                    var width = data.getWidth(),
                        height = data.getHeight();
                    return [2, 2, width - 4, height - 4];
                }
            },
            "borderWidth": { func: 'style@borderWidth', value: 1 },
            "borderColor": { func: 'style@borderColor', value: "black" },
            "background": {
                func: function (data, view) {
                    if (data.tag) {
                        if (data.tag.status == 1)
                            return data.s("background");
                        else
                            return "#FF00FF";
                    }
                    return data.s("background");
                },
                value: "white"
            },
        },
        {
            type: 'text',
            rect: {
                func: function (data, view) {
                    var w = data.s("borderWidth") || 1;
                    var width = data.getWidth(),
                        height = data.getHeight();
                    return [2 + w, 2 + w, width - 4 - 2 * w, height - 4 - 2 * w];
                }
            },
            text: {
                func: function (data, view) {
                    //toFixed
                    //'attr@point'
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var u = data.a('unit');
                            if (u && u != "")
                                return v + u;
                            else
                                return v;
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('ontext'), off = data.a('offtext');
                            if (on && off && on != "" && off != "") {
                                return v ? on : off;
                            }
                            else
                                return v.toString();
                        }
                        else if (typeof v == 'number') {
                            var u = data.a('unit');
                            if (u && u != "")
                                return v.toFixed(data.a('digcount')) + u;
                            else
                                return v.toFixed(data.a('digcount'));
                        }
                    }
                }
                , value: "0.0"
            },
            font: { func: 'style@font', value: 'bold 16px Arial' },
            align: { func: 'style@align', value: 'left' },
            vAlign: { func: 'style@vAlign', value: 'middle' },
            color: {
                func: function (data, view) {
                    if (data.tag) {
                        if (data.tag.alarm > 0) {
                            var s = data.a("alarm.color");
                            if (s != null && s != "") {
                                if (data.a("flash")) {
                                    return sys_blink ? s : data.s("color");
                                }
                                else
                                    return s;
                            }
                        }
                    }
                    return data.s("color");
                }, value: 'black'
            },
            digcount: { func: 'attr@digcount', value: 2 },
            unit: { func: 'attr@unit', value: '' },
            ontext: { func: 'attr@ontext', value: '' },
            offtext: { func: 'attr@offtext', value: '' }
        }
    ]
});

ht.Default.setImage('onoff', {
    width: { func: 'field@_width', value: 40 },
    height: { func: 'field@_height', value: 20 },
    comps: [
        {
            type: 'text',
            rect: {
                func: function (data, view) {
                    var width = data.getWidth(),
                        height = data.getHeight();
                    return [0, 0, width, height];
                }
            },
            text: {
                func: function (data, view) {
                    var v = data.a("tagvalue");
                    var on = data.a('ontext') || "ON", off = data.a('offtext') || "OFF";
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            return v;
                        }
                        else if (typeof v == 'boolean') {
                            return v ? on : off;
                        }
                        else if (typeof v == 'number') {
                            if (v == 0)
                                return off;
                            else
                                return on;
                        }
                    }
                }
                , value: "OFF"
            },
            font: { func: 'style@font', value: 'bold 18px Arial' },
            align: { func: 'style@align', value: 'left' },
            vAlign: { func: 'style@vAlign', value: 'middle' },
            color: { func: 'style@color', value: 'black' },
            ontext: { func: 'attr@ontext', value: '' },
            offtext: { func: 'attr@offtext', value: '' }
        }
    ]
});

//断路器
ht.Default.setImage('Breaker', {
    width: { func: 'field@_width', value: 30 },
    height: { func: 'field@_height', value: 50 },
    comps: [
        {
            type: 'rect',
            rect: {
                func: function (data, view) {
                    var width = data.getWidth(),
                        height = data.getHeight();
                    return [0, 0, width, height];
                }
            },
            background: {
                func: function (data) {
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v == "true")
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'number') {
                            if (v > 0)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                    }
                },
                value: '#FF0000'
            },
            "gradient": { "func": "arrt@gradient" },
            "gradientColor": {
                "value": "#FFF",
                "func": "attr@gradientColor"
            }
        }
    ]
});

//手车
ht.Default.setImage('Handcart', {
    width: 60,
    height: 100,
    comps: [
        {
            type: 'shape',
            borderWidth: { "func": "attr@borderWidth", value: 2 },
            borderColor: {
                func: function (data) {
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v == "true")
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'number') {
                            if (v > 0)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                    }
                },
                value: 'red'
            },
            points: {
                func: function (data) {
                    var width = 60,
                        height = 100;

                    var width2 = width * 0.5,
                        height3 = (height - 10) / 3,
                        height6 = height3 * 0.5;

                    return [
                        width2, 5,
                        width2, 5 + height3,
                        width2, 5 + height3 * 2,
                        width2, height - 5,

                        5, 5 + height6,
                        width2, 5 + height3,
                        width - 5, 5 + height6,

                        5, 5 + height6 + height3,
                        width2, 5 + height3 * 2,
                        width - 5, 5 + height6 + height3
                    ];
                }
            },
            segments: [
                1, 2, 1, 2,
                1, 2, 2,
                1, 2, 2
            ]
        }
    ]
});

//刀闸
ht.Default.setImage('SwitchSimple', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'shape',
            borderWidth: { "func": "attr@borderWidth", value: 2 },
            borderColor: {
                func: 'attr@borderColor',
                value: 'red'
            },
            points: {
                func: function (data) {
                    var width = 100,
                        height = 100;

                    var width2 = width * 0.5,
                        height5 = (height - 10) * 0.2,
                        twidth2 = height5 * 3 * Math.tan(Math.PI / 180 * 20) - 5;

                    return [
                        width2, 5,
                        width2, 5 + height5,

                        width2, height - 5,
                        width2, height - 5 - height5,

                        width2 - twidth2, height - 5 - height5,
                        width2 + twidth2, height - 5 - height5,

                        width2 - 2, 5 + height5 + 1,
                        width2 + 2, 5 + height5 + 1
                    ];
                }
            },
            segments: [
                1, 2,
                1, 2,
                1, 2,
                1, 2
            ]
        },
        {
            type: 'shape',
            borderWidth: { "func": "attr@borderWidth", value: 2 },
            borderColor: {
                func: 'attr@borderColor',
                value: 'red'
            },
            rotation: {
                func: 'attr@rotation'
            },
            points: {
                func: function (data) {
                    var width = 100,
                        height = 100;

                    var width2 = width * 0.5,
                        height5 = (height - 10) * 0.2,
                        length = (height5 * 3) / Math.cos(Math.PI / 9);

                    return [
                        width2, 5 + height5 - length,
                        width2, 5 + height5,
                        width2, 5 + height5 + length
                    ];
                }
            },
            segments: [1, 1, 2]
        },
        {
            type: 'circle',
            background: {
                func: 'attr@borderColor',
                value: 'red'
            },
            rect: {
                func: function (data) {
                    var width = 100,
                        height = 100;

                    var width2 = width * 0.5,
                        height5 = (height - 10) * 0.2;

                    return [width2 - 6, height5 - 1, 12, 12];
                }
            }
        },
        {
            type: 'circle',
            background: 'white',
            rect: {
                func: function (data) {
                    var width = 100,
                        height = 100;

                    var width2 = width * 0.5,
                        height5 = (height - 10) * 0.2;

                    return [width2 - 2, height5 + 3, 4, 4];
                }
            }
        }
    ]
});

//接地线
ht.Default.setImage('EarthWire', {
    width: 100,
    height: 64,
    comps: [
        {
            type: 'rect',
            background: {
                func: function (data) { return data.a('background'); },
                value: '#2C97DE'
            },
            rect: [5, 5, 90, 10]
        },
        {
            type: 'rect',
            background: {
                func: function (data) { return data.a('background'); },
                value: '#2C97DE'
            },
            rect: [17, 27, 66, 10]
        },
        {
            type: 'rect',
            background: {
                func: function (data) { return data.a('background'); },
                value: '#2C97DE'
            },
            rect: [29, 49, 42, 10]
        }
    ]
});

ht.Default.setImage('PT', {
    width: 100, //{ func : 'field@_width', value : 100 },
    height: 100, //{ func : 'field@_height', value : 100 },
    comps: [
        {
            type: 'image',
            name: 'CirLine',
            color: {
                func: function (data) {
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v == "true")
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'number') {
                            if (v > 0)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                    }
                },
                value: '#FF0000'
            },
            rect: {
                func: function (data) {
                    var width = 100 - 10,
                        height = 100 - 10,
                        size = Math.min(width, height),
                        size2 = size * 0.5,
                        size50 = size * 0.02;

                    return [(width - size2) * 0.5 + 5, 5 + size50, size2, size2];
                }
            }
        },
        {
            type: 'image',
            name: 'CirLine',
            color: {
                func: function (data) {
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v == "true")
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'number') {
                            if (v > 0)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                    }
                },
                value: '#FF0000'
            },
            rect: {
                func: function (data) {
                    var width = 100 - 10,
                        height = 100 - 10,
                        size = Math.min(width, height),
                        size2 = size * 0.5,
                        size50 = size * 0.02;

                    return [(width - size2) * 0.5 + 5, height + 5 - size2, size2, size2];
                }
            }
        },
        {
            type: 'image',
            name: 'CirLine',
            color: {
                func: function (data) {
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v == "true")
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'number') {
                            if (v > 0)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                    }
                },
                value: '#FF0000'
            },
            rect: {
                func: function (data) {
                    var width = 100 - 10,
                        height = 100 - 10,
                        size = Math.min(width, height),
                        size2 = size * 0.5;

                    return [5, (height - size2) * 0.5 + 5, size2, size2];
                }
            }
        },
        {
            type: 'image',
            name: 'CirTri',
            color: {
                func: function (data) {
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v == "true")
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'number') {
                            if (v > 0)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                    }
                },
                value: '#FF0000'
            },
            rotation: Math.PI * 0.5,
            rect: {
                func: function (data) {
                    var width = 100 - 10,
                        height = 100 - 10,
                        size = Math.min(width, height),
                        size2 = size * 0.5;

                    return [width + 5 - size2, (height - size2) * 0.5 + 5, size2, size2];
                }
            }
        }
    ]
});

//变压器
ht.Default.setImage('Transformer', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'image',
            name: 'CirLine',
            color: {
                func: function (data) {
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v == "true")
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'number') {
                            if (v > 0)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                    }
                },
                value: 'red'
            },
            rect: {
                func: function (data) {
                    var width = 100 - 10,
                        height = 100 - 10,
                        size = Math.min(width, height),
                        size2 = size * 4 / 7,
                        h = 3 / 4 * size2,
                        dis = h / Math.sin(Math.PI / 3);

                    return [5 + (width - size2) * 0.5, 5, size2, size2];
                }
            }
        },
        {
            type: 'image',
            name: 'CirLine',
            color: {
                func: function (data) {
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v == "true")
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'number') {
                            if (v > 0)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                    }
                },
                value: 'red'
            },
            rect: {
                func: function (data) {
                    var width = 100 - 10,
                        height = 100 - 10,
                        size = Math.min(width, height),
                        size2 = size * 4 / 7,
                        h = 3 / 4 * size2,
                        dis = h / Math.sin(Math.PI / 3);

                    return [5 + (width - size2) * 0.5, height + 5 - size2, size2, size2];
                }
            }
        }
    ]
});


//逆变器
ht.Default.setImage('Inverter', {
    width: 80, //{ func : 'field@_width', value : 80 },
    height: 100, //{ func : 'field@_height', value : 100 },
    comps: [
        {
            type: 'shape',
            borderWidth: 4,
            borderColor: {
                func: function (data) {
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v == "true")
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'number') {
                            if (v > 0)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                    }
                },
                value: 'red'
            },
            points: {
                func: function (data) {
                    var width = 80 - 10,
                        height = 100 - 10;

                    return [
                        5, 5,
                        5 + width, 5,
                        5 + width, 5 + height,
                        5, 5 + height,
                        5, 5,
                        5 + width, 5 + height
                    ];
                }
            },
            segments: [1, 2, 2, 2, 2, 2]
        },
        {
            type: 'text',
            text: 'AC',
            rect: {
                func: function (data) {
                    var height = 100,
                        width = 80;
                    var height2 = (height - 10) * 0.5;
                    return [5, 5, width - 15, height2];
                }
            },
            align: 'right',
            vAlign: 'middle',
            color: {
                func: function (data) {
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v == "true")
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'number') {
                            if (v > 0)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                    }
                },
                value: 'red'
            },
            font: 'bold 20px Arial'
        },
        {
            type: 'text',
            text: 'DC',
            rect: {
                func: function (data) {
                    var height = 100,
                        width = 80;

                    var height2 = (height - 10) * 0.5;

                    return [10, 5 + height2, width - 15, height2];
                }
            },
            align: 'left',
            vAlign: 'middle',
            color: {
                func: function (data) {
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v == "true")
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'number') {
                            if (v > 0)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                    }
                },
                value: 'red'
            },
            font: 'bold 20px Arial'
        }
    ]
});

//进度条控件
ht.Default.setImage('Progress', {
    width: { func: 'field@_width', value: 100 },
    height: { func: 'field@_height', value: 20 },
    comps: [
        {
            type: 'roundRect',
            cornerRadius: { func: 'attr@cornerRadius', value: 5 },
            background: { func: 'attr@background', value: ht.Color.imageBackground },
            gradientColor: { func: 'attr@bgradientcolor', value: 'white' },
            gradient: { func: 'attr@bgradient' },
            rect: {
                func: function (data) {
                    var width = data.getWidth(),
                        height = data.getHeight(),
                        padding = data.a('padding');
                    padding = (typeof padding === 'number') ? padding : 2;
                    return [padding, padding, width - 2 * padding, height - 2 * padding];
                }
            }
        },
        {
            type: 'roundRect',
            cornerRadius: { func: 'attr@cornerRadius', value: 5 },
            background: { func: 'attr@foreground', value: 'green' },
            gradientColor: { func: 'attr@fgradientcolor', value: 'white' },
            gradient: { func: 'attr@fgradient' },
            rect: {
                func: function (data) {
                    var value = data.a('tagvalue');
                    if (typeof value == 'string')
                        value = parseFloat(value) || 50;
                    else if (value == null)
                        value = 50;
                    var width = data.getWidth(),
                        height = data.getHeight(),
                        padding = data.a('padding'),
                        maxValue = data.a('maxValue') == null ? 100 : data.a('maxValue'),
                        minValue = data.a('minValue') == null ? 0 : data.a('minValue');
                    if (value > maxValue)
                        value = maxValue;
                    if (value < minValue)
                        value = minValue;
                    var progress = (value - minValue) / (maxValue - minValue);
                    progress = progress > 1 ? 1 : progress;
                    padding = (typeof padding === 'number') ? padding : 2;
                    return [
                        padding, padding,
                        (width - 2 * padding) * progress,
                        height - 2 * padding
                    ];
                }
            }
        }
    ]
});

//风机
ht.Default.setImage('Blade', 'images/blade.png');

ht.Default.setImage('Fan', {
    width: 100,
    height: 150,
    comps: [
        {
            type: 'trapezoid',
            rect: [46, 60, 8, 89],
            background: '#F5F2EC',
            borderWidth: 1,
            borderColor: '#45423B'
        },
        {
            type: 'trapezoid',
            rect: [43, 145, 14, 4],
            background: '#F5F2EC',
            borderWidth: 1,
            borderColor: '#45423B'
        },
        {
            type: 'rect',
            rect: [47, 50, 6, 12],
            background: '#F5F2EC',
            borderWidth: 1,
            borderColor: '#45423B'
        },
        {
            type: 'image',
            name: 'Blade',
            stretch: 'centerUniform',
            rect: [1, 1, 98, 98],
            rotation: { func: 'attr@rotation', value: 0 }
        }
    ]
});

//风机矩阵
ht.Default.setImage('BoxFan', {
    width: 130,
    height: 60,
    comps: [
        {
            type: 'roundRect',
            background: 'white',
            shadow: true,
            rect: {
                func: function (data) {
                    var width = 130,
                        height = 60;

                    return [0, 0, width - 4, height - 4];
                }
            }
        },
        {
            type: 'roundRect',
            background: '#00FE2A',
            gradientColor: '#03B224',
            gradient: 'linear.south',
            rect: {
                func: function (data) {
                    var width = 130,
                        height = 60,
                        w3 = width / 3;

                    return [0, 0, w3, height - 4];
                }
            }
        },
        {
            type: 'image',
            name: 'Fan',
            rect: {
                func: function (data) {
                    var width = 130,
                        height = 60,
                        w3 = width / 3;

                    return [0, 5, w3 - 5, height - 14];
                }
            }
        },
        {
            type: 'text',
            rect: {
                func: function (data, view) {
                    var width = 130,
                        height = 60,
                        w3 = width / 3;

                    return [5 + w3, 5, width - w3 - 10, 12];
                }
            },
            align: 'left',
            vAlign: 'middle',
            color: { func: 'attr@textColor', value: 'black' },
            font: 'bold 9px Arial',
            text: { func: 'attr@name', value: '名称' }
        },
        {
            type: 'text',
            rect: {
                func: function (data, view) {
                    var width = 130,
                        height = 60,
                        w3 = width / 3;

                    return [5 + w3, 20, width - w3 - 15, 10];
                }
            },
            align: 'right',
            vAlign: 'middle',
            color: { func: 'attr@textColor', value: 'black' },
            font: '9px Arial',
            text: {
                func: function (data) {
                    if (data.values) {
                        var speed = data.values[1];
                        if (typeof speed != 'number') return null;
                        return speed.toFixed(2) + ' m/s';
                    }
                },
                value: '0 m/s'
            }
        },
        {
            type: 'shape',
            borderWidth: 2,
            borderColor: 'black',
            borderCap: 'round',
            points: {
                func: function (data) {
                    var width = 130,
                        w3 = width / 3;
                    return [5 + w3, 32, width - 10, 32];
                }
            },
            segments: [1, 2]
        },
        {
            type: 'shape',
            borderWidth: 2,
            borderColor: '#32DFFF',
            borderCap: 'round',
            points: {
                func: function (data) {
                    var width = 130,
                        w3 = width / 3,
                        maxSpeed = data.a('maxSpeed') || 100,
                        speed = 0;
                    if (data.values)
                        sp = data.values[1];
                    speed = speed > maxSpeed ? maxSpeed : speed;
                    var length = speed / maxSpeed * (width - 15 - w3);

                    return [5 + w3, 32, 5 + w3 + length, 32];
                }
            },
            segments: [1, 2]
        },
        {
            type: 'text',
            rect: {
                func: function (data, view) {
                    var width = 130,
                        height = 60,
                        w3 = width / 3;

                    return [5 + w3, 34, width - w3 - 15, 10];
                }
            },
            align: 'right',
            vAlign: 'middle',
            color: { func: 'attr@textColor', value: 'black' },
            font: '9px Arial',
            text: {
                func: function (data) {
                    if (data.values) {
                        var power = data.values[2];
                        if (typeof power != 'number') return null;
                        return power.toFixed(1) + ' kW';
                    }
                },
                value: '0 kW'
            }
        },
        {
            type: 'shape',
            borderWidth: 2,
            borderColor: 'black',
            borderCap: 'round',
            points: {
                func: function (data) {
                    var width = 130,
                        w3 = width / 3;

                    return [5 + w3, 46, width - 10, 46];
                }
            },
            segments: [1, 2]
        },
        {
            type: 'shape',
            borderWidth: 2,
            borderColor: '#32DFFF',
            borderCap: 'round',
            points: {
                func: function (data) {
                    var width = 130,
                        w3 = width / 3,
                        maxPower = data.a('maxPower') || 2000,
                        power = 0;
                    if (data.values)
                        po = data.values[2];
                    power = power > maxPower ? maxPower : power;
                    var length = power / maxPower * (width - 15 - w3);
                    return [5 + w3, 46, 5 + w3 + length, 46];
                }
            },
            segments: [1, 2]
        }
    ]
});

//箱变
ht.Default.setImage('BoxSubstation', {
    width: 100, //{ func : 'field@_width', value : 100 },
    height: 100, //{ func : 'field@_height', value : 100 },
    comps: [
        {
            type: 'image',
            name: 'CirTri',
            color: {
                func: function (data) {
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v == "true")
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'number') {
                            if (v > 0)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                    }
                },
                value: '#FF0000'
            },
            rect: {
                func: function (data) {
                    var width = 100 - 10,
                        height = 100 - 10,
                        size = Math.min(width, height),
                        size2 = size * 4 / 7;

                    return [(width - size2) * 0.5 + 5, 5, size2, size2];
                }
            }
        },
        {
            type: 'image',
            name: 'CirLine',
            color: {
                func: function (data) {
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v == "true")
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'number') {
                            if (v > 0)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                    }
                },
                value: '#FF0000'
            },
            rect: {
                func: function (data) {
                    var width = 100 - 10,
                        height = 100 - 10,
                        size = Math.min(width, height),
                        size2 = size * 4 / 7,
                        h = 3 / 4 * size2,
                        dis = h / Math.sin(Math.PI / 3);

                    return [5 + width * 0.5 - dis * 0.5 - size2 * 0.5, height + 5 - size2, size2, size2];
                }
            }
        },
        {
            type: 'image',
            name: 'CirLine',
            color: {
                func: function (data) {
                    var v = data.a("tagvalue");
                    if (typeof v != "undefined") {
                        if (typeof v == 'string') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v == "true")
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'boolean') {
                            var on = data.a('oncolor'), off = data.a('offcolor');
                            if (v)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                        else if (typeof v == 'number') {
                            if (v > 0)
                                return on || '#FF0000';
                            else
                                return off || '#00FF00';
                        }
                    }
                },
                value: '#FF0000'
            },
            rect: {
                func: function (data) {
                    var width = 100 - 10,
                        height = 100 - 10,
                        size = Math.min(width, height),
                        size2 = size * 4 / 7,
                        h = 3 / 4 * size2,
                        dis = h / Math.sin(Math.PI / 3);

                    return [5 + width * 0.5 + (dis - size2) * 0.5, height + 5 - size2, size2, size2];
                }
            }
        }
    ]
});

ht.Switch = function () {
    ht.Switch.superClass.constructor.call(this);
    this.s('switch.angle', 0);
};

ht.Default.def('ht.Switch', ht.Node, {
    _image: 'switch',
    _icon: 'switch',

    toggle: function (anim) {
        this.setExpanded(!this.isExpanded(), anim);
    },
    isExpanded: function () {
        return this.s('switch.angle') !== 0;
    },
    setExpanded: function (expanded, anim) {
        if (anim == null) {
            anim = true;
        }
        var self = this,
            animation = self._animation,
            oldValue = self.isExpanded();

        if (animation) {
            animation.stop(true);
            delete self._animation;
        }

        if (oldValue !== expanded) {
            var targetAngle = expanded ? -Math.PI / 4 : 0;

            if (anim) {
                oldValue = self.s('switch.angle');
                self._animation = ht.Default.startAnim({
                    action: function (t) {
                        self.s('switch.angle', oldValue + (targetAngle - oldValue) * t);
                    }
                });
            } else {
                self.s('switch.angle', targetAngle);
            }
        }
    }
});

//饼图
ht.Default.setImage('饼图', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'pieChart',
            rect: [10, 10, 80, 80],
            label: function (value, i, sum, data) { return value; },
            labelColor: { func: 'style@labelColor', value: 'white' },
            shadow: { func: 'style@shadow', value: true },
            shadowColor: { func: 'style@shadowColor', value: 'rgba(0, 0, 0, 0.5)' },
            values: { func: 'style@values', value: [20, 30, 40, 50] },
            colors: { func: 'style@colors' },
            hollow: { func: 'style@hollow', value: false },
            startAngle: { func: 'style@startAngle', value: 0 },
            labelFont: { func: 'style@labelFont', value: '10px Arial' }
        }
    ]
});

//柱状图
ht.Default.setImage('柱状图', {
    width: 200,
    height: 100,
    comps: [
        {
            type: 'columnChart',
            rect: [0, 20, 200, 80],
            label: function (value, i, sum, data) { return value; },
            labelColor: { func: 'style@labelColor', value: 'black' },
            minValue: { func: 'style@minValue', value: 0 },
            maxValue: { func: 'style@maxValue' },
            labelFont: { func: 'style@labelFont', value: '10px Arial' },
            series: { func: 'attr@series', value: [{ values: [20, 30, 40, 50], colors: ['red', 'blue', 'green', 'black'] }] },
        }
    ]
});

//折线图
ht.Default.setImage('折线图', {
    width: 300,
    height: 150,
    comps: [
        {
            type: 'lineChart',
            rect: [10, 20, 280, 130],
            label: function (value, i, sum, data) { return value; },
            labelColor: { func: 'style@labelColor', value: 'black' },
            minValue: { func: 'style@minValue', value: 0 },
            maxValue: { func: 'style@maxValue' },
            labelFont: { func: 'style@labelFont', value: '10px Arial' },
            series: { func: 'attr@series', value: [{ color: 'red', values: [60, 80, 70, 50, 90, 30, 20, 80] }, { color: 'blue', values: [160, 180, 170, 150, 190, 130, 120, 180] }] },
            lineWidth: { func: 'style@lineWidth', value: 2 },
            line3d: { func: 'style@line3d', value: false },
            linePoint: { func: 'style@linePoint', value: true },
        }
    ]
});

//堆栈柱状图
ht.Default.setImage('堆栈柱状图', {
    width: 300,
    height: 150,
    comps: [
        {
            type: 'stackedColumnChart',
            rect: [10, 20, 280, 130],
            label: function (value, i, sum, data) { return value; },
            labelColor: { func: 'style@labelColor', value: 'black' },
            maxValue: { func: 'style@maxValue' },
            labelFont: { func: 'style@labelFont', value: '10px Arial' },
            series: { func: 'attr@series', value: [{ color: 'red', values: [60, 80, 70, 50, 90] }, { color: 'blue', values: [160, 180, 170, 150, 190] }] }
        }
    ]
});

//百分比柱状图
ht.Default.setImage('百分比柱状图', {
    width: 300,
    height: 150,
    comps: [
        {
            type: 'percentageColumnChart',
            rect: [10, 20, 280, 130],
            label: function (value, i, sum, data) { return value; },
            labelColor: { func: 'style@labelColor', value: 'black' },
            labelFont: { func: 'style@labelFont', value: '10px Arial' },
            series: { func: 'attr@series', value: [{ color: 'red', values: [60, 80, 70, 50, 90] }, { color: 'blue', values: [160, 180, 170, 150, 190] }] }
        }
    ]
});

ht.Default.setImage('UserShape', {
    "width": 100,
    "height": 100,
    "comps": [
        {
            "type": "shape",
            "rect": [5, 5, 90, 90],
            "points": { "func": "style@points", value: [5, 5, 40, 30, 40, 5, 5, 30] },
            "segments": { "func": "style@segments", value: [1, 2, 2, 2, 5] },
            "background": { "func": "style@shape.background" },
            "borderWidth": { "func": "style@shape.border.width", value: 2 },
            "borderColor": { "func": "style@shape.border.color", value: 'black' },
            "gradient": { "func": "style@shape.gradient" },
            "borderCap": { "func": "style@shape.border.cap" },
            "gradientColor": { "func": "style@shape.gradient.color" },
            "borderJoin": { "func": "style@shape.border.join" },
            "borderPattern": { "func": "style@shape.border.pattern" },
            "repeatImage": { "func": "style@shape.repeat.image" },
            "dash": { "func": "style@shape.dash" },
            "border3d": { "func": "style@shape.border.3d" },
            "dash3d": { "func": "style@shape.dash.3d" },
            "dashPattern": { "func": "style@shape.dash.pattern" },
            "dashOffset": { "func": "style@shape.dash.offset" },
            "dashColor": { "func": "style@shape.dash.color" },
            "dashWidth": { "func": "style@shape.dash.width" },
        }
    ]
});

ht.Default.setImage('BPT', {
    'width': 510,
    'height': 510,
    "comps": [
        {
            "type": "shape",
            "rect": [5, 5, 500, 500],
            "points": {
                func: function (data) {
                    if (data.a("point")) {
                        var ar = data.a("point");
                        var lst = new ht.List();
                        var dlt = Math.PI * 2 / 20;
                        var current = 0;
                        for (i = 0; i < 20; i++) {
                            var x = Math.cos(current) * ar[i] * 250;
                            var y = Math.sin(current) * ar[i] * 250;
                            current += dlt;
                            lst.add(x);
                            lst.add(y);
                        }
                        lst.add(250); lst.add(0);
                        lst.add(0); lst.add(-250);
                        lst.add(-250); lst.add(0);
                        lst.add(0); lst.add(250);
                        return lst.toArray();
                    }
                    else {
                        var lst = new ht.List();
                        var dlt = Math.PI * 2 / 20;
                        var w = 250 * 0.6;
                        var current = 0;
                        for (i = 0; i < 20; i++) {
                            var x = Math.cos(current) * w;
                            var y = Math.sin(current) * w;
                            current += dlt;
                            lst.add(x);
                            lst.add(y);
                        }
                        lst.add(250); lst.add(0);
                        lst.add(0); lst.add(-250);
                        lst.add(-250); lst.add(0);
                        lst.add(0); lst.add(250);
                        return lst.toArray();
                    }
                }
            },
            "segments": { "func": "style@segments", value: [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, , 2, 5] },
            //"background": {"func":"style@shape.background" },
            "borderWidth": 2,//{"func": "style@shape.border.width", value: 2 },
            "borderColor": '#00FFFF',//{ "func": "style@shape.border.color", value: 'black' },
            "gradient": { "func": "style@shape.gradient" },
            "borderCap": { "func": "style@shape.border.cap" },
            "gradientColor": { "func": "style@shape.gradient.color" },
            "borderJoin": { "func": "style@shape.border.join" },
            "borderPattern": { "func": "style@shape.border.pattern" },
            "repeatImage": { "func": "style@shape.repeat.image" },
            "dash": { "func": "style@shape.dash" },
            "border3d": { "func": "style@shape.border.3d" },
            "dash3d": { "func": "style@shape.dash.3d" },
            "dashPattern": { "func": "style@shape.dash.pattern" },
            "dashOffset": { "func": "style@shape.dash.offset" },
            "dashColor": { "func": "style@shape.dash.color" },
            "dashWidth": { "func": "style@shape.dash.width" },
        }
    ]
});

ht.Default.setImage('arrow1', {
    width: 100,
    height: 50,
    comps: [
        {
            type: 'shape',
            points: [2, 25, 30, 25],
            borderWidth: 4,
            borderColor: 'rgba(255, 0, 0, 0.9)'
        },
        {
            type: 'shape',
            points: [30, 10, 30, 40, 50, 25, 30, 10],
            background: 'rgba(255, 0, 0, 0.9)',
            borderWidth: 1,
            borderColor: 'red',
            gradient: 'spread.vertical',
            gradientColor: 'rgba(255, 255, 255, 0.9)'
        }
    ]
});

ht.Default.setImage('targetArrow1', {
    width: 40,
    height: 20,
    comps: [
        {
            type: 'image',
            name: 'arrow1',
            rect: [0, 0, 40, 20]
        }
    ]
});

ht.Default.setImage('sourceArrow1', {
    width: 40,
    height: 20,
    comps: [
        {
            type: 'image',
            name: 'arrow1',
            rect: [0, 0, 40, 20],
            rotation: Math.PI
        }
    ]
});

ht.Default.setImage('arrow2', {
    width: 100,
    height: 50,
    comps: [
        {
            type: 'shape',
            points: [2, 25, 30, 25],
            borderWidth: 4,
            borderColor: 'rgba(255, 0, 0, 0.9)'
        },
        {
            type: 'shape',
            points: [15, 5, 30, 25, 15, 45, 50, 25, 15, 5],
            background: 'yellow',
            borderWidth: 1,
            borderColor: 'red'
        }
    ]
});

ht.Default.setImage('targetArrow2', {
    width: 40,
    height: 16,
    comps: [
        {
            type: 'image',
            name: 'arrow2',
            rect: [0, 0, 40, 16]
        }
    ]
});

ht.Default.setImage('sourceArrow2', {
    width: 40,
    height: 16,
    comps: [
        {
            type: 'image',
            name: 'arrow2',
            rect: [0, 0, 40, 16],
            rotation: Math.PI
        }
    ]
});

ht.Default.setImage('alarmIcon-big', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'triangle',
            rect: [2, 2, 96, 96],
            background: {
                value: 'red',
                func: 'attr@alarm.color'
            }
        },
        {
            type: 'rect',
            rect: [45, 30, 10, 40],
            background: 'white'
        },
        {
            type: 'circle',
            rect: [40, 72, 20, 20],
            background: 'white'
        }
    ]
});

ht.Default.setImage('alarmIcon', {
    width: 16,
    height: 16,
    comps: [
        {
            type: 'image',
            rect: [0, 0, 16, 16],
            name: 'alarmIcon-big'
        }
    ]
});

ht.Default.setImage('text', {
    width: 50,
    height: 50,
    comps: [
        {
            type: "text",
            text: "Text",
            align: "center",
            font: "26px Arial",
            rect: [0, 0, 50, 50]
        }
    ]
});

ht.Default.setImage('switch', {
    width: 100,
    height: 50,
    comps: [
        {
            type: 'roundRect',
            rect: [0, 0, 100, 50],
            background: '#2C3E50',
            gradient: 'linear.north'
        },
        {
            type: 'circle',
            rect: [10, 10, 10, 10],
            background: '#34495E',
            gradient: 'radial.center'
        },
        {
            type: 'circle',
            rect: [80, 10, 10, 10],
            background: '#34495E',
            gradient: 'radial.center'
        },
        {
            type: 'shape',
            points: [10, 40, 40, 40],
            borderWidth: 8,
            borderColor: '#40ACFF',
            border3d: true
        },
        {
            type: 'shape',
            points: [60, 40, 90, 40],
            borderWidth: 8,
            borderColor: '#40ACFF',
            border3d: true
        },
        {
            type: 'shape',
            points: [5, 40, 35, 40, 65, 40],
            segments: [1, 1, 2],
            borderWidth: 8,
            borderColor: '#40ACFF',
            border3d: true,
            borderCap: 'round',
            rotation: {
                value: -Math.PI / 4,
                func: 'style@switch.angle'
            }
        },
        {
            type: 'circle',
            rect: [30, 35, 10, 10],
            borderColor: 'red',
            borderWidth: 5,
            border3d: true
        },
        {
            type: 'circle',
            rect: [60, 35, 10, 10],
            borderColor: 'red',
            borderWidth: 5,
            border3d: true
        }
    ]
});

ht.Default.setImage('cloud', {
    "width": 72,
    "height": 45,
    "comps": [
        {
            "type": "shape",
            "points": [
                9,
                42,
                0.3,
                38.4,
                2.4,
                28.8,
                5.7,
                21.6,
                11.7,
                22.5,
                11.7,
                15.9,
                16.8,
                13.8,
                21.6,
                12,
                24.3,
                15.9,
                27.9,
                3,
                42.3,
                3,
                59.4,
                4.5,
                57.3,
                18.3,
                69.9,
                18.9,
                69.9,
                27.3,
                69.9,
                38.4,
                64.2,
                41.4
            ],
            "segments": [
                1,
                3,
                3,
                3,
                3,
                3,
                3,
                3,
                3
            ],
            "gradient": "linear.northeast",
            "background": "#3498DB",
            "borderWidth": 0.5,
            "borderColor": 'black'
        }
    ]
});

ht.Default.setImage('rectIcon', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'rect',
            rect: [0, 20, 100, 80],
            borderWidth: 1,
            background: ht.Color.imageBackground
        }
    ]
});

ht.Default.setImage('roundRectIcon', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'roundRect',
            rect: [0, 20, 100, 80],
            borderWidth: 1,
            background: ht.Color.imageBackground
        }
    ]
});

ht.Default.setImage('circleIcon', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'circle',
            rect: [0, 0, 100, 100],
            borderWidth: 1,
            background: ht.Color.imageBackground
        }
    ]
});

ht.Default.setImage('ovalIcon', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'oval',
            rect: [0, 20, 100, 80],
            borderWidth: 1,
            background: ht.Color.imageBackground
        }
    ]
});

ht.Default.setImage('triangleIcon', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'triangle',
            rect: [0, 0, 100, 100],
            borderWidth: 1,
            background: ht.Color.imageBackground
        }
    ]
});

ht.Default.setImage('trapezoidIcon', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'trapezoid',
            rect: [0, 0, 100, 100],
            borderWidth: 1,
            background: ht.Color.imageBackground
        }
    ]
});

ht.Default.setImage('parallelogramIcon', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'parallelogram',
            rect: [0, 0, 100, 100],
            borderWidth: 1,
            background: ht.Color.imageBackground
        }
    ]
});

ht.Default.setImage('rightTriangleIcon', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'rightTriangle',
            rect: [0, 0, 100, 100],
            borderWidth: 1,
            background: ht.Color.imageBackground
        }
    ]
});

ht.Default.setImage('hexagonIcon', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'hexagon',
            rect: [0, 0, 100, 100],
            borderWidth: 1,
            background: ht.Color.imageBackground
        }
    ]
});

ht.Default.setImage('pentagonIcon', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'pentagon',
            rect: [0, 0, 100, 100],
            borderWidth: 1,
            background: ht.Color.imageBackground
        }
    ]
});

ht.Default.setImage('diamondIcon', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'diamond',
            rect: [0, 0, 100, 100],
            borderWidth: 1,
            background: ht.Color.imageBackground
        }
    ]
});

ht.Default.setImage('starIcon', {
    width: 100,
    height: 100,
    comps: [
        {
            type: 'star',
            rect: [0, 0, 100, 100],
            borderWidth: 1,
            background: ht.Color.imageBackground
        }
    ]
});

ht.Default.setImage('roundRectTemplate', {
    width: { func: 'field@_width', value: 100 },
    height: { func: 'field@_height', value: 100 },
    comps: [
        {
            type: 'roundRect',
            borderColor: { func: 'style@shape.border.color', value: '#1ABC9C' },
            borderWidth: { func: 'style@shape.border.width', value: 2 },
            background: { func: 'style@shape.background', value: 'white' },
            gradient: { func: 'style@shape.gradient' },
            gradientColor: { func: 'style@shape.gradient.color' },
            cornerRadius: { func: 'style@shape.corner.radius' },
            dash: { func: 'style@shape.dash' },
            dashPattern: { func: 'style@shape.dash.pattern' },
            dashOffset: { func: 'style@shape.dash.offset' },
            dashColor: { func: 'style@shape.dash.color' },
            dashWidth: { func: 'style@shape.dash.width', value: 1 },

            rect: {
                func: function (data) {
                    var width = data.getWidth(),
                        height = data.getHeight();
                    return [2, 2, width - 4, height - 4];
                }
            }
        }
    ]
});

ht.Default.setImage('arcTemplate', {
    width: { func: 'field@_width', value: 100 },
    height: { func: 'field@_height', value: 100 },
    comps: [
        {
            type: 'arc',
            borderColor: { func: 'style@shape.border.color', value: 'black' },
            borderWidth: { func: 'style@shape.border.width', value: 1 },
            background: { func: 'style@shape.background', value: 'white' },
            arcFrom: { func: 'style@arcFrom', value: Math.PI },
            arcTo: { func: 'style@arcTo', value: 0 },
            arcClose: { func: 'style@arcClose', value: false },
            arcOval: { func: 'style@arcOval', value: false },
            gradient: { func: 'style@shape.gradient' },
            gradientColor: { func: 'style@shape.gradient.color' },
            dash: { func: 'style@shape.dash' },
            dashPattern: { func: 'style@shape.dash.pattern' },
            dashOffset: { func: 'style@shape.dash.offset' },
            dashColor: { func: 'style@shape.dash.color' },
            dashWidth: { func: 'style@shape.dash.width', value: 1 },
            rect: {
                func: function (data) {
                    var width = data.getWidth(),
                        height = data.getHeight();
                    return [2, 2, width - 4, height - 4];
                }
            }
        }
    ]
});

ht.Default.setImage('circleTemplate', {
    width: { func: 'field@_width', value: 100 },
    height: { func: 'field@_height', value: 100 },
    comps: [
        {
            type: 'oval',
            borderColor: { func: 'style@shape.border.color', value: '#1ABC9C' },
            borderWidth: { func: 'style@shape.border.width' },
            background: { func: 'style@shape.background', value: 'white' },
            gradient: { func: 'style@shape.gradient' },
            gradientColor: { func: 'style@shape.gradient.color' },
            dash: { func: 'style@shape.dash' },
            dashPattern: { func: 'style@shape.dash.pattern' },
            dashOffset: { func: 'style@shape.dash.offset' },
            dashColor: { func: 'style@shape.dash.color' },
            dashWidth: { func: 'style@shape.dash.width', value: 1 },
            rect: {
                func: function (data) {
                    var width = data.getWidth(),
                        height = data.getHeight();
                    return [2, 2, width - 4, height - 4];
                }
            }
        }
    ]
});


ht.Default.setImage("align_bottom", 16, 16, "images/toolbar/align_bottom.png");
ht.Default.setImage("align_even_horizontal", 16, 16, "images/toolbar/align_even_horizontal.png");
ht.Default.setImage("align_even_vertical", 16, 16, "images/toolbar/align_even_vertical.png");
ht.Default.setImage("align_horizontalcenter", 16, 16, "images/toolbar/align_horizontalcenter.png");
ht.Default.setImage("align_left", 16, 16, "images/toolbar/align_left.png");
ht.Default.setImage("align_right", 16, 16, "images/toolbar/align_right.png");
ht.Default.setImage("align_top", 16, 16, "images/toolbar/align_top.png");
ht.Default.setImage("align_verticalcenter", 16, 16, "images/toolbar/align_verticalcenter.png");
ht.Default.setImage("script", 64, 64, "images/script.png");
ht.Default.setImage("png", 64, 64, "images/png.png");
ht.Default.setImage("html", 16, 16, "images/icon/html.png");
ht.Default.setImage("number", 16, 16, "images/icon/number.png");
ht.Default.setImage("imgpng", 16, 15, "images/icon/img.png");
ht.Default.setImage("samewidth", 16, 16, "images/toolbar/samewidth.png");
ht.Default.setImage("sameheight", 16, 16, "images/toolbar/sameheight.png");
ht.Default.setImage("rect_icon", 16, 16, "images/icon/rect.png");
ht.Default.setImage("roundRect_icon", 16, 16, "images/icon/roundrect.png");
ht.Default.setImage("arc_icon", 16, 16, "images/icon/arc.png");
ht.Default.setImage("oval_icon", 16, 16, "images/icon/ovl.png");
ht.Default.setImage("circle_icon", 16, 16, "images/icon/cir.png");

ht.Default.setCompType('clock-face', function (g, rect, comp, data, view) {
    var cx = rect.x + rect.width / 2;
    var cy = rect.y + rect.height / 2;
    var theta = 0;
    var r = Math.min(rect.width, rect.height) / 2 * 0.92;

    g.strokeStyle = "#137";
    for (var i = 0; i < 60; i++) {
        g.beginPath();
        g.arc(
            cx + Math.cos(theta) * r,
            cy + Math.sin(theta) * r,
            i % 5 === 0 ? 4 : 1,
            0, Math.PI * 2, true);
        g.closePath();
        g.lineWidth = i % 5 === 0 ? 2 : 1;
        g.stroke();
        theta = theta + (6 * Math.PI / 180);
    }
});

ht.Default.setImage('clock', {
    width: 250,
    height: 250,
    comps: [
        {
            type: 'circle',
            relative: true,
            rect: [0, 0, 1, 1],
            background: 'yellow',
            gradient: 'linear.northeast'
        },
        {
            type: 'clock-face',
            relative: true,
            rect: [0, 0, 1, 1]
        },
        {
            type: function (g, rect, comp, data, view) {
                // get current time
                var date = data.a('date');
                if (!date) {
                    date = new Date();
                }

                var hours = date.getHours();
                var minutes = date.getMinutes();
                var seconds = date.getSeconds();
                hours = hours > 12 ? hours - 12 : hours;
                var hour = hours + minutes / 60;
                var minute = minutes + seconds / 60;
                var clockRadius = 125;

                // save current context
                g.save();

                g.translate(clockRadius, clockRadius);
                g.beginPath();

                // draw numbers
                g.font = '16px Arial';
                g.fillStyle = '#000';
                g.textAlign = 'center';
                g.textBaseline = 'middle';
                for (var n = 1; n <= 12; n++) {
                    var theta = (n - 3) * (Math.PI * 2) / 12;
                    var x = clockRadius * 0.75 * Math.cos(theta);
                    var y = clockRadius * 0.75 * Math.sin(theta);
                    g.fillText(n, x, y);
                }

                // draw hour
                g.save();
                var theta = (hour - 3) * 2 * Math.PI / 12;
                g.rotate(theta);
                g.beginPath();
                g.moveTo(-15, -5);
                g.lineTo(-15, 5);
                g.lineTo(clockRadius * 0.5, 1);
                g.lineTo(clockRadius * 0.5, -1);
                g.fill();
                g.restore();

                // draw minute
                g.save();
                var theta = (minute - 15) * 2 * Math.PI / 60;
                g.rotate(theta);
                g.beginPath();
                g.moveTo(-15, -4);
                g.lineTo(-15, 4);
                g.lineTo(clockRadius * 0.8, 1);
                g.lineTo(clockRadius * 0.8, -1);
                g.fill();
                g.restore();

                // draw second
                g.save();
                var theta = (seconds - 15) * 2 * Math.PI / 60;
                g.rotate(theta);
                g.beginPath();
                g.moveTo(-15, -3);
                g.lineTo(-15, 3);
                g.lineTo(clockRadius * 0.9, 1);
                g.lineTo(clockRadius * 0.9, -1);
                g.fillStyle = '#0f0';
                g.fill();
                g.restore();
                g.restore();
            }
        }
    ]
});

ht.Default.setImage('lrule', {
    width: { func: 'field@_width', value: 14 },
    height: { func: 'field@_height', value: 104 },
    "author": "wenyuan",
    "note": "标尺",
    "comps": [
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight();
                    return [2, 2, width - 2, 2]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [width / 2, 2 + height / 8, width - 2, 2 + height / 8]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [2, 2 + height / 4, width - 2, 2 + height / 4]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [width / 2, 2 + 3 * (height / 8), width - 2, 2 + 3 * (height / 8)]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [2, 2 + (height / 2), width - 2, 2 + (height / 2)]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [width / 2, 2 + 5 * (height / 8), width - 2, 2 + 5 * (height / 8)]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": [2, 77, 12, 77],
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [2, 2 + 6 * (height / 8), width - 2, 2 + 6 * (height / 8)]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [width / 2, 2 + 7 * (height / 8), width - 2, 2 + 7 * (height / 8)]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight();
                    return [2, height - 2, width - 2, height - 2];
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight();
                    return [width - 2, 2, width - 2, height - 2];
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth1", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        }
    ]
});

ht.Default.setImage('lrule10', {
    width: { func: 'field@_width', value: 14 },
    height: { func: 'field@_height', value: 104 },
    "author": "wenyuan",
    "note": "标尺",
    "comps": [
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight();
                    return [2, 2, width - 2, 2]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [width / 2, 2 + height / 10, width - 2, 2 + height / 10]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [2, 2 + height / 5, width - 2, 2 + height / 5]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [width / 2, 2 + 3 * (height / 10), width - 2, 2 + 3 * (height / 10)]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [2, 2 + 4 * (height / 10), width - 2, 2 + 4 * (height / 10)]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [width / 2, 2 + 5 * (height / 10), width - 2, 2 + 5 * (height / 10)]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": [2, 77, 12, 77],
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [2, 2 + 6 * (height / 10), width - 2, 2 + 6 * (height / 10)]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [width / 2, 2 + 7 * (height / 10), width - 2, 2 + 7 * (height / 10)]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [2, 2 + 8 * (height / 10), width - 2, 2 + 8 * (height / 10)]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight() - 4;
                    return [width / 2, 2 + 9 * (height / 10), width - 2, 2 + 9 * (height / 10)]
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight();
                    return [2, height - 2, width - 2, height - 2];
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        },
        {
            "type": "shape",
            "points": {
                func: function (data) {
                    var width = data.getWidth(), height = data.getHeight();
                    return [width - 2, 2, width - 2, height - 2];
                }
            },
            "segments": [1, 2],
            "background": { "func": "attr@background" },
            "borderWidth": { "func": "attr@borderWidth1", value: 1 },
            "borderColor": { "func": "attr@borderColor", value: "black" }
        }
    ]
});

//进度条控件
ht.Default.setImage('Progress1', {
    width: { func: 'field@_width', value: 20 },
    height: { func: 'field@_height', value: 104 },
    comps: [
        {
            type: 'rect',
            background: { func: 'attr@background', value: "white" },
            gradientColor: { func: 'attr@bgradientcolor', value: "white" },
            gradient: { func: 'attr@bgradient' },
            rect: {
                func: function (data) {
                    var width = data.getWidth(),
                        height = data.getHeight(),
                        padding = data.a('padding');
                    padding = (typeof padding === 'number') ? padding : 2;
                    return [padding, padding, width - 2 * padding, height - 2 * padding];
                }
            }
        },
        {
            type: 'rect',
            background: { func: 'attr@foreground', value: 'green' },
            gradientColor: { func: 'attr@fgradientcolor', value: 'white' },
            gradient: { func: 'attr@fgradient' },
            rect: {
                func: function (data) {
                    var value = data.a('tagvalue');
                    if (typeof value == 'string') {
                        value = parseFloat(value);
                        if (value == null)
                            value = 50;
                    }
                    else if (value == null)
                        value = 25;
                    var width = data.getWidth(),
                        height = data.getHeight(),
                        padding = data.a('padding'),
                        maxValue = data.a('maxValue') == null ? 100 : data.a('maxValue'),
                        minValue = data.a('minValue') == null ? 0 : data.a('minValue');
                    if (value > maxValue)
                        value = maxValue;
                    if (value < minValue)
                        value = minValue;
                    var progress = 1 - (value - minValue) / (maxValue - minValue);
                    progress = progress > 1 ? 1 : progress;
                    padding = (typeof padding === 'number') ? padding : 2;

                    var top = padding + progress * (height - 2 * padding);
                    return [
                        padding, top,
                        width - 2 * (padding),
                        progress == 1 ? 0 : height - top - padding
                    ];
                }
            }
        },
        {
            type: 'rect',
            rect: {
                func: function (data) {
                    var width = data.getWidth(),
                        height = data.getHeight(),
                        padding = data.a('padding');
                    padding = (typeof padding === 'number') ? padding : 2;
                    return [padding, padding, width - 2 * padding, height - 2 * padding];
                }
            },
            borderWidth: { func: 'attr@borderWidth', value: 1 },
            borderColor: { func: 'attr@borderColor', value: "black" },
        }
    ]
});

//进度条文字
ht.Default.setImage('ProgressText', {
    width: { func: 'field@_width', value: 20 },
    height: { func: 'field@_height', value: 120 },
    comps: [
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [0, 0, w, h / 5];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    return max.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "right" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [0, h * 0.2, w, h / 5];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    var value = min + (max - min) * 0.75;
                    return value.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "right" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [0, h * 0.4, w, h / 5];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    var value = min + (max - min) * 0.5;
                    return value.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "right" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [0, h * 0.6, w, h / 5];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    var value = min + (max - min) * 0.25;
                    return value.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "right" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [0, h * 0.8, w, h / 5];
                }
            },
            text: {
                func: function (data) {
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    return min.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "right" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        }
    ]
});


//进度条文字
ht.Default.setImage('ProgressText3', {
    width: { func: 'field@_width', value: 20 },
    height: { func: 'field@_height', value: 120 },
    comps: [
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [0, 0, w, h / 6];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    return max.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "right" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [0, h * 0.1667, w, h / 6];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    var value = min + (max - min) * 0.8;
                    return value.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "right" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [0, h * 0.333, w, h / 6];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    var value = min + (max - min) * 0.6;
                    return value.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "right" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [0, h * 0.5, w, h / 6];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    var value = min + (max - min) * 0.4;
                    return value.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "right" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [0, h * 0.667, w, h / 6];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    var value = min + (max - min) * 0.2;
                    return value.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "right" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [0, h * 0.835, w, h / 6];
                }
            },
            text: {
                func: function (data) {
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    return min.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "right" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        }
    ]
});


//进度条文字1
ht.Default.setImage('ProgressText1', {
    width: { func: 'field@_width', value: 120 },
    height: { func: 'field@_height', value: 20 },
    comps: [
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [0, 0, w / 5, h];
                }
            },
            text: {
                func: function (data) {
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    return min.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "left" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [w * 0.2, 0, w / 5, h];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    var value = min + (max - min) * 0.25;
                    return value.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "left" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [w * 0.4, 0, w / 5, h];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    var value = min + (max - min) * 0.5;
                    return value.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "left" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [w * 0.6, 0, w / 5, h];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    var value = min + (max - min) * 0.75;
                    return value.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "left" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [w * 0.8, 0, w / 5, h];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    return max.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "left" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        }
    ]
});

//进度条文字1
ht.Default.setImage('ProgressText4', {
    width: { func: 'field@_width', value: 120 },
    height: { func: 'field@_height', value: 20 },
    comps: [
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [0, 0, w / 6, h];
                }
            },
            text: {
                func: function (data) {
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    return min.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "left" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [w * 0.1667, 0, w / 6, h];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    var value = min + (max - min) * 0.2;
                    return value.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "left" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [w * 0.333, 0, w / 6, h];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    var value = min + (max - min) * 0.4;
                    return value.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "left" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [w * 0.5, 0, w / 6, h];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    var value = min + (max - min) * 0.6;
                    return value.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "left" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [w * 0.667, 0, w / 6, h];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var min = data.a("min");
                    if (min == null)
                        min = 0;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    var value = min + (max - min) * 0.8;
                    return value.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "left" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        },
        {
            type: 'text',
            rect: {
                func: function (data) {
                    var h = data.getHeight();
                    var w = data.getWidth();
                    return [w * 0.835, 0, w / 6, h];
                }
            },
            text: {
                func: function (data) {
                    var max = data.a("max");
                    if (max == null)
                        max = 100;
                    var dig = data.a("dig");
                    if (dig == null)
                        dig = 0;
                    return max.toFixed(dig);
                }
            },
            align: { func: "attr@align", value: "left" },
            vAlign: "top",
            color: { func: "attr@color", value: 'black' },
            font: { func: "attr@font", value: '9px Arial' }
        }
    ]
});


//多态文本显示控件
ht.Default.setImage('snumber', {
    width: { func: 'field@_width', value: 48 },
    height: { func: 'field@_height', value: 20 },
    comps: [
        {
            type: 'text',
            rect: {
                func: function (data, view) {
                    var width = data.getWidth(),
                        height = data.getHeight();
                    return [0, 0, width, height];
                }
            },
            text: {
                func: function (data, view) {
                    var v = data.a("tagvalue");
                    if (typeof v == 'number') {
                        if (v == 0)
                            return data.a("text0") || "";
                        else if (v == 1)
                            return data.a("text1") || "";
                        else if (v == 2)
                            return data.a("text2") || "";
                        else if (v == 3)
                            return data.a("text3") || "";
                        else if (v == 4)
                            return data.a("text4") || "";
                        else if (v == 5)
                            return data.a("text5") || "";
                        else if (v == 6)
                            return data.a("text6") || "";
                        else if (v == 7)
                            return data.a("text7") || "";
                        else
                            return v.toString();
                    }
                    else if (typeof v == 'string') {
                        if (v == "0")
                            return data.a("text0") || "";
                        else if (v == "1")
                            return data.a("text1") || "";
                        else if (v == "2")
                            return data.a("text2") || "";
                        else if (v == "3")
                            return data.a("text3") || "";
                        else if (v == "4")
                            return data.a("text4") || "";
                        else if (v == "5")
                            return data.a("text5") || "";
                        else if (v == "6")
                            return data.a("text6") || "";
                        else if (v == "7")
                            return data.a("text7") || "";
                        else
                            return v;
                    }
                }
                , value: "None"
            },
            font: { func: 'style@font', value: 'bold 18px Arial' },
            align: { func: 'style@align', value: 'left' },
            vAlign: { func: 'style@vAlign', value: 'middle' },
            color: { func: 'style@color', value: 'black' }
        }
    ]
});