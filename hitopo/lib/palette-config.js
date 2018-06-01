createIcon = function (name) {
    return {
        width: 100,
        height: 100,
        comps: [
            {
                type: "circle",
                rect: [5, 5, 85, 85],
                borderWidth: 5,
                borderColor: "#3498DB",
                gradient: "radial.northwest"
            },
            {
                type: "text",
                text: name,
                align: "center",
                font: "26px Arial",
                color: "red",
                rect: [5, 5, 85, 85]
            }
        ]
    };
};

//共享控件注册图片
ht.Default.setImage('clipobject', {
    "width": 100,
    "height": 100,
    comps: [
        {
            type: "circle",
            rect: [0, 0, 100, 100],
            borderWidth: 4,
            borderColor: "#000000",
            gradient: "radial.northwest"
        },
        {
            type: "text",
            text: "用户控件",
            align: "center",
            font: "22px Arial",
            color: "red",
            rect: [5, 5, 85, 85]
        }
    ]
});

ht.Default.setImage('iframe', {
    "width": 100,
    "height": 100,
    comps: [
        {
            type: "rect",
            rect: [0, 0, 100, 60],
            borderWidth: 2,
            borderColor: "#000000",
            background:"#F1F1F1"
        },
        {
            type: "text",
            text: "子画面",
            align: "center",
            font: "22px Arial",
            color: "blue",
            rect: [5, 5, 95, 55]
        }
    ]
});

ht.Default.setImage('link_image', {
    "width": 120,
    "height": 100,
    comps: [
        {
            type: "rect",
            rect: [0, 0, 120, 60],
            borderWidth: 2,
            borderColor: "#000000",
            background: "#F1F1F1"
        },
        {
            type: "text",
            text: "画面链接",
            align: "center",
            font: "22px Arial",
            color: "blue",
            rect: [5, 5, 110, 55]
        }
    ]
});



ht.Default.setImage('alarm', {
    "width": 120,
    "height": 100,
    comps: [
        {
            type: "rect",
            rect: [0, 0, 120, 60],
            borderWidth: 2,
            borderColor: "#000000",
            background: "#F1F1F1"
        },
        {
            type: "text",
            text: "报警控件",
            align: "center",
            font: "22px Arial",
            color: "blue",
            rect: [5, 5, 110, 55]
        }
    ]
});



ht.Default.setImage('html_image', {
    "width": 100,
    "height": 100,
    comps: [
        {
            type: "rect",
            rect: [0, 0, 100, 60],
            borderWidth: 2,
            borderColor: "#000000",
            background: "#F1F1F1"
        },
        {
            type: "text",
            text: "HTML",
            align: "center",
            font: "22px Arial",
            color: "blue",
            rect: [5, 5, 95, 55]
        }
    ]
});


ht.Default.setImage('LineShape', {//直线
    "width": 100,
    "height": 100,
    "comps": [
      {
          "type": "shape",
          "rect": [0, 0, 100, 100],
          "points": [5, 50, 95, 50],
          "borderWidth": 4,
          "borderColor": ht.Style['shape.border.color']
      }
    ]
});

