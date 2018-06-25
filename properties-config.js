var setLabelFont = function (data, name) {
    var list = ['label.fontStyle', 'label.fontWeight', 'label.fontSize', 'label.fontFamily'],
        d = [null, null, '12px', 'arial'],
        font = [];
    list.forEach(function (n, i) {
        var v = data.a(n) || d[i];
        if (!v) return;
        font.push(v);
    });
    data.s(name, font.join(' '));
};

var setFont = function (data, name) {
    var list = ['fontStyle', 'fontWeight', 'fontSize', 'fontFamily'],
        d = [null, null, '12px', 'arial'],
        font = [];
    list.forEach(function (n, i) {
        var v = data.a(n) || d[i];
        if (!v) return;
        font.push(v);
    });
    data.s(name, font.join(' '));
};

shape_type = [
    'rect',
    'roundRect',
    'oval',
    'circle',
    'star',
    'triangle',
    'hexagon',
    'pentagon',
    'diamond',
    'rightTriangle',
    'parallelogram',
    'trapezoid'
];

gradient_type = ['', 'linear.southwest', 'linear.southeast', 'linear.northwest', 'linear.northeast',
                'linear.north', 'linear.south', 'linear.west', 'linear.east',
                'radial.center', 'radial.southwest', 'radial.southeast', 'radial.northwest', 'radial.northeast',
                'radial.north', 'radial.south', 'radial.west', 'radial.east',
                'spread.horizontal', 'spread.vertical', 'spread.diagonal', 'spread.antidiagonal',
                'spread.north', 'spread.south', 'spread.west', 'spread.east'];

Html_properties = [
    { 
        name: 'padding', 
        accessType: 'attr', 
        valueType: 'number', 
        editable: true 
    },
    { 
        name: 'scalable', 
        accessType: 'attr', 
        valueType: 'boolean', 
        ditable: true 
    }
];

iFrame_properties = [
    { 
        name: 'filename', 
        displayName: '文件名称(filename)', accessType: 'attr', 
        editable: true 
    },
    { 
        name: 'param', 
        displayName: '参数名称(param)', accessType: 'attr', 
        editable: true 
    }
];

alarm_properties = [
    { 
        name: 'count', 
        displayName: '显示数量(count)', 
        valueType: 'number', 
        accessType: 'attr', 
        editable: true 
    },
    { 
        name: 'area', 
        displayName: '报警区域(area)', 
        valueType: 'number', 
        accessType: 'attr', 
        editable: true 
    },
    {
        name: 'bordercolor',
        displayName: '边框颜色(bordercolor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true
    }
];


Text_properties = [
];

// 
data_properties = [
    {
        name: 'tag',
        displayName: '标识(tag)',
        editable: true,
        setValue: function (data, column, value, view) {
            if (value != "") {
                var p = data.getTag();
                if ((p != "background") && (p != "frameborder")) {
                    data.setTag(value);
                }
            }
        },
        getToolTip: function (data) {
            return "使用dm.getDataByTag(tag)函数获取对象";
        }
    },
    {
        name: 'name',
        displayName: '名称(name)',
        editable: true,
        getToolTip: function (data) {
            return "通常显示为文字";
        }
    },
    {
        name: 'parent',
        displayName: '父对象(parent)',
        editable: true,
        setValue: function (data, column, value, view) {
            if (value != "") {
                var p = dataModel.getDataByTag(value);
                if (p) {
                    data.setParent(p);
                }
            }
            else
                data.setParent(null);
        }
    },
    {
        name: 'host',
        displayName: '宿主对象(host)',
        editable: true,
        setValue: function (data, column, value, view) {
            if (value != "") {
                var p = dataModel.getDataByTag(value);
                if (p) {
                    data.setHost(p);
                }
            }
            else
                data.setHost(null);
        }
    },
    {
        name: 'layer',
        displayName: '图层(layer)',
        editable: true,
        enum: {
            values: layers
        }
    },
    {
        categoryName: 'L标签文本',
        displayName: '颜色(s:label.color)',
        name: 'label.color',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'L标签文本',
        displayName: '背景(s:label.background)',
        name: 'label.background',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'L标签文本',
        displayName: '字体(label.fontFamily)',
        name: 'label.fontFamily',
        accessType: 'attr',
        editable: true,
        enum: {
            values: HT2dEditor.fontFamilyList,
            editable: true
        },
        formatValue: function (v) {
            return v || 'arial';
        },
        setValue: function (data, column, value, view) {
            data.a('label.fontFamily', value);
            setLabelFont(data, "label.font");
        }
    },
    {
        categoryName: 'L标签文本',
        displayName: '字形(label.fontStyle)',
        name: 'label.fontStyle',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'italic', 'oblique']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('label.fontStyle', value);
            setLabelFont(data, "label.font");
        }
    },
    {
        categoryName: 'L标签文本',
        name: 'label.fontWeight',
        displayName: '字体深度(label.fontWeight)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('label.fontWeight', value);
            setLabelFont(data, "label.font");
        }
    },
    {
        categoryName: 'L标签文本',
        name: 'label.fontSize',
        displayName: '字体尺寸(label.fontSize)',
        accessType: 'attr',
        editable: true,
        formatValue: function (v) {
            return v || '12px';
        },
        setValue: function (data, column, value, view) {
            data.a('label.fontSize', value);
            setLabelFont(data, "label.font");
        }
    },
    {
        categoryName: 'L标签文本',
        name: 'label.position',
        displayName: '位置(s:label.position)',
        accessType: 'style',
        editable: true,
        slider: {
            min: 1,
            max: 55,
            step: 1
        }
    },
    {
        categoryName: 'L标签文本',
        name: 'label.offset.x',
        displayName: 'x偏移(s:label.offset.x)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'L标签文本',
        displayName: 'y偏移(s:label.offset.y)',
        name: 'label.offset.y',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'L标签文本',
        name: 'label.rotation',
        displayName: '旋转角度(s:label.rotation)',
        accessType: 'style',
        editable: true,
        slider: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 180 * 5,
            getToolTip: function () {
                return Math.round(this.getValue() / Math.PI * 180) + '°';
            }
        }
    },
    {
        categoryName: 'L标签文本',
        displayName: '最大字符数量(s:label.max)',
        name: 'label.max',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'L标签文本',
        displayName: '固定位置值(s:label.position.fixed)',
        name: 'label.position.fixed',
        accessType: 'style',
        valueType: 'boolean',
        editable: true
    },
    {
        categoryName: 'L标签文本',
        name: 'label.opacity',
        displayName: '透明度(s:label.opacity)',
        accessType: 'style',
        editable: true,
        getValue: function (data) {
            return data.s('label.opacity') || 1;
        },
        slider: {
            min: 0,
            max: 1,
            step: 0.1
        }
    },
    /*
    {
        categoryName: 'S选择',
        name: 'select.color',
        displayName: '边框颜色(select.color)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'Select',
        name: 'select.width',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'S选择',
        name: 'select.padding',
        displayName: '边距(select.padding)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'S选择',
        name: 'select.type',
        displayName: '类型(select.type)',
        editable: true,
        accessType: 'style',
        enum: {
            values: ['rect', 'circle', 'oval', 'roundRect']
        }
    }*/
    {
        name: 'alarm.color',
        displayName: '报警颜色(alarm.color)',
        accessType: 'attr',
        valueType: 'color',
        editable: true
    },
    {
        name: '2d.visible',
        displayName: '可见(s:2d.visible)',
        editable: true,
        accessType: 'style',
        valueType: 'boolean'
    },
    {
        name: '2d.selectable',
        displayName: '可选择(s:2d.selectable)',
        editable: true,
        accessType: 'style',
        valueType: 'boolean'
    },
    {
        name: '2d.movable',
        displayName: '可移动(s:2d.movable)',
        editable: true,
        accessType: 'style',
        valueType: 'boolean'
    },
    {
        name: '2d.editable',
        displayName: '可编辑(s:2d.editable)',
        editable: true,
        accessType: 'style',
        valueType: 'boolean'
    },
    {
        categoryName: 'C组态',
        displayName: '动画更新(flash)',
        name: 'flash',
        accessType: 'attr',
        valueType: 'boolean',
        editable: true,
        getValue: function (data) {
            return data.a('flash') || false;
        }
    },
    {
        categoryName: 'C组态',
        name: 'vistagname',
        displayName: '显示控制(vistagname)',
        accessType: 'attr',
        editable: true,
        getToolTip: function (data) {
            return "控制对象的显示和隐藏变量名称";
        }
    },
    {
        categoryName: 'N注释',
        name: 'note',
        displayName: '标注(s:note)',
        accessType: 'style',
        editable: true
    },
    {
        categoryName: 'N注释',
        displayName: '展开(s:note.expanded)',
        name: 'note.expanded',
        accessType: 'style',
        valueType: 'boolean',
        editable: true
    },
    {
        categoryName: 'N注释',
        name: 'note.toggleable',
        displayName: '双击切换(s:note.toggleable)',
        accessType: 'style',
        valueType: 'boolean',
        editable: true
    },
    {
        categoryName: 'N注释',
        name: 'note.font',
        displayName: '字体(s:note.font)',
        accessType: 'style',
        editable: true
    },
    {
        categoryName: 'N注释',
        name: 'fontFamily',
        displayName: '字体(fontFamily)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: HT2dEditor.fontFamilyList,
            editable: true
        },
        formatValue: function (v) {
            return v || 'arial';
        },
        setValue: function (data, column, value, view) {
            data.a('fontFamily', value);
            setFont(data, "note.font");
        }
    },
    {
        categoryName: 'N注释',
        name: 'fontStyle',
        displayName: '字形(fontStyle)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'italic', 'oblique']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('fontStyle', value);
            setFont(data, "note.font");
        }
    },
    {
        categoryName: 'N注释',
        name: 'fontWeight',
        displayName: '字体深度(fontWeight)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('fontWeight', value);
            setFont(data, "note.font");
        }
    },
    {
        categoryName: 'N注释',
        name: 'fontSize',
        displayName: '字体尺寸(fontSize)',
        accessType: 'attr',
        editable: true,
        formatValue: function (v) {
            return v || '12px';
        },
        setValue: function (data, column, value, view) {
            data.a('fontSize', value);
            setFont(data, "note.font");
        }
    },
    {
        categoryName: 'N注释',
        name: 'note.color',
        displayName: '文字颜色(s:note.color)',
        accessType: 'style',
        editable: true,
        valueType: 'color'
    },
    {
        categoryName: 'N注释',
        name: 'note.background',
        displayName: '文字背景(s:note.background)',
        accessType: 'style',
        editable: true,
        valueType: 'color'
    },
    {
        categoryName: 'N注释',
        name: 'note.position',
        displayName: '标注位置(s:note.position)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'N注释',
        name: 'note.offset.x',
        displayName: 'x偏移(s:note.offset.x)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'N注释',
        name: 'note.offset.y',
        displayName: 'y偏移(s:note.offset.y)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'N注释',
        name: 'note.max',
        displayName: '标注最大字符(s:note.max)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'N注释',
        name: 'note.border.width',
        displayName: '边框宽度(s:note.border.width)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'N注释',
        name: 'note.border.color',
        displayName: '边框颜色(s:note.border.color)',
        accessType: 'style',
        editable: true,
        valueType: 'color'
    }, {
        categoryName: 'N注释',
        name: 'note.opacity',
        displayName: '透明度(s:note.opacity)',
        accessType: 'style',
        valueType: 'number',
        editable: true,
        getValue: function (data) {
            return data.s('note.opacity') || 1;
        },
        slider: {
            min: 0,
            max: 1,
            step: 0.1
        }
    },
    {
        categoryName: 'N注释',
        name: 'note.align',
        displayName: '对齐方式(s:note.align)',
        accessType: 'style',
        editable: true,
        enum: {
            values: ['left', 'center', 'right']
        }
    }
];

