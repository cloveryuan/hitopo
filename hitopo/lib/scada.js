isRuning = false;
tags = "";
_rows = 1000;//标签浏览器分页数量
isReadonly = false;
_playbackmode = false;
_normalmode = true;

Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//2017.10 读取url参数
function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null)
        return unescape(r[2]);
    return null;
}

//url跳转
function goto(url, param) {
    if (url) {
        var u = url;
        if (param)
            u += "?" + param + "&shipname=" + filename;
        else {
            u += "?shipname=" + filename;
        }
        u = encodeURI(u);
        location.href = u;
    }
}

function isScript(data) {
    if (data)
        return (data instanceof ht.Script || data.a("script") || data.a("nclick") || data.a("vchange") || data.a("bclick") || data.a("dchange"));
    else
        return false;
}

//输入对话框
function getinputvalue(display, value) {
    var v = prompt(display, value);
    return v;
}

function $t(tagid) {
    return $T(tagid);
}

function $T(tagid) {
    if (typeof tagid == "string") {
        return dm.getDataByTag(tagid);
    }
    else
        return null;
}

function view_orient() {
    if (window.orientation) {
        if (window.orientation == 90 || window.orientation == -90) {
            //竖屏
        }
        else if (window.orientation == 0 || window.orientation == 180) {
            //横屏
        }
    }
}

function createLocalTags(_dm) {
    var data = new ht.Data();
    data.a({
        index: 0,
        station: "IOERROR",
        faci: '',
        signal: '本地通讯故障',
    });
    _dm.add(data);
    data = new ht.Data();
    data.a({
        index: 0,
        station: "NORMALMODE",
        faci: '',
        signal: '正常运行模式'
    });

    _dm.add(data);
    data = new ht.Data();
    data.a({
        index: 0,
        station: "PLAYBACKMODE",
        faci: '',
        signal: '历史回放模式'
    });
}

//本地时间转换为GTM
function local2GTM(str) {
    var mdate = new Date(Date.parse(str.replace(/-/g, "/")));
    var offset = mdate.getTimezoneOffset();
    var a = mdate.valueOf() + 1000 * offset * 60;
    mdate = new Date(a);
    return mdate.getFullYear().toString() + "-" + (mdate.getMonth() + 1).toString() + "-" + mdate.getDate().toString() + " " + mdate.getHours().toString() + ":" + mdate.getMinutes().toString() + ":" + mdate.getSeconds().toString();
}


//GTM转换为本地时间
function gtm2Local(str) {
    var mdate = new Date(Date.parse(str.replace(/-/g, "/")));
    var offset = mdate.getTimezoneOffset();
    var a = mdate.valueOf() - 1000 * offset * 60;
    return new Date(a);
}

//询问对话框
function questionbox(msg) {
    return confirm(msg);
}

function login() {
    location.href = "login.html";
}

function logout() {
    location.href = "logout.aspx";
}

function viewlog() {
    location.href = "logview.aspx";
}

function viewstatus() {
    location.href = "status.aspx";
}

function editor(name) {
    if (name)
        location.href = encodeURI("editor.aspx?filename=" + name);
    else {
        if (filename)
            location.href = encodeURI("editor.aspx?filename=" + filename);
        else
            location.href = "editor.aspx";
    }
}

//tags trend timer title datacount
// 跳转实时趋势图页面
function viewrealtrend(param) {
    if (param)
        location.href = encodeURI("realtrend.aspx?" + param);
    else
        location.href = "realtrend.aspx";
}

// 打开实时趋势
function openrealtrend(param) {
    if (param)
        window.open(encodeURI("realtrend.aspx?" + param));
    else
        window.open("realtrend.aspx");
}

//tags trend title
// 跳转历史趋势鼠标脚本信息
function viewhistrend(param) {
    if (param)
        location.href = encodeURI("histrend.aspx?" + param);
    else
        location.href = "histrend.aspx";
}

function openhistrend(param) {
    if (param)
        window.open(encodeURI("histrend.aspx?" + param));
    else
        window.open("histrend.aspx");
}

//2017.10 
function database() {
    openvariables();
}

function openvariables() {
    console.log(2)
    location.href = "database.html?pagesize=" + _rows;
}


//重新加载数据库变量
function reload(callback) {
    $.post("server/scada/reload.ashx", {}, function (data) {
        //var id = data.id;// : 0 OK else error
        //var m = data.message;
        if (callback != null)
            callback(data);
    }, "json");
}


//查询历史最大 最小 平均值 max min all
function getHistValue(tag, starttime, endtime, valuetype, callback) {
    $.post("server/scada/histqueryvalue.ashx", {
            tag: tag,
            start: starttime,
            end: endtime,
            type: valuetype
        }, function (data) {
            if (data.count > 0) {
                if (callback)
                    callback(data);
            }
        }
        , "json");
}

function display(name, param) {
    if (!_playbackmode) {
        if (param) {
            if (name)
                location.href = encodeURI("runview.aspx?filename=" + name + "&param=" + param);
        }
        else {
            if (name)
                location.href = encodeURI("runview.aspx?filename=" + name);
            else
                location.href = "runview.aspx";
        }
    }
};