palette_config = {
    node: {
        name: '常规',
        items: [
            { name: '文字', image: 'text', type: ht.Text },
            { name: '开关', image: 'switch', type: ht.Switch },
            { name: '路由器', image: 'images/node/router.png' },
            { name: '电话', image: 'images/node/phone.png' },
            { name: '域名服务器', image: 'images/node/dns.png' },
            { name: '工作组', image: 'images/node/workgroup.png' },
            { name: '节点', image: 'node_image', icon: 'node_icon' },
            { name: '组', image: 'group_image', icon: 'group_icon', type: ht.Group },
            { name: '子网', image: 'subGraph_image', icon: 'subGraph_icon', type: ht.SubGraph },
            { name: '用户图形', image: 'UserShape' },
            { name: 'Clock',image: 'clock', flash:true },
            { name: 'Html',image:'html_image',type:ht.Html },
            { name: '子画面', image: 'iframe', type: ht.iFrame },
            { name: '画面链接', image: 'link_image', type: ht.LinkImg },
            { name: '报警控件', image: 'alarm', type: ht.alarm }
        ]
    },
    control: {
        name: '管道',
        items: [
            { name: '厂站点管道', image: 'images/control/管道/9.png',num: true},
            { name: '管道1', image: 'images/control/管道/1.png', num: true},
            { name: '管道2', image: 'images/control/管道/2.png',num: true },
            { name: '管道3', image: 'images/control/管道/3.png',num: true },
            { name: '管道4', image: 'images/control/管道/4.png',num: true },
            { name: '管道5', image: 'images/control/管道/5.png',num: true },
            { name: '管道6', image: 'images/control/管道/6.png',num: true },
            { name: '管道7', image: 'images/control/管道/7.png',num: true },
            { name: '管道8', image: 'images/control/管道/8.png',num: true },
        ]
    },
    draw: {
        name: '绘图',
        items: [
            {name:'多边形',image:'shape_icon',stretch:'uniform',shapeType:ht.Shape,draggable:false,line:false },
            {name:'多线段',image:'polyline_icon',stretch:'uniform',shapeType:ht.Polyline,draggable:false,line:false },
            {name:'直线',image:'LineShape',stretch:'uniform', shapeType:ht.Polyline,draggable:false,line:true },
            {name:'矩形',image:'rectIcon',geometryType:'rect',draggable:false},
            {name:'圆角矩形',image:'roundRectIcon',geometryType:'roundRect',draggable:false},
            {name:'椭圆',image:'ovalIcon',geometryType:'oval',draggable:false},
            {name:'弧',image:'arcTemplate',geometryType:'arc',draggable:false },
            {name:'圆',image:'circleIcon',geometryType:'circle',draggable:false},
            {name:'三角形',image:'triangleIcon',geometryType:'triangle',draggable: false},
            {name:'星形形',image:'starIcon',geometryType:'star',draggable:false},
            {name:'六边形',image:'hexagonIcon', geometryType:'hexagon'},
            {name:'五边形',image:'pentagonIcon',geometryType:'pentagon',draggable: false},
            {name:'钻石形',image:'diamondIcon', geometryType:'diamond',draggable: false},
            {name:'直角三角形',image:'rightTriangleIcon', geometryType:'rightTriangle',draggable: false},
            {name:'平行四边形',image:'parallelogramIcon',geometryType:'parallelogram',draggable: false},
            {name:'梯形',image:'trapezoidIcon',geometryType:'trapezoid',draggable: false}
        ]
    },
    vector: {
        name: '组态',
        items: [
            { name: '标签值', image: 'TagValue', icon: 'number' },
            { name: '标签值', image: 'TagValue1', icon: 'number' },
            { name: '多态文本', image: 'snumber', icon: 'number' },
            { name: '数字量', image: 'onoff' },
            { name: '圆形指示灯', image: '圆形指示灯' },
            { name: '矩形指示灯', image: '矩形指示灯' },
            { name: '泵', image: 'Pump' },
            { name: '泵1', image: 'Pump1' },
            { name: '单位阀', image: 'Valve' },
            { name: '单位阀1', image: 'Valve1' },
            { name: '单位阀2', image: 'Valve3' },
            { name: '两位阀', image: 'Valve2' },
            { name: '断路器', image: 'Breaker' },
            { name: '车手', image: 'Handcart' },
            { name: '刀闸', image: 'SwitchSimple' },
            { name: '逆变器', image: 'Inverter' },
            { name: 'PT', image: 'PT' },
            { name: '箱变', image: 'BoxSubstation' },
            { name: '变压器', image: 'Transformer' },
            { name: '地线', image: 'EarthWire' },
            { name: '风机', image: '风机整机' },
            { name: '风机矩阵', image: 'BoxFan' },
            { name: '进度条', image: 'Progress' },
            { name: '图形', image: 'png', type: ht.Image, icon: 'imgpng' },           
            { name: '进度条', image: 'Progress1' },            
            { name: 'Javascript', image: 'script', type: ht.Script }
        ]
    },
    rule: {
        name: '标尺',
        items: [
            { name: '8格标尺', image: 'lrule' },
            { name: '10格标尺', image: 'lrule10' },
            { name: '4格标尺文字', image: 'ProgressText' },
            { name: '5格标尺文字', image: 'ProgressText3' },
            { name: '4格标尺文字', image: 'ProgressText1' },
            { name: '5格标尺文字', image: 'ProgressText4' },
            ]
    },
    chart: {
        name: '图表',
        items: [
            { name: '饼图', image: '饼图' },
            { name: '柱状图', image: '柱状图' },
            { name: '折线图', image: '折线图' },
            { name: '堆栈柱状图', image: '堆栈柱状图' },
            { name: '百分比柱状图', image: '百分比柱状图' }
        ]
    },
    live:
        {
            name: '交互',
            items: [
            { name: '按钮', image: 'images/live/button.png', type: 'Button' },
            { name: '切换按钮', image: 'images/live/tooglebutton.png', type: 'ToggleButton' },
            { name: '检查框', image: 'images/live/checkbox.png', type: 'Checkbox' },
            { name: '开关', image: 'images/live/onoffbutton.png', type: 'Switch' },
            { name: '点框', image: 'images/live/radiobutton.png', type: 'RadioButton' },
            { name: '进度条', image: 'images/live/progressbar.png', type: 'ProgressBar' },
            { name: '滑动条', image: 'images/live/sl.png', type: 'Slider' },
            { name: '调整按钮', image: 'images/live/spin.png', type: 'Spinner' },
            { name: '选择框', image: 'images/live/combobox.png', type: 'Combobox' }
            ]
        },
    edge: {
        name: '连线',
        items: [
            { name: '直线', image: 'images/edge/straight.png', edgeType: null, draggable: true },
            { name: '正交', image: 'images/edge/ortho.png', edgeType: 'ortho2', draggable: false },
            { name: '拐弯', image: 'images/edge/flex.png', edgeType: 'flex2', draggable: false },
            { name: '拐弯', image: 'images/edge/points.png', edgeType: 'points', draggable: false }
        ]
    },
    icon: {
        name: '图标',
        items: [
            { name: '告警', image: 'alarmIcon', styleIcon: 'alarm' },
            { name: '勾选', image: 'images/icon/check.gif', styleIcon: true },
            { name: '删除', image: 'images/icon/delete.gif', styleIcon: true },
            { name: '刷新', image: 'images/icon/refresh.gif', styleIcon: true },
            { name: '设置', image: 'images/icon/ovl.png', styleIcon: true },
            { name: '未知', image: 'images/icon/unknown.gif', styleIcon: true }
        ]
    },
    arrow: {
        name: '箭头',
        items: [
           { name: '起始箭头1', image: 'sourceArrow1', source: true },
           { name: '终点箭头1', image: 'targetArrow1', source: false },
           { name: '起始箭头2', image: 'sourceArrow2', source: true },
           { name: '终点箭头2', image: 'targetArrow2', source: false }
        ]
    }
};