// D
node_properties = [
     {
         categoryName: 'D节点',
         displayName: '鼠标提示(ToolTip)',
         name: 'ToolTip',
         accessType: 'attr',
         editable: true
     },
    {
        categoryName: 'D节点',
        displayName: '图形(image)',
        name: 'image',
        editable: true
    },
    {
        categoryName: 'D节点',
        name: 'position.x',
        displayName: 'x位置(position.x)',
        valueType: 'number',
        editable: true,
        setValue: function (data, column, value, view) {
            var position = data.getPosition();
            data.setPosition(value, position.y);
        },
        getValue: function (data) {
            var position = data.getPosition();
            return parseInt(position.x);
        }
    },
    {
        categoryName: 'D节点',
        name: 'position.y',
        displayName: 'y位置(position.y)',
        valueType: 'number',
        editable: true,
        setValue: function (data, column, value, view) {
            var position = data.getPosition();
            data.setPosition(position.x, value);
        },
        getValue: function (data) {
            var position = data.getPosition();
            return parseInt(position.y);
        }
    },
    {
        categoryName: 'D节点',
        name: 'left',
        displayName: '左边距(left)',
        valueType: 'number',
        editable: true,
        setValue: function (data, column, value, view) {
            var rect = data.getRect();
            rect.x = value;
            data.setRect(rect);
        },
        getValue: function (data) {
            var rect = data.getRect();
            return parseInt(rect.x);
        }
    },
    {
        categoryName: 'D节点',
        name: 'top',
        displayName: '上边距(top)',
        valueType: 'number',
        editable: true,
        setValue: function (data, column, value, view) {
            var rect = data.getRect();
            rect.y = value;
            data.setRect(rect);
        },
        getValue: function (data) {
            var rect = data.getRect();
            return parseInt(rect.y);
        }
    },
    {
        categoryName: 'D节点',
        displayName: '宽度(width)',
        name: 'width',
        valueType: 'number',
        editable: true
    },
     {
         categoryName: 'D节点',
         accessType: 'style',
         name: 'opacity',
         displayName: '透明度(s:opacity)',
         valueType: 'number',
         editable: true,
         getValue: function (data) {
             return data.s('opacity') || 1;
         },
         slider: {
             min: 0,
             max: 1,
             step: 0.1
         }
     },
    {
        categoryName: 'D节点',
        name: 'height',
        displayName: '高度(height)',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'D节点',
        name: 'image.stretch',
        displayName: '拉伸方式(image.stretch)',
        editable: true,
        accessType: 'style',
        enum: {
            values: ['fill', 'uniform', 'centerUniform']
        }
    },
    {
        categoryName: 'D节点',
        name: 'rotation',
        displayName: '旋转(rotation)',
        valueType: 'number',
        editable: true,
        slider: {
            min: 0,
            max: Math.PI * 2,
            getToolTip: function () {
                return Math.round(this.getValue() / Math.PI * 180) + '°';
            }
        }
    }
];

