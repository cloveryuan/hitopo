var ClipboardJSONSerializer = function(dataModel) {
    ClipboardJSONSerializer.superClass.constructor.call(this, dataModel);
};
ht.Default.def(ClipboardJSONSerializer, ht.JSONSerializer, {
    toJSON: function() {
        var self = this,
            datas = self.dm.sm().getSelection(),
            json = self.json = {d: []};
        datas.each(self.serializeData, self);
        return json;
    },
    getProperties: function(data) {
        var map = {
            name: 1,
            layer: 1,
            vectorType: 1,
            image : 1
        };
        if (data instanceof ht.Node) {
            map.position = 1;
            map.width = 1;
            map.height = 1;
            map.rotation = 1;
        }
        if (data instanceof ht.Shape) {
            map.segments = 1;
            map.points = 1;
        }
        // if (data instanceof CustomShape) {
        //     map.image = 1;
        // }
        return map;
    },
    getStyles: function(data) {
        var name, map = {};
        for (name in data._styleMap) {
            map[name] = 1;
        }
        return map;
    },
    getAttrs: function(data) {
        return data._attrObject;
    },
    deserializeData: function(data, json) {
        ClipboardJSONSerializer.superClass.deserializeData.call(this, data, json);
    }
});
