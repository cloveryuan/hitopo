datamodel_config = {
    "v": "6.2.0",
    "p": {
        "layers": [
            "backgroundLayer",
            "nodeLayer",
            "textLayer",
            "l4",
            "l5",
            "l6",
            "l7",
            "l8"
        ],
        "autoAdjustIndex": true,
        "hierarchicalRendering": false
    },
    "d": [
        {
            "c": "ht.Shape",
            "i": 120,
            "p": {
                "layer": "backgroundLayer",
                "tag": "frameborder",
                "position": {
                    "x": 512,
                    "y": 384
                },
                "width": 1024,
                "height": 768,
                "points": {
                    "__a": [
                        {
                            "x": 0,
                            "y": 0
                        },
                        {
                            "x": 1024,
                            "y": 0
                        },
                        {
                            "x": 1024,
                            "y": 768
                        },
                        {
                            "x": 0,
                            "y": 768
                        },
                        {
                            "x": 0,
                            "y": 0
                        }
                    ]
                }
            },
            "s": {
                "shape.border.width": 0.5,
                "shape.background": null,
                "shape.border.color": "#f40",
                "label.opacity": 0,
                "2d.selectable": false,
                "2d.movable": false,
                "2d.editable": false
            }
        },
        {
            "c": "ht.Switch",
            "i": 179,
            "p": {
                "layer": "nodeLayer",
                "tag": "开关179",
                "position": {
                    "x": 184,
                    "y": 128
                }
            },
            "a": {
                "modelRule": "defaultModel"
            }
        },
        {
            "c": "ht.Node",
            "i": 253,
            "p": {
                "layer": "nodeLayer",
                "tag": "Clock253",
                "image": "clock",
                "position": {
                    "x": 128,
                    "y": 232
                }
            },
            "a": {
                "flash": true,
                "modelRule": "defaultModel"
            }
        },
        {
            "c": "ht.Node",
            "i": 319,
            "p": {
                "layer": "nodeLayer",
                "tag": "厂站点管道319",
                "image": "images/control/管道/9.png",
                "position": {
                    "x": 184,
                    "y": 456
                }
            },
            "s": {
                "signal": "中"
            },
            "a": {
                "modelRule": "defaultModel",
                "station": "3号",
                "faci": "2号"
            }
        }
    ]
}