group_properties = [
    {
        categoryName: '组',
        name: 'expanded',
        editable: true
    },
    {
        categoryName: '组',
        name: 'group.type',
        editable: true,
        accessType: 'style',
        enum: {
            values: [null, 'oval', 'circle', 'rect', 'roundRect']
        }
    },
    {
        categoryName: '组',
        name: 'group.image',
        accessType: 'style',
        editable: true
    },
    {
        categoryName: '组',
        name: 'group.image.stretch',
        editable: true,
        accessType: 'style',
        enum: {
            values: ['fill', 'uniform', 'centerUniform']
        }
    },
    {
        categoryName: '组',
        name: 'group.padding',
        editable: true,
        accessType: 'style',
        valueType: 'number'
    },
    {
        categoryName: '组',
        name: 'group.padding.top',
        editable: true,
        accessType: 'style',
        valueType: 'number'
    },
    {
        categoryName: '组',
        name: 'group.padding.bottom',
        editable: true,
        accessType: 'style',
        valueType: 'number'
    },
    {
        categoryName: '组',
        name: 'group.padding.left',
        editable: true,
        accessType: 'style',
        valueType: 'number'
    },
    {
        categoryName: '组',
        name: 'group.padding.right',
        editable: true,
        accessType: 'style',
        valueType: 'number'
    },
    {
        categoryName: '组',
        name: 'group.depth',
        editable: true,
        accessType: 'style',
        valueType: 'number'
    },
    {
        categoryName: '组',
        name: 'group.border.pattern',
        editable: true,
        accessType: 'style',
        setValue: function (data, property, value, view) {
            data.s('group.border.pattern', eval(value));
        },
        formatValue: function (value) {
            return '[' + (value || '') + ']';
        }
    },
    {
        categoryName: '组',
        name: 'group.border.width',
        editable: true,
        accessType: 'style',
        valueType: 'number'
    },
    {
        categoryName: '组',
        name: 'group.border.cap',
        editable: true,
        accessType: 'style',
        enum: {
            values: ['butt', 'round', 'square']
        }
    },
    {
        categoryName: '组',
        name: 'group.border.join',
        editable: true,
        accessType: 'style',
        enum: {
            values: ['bevel', 'round', 'miter']
        }
    },
    {
        categoryName: '组',
        name: 'group.background',
        editable: true,
        accessType: 'style',
        valueType: 'color'
    },
    {
        categoryName: '组',
        name: 'group.gradient',
        editable: true,
        accessType: 'style',
        enum: {
            values: gradient_type
        }
    },
    {
        categoryName: '组',
        name: 'group.gradient.color',
        editable: true,
        accessType: 'style',
        valueType: 'color'
    },
    {
        categoryName: '组',
        name: 'group.title.align',
        editable: true,
        accessType: 'style',
        enum: {
            values: ['left', 'center', 'right']
        }
    },
    {
        categoryName: '组',
        name: 'group.title.color',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: '组',
        name: 'group.title.background',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: '组',
        name: 'group.title.font',
        accessType: 'style',
        editable: true,
        formatValue: function (value) {
            return value || ht.Default.labelFont;
        }
    },
    {
        categoryName: '组',
        name: 'fontFamily',
        accessType: 'attr',
        editable: true,
        enum: {
            values: HT2dEditor.fontFamilyList,
            editable: true
        },
        formatValue: function (v) {
            return v || 'arial';
        },
        setValue: function (data, column, value, view) {
            data.a('fontFamily', value);
            setFont(data, "group.title.font");
        }
    },
    {
        categoryName: '组',
        name: 'fontStyle',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'italic', 'oblique']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('fontStyle', value);
            setFont(data, "group.title.font");
        }
    },
    {
        categoryName: '组',
        name: 'fontWeight',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('fontWeight', value);
            setFont(data, "group.title.font");
        }
    },
    {
        categoryName: '组',
        name: 'fontSize',
        accessType: 'attr',
        editable: true,
        formatValue: function (v) {
            return v || '12px';
        },
        setValue: function (data, column, value, view) {
            data.a('fontSize', value);
            setFont(data, "group.title.font");
        }
    }
];

edge_properties = [
    {
        categoryName: '连接线',
        name: 'edge.width',
        displayName: '线条宽度(s:edge.width)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
     {
         categoryName: '连接线',
         name: 'edge.offset',
         displayName: '中心距离(s:edge.offset)',
         accessType: 'style',
         valueType: 'number',
         editable: true
     },
    {
        categoryName: '连接线',
        name: 'edge.color',
        displayName: '线条颜色(s:edge.color)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: '连接线',
        name: 'edge.3d',
        displayName: '3d效果(s:edge.3d)',
        accessType: 'style',
        valueType: 'boolean',
        editable: true
    },
    {
        categoryName: '连接线',
        name: 'edge.3d.color',
        displayName: '3d颜色(s:edge.3d.color)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    }
];

combobox_properties = [
    {
        categoryName: '属性',
        name: 'itemHeight',
        displayName: '列表行高(a:itemHeight)',
        accessType: 'attr',
        valueType: 'number',
        editable: true,
        setValue: function (data, column, value, view) {
            data.a("itemHeight", value);
        },
        getValue: function (data) {
            var v = data.a('itemHeight');
            if (v == null)
                return 20;
            else
                return v;
        }
    },
    {
        categoryName: '属性',
        name: 'itemBackground',
        displayName: '列表背景(a:itemBackground)',
        accessType: 'arrt',
        valueType: 'color',
        editable: true,
        setValue: function (data, column, value, view) {
            data.a("itemBackground", value);
        },
        getValue: function (data) {
            var v = data.a('itemBackground');
            if (v == null)
                return "white";
            else
                return v;
        }
    }
];

live_properties = [
    {
        categoryName: '属性',
        name: 'live.shape',
        displayName: '类型(s:live.shape)',
        accessType: 'style',
        editable: true,
        enum: {
            values: shape_type
        }
    },
    {
        categoryName: '属性',
        name: 'enbtagname',
        displayName: '使能标签名称(enbtagname)',
        accessType: 'attr',
        editable: true
    },
    {
        categoryName: '属性',
        name: 'Enabled',
        displayName: '默认使能',
        accessType: 'attr',
        valueType: 'boolean',
        editable: true,
        setValue: function (data, column, value, view) {
            if (value)
                data.setEnabled(true);
            else
                data.setEnabled(false);
            data.a("Enabled", value);
        },
        getValue: function (data) {
            var v = data.a('Enabled');
            if (v == null)
                return true;
            else
                return v;
        }
    },
     {
         categoryName: '属性',
         name: 'live.border.width',
         displayName: '边框宽度(s:live.border.width)',
         accessType: 'style',
         valueType: 'number',
         editable: true
     },
      {
          categoryName: '属性',
          name: 'live.border.color',
          displayName: '边框颜色(s:live.border.color)',
          accessType: 'style',
          valueType: 'color',
          editable: true
      },
       {
           categoryName: '属性',
           name: 'live.gradient',
           displayName: '渐变类型(s:live.gradient)',
           accessType: 'style',
           editable: true,
           enum: {
               values: gradient_type
           }
       },
       {
           categoryName: '属性',
           name: 'live.gradient.color',
           displayName: '渐变颜色(s:live.gradient.color)',
           accessType: 'style',
           valueType: 'color',
           editable: true
       }, {
           categoryName: '属性',
           name: 'live.background',
           displayName: '背景颜色(s:live.background)',
           accessType: 'style',
           valueType: 'color',
           editable: true
       },
        {
            categoryName: '属性',
            name: 'live.background.disabled',
            displayName: '不使能背景颜色(s:live.background.disabled)',
            accessType: 'style',
            valueType: 'color',
            editable: true
        },
         {
             categoryName: '属性',
             name: 'live.background.hover',
             displayName: 'hover背景颜色(s:live.background.hover)',
             accessType: 'style',
             valueType: 'color',
             editable: true
         },
         {
             categoryName: '属性',
             name: 'live.background.active',
             displayName: 'active背景颜色(s:live.background.active)',
             accessType: 'style',
             valueType: 'color',
             editable: true
         }, {
             categoryName: '属性',
             displayName: '文本(s:live.label)',
             name: 'live.label',
             accessType: 'style',
             editable: true
         },
         {
             categoryName: '属性',
             displayName: '文本x偏移(s:live.label.offset.x)',
             name: 'live.label.offset.x',
             accessType: 'style',
             valueType: 'number',
             editable: true
         },
         {
             categoryName: '属性',
             displayName: '文本y偏移(s:live.label.offset.y)',
             name: 'live.label.offset.y',
             accessType: 'style',
             valueType: 'number',
             editable: true
         },
         {
             categoryName: '属性',
             displayName: '文本对齐方式(s:live.label.align)',
             name: 'live.label.align',
             accessType: 'style',
             editable: true,
             enum: {
                 values: ['left', 'center', 'right']
             }
         },
         {
             categoryName: '属性',
             displayName: '字体值(live.label.font)',
             name: 'live.label.font',
             accessType: 'style',
             editable: true
         },

          {
              categoryName: '属性',
              name: 'fontFamily',
              displayName: '字体(fontFamily)',
              accessType: 'attr',
              editable: true,
              enum: {
                  values: HT2dEditor.fontFamilyList,
                  editable: true
              },
              formatValue: function (v) {
                  return v || 'arial';
              },
              setValue: function (data, column, value, view) {
                  data.a('fontFamily', value);
                  setFont(data, "live.label.font");
              }
          },
    {
        categoryName: '属性',
        name: 'fontStyle',
        displayName: '字形(fontStyle)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'italic', 'oblique']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('fontStyle', value);
            setFont(data, "live.label.font");
        }
    },
    {
        categoryName: '属性',
        name: 'fontWeight',
        displayName: '字体深度(fontWeight)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('fontWeight', value);
            setFont(data, "live.label.font");
        }
    },
    {
        categoryName: '属性',
        name: 'fontSize',
        displayName: '字体尺寸(fontSize)',
        accessType: 'attr',
        editable: true,
        formatValue: function (v) {
            return v || '12px';
        },
        setValue: function (data, column, value, view) {
            data.a('fontSize', value);
            setFont(data, "live.label.font");
        }
    },
         {
             categoryName: '属性',
             name: 'live.label.color',
             displayName: '文字颜色(s:live.label.color)',
             accessType: 'style',
             valueType: 'color',
             editable: true
         },
         {
             categoryName: '属性',
             name: 'live.label.disabled',
             displayName: '文字禁止颜色(s:live.label.disabled)',
             accessType: 'style',
             valueType: 'color',
             editable: true
         },
         {
             categoryName: '属性',
             name: 'live.label.hover',
             displayName: 'hover文字颜色(s:live.label.hover)',
             accessType: 'style',
             valueType: 'color',
             editable: true
         },
         {
             categoryName: '属性',
             name: 'live.label.active',
             displayName: 'active文字颜色(s:live.label.active)',
             accessType: 'style',
             valueType: 'color',
             editable: true
         },
];