function testValue() {
    var end = new Date();
    var a = end.valueOf();
    a = a - 1000 * parseInt(3600);
    var start = new Date(a);
    var strdate = start.getFullYear().toString() + "-" + (start.getMonth() + 1).toString() + "-" + start.getDate().toString() + " " + start.getHours().toString() + ":" + start.getMinutes().toString() + ":" + start.getSeconds().toString();
    var enddate = end.getFullYear().toString() + "-" + (end.getMonth() + 1).toString() + "-" + end.getDate().toString() + " " + end.getHours().toString() + ":" + end.getMinutes().toString() + ":" + end.getSeconds().toString();
    var tag = "sim_var_6";
    var type = "all";//max min avg

    getHistValue(tag, strdate, enddate, type, function (data) {
        //alert(data.max);
        //alert(data.min);
        //alert(data.avg);
    });

    /*
    type = "max";
    getHistValue(tag, strdate, enddate, type, function (data) {
        alert(data.max);
    });

    type = "min";
    getHistValue(tag, strdate, enddate, type, function (data) {
        alert(data.min);
    });*/
}


//显示消息
function showMessage(title, msg) {
    var dialog = new ht.widget.Dialog();
    var contextMenu = new ht.widget.ContextMenu();
    contextMenu.addTo(dialog.getView());
    contextMenu.setItems([]);
    dialog.setConfig({
        title: title,
        closable: true,
        draggable: true,
        contentPadding: 5,
        content: '<div id="content">' + msg + '</div>',
        buttons: [
            {
                label: "确定"
            }
        ],
        buttonsAlign: "right",
        action: function (item, e) {
            dialog.hide();
        }
    });
    dialog.show();
}


function getInput(title, txt, action) {
    var dialog = new ht.widget.Dialog();
    dialog.setConfig({
        title: title,
        closable: true,
        draggable: true,
        height: 110,
        width: 280,
        contentPadding: 5,
        content: '<div>请输入:<input id="texteditor" type="text" style="font-size:14px;width:180px;" value="' + txt + '"></div>',
        buttons: [
            {
                label: "确定",
                action: function (item, e) {
                    dialog.hide();
                    var t = dialog.getView().querySelector("#texteditor").value;
                    if (action)
                        action(t);
                }
            },
            {
                label: "取消",
                action: function (item, e) {
                    dialog.hide();
                }
            }
        ],
        buttonsAlign: "right",
    });
    dialog.show();
}

//textarea <textarea rows="10" cols="30">
function getMInput(title, txt, action) {
    var dialog = new ht.widget.Dialog();
    dialog.setConfig({
        title: title,
        closable: true,
        draggable: true,
        height: 245,
        width: 280,
        contentPadding: 2,
        content: '<div><textarea id="texteditor" rows="10" cols="30" spellcheck="false" wrap="off" >' + txt + '</textarea> </div>',
        buttons: [
            {
                label: "确定",
                action: function (item, e) {
                    dialog.hide();
                    var t = dialog.getView().querySelector("#texteditor").value;
                    if (action)
                        action(t);
                }
            },
            {
                label: "取消",
                action: function (item, e) {
                    dialog.hide();
                }
            }
        ],
        buttonsAlign: "right",
    });
    dialog.show();
}


//sql命令操作 type=query
function sqlquery(type, sql, page, pagesize, action) {
    $.post("server/sqlcmd.ashx", {"type": type, "sql": sql, "page": page, "pagesize": pagesize},
        function (data) {
            if (action) {
                if (data != null) {
                    action(data);
                }
            }
        }, "json");
}


//sec 延时ms数后隐藏
function showLoading(sec) {
    $("body").mLoading("show");
    if (typeof sec == "number")
        setTimeout("hiseLoading()", sec);
}

//2017.10
function hideLoading() {
    $("body").mLoading("hide");
}

//同步读取变量值
function getTagsValue(tags) {
    var rows = [];
    if (tags) {
        $.ajax({
            type: 'POST',
            url: "server/scada/getvalues.ashx",
            data: {"tags": tags, "nocache": true},
            async: false,
            success: function (data) {
                rows = data.rows;
            },
            error: function () {
            },
            dataType: "json"
        });
    }
    return rows;
}


//同步获取全部文件名称
function getAllFileNames() {
    var files = [];
    $.ajax({
        type: 'POST',
        url: "server/getjsonFiles.ashx",
        data: {"type": "json"},
        async: false,
        success: function (fileList) {
            files = fileList;
        },
        error: function () {
        },
        dataType: "json"
    });
    return files;
}

//同步判断文件是否存在
function jsonfileExist(filename) {
    var result = false;
    if (filename) {
        $.ajax({
            type: 'POST',
            url: "server/jsonfileExist.ashx",
            data: {"filename": filename},
            async: false,
            success: function (data) {
                if (data.length == 0) {
                    result = false;
                }
                else {
                    result = true;
                }
            },
            error: function () {
            },
            dataType: "json"
        });
    }
    return result;
}