swithc_properties = [
    {
        name: 'switch.angle',
        accessType: 'style',
        valueType: 'number',
        editable: true,
        slider: {
            min: -Math.PI / 4,
            max: 0,
            step: Math.PI / 180,
            getToolTip: function () {
                return Math.round(this.getValue() / Math.PI * 180) + '°';
            }
        }
    },
    {
        name: 'expanded',
        valueType: 'boolean',
        editable: true
    }
];

/*
shape.border.join边框当两条线交汇时创建边角的类型，可选参数为bevel|round|miter
shape.border.pattern显示虚线样式，Array类型，例如[5, 5]
shape.gradient渐近色类型：
    为空代表不绘制渐近色效果，只用shape.background纯色填充背景。
    支持类型：'linear.southwest','linear.southeast','linear.northwest','linear.northeast', 'linear.north','linear.south','linear.west','linear.east', 'radial.center','radial.southwest','radial.southeast','radial.northwest','radial.northeast', 'radial.north','radial.south','radial.west','radial.east', 'spread.horizontal','spread.vertical','spread.diagonal','spread.antidiagonal', 'spread.north','spread.south','spread.west','spread.east'
shape.gradient.color背景渐近颜色
shape.repeat.image填充重复背景的图片，注意这里的图片不支持矢量
shape.dash是否显示虚线，默认值为false
shape.dash.pattern虚线样式，默认值为[16, 16]
shape.dash.offset虚线偏移，默认值为0
shape.dash.color虚线颜色
shape.dash.width虚线宽度，默认为空代表采用shape.border.width值
*/
shape_properties = [
    {
        categoryName: 'Shape(图形)',
        name: 'shape.border.width',
        displayName: '线条宽度(s:shape.border.width)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'Shape(图形)',
        name: 'shape.border.color',
        displayName: '线条颜色(s:shape.border.color)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'Shape(图形)',
        name: 'shape.background',
        displayName: '背景颜色(s:shape.background)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'Shape(闪烁)',
        name: 'bordercolor',
        displayName: '线条颜色(s:bordercolor)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'Shape(闪烁)',
        name: 'background',
        displayName: '背景颜色(s:background)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'Shape(闪烁)',
         name: 'flashtagname',
         displayName: '闪烁控制(flashtagname)',
         accessType: 'attr',
         editable: true,
         getToolTip: function (data) {
             return "控制对象闪烁的变量名称";
         }
     },
    {
        categoryName: 'Shape(图形)',
        name: 'shape.border.cap',
        displayName: '线条末端线帽样式(s:shape.border.cap)',
        accessType: 'style',
        editable: true,
        enum: { values: ['butt', 'round', 'square'] }
    },
    {
        categoryName: 'Shape(图形)',
        name: 'shape.border.pattern',
        displayName: '显示虚线样式(s:shape.border.pattern)',
        accessType: 'style',
        editable: true
    },
     {
         categoryName: 'Shape(图形)',
         name: 'shape.border.join',
         displayName: '线条交汇类型(s:shape.border.join)',
         accessType: 'style',
         editable: true,
         enum: { values: ['bevel', 'round', 'miter'] }
     },
   {
       categoryName: 'Shape(图形)',
       name: 'shape.gradient',
       displayName: '渐变类型(s:shape.gradient)',
       accessType: 'style',
       editable: true,
       enum: {
           values: gradient_type
       }
   },
    {
        categoryName: 'Shape(图形)',
        name: 'shape.gradient.color',
        displayName: '渐变颜色(s:shape.gradient.color)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'Shape(图形)',
        name: 'shape.repeat.image',
        displayName: '背景填充图片(s:shape.repeat.image)',
        accessType: 'style',
        editable: true
    },
    {
        categoryName: 'Shape(图形)',
        name: 'shape.dash',
        displayName: '使用虚线(s:shape.dash)',
        accessType: 'style',
        valueType: 'boolean',
        editable: true
    },
    {
        categoryName: 'Shape(图形)',
        name: 'shape.border.3d',
        displayName: '边框3d(s:shape.border.3d)',
        accessType: 'style',
        valueType: 'boolean',
        editable: true
    },
    {
        categoryName: 'Shape(图形)',
        name: 'shape.dash.3d',
        displayName: '虚线3d(s:shape.dash.3d)',
        accessType: 'style',
        valueType: 'boolean',
        editable: true
    },
    {
        categoryName: 'Shape(图形)',
        name: 'shape.dash.pattern',
        displayName: '虚线样式(s:shape.dash.pattern)',
        accessType: 'style',
        editable: true,
        setValue: function (data, column, value, view) {
            var ss = value.split(',');
            if (ss.length == 2) {
                var x = parseInt(ss[0]) || 16;
                var y = parseInt(ss[1]) || 16;
                data.s('shape.dash.pattern', [x, y]);
            }
        }
    },
    {
        categoryName: 'Shape(图形)',
        name: 'shape.dash.offset',
        displayName: '虚线偏移(s:shape.dash.offset)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'Shape(图形)',
        name: 'shape.dash.color',
        displayName: '虚线颜色(s:shape.dash.color)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'Shape(图形)',
        name: 'shape.dash.width',
        displayName: '虚线宽度(s:shape.dash.width)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    }
];

Rect_properties = [
{
    categoryName: 'Shape(图形)',
    name: 'shape.depth',
    displayName: '边框深度(s:shape.depth)',
    accessType: 'style',
    valueType: 'number',
    editable: true
}
];


RoundRect_properties = [
    {
        categoryName: 'Shape(图形)',
        name: 'shape.corner.radius',
        displayName: '圆角(s:shape.corner.radius)',
        accessType: 'style',
        valueType: 'number',
        editable: true,
        getValue: function (data) {
            var v = data.s('shape.corner.radius');
            return (typeof v == "number") ? v : 8;
        }
    }
];

arc_properties = [
    {
        categoryName: '圆弧',
        name: 'shape.arc.from',
        displayName: '开始角度(s:shape.arc.from)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: '圆弧',
        name: 'shape.arc.to',
        displayName: '结束角度(s:shape.arc.to)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: '圆弧',
        name: 'shape.arc.close',
        displayName: '封闭弧(s:shape.arc.close)',
        accessType: 'style',
        valueType: 'boolean',
        editable: true
    },
    {
        categoryName: '圆弧',
        name: 'shape.arc.oval',
        displayName: '椭圆弧(s:shape.arc.oval)',
        accessType: 'style',
        valueType: 'boolean',
        editable: true
    }
];


window['风机整机_properties'] = Fan_properties = [
    {
        categoryName: 'E扩展',
        name: 'rotation',
        displayName: '旋转(rotation)',
        valueType: 'number',
        accessType: 'attr',
        editable: true,
        slider: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 180 * 5,
            getToolTip: function () {
                return Math.round(this.getValue() / Math.PI * 180) + '°';
            }
        },
        formatValue: function (v) {
            return Math.round((v || 0) / Math.PI * 180) + '°';
        }
    }
];


script_properties = [
{
    categoryName: 'E扩展',
    displayName: '脚本类型',
    name: 'type',
    accessType: 'attr',
    editable: true,
    enum: {
        values: ['初始化脚本', '数据更新脚本', '动画脚本', '全局脚本']
    },
    formatValue: function (v) {
        return v || '初始化脚本';
    },
    getValue: function (data) {
        return data.a('type') || '初始化脚本';
    }
}
];


TagValue1_properties = [
    {
        categoryName: 'E扩展',
        name: 'font',
        displayName: '字体',
        accessType: 'style',
        editable: true
    },
        {
            categoryName: 'E扩展',
            name: 'fontFamily',
            displayName: '字形(fontFamily)',
            accessType: 'attr',
            editable: true,
            enum: {
                values: HT2dEditor.fontFamilyList,
                editable: true
            },
            formatValue: function (v) {
                return v || 'arial';
            },
            setValue: function (data, column, value, view) {
                data.a('fontFamily', value);
                setFont(data, "font");
            }
        },
    {
        categoryName: 'E扩展',
        name: 'fontStyle',
        displayName: '字体样式(fontStyle)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'italic', 'oblique']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('fontStyle', value);
            setFont(data, "font");
        }
    },
    {
        categoryName: 'E扩展',
        name: 'fontWeight',
        displayName: '字体深度(fontWeight)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('fontWeight', value);
            setFont(data, "font");
        }
    },
    {
        categoryName: 'E扩展',
        name: 'fontSize',
        displayName: '字体尺寸(fontSize)',
        accessType: 'attr',
        editable: true,
        formatValue: function (v) {
            return v || '12px';
        },
        setValue: function (data, column, value, view) {
            data.a('fontSize', value);
            setFont(data, "font");
        }
    },
    {
        categoryName: 'E扩展',
        name: 'color',
        displayName: '文字颜色(s:color)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'background',
        displayName: '背景颜色(s:background)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'borderColor',
        displayName: '边框颜色(s:borderColor)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'E扩展',
        displayName: '边框宽度(s:borderWidth)',
        name: 'borderWidth',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'align',
        displayName: '水平对齐',
        accessType: 'style',
        editable: true,
        enum: {
            values: ['left', 'middle', 'right']
        }
    },
    {
        categoryName: 'E扩展',
        name: 'vAlign',
        displayName: '垂直对齐',
        accessType: 'style',
        editable: true,
        enum: {
            values: ['top', 'middle', 'bottom']
        }
    },
    {
        categoryName: 'E扩展',
        displayName: '小数点个数(digcount)',
        name: 'digcount',
        accessType: 'attr',
        valueType: 'number',
        editable: true
    },

    {
        categoryName: 'E扩展',
        name: 'unit',
        displayName: '单位(unit)',
        accessType: 'attr',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'ontext',
        displayName: 'On文本(ontext)',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a("ontext") || "ON";
        }
    }, {
        categoryName: 'E扩展',
        name: 'offtext',
        displayName: 'Off文本(offtext)',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a("offtext") || "OFF";
        }
    }
];

TagValue_properties = [
    {
        categoryName: 'E扩展',
        name: 'font',
        displayName: '字体',
        accessType: 'style',
        editable: true
    },
        {
            categoryName: 'E扩展',
            name: 'fontFamily',
            displayName: '字形(fontFamily)',
            accessType: 'attr',
            editable: true,
            enum: {
                values: HT2dEditor.fontFamilyList,
                editable: true
            },
            formatValue: function (v) {
                return v || 'arial';
            },
            setValue: function (data, column, value, view) {
                data.a('fontFamily', value);
                setFont(data, "font");
            }
        },
    {
        categoryName: 'E扩展',
        name: 'fontStyle',
        displayName: '字体样式(fontStyle)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'italic', 'oblique']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('fontStyle', value);
            setFont(data, "font");
        }
    },
    {
        categoryName: 'E扩展',
        name: 'fontWeight',
        displayName: '字体深度(fontWeight)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('fontWeight', value);
            setFont(data, "font");
        }
    },
    {
        categoryName: 'E扩展',
        name: 'fontSize',
        displayName: '字体尺寸(fontSize)',
        accessType: 'attr',
        editable: true,
        formatValue: function (v) {
            return v || '12px';
        },
        setValue: function (data, column, value, view) {
            data.a('fontSize', value);
            setFont(data, "font");
        }
    },
    {
        categoryName: 'E扩展',
        name: 'color',
        displayName: '文字颜色(s:color)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'align',
        displayName: '水平对齐',
        accessType: 'style',
        editable: true,
        enum: {
            values: ['left', 'middle', 'right']
        }
    },
    {
        categoryName: 'E扩展',
        name: 'vAlign',
        displayName: '垂直对齐',
        accessType: 'style',
        editable: true,
        enum: {
            values: ['top', 'middle', 'bottom']
        }
    },
    {
        categoryName: 'E扩展',
        displayName: '小数点个数(digcount)',
        name: 'digcount',
        accessType: 'attr',
        valueType: 'number',
        editable: true
    },

    {
        categoryName: 'E扩展',
        name: 'unit',
        displayName: '单位(unit)',
        accessType: 'attr',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'ontext',
        displayName: 'On文本(ontext)',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a("ontext") || "ON";
        }
    }, {
        categoryName: 'E扩展',
        name: 'offtext',
        displayName: 'Off文本(offtext)',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a("offtext") || "OFF";
        }
    }
];

onoff_properties = [
    {
        categoryName: 'E扩展',
        name: 'font',
        displayName: '字体',
        accessType: 'style',
        editable: true
    },
        {
            categoryName: 'E扩展',
            name: 'fontFamily',
            displayName: '字形(fontFamily)',
            accessType: 'attr',
            editable: true,
            enum: {
                values: HT2dEditor.fontFamilyList,
                editable: true
            },
            formatValue: function (v) {
                return v || 'arial';
            },
            setValue: function (data, column, value, view) {
                data.a('fontFamily', value);
                setFont(data, "font");
            }
        },
    {
        categoryName: 'E扩展',
        name: 'fontStyle',
        displayName: '字体样式(fontStyle)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'italic', 'oblique']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('fontStyle', value);
            setFont(data, "font");
        }
    },
    {
        categoryName: 'E扩展',
        name: 'fontWeight',
        displayName: '字体深度(fontWeight)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('fontWeight', value);
            setFont(data, "font");
        }
    },
    {
        categoryName: 'E扩展',
        name: 'fontSize',
        displayName: '字体尺寸(fontSize)',
        accessType: 'attr',
        editable: true,
        formatValue: function (v) {
            return v || '12px';
        },
        setValue: function (data, column, value, view) {
            data.a('fontSize', value);
            setFont(data, "font");
        }
    },
    {
        categoryName: 'E扩展',
        name: 'color',
        displayName: '颜色(color)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'align',
        displayName: '水平对齐',
        accessType: 'style',
        editable: true,
        enum: {
            values: ['left', 'middle', 'right']
        }
    },
    {
        categoryName: 'E扩展',
        name: 'vAlign',
        displayName: '垂直对齐',
        accessType: 'style',
        editable: true,
        enum: {
            values: ['top', 'middle', 'bottom']
        }
    },
    {
        categoryName: 'E扩展',
        name: 'ontext',
        displayName: 'On文本(ontext)',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a("ontext") || "ON";
        }
    }, {
        categoryName: 'E扩展',
        name: 'offtext',
        displayName: 'Off文本(offtext)',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a("offtext") || "OFF";
        }
    }
];
//断路器属性
window['Breaker_properties'] = Handcart_properties = [
    {
        categoryName: 'E扩展',
        name: 'oncolor',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('oncolor') || '#FF0000';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'offcolor',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('offcolor') || '#00FF00';
        }
    }
];

SwitchSimple_properties = [
    {
        categoryName: 'E扩展',
        name: 'borderColor',
        valueType: 'color',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a('borderColor') || 'red';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'borderWidth',
        displayName: '边框宽度(borderWidth)',
        accessType: 'attr',
        valueType: 'number',
        editable: true,
        getValue: function (data) {
            var v = data.a('borderWidth');
            return (typeof v == "number") ? v : 2;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'rotation',
        valueType: 'number',
        accessType: 'attr',
        editable: true,
        slider: {
            min: -Math.PI / 2,
            max: Math.PI / 2,
            step: Math.PI / 180 * 5,
            getToolTip: function () {
                return Math.round(this.getValue() / Math.PI * 180) + '°';
            }
        },
        formatValue: function (v) {
            return Math.round((v || 0) / Math.PI * 180) + '°';
        }
    }
];

EarthWire_properties = [
    {
        categoryName: 'E扩展',
        name: 'background',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('background') || '#2C97DE';
        }
    }
];

//变压器属性
window["Transformer_properties"] = PT_properties = BoxSubstation_properties = Inverter_properties = [
    {
        categoryName: 'E扩展',
        name: 'oncolor',
        displayName: 'ON颜色(oncolor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('oncolor') || '#FF0000';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'offcolor',
        displayName: 'OFF颜色(offcolor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('offcolor') || '#00FF00';
        }
    }
];

// 进度条
Progress_properties = [
    {
        categoryName: 'E扩展',
        name: 'cornerRadius',
        displayName: '圆角(cornerRadius)',
        valueType: 'number',
        accessType: 'attr',
        editable: true,
        formatValue: function (value) {
            return (value == null) ? 5 : value;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'padding',
        displayName: '边距(padding)',
        valueType: 'number',
        accessType: 'attr',
        editable: true,
        formatValue: function (value) {
            return (value == null) ? 2 : value;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'background',
        displayName: '背景颜色(background)',
        valueType: 'color',
        accessType: 'attr',
        editable: true,
        formatValue: function (value) {
            return (value == null) ? ht.Color.imageBackground : value;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'foreground',
        displayName: '前景颜色(foreground)',
        valueType: 'color',
        accessType: 'attr',
        editable: true,
        formatValue: function (value) {
            return (value == null) ? 'green' : value;
        }
    },
    {
           categoryName: 'E扩展',
           name: 'fgradient',
           displayName: '前景渐变类型(fgradient)',
           accessType: 'attr',
           editable: true,
           enum: {
               values: gradient_type
           }
     },
    {
        categoryName: 'E扩展',
        name: 'fgradientcolor',
        displayName: '前景渐变颜色(fgradientcolor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true
    },
    {
           categoryName: 'E扩展',
           name: 'bgradient',
           displayName: '背景渐变类型(bgradient)',
           accessType: 'attr',
           editable: true,
           enum: {
               values: gradient_type
           }
     },
    {
        categoryName: 'E扩展',
        name: 'bgradientcolor',
        displayName: '背景渐变颜色(bgradientcolor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'maxValue',
        displayName: '最大值(maxValue)',
        valueType: 'number',
        accessType: 'attr',
        editable: true,
        formatValue: function (value) {
            return (value == null) ? 100 : value;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'minValue',
        displayName: '最小值(minValue)',
        valueType: 'number',
        accessType: 'attr',
        editable: true,
        formatValue: function (value) {
            return (value == null) ? 0 : value;
        }
    }
];

//风机矩阵属性
BoxFan_properties = [
    {
        categoryName: 'E扩展',
        name: 'rotation',
        valueType: 'number',
        accessType: 'attr',
        editable: true,
        slider: {
            min: 0,
            max: Math.PI * 2,
            step: Math.PI / 180 * 5,
            getToolTip: function () {
                return Math.round(this.getValue() / Math.PI * 180) + '°';
            }
        },
        formatValue: function (v) {
            return Math.round((v || 0) / Math.PI * 180) + '°';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'bladeColor',
        valueType: 'color',
        accessType: 'attr',
        editable: true,
        formatValue: function (v) {
            return v || '#2C97DE';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'name',
        valueType: 'string',
        accessType: 'attr',
        editable: true,
        formatValue: function (v) {
            return v || '';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'textColor',
        valueType: 'color',
        accessType: 'attr',
        editable: true,
        formatValue: function (v) {
            return v || '#000000';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'maxSpeed',
        valueType: 'number',
        accessType: 'attr',
        editable: true,
        formatValue: function (v) {
            return v || 100;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'maxPower',
        valueType: 'number',
        accessType: 'attr',
        editable: true,
        formatValue: function (v) {
            return v || 2000;
        }
    }
];

Pump1_properties = [
        {
            categoryName: 'E扩展',
            name: 'oncolor',
            displayName: 'ON颜色(oncolor)',
            accessType: 'attr',
            valueType: 'color',
            editable: true,
            getValue: function (data) {
                return data.a('oncolor') || '#FF0000';
            }
        },
    {
        categoryName: 'E扩展',
        name: 'offcolor',
        displayName: 'OFF颜色(offcolor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('offcolor') || '#00FF00';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'borderWidth',
        displayName: '边框宽度(borderWidth)',
        accessType: 'attr',
        valueType: 'number',
        editable: true,
        getValue: function (data) {
            var v = data.a('borderWidth');
            return (typeof v == "number") ? v : 2;
        }
    }
];

window['Pump_properties'] = Valve_properties = Valve1_properties = Valve2_properties = Valve3_properties = [
    {
        categoryName: 'E扩展',
        name: 'oncolor',
        displayName: 'ON颜色(oncolor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('oncolor') || '#FF0000';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'offcolor',
        displayName: 'OFF颜色(offcolor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('offcolor') || '#00FF00';
        }
    }, {
        categoryName: 'E扩展',
        name: 'borderColor',
        displayName: '边框颜色(borderColor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('borderColor') || '#000000';
        }
    }, {
        categoryName: 'E扩展',
        name: 'borderWidth',
        displayName: '边框宽度(borderWidth)',
        accessType: 'attr',
        valueType: 'number',
        editable: true,
        getValue: function (data) {
            var v = data.a('borderWidth');
            return (typeof v == "number") ? v : 1;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'gradient',
        displayName: '渐变类型(gradient)',
        editable: true,
        accessType: 'attr',
        enum: {
            values: gradient_type
        }
    }, {
        categoryName: 'E扩展',
        name: 'gradientColor',
        displayName: '渐变颜色(gradientColor)',
        editable: true,
        accessType: 'attr',
        valueType: "color"
    }
];


//圆形指示灯属性
window['圆形指示灯_properties'] = 矩形指示灯_properties = [
    {
        categoryName: 'E扩展',
        name: 'oncolor',
        displayName: 'ON颜色(oncolor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('oncolor') || '#FF0000';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'type',
        displayName: '图形样式(type)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ["rect", "circle", "oval", "roundRect", "star", "triangle", "hexagon", "pentagon", "diamond", "rightTriangle", "parallelogram", "trapezoid"]
        }
    },
    {
        categoryName: 'E扩展',
        name: 'offcolor',
        displayName: 'OFF颜色(offcolor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('offcolor') || '#00FF00';
        }
    }, {
        categoryName: 'E扩展',
        name: 'borderColor',
        displayName: '边框颜色(borderColor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('borderColor') || '#000000';
        }
    }, {
        categoryName: 'E扩展',
        name: 'borderWidth',
        displayName: '边框宽度(borderWidth)',
        accessType: 'attr',
        valueType: 'number',
        editable: true,
        getValue: function (data) {
            var v = data.a('borderWidth');
            return (typeof v == "number") ? v : 1;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'gradient',
        displayName: '渐变类型(gradient)',
        editable: true,
        accessType: 'attr',
        enum: {
            values: gradient_type
        }
    }, {
        categoryName: 'E扩展',
        name: 'gradientColor',
        displayName: '渐变颜色(gradientColor)',
        editable: true,
        accessType: 'attr',
        valueType: "color"
    }
];

Handcart_properties = [
    {
        categoryName: 'E扩展',
        name: 'oncolor',
        displayName: 'ON颜色(oncolor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('oncolor') || '#FF0000';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'offcolor',
        displayName: 'OFF颜色(offcolor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('offcolor') || '#00FF00';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'borderWidth',
        displayName: '边框宽度(borderWidth)',
        accessType: 'attr',
        valueType: 'number',
        editable: true,
        getValue: function (data) {
            var v = data.a('borderWidth');
            return (typeof v == "number") ? v : 2;
        }
    }
];

Image_properties = [
    {
        categoryName: 'E扩展',
        name: 'onimage',
        displayName: 'ON图形(onimage)',
        accessType: 'attr',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'offimage',
        displayName: 'OFF图形(offimage)',
        accessType: 'attr',
        editable: true
    }
];

柱状图_properties = [
    {
        categoryName: 'E扩展',
        name: 'labelColor',
        displayName: '文字颜色(s:labelColor)',
        accessType: 'style',
        editable: true,
        valueType: 'color',
        getValue: function (data) {
            return data.s('labelColor') || 'white';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'minValue',
        displayName: '最小值(s:minValue)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'maxValue',
        displayName: '最大值(s:maxValue)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'labelFont',
        displayName: '文字字体(s:labelFont)',
        accessType: 'style',
        editable: true,
        getValue: function (data) {
            return data.s('labelFont') || '10px Arial';
        }
    }
];

饼图_properties = [
    {
        categoryName: 'E扩展',
        name: 'labelColor',
        displayName: '文字颜色(s:labelColor)',
        accessType: 'style',
        editable: true,
        valueType: 'color',
        getValue: function (data) {
            return data.s('labelColor') || 'white';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'shadowColor',
        displayName: '阴影颜色(s:shadowColor)',
        accessType: 'style',
        editable: true,
        valueType: 'color',
        getValue: function (data) {
            return data.s('shadowColor') || 'rgba(0, 0, 0, 0.5)';
        }
    }, {
        categoryName: 'E扩展',
        name: 'shadow',
        displayName: '显示阴影(s:shadow)',
        accessType: 'style',
        valueType: 'boolean',
        editable: true,
        getValue: function (data) {
            var k = data.s('shadow');
            if (k == null)
                return true;
            else
                return data.s('shadow')
        }
    },
    {
        categoryName: 'E扩展',
        name: 'hollow',
        displayName: '显示空心(s:hollow)',
        accessType: 'style',
        valueType: 'boolean',
        editable: true,
        getValue: function (data) {
            return data.s('hollow');
        }
    },
    {
        categoryName: 'E扩展',
        name: 'startAngle',
        displayName: '开始角度(s:startAngle)',
        accessType: 'style',
        valueType: 'number',
        editable: true,
        getValue: function (data) {
            return data.s('startAngle') || 0;
        }
    }, {
        categoryName: 'E扩展',
        name: 'colors',
        displayName: '颜色数组(s:colors)',
        accessType: 'style',
        editable: true,
        setValue: function (data, column, value, view) {
            if (value && value != "") {
                var ss = value.split(',');
                if (ss.length > 0) {
                    data.s('colors', ss);
                }
                else
                    data.s('colors', []);
            }
            else
                data.s('colors', []);
        }
    }, {
        categoryName: 'E扩展',
        name: 'values',
        displayName: '值数组(s:values)',
        accessType: 'style',
        editable: true,
        setValue: function (data, column, value, view) {
            if (value && value != "") {
                var ss = value.split(',');
                if (ss.length > 0) {
                    var lst = new ht.List();
                    ss.forEach(function (a) {
                        lst.add(parseFloat(a));
                    });
                    data.s('values', lst.toArray());
                }
                else {
                    data.s('values', []);
                }
            }
            else
                data.s('values', []);
        }
    },
    {
        categoryName: 'E扩展',
        name: 'labelFont',
        displayName: '文字字体(s:labelFont)',
        accessType: 'style',
        editable: true,
        getValue: function (data) {
            return data.s('labelFont') || '10px Arial';
        }
    }
];


折线图_properties = [
    {
        categoryName: 'E扩展',
        name: 'labelColor',
        displayName: '文字颜色(s:labelColor)',
        accessType: 'style',
        editable: true,
        valueType: 'color',
        getValue: function (data) {
            return data.s('labelColor') || 'white';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'minValue',
        displayName: '最小值(s:minValue)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'maxValue',
        displayName: '最大值(s:maxValue)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'labelFont',
        displayName: '文字字体(labelFont)',
        accessType: 'style',
        editable: true,
        getValue: function (data) {
            return data.s('labelFont') || '10px Arial';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'lineWidth',
        displayName: '线宽(s:lineWidth)',
        accessType: 'style',
        valueType: 'number',
        editable: true,
        getValue: function (data) {
            return data.s('lineWidth') || 2;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'line3d',
        displayName: '显示3D样式(s:line3d)',
        accessType: 'style',
        valueType: 'boolean',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'linePoint',
        displayName: '显示拐点(s:linePoint)',
        accessType: 'style',
        valueType: 'boolean',
        editable: true,
        getValue: function (data) {
            if (data.s('linePoint') == null)
                return true;
            else
                return data.s('linePoint');
        }
    }
];

堆栈柱状图_properties = [
    {
        categoryName: 'E扩展',
        name: 'labelColor',
        displayName: '文字颜色(s:labelColor)',
        accessType: 'style',
        editable: true,
        valueType: 'color',
        getValue: function (data) {
            return data.s('labelColor') || 'white';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'maxValue',
        displayName: '最大值(s:maxValue)',
        accessType: 'style',
        valueType: 'number',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'labelFont',
        displayName: '文字字体(s:labelFont)',
        accessType: 'style',
        editable: true,
        getValue: function (data) {
            return data.s('labelFont') || '10px Arial';
        }
    }
];


百分比柱状图_properties = [
    {
        categoryName: 'E扩展',
        name: 'labelColor',
        displayName: '文字颜色(s:labelColor)',
        accessType: 'style',
        editable: true,
        valueType: 'color',
        getValue: function (data) {
            return data.s('labelColor') || 'white';
        }
    },
    {
        categoryName: 'E扩展',
        name: 'labelFont',
        displayName: '文字字体(s:labelFont)',
        accessType: 'style',
        editable: true,
        getValue: function (data) {
            return data.s('labelFont') || '10px Arial';
        }
    }
];


UserShape_properties = [
    {
        categoryName: 'E扩展',
        name: 'points',
        displayName: 'points(s:points)',
        accessType: 'style',
        editable: true,
        setValue: function (data, column, value, view) {
            if (value && value != "") {
                var ss = value.split(',');
                if (ss.length > 0) {
                    data.s('points', ss);
                }
                else
                    data.s('points', []);
            }
            else
                data.s('points', []);
        },
        getValue: function (data) {
            return data.s('points') || "0, 0, 40, 0, 30, 30";
        }
    },
        {
        categoryName: 'E扩展',
        name: 'segments',
        displayName: 'segments(s:segments)',
        accessType: 'style',
        editable: true,
        setValue: function (data, column, value, view) {
            if (value && value != "") {
                var ss = value.split(',');
                if (ss.length > 0) {
                    var lst = new ht.List();
                    ss.forEach(function (a) {
                        lst.add(parseFloat(a));
                    });
                    data.s('segments', lst.toArray());
                }
                else {
                    data.s('segments', []);
                }
            }
            else
                data.s('segments', []);
        },
        getValue: function (data) {
            return data.s('segments') || "1,2,2,5";
        }
    }
];

tag_properties = [
    {
        categoryName: 'C组态',
        name: 'tagname',
        displayName: '变量名称(tagname)',
        accessType: 'attr',
        editable: true
    },
     {
         categoryName: 'C组态',
         name: 'tagvalue',
         displayName: '变量值(tagvalue)',
         accessType: 'attr',
         editable: true
     },
    {
        categoryName: 'C组态',
        name: 'tagname1',
        accessType: 'attr',
        editable: true
    },
    {
        categoryName: 'C组态',
        name: 'tagname2',
        accessType: 'attr',
        editable: true
    },
    {
        categoryName: 'C组态',
        name: 'tagname3',
        accessType: 'attr',
        editable: true
    },
    {
        categoryName: 'C组态',
        name: 'tagname4',
        accessType: 'attr',
        editable: true
    },
    {
        categoryName: 'C组态',
        name: 'tagname5',
        accessType: 'attr',
        editable: true
    },
    {
        categoryName: 'C组态',
        name: 'tagname6',
        accessType: 'attr',
        editable: true
    },
    {
        categoryName: 'C组态',
        name: 'tagname7',
        accessType: 'attr',
        editable: true
    },
    {
        categoryName: 'C组态',
        name: 'tagname8',
        accessType: 'attr',
        editable: true
    },
    {
        categoryName: 'C组态',
        name: 'tagname9',
        accessType: 'attr',
        editable: true
    }
];

Progress1_properties = [
    {
        categoryName: 'E扩展',
        name: 'padding',
        displayName: '边距(padding)',
        valueType: 'number',
        accessType: 'attr',
        editable: true,
        formatValue: function (value) {
            return (value == null) ? 2 : value;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'background',
        displayName: '背景颜色(background)',
        valueType: 'color',
        accessType: 'attr',
        editable: true,
        formatValue: function (value) {
            return (value == null) ? 'white' : value;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'foreground',
        displayName: '前景颜色(foreground)',
        valueType: 'color',
        accessType: 'attr',
        editable: true,
        formatValue: function (value) {
            return (value == null) ? 'green' : value;
        }
    },

       {
           categoryName: 'E扩展',
           name: 'fgradient',
           displayName: '前景渐变类型(fgradient)',
           accessType: 'attr',
           editable: true,
           enum: {
               values: gradient_type
           }
       },
    {
        categoryName: 'E扩展',
        name: 'fgradientcolor',
        displayName: '前景渐变颜色(fgradientcolor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true
    },
       {
           categoryName: 'E扩展',
           name: 'bgradient',
           displayName: '背景渐变类型(bgradient)',
           accessType: 'attr',
           editable: true,
           enum: {
               values: gradient_type
           }
       },
    {
        categoryName: 'E扩展',
        name: 'bgradientcolor',
        displayName: '背景渐变颜色(bgradientcolor)',
        accessType: 'attr',
        valueType: 'color',
        editable: true
    },

    {
        categoryName: 'E扩展',
        name: 'maxValue',
        displayName: '最大值(maxValue)',
        valueType: 'number',
        accessType: 'attr',
        editable: true,
        formatValue: function (value) {
            return (value == null) ? 100 : value;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'minValue',
        displayName: '最小值(minValue)',
        valueType: 'number',
        accessType: 'attr',
        editable: true,
        formatValue: function (value) {
            return (value == null) ? 0 : value;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'borderWidth',
        displayName: '边框宽度(borderWidth)',
        valueType: 'number',
        accessType: 'attr',
        editable: true,
        formatValue: function (value) {
            return (value == null) ? 1 : value;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'borderColor',
        displayName: '边框颜色(borderColor)',
        valueType: 'color',
        accessType: 'attr',
        editable: true,
        formatValue: function (value) {
            return value || "black";
        }
    }
];


lrule_properties = [
    {
        categoryName: 'E扩展',
        name: 'background',
        displayName: '背景(background)',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('background');
        }
    },
    {
        categoryName: 'E扩展',
        name: 'borderColor',
        displayName: '线条颜色',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('borderColor') || "black";
        }
    },
    {
        categoryName: 'E扩展',
        name: 'borderWidth',
        displayName: '水平线条宽度(borderWidth)',
        accessType: 'attr',
        valueType: 'number',
        editable: true,
        getValue: function (data) {
            var v = data.a('borderWidth');
            return (typeof v == "number") ? v : 1;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'borderWidth1',
        displayName: '垂直线条宽度(borderWidth1)',
        accessType: 'attr',
        valueType: 'number',
        editable: true,
        getValue: function (data) {
            var v = data.a('borderWidth1');
            return (typeof v == "number") ? v : 1;
        }
    }
];

lrule10_properties = lrule_properties;

ProgressText_properties = [
    {
        categoryName: 'E扩展',
        name: 'color',
        displayName: '颜色(color)',
        accessType: 'attr',
        valueType: 'color',
        editable: true,
        getValue: function (data) {
            return data.a('color') || "black";
        }
    },
    {
        categoryName: 'E扩展',
        name: 'max',
        displayName: '最大值(max)',
        accessType: 'attr',
        valueType: 'number',
        editable: true,
        getValue: function (data) {
            if (data.a('max') == null)
                return 100; 
            else
                return data.a('max');
        }
    },
    {
        categoryName: 'E扩展',
        name: 'min',
        displayName: '最小值(min)',
        accessType: 'attr',
        valueType: 'number',
        editable: true,
        getValue: function (data) {
            if (data.a('min') == null)
                return 0;
            else
            return data.a('min');
        }
    },
    {
        categoryName: 'E扩展',
        name: 'dig',
        displayName: '小数点(dig)',
        accessType: 'attr',
        valueType: 'number',
        editable: true,
        getValue: function (data) {
            return data.a('dig') || 0;
        }
    },
    {
        categoryName: 'E扩展',
        name: 'font',
        displayName: '字体',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a('font') || "9px Arial";
        }
    },
    {
        categoryName: 'E扩展',
        displayName: '对齐',
        name: 'align',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['right', 'left']
        },
        getValue: function (data) {
            var image = data.getImage();
            if (data.a('align') == null) {
                return image == "ProgressText" ? "right" : "left";
            }
            else
                return data.a('align')
        }
    }
];

ProgressText3_properties = ProgressText_properties;
ProgressText4_properties = ProgressText_properties;
ProgressText1_properties = ProgressText_properties;

//多态显示控件
snumber_properties = [
    {
        categoryName: 'E扩展',
        name: 'font',
        displayName: '字体',
        accessType: 'style',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'fontFamily',
        displayName: '字形(fontFamily)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: HT2dEditor.fontFamilyList,
            editable: true
        },
        formatValue: function (v) {
            return v || 'arial';
        },
        setValue: function (data, column, value, view) {
            data.a('fontFamily', value);
            setFont(data, "font");
        }
    },
    {
        categoryName: 'E扩展',
        name: 'fontStyle',
        displayName: '字体样式(fontStyle)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'italic', 'oblique']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('fontStyle', value);
            setFont(data, "font");
        }
    },
    {
        categoryName: 'E扩展',
        name: 'fontWeight',
        displayName: '字体深度(fontWeight)',
        accessType: 'attr',
        editable: true,
        enum: {
            values: ['normal', 'bold', 'bolder', 'lighter', '100', '200', '300', '400', '500', '600', '700', '800', '900']
        },
        formatValue: function (v) {
            return v || 'normal';
        },
        setValue: function (data, column, value, view) {
            data.a('fontWeight', value);
            setFont(data, "font");
        }
    },
    {
        categoryName: 'E扩展',
        name: 'fontSize',
        displayName: '字体尺寸(fontSize)',
        accessType: 'attr',
        editable: true,
        formatValue: function (v) {
            return v || '12px';
        },
        setValue: function (data, column, value, view) {
            data.a('fontSize', value);
            setFont(data, "font");
        }
    },
    {
        categoryName: 'E扩展',
        name: 'color',
        displayName: '颜色(s:color)',
        accessType: 'style',
        valueType: 'color',
        editable: true
    },
    {
        categoryName: 'E扩展',
        name: 'align',
        displayName: '水平对齐',
        accessType: 'style',
        editable: true,
        enum: {
            values: ['left', 'middle', 'right']
        }
    },
    {
        categoryName: 'E扩展',
        name: 'vAlign',
        displayName: '垂直对齐',
        accessType: 'style',
        editable: true,
        enum: {
            values: ['top', 'middle', 'bottom']
        }
    },
    {
        categoryName: 'E扩展',
        name: 'text0',
        displayName: '0时显示内容(text0)',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a("text0") || "";
        }
    },
    {
        categoryName: 'E扩展',
        name: 'text1',
        displayName: '1时显示内容(text1)',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a("text1") || "";
        }
    },
    {
        categoryName: 'E扩展',
        name: 'text2',
        displayName: '2时显示内容(text2)',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a("text2") || "";
        }
    },
    {
        categoryName: 'E扩展',
        name: 'text3',
        displayName: '3时显示内容(text3)',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a("text3") || "";
        }
    },
    {
        categoryName: 'E扩展',
        name: 'text4',
        displayName: '4时显示内容(text4)',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a("text4") || "";
        }
    },
    {
        categoryName: 'E扩展',
        name: 'text5',
        displayName: '5时显示内容(text5)',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a("text5") || "";
        }
    },
    {
        categoryName: 'E扩展',
        name: 'text6',
        displayName: '6时显示内容(text6)',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a("text6") || "";
        }
    },
    {
        categoryName: 'E扩展',
        name: 'text7',
        displayName: '7时显示内容(text7)',
        accessType: 'attr',
        editable: true,
        getValue: function (data) {
            return data.a("text7") || "";
        }
    }
];

// 业务属性
professional_properties = [
    {
        categoryName: 'P业务',
        name:'station',
        displayName:'厂站号',
        accessType:'attr',
        editable:false,
    },
    {
        categoryName: 'P业务',
        name:'faci',
        displayName: '设备号',
        accessType: 'attr',
        editable: false,
    },
    {
        categoryName: 'P业务',
        name:'signal',
        displayName: '信号',
        accessType: 'attr',
        editable: false,
    }
]
