﻿function next(){if(tabledataModel.size()>0){var e=$("#dt").datetimebox("getValue"),a=new Date(Date.parse(e.replace(/-/g,"/"))),t=$("#lengthselect").combobox("getValue"),n=a.valueOf();n+=1e3*parseInt(t);var i=(a=new Date(n)).getFullYear().toString()+"-"+(a.getMonth()+1).toString()+"-"+a.getDate().toString()+" "+a.getHours().toString()+":"+a.getMinutes().toString()+":"+a.getSeconds().toString();$("#dt").datetimebox("setValue",i),query()}else showMessage("消息","没有标签可以查询!")}function pre(){if(tabledataModel.size()>0){var e=$("#dt").datetimebox("getValue"),a=new Date(Date.parse(e.replace(/-/g,"/"))),t=$("#lengthselect").combobox("getValue"),n=a.valueOf();n-=1e3*parseInt(t);var i=(a=new Date(n)).getFullYear().toString()+"-"+(a.getMonth()+1).toString()+"-"+a.getDate().toString()+" "+a.getHours().toString()+":"+a.getMinutes().toString()+":"+a.getSeconds().toString();$("#dt").datetimebox("setValue",i),query()}else showMessage("消息","没有标签可以查询!")}function query(e){if(tabledataModel.size()>0){var a=$("#lengthselect").combobox("getValue"),t=$("#dt").datetimebox("getValue");showLoading();var n="";null==e?tabledataModel.each(function(e){n+=e.a("tagname")+"|"+e.a("rangemin")+"|"+e.a("rangemax")+";"}):e.forEach(function(e){var a=tabledataModel.getDataByTag(e);a&&(n+=a.a("tagname")+"|"+a.a("rangemin")+"|"+a.a("rangemax")+";")}),$.post("server/scada/histquery_trend.ashx",{tags:n,tm:t,len:a},function(e){if(e.length>0){option.xAxis.max=new Date(Date.parse(e[0].maxtime.replace(/-/g,"/"))),option.xAxis.min=new Date(Date.parse(e[0].mintime.replace(/-/g,"/")));for(var a in e){var t=e[a].name,n=getIndex(t);if(n>=0){for(var i in e[a].data)e[a].data[i].value[0]=new Date(Date.parse(e[a].data[i].value[0].replace(/-/g,"/")));seriesdefine[n].data=e[a].data,seriesdefine[n].rangemax=e[a].rangemax,seriesdefine[n].rangemin=e[a].rangemin;var o=tabledataModel.getDataByTag(t);o&&(o.a("max",e[a].max),o.a("min",e[a].min)),e[a].type="line",e[a].showSymbol=seriesdefine[n].showSymbol,e[a].hoverAnimation=seriesdefine[n].hoverAnimation,e[a].itemStyle=seriesdefine[n].itemStyle}}tableView.iv(),myChart.setOption({xAxis:{min:option.xAxis.min,max:option.xAxis.max},series:e})}hideLoading()},"json")}else showMessage("消息","没有标签可以查询!")}function init(){topView=document.getElementById("main"),topView.onLayouted=function(e,a,t,n){myChart.resize()},bottomView=createTable(),mainView=new ht.widget.SplitView(topView,bottomView,"v",-100),mainView.setDividerSize(1),mainView.setTogglable(!1),mainView.setDraggable(!0),view=mainView.getView(),view.className="main",document.body.appendChild(view),window.addEventListener("resize",function(e){mainView.iv()},!1)}function createTable(){tabledataModel=new ht.DataModel,tagstable=new ht.widget.TablePane(tabledataModel),tagstable.addColumns([{name:"visible",width:30,displayName:"显示",accessType:"attr",editable:!0,valueType:"boolean",align:"center"},{name:"color",width:50,displayName:"颜色",accessType:"attr",align:"left",drawCell:function(e,a,t,n,i,o,r,l,s){var g=a.a("color")||"white";e.fillStyle=t?ht.Default.darker(g):g,e.beginPath(),e.rect(i,o,r,l),e.fill()}},{name:"tagname",width:250,displayName:"标签名称",accessType:"attr",align:"left"},{name:"unit",width:60,displayName:"单位",accessType:"attr",align:"left"},{name:"rangemin",width:100,editable:!0,valueType:"number",displayName:"量程下限",accessType:"attr",align:"left"},{name:"rangemax",width:100,editable:!0,valueType:"number",displayName:"量程上限",accessType:"attr",align:"left"},{name:"desc",width:250,displayName:"描述",accessType:"attr",align:"left"},{name:"min",width:100,displayName:"最小值",accessType:"attr",align:"left"},{name:"max",width:100,displayName:"最大值",accessType:"attr",align:"left"}]);var e=tagstable.getTableHeader();e.setColumnLineColor("#C8C8C8"),e.setInsertColor("#6DCDF3"),e.getLabelFont=function(e){return"bold 12px Arial"},e.getView().style.background="#F1F1F1",tableView=tagstable.getTableView(),tableView.setRowLineColor("#C8C8C8"),tableView.setColumnLineVisible(!0),tableView.setRowHeight(22),tableView.setAutoHideScrollBar(!1),tableView.drawRowBackground=function(e,a,t,n,i,o,r){e.fillStyle=t?"#87A6CB":"#FFFFFF",e.beginPath(),e.rect(n,i,o,r),e.fill()},""!=trendname?getTagsFromGroup(trendname):querytags.length>0&&gettags(querytags);var a=[{label:"修改标题",action:function(){getInput("修改标题",title,function(e){title=e,myChart.setOption({title:{text:title}})})}},{label:"添加标签",action:function(){addTags()}},{label:"删除标签",action:function(){var e=tabledataModel.getSelectionModel().toSelection();e.size()>0&&(e.each(function(e){var a=-1,t=e.getTag();if(null!=t){delete units[t],delete lengthname[t],delete lineselect[t],(a=lengthdefine.indexOf(t))>=0&&lengthdefine.splice(a,1),delete seriesdata[t],a=-1;for(var n in seriesdefine)if(seriesdefine[n].name==t){a=n;break}a>=0&&seriesdefine.splice(a,1)}tabledataModel.remove(e)}),myChart.clear(),myChart.setOption(option))}},"separator",{label:"修改颜色",action:function(){var e=tabledataModel.getSelectionModel().toSelection();if(e.size()>0){var a=getIndex(e.get(0).getTag());if(a>=0){var t=new ht.DataModel,n=new ht.Data;n.a("background",seriesdefine[a].itemStyle.normal.color||"white"),t.add(n),t.sm().setSelection([n]);var i=new ht.widget.PropertyView(t);i.setIndent(0),i.setRowHeight(30),i.setSelectRowIndex(0),i.setProperties([{name:"background",displayName:"线条颜色",valueType:"color",accessType:"attr",editable:!0,formatValue:function(e){return e||"#FFFFFF"}}]);var o=new ht.widget.Dialog,r=new ht.widget.ContextMenu;r.addTo(o.getView()),r.setItems([]),o.setConfig({title:"线条颜色设置",width:280,height:111,closable:!0,draggable:!0,content:i,contentPadding:10,background:"#D9D9D9",buttons:[{label:"确定",action:function(t,i){o.hide(),seriesdefine[a].itemStyle.normal.color=n.a("background"),myChart.setOption(option),e.get(0).a("color",n.a("background")),tableView.iv()}}],buttonsAlign:"right",action:function(e,a){}}),o.show()}}}},{label:"修改量程",action:function(){setRange()}},"separator",{label:"读入趋势组",action:function(){readFromGroup()}},{label:"保存趋势组",action:function(){saveToGroup()}}],t=new ht.widget.ContextMenu;return t.addTo(tagstable.getView()),t.setItems(a),tagstable}function gettags(e){if(e.length>0){var a=e.join(",");$.post("server/scada/histquery_tags.ashx",{tags:a},function(e){e.length>0?(e.forEach(function(e){e.tagname=(e.plugid+"."+e.tagname).toUpperCase(),showTag(e)}),tableView.iv(),myChart.setOption(option)):showMessage("消息","没有查询到历史标签数据!")},"json")}}function showTag(e){if(a=(a=e.tagname||e.a("plug")+"."+e.a("tagname")).toUpperCase(),null==tabledataModel.getDataByTag(a)&&tabledataModel.size()<16){colorindex>=option.color.length&&(colorindex=0);var a,t,n,i,o,r;e.tagname?(t=e.unit,n=e.desc,i=e.rangemax,o=e.rangemin,r=e.type):(t=e.a("unit"),n=e.a("desc"),i=e.a("rangemax"),o=e.a("rangemin"),r=e.a("type"));var l=new ht.Data;l.setTag(a),l.a({tagname:a,visible:!0,unit:t,desc:n,rangemax:i,rangemin:o,type:r,color:e.color||option.color[colorindex]}),l.onPropertyChanged=function(e){var a=e.property;if("a:rangemax"==a)updateRange([e.data]);else if("a:rangemin"==a)updateRange([e.data]);else if("a:visible"==a){var t=l.getTag();""!=t&&(lineselect[t]=e.newValue,myChart.setOption({legend:{selected:lineselect}}))}},tabledataModel.add(l),seriesdata[a]=new Array,lengthdefine.push(a),lengthname[a]=n,units[a]=t,lineselect[a]=!0,seriesdefine.push({name:a,type:"line",itemStyle:{normal:{color:e.color||option.color[colorindex]}},showSymbol:!1,hoverAnimation:!1,data:seriesdata[a]}),null==e.color&&colorindex++}}function addTags(){showTagsDialog(function(e){e&&(e.each(function(e){var a=e.a("plug")+"."+e.a("tagname");a=a.toUpperCase(),null==tabledataModel.getDataByTag(a)&&showTag(e)}),tableView.iv(),tags.length>0&&(myChart.setOption(option),query(tags)))})}function updateRange(e){if(null!=e){var a=[];e.forEach(function(e){var t=e.a("rangemax"),n=e.a("rangemin"),i=getIndex(e.getTag());if(i>=0){var o=seriesdefine[i];o.rangemax=t,o.rangemin=n;var r;o.data.forEach(function(e){r=parseFloat(e.name),e.value[1]=(r-n)/(t-n)*100}),a.push(o)}}),myChart.setOption({series:a})}}function getIndex(e){index=-1;for(var a in seriesdefine)if(seriesdefine[a].name.toLowerCase()==e.toLowerCase()){index=a;break}return index}function setRange(){var e=tabledataModel.getSelectionModel().toSelection();if(e.size()>0){var a=new ht.widget.Dialog,t=new ht.widget.ContextMenu;t.addTo(a.getView()),t.setItems([]),a.setConfig({title:"量程设置",closable:!0,draggable:!0,contentPadding:5,content:'<div>量程下限:<input id="rangemin" style="font-size:14px;width:100px;"/><br />量程上限:<input id="rangemax" style="font-size:14px;width:100px;"/></div>',buttons:[{label:"确定",action:function(t,n){var i=a.getView().querySelector("#rangemax").value,o=a.getView().querySelector("#rangemin").value;i=parseFloat(i),o=parseFloat(o);var r=[];isNaN(i)||isNaN(o)||e.each(function(e){e.a("rangemax",i),e.a("rangemin",o),r.push(e)}),a.hide(),tableView.iv(),updateRange(r)}},{label:"取消",action:function(e,t){a.hide()}}],buttonsAlign:"right"}),a.onShown=function(){var a=e.get(0),t=$("#rangemin");t&&t.val(a.a("rangemin"));var n=$("#rangemax");n&&n.val(a.a("rangemax"))},a.onHidden=function(){},a.show()}}function getTagsFromGroup(e){null!=e&&""!=e&&$.post("server/scada/gettrendgroup.ashx",{type:"histtrend",name:e},function(e){e.forEach(function(e){e.tagname=e.tagname.toUpperCase(),null==tabledataModel.getDataByTag(e.tagname)&&showTag(e)}),tableView.iv(),tags.length>0&&(myChart.setOption(option),query(tags))})}function readFromGroup(){$.post("server/scada/gettrendgroup.ashx",{type:"histgroup"},function(e){var a=new ht.DataModel;e.forEach(function(e){var t=new ht.Data;t.a({name:e.name,desc:e.description,id:e.id}),a.add(t)}),a.getSelectionModel().setSelectionMode("single");var t=new ht.widget.TablePane(a);t.addColumns([{name:"name",width:200,displayName:"名称",accessType:"attr",align:"left"},{name:"desc",width:250,displayName:"描述",accessType:"attr",align:"left"}]);var n=t.getTableHeader();n.setColumnLineColor("#C8C8C8"),n.setInsertColor("#6DCDF3"),n.getLabelFont=function(e){return"bold 12px Arial"},n.getView().style.background="#F1F1F1",tableView=tagstable.getTableView(),tableView.setRowLineColor("#C8C8C8"),tableView.setColumnLineVisible(!0),tableView.setRowHeight(22),tableView.setAutoHideScrollBar(!1),tableView.drawRowBackground=function(e,a,t,n,i,o,r){e.fillStyle=t?"#87A6CB":"#FFFFFF",e.beginPath(),e.rect(n,i,o,r),e.fill()};var i=new ht.widget.Dialog;i.setConfig({title:"标签组",width:455,height:300,closable:!0,draggable:!0,resizeMode:"wh",content:t,maximizable:!0,buttons:[{label:"确定",action:function(e,t){i.hide();var n=a.getSelectionModel().toSelection();if(n.size()>0){var o=n.get(0);title=o.a("name"),option.title.text=o.a("desc")||title,getTagsFromGroup(o.a("name"))}}},{label:"取消",action:function(e,a){i.hide()}}],buttonsAlign:"right"});var o=new ht.widget.ContextMenu;o.addTo(i.getView()),o.setItems([]),i.show()})}function saveToGroup(){tabledataModel.size()>0&&getInput("输入趋势组名称",title,function(e){var a=[];tabledataModel.each(function(e){var t={tagname:e.a("tagname"),unit:e.a("unit"),rangemax:e.a("rangemax"),rangemin:e.a("rangemin"),desc:e.a("desc"),color:e.a("color")};a.push(t)});var t=JSON.stringify(a);$.post("server/scada/savetrend.ashx",{type:"histrend",title:e,trends:t},function(e){alert(e.message)})})}var showTagsDialog=function(e){serverTags?callTagsDialog(e):(showLoading(),$.post("server/scada/histquery_tags.ashx",{rows:_rows,page:_currentPage},function(a){serverTags=a.rows,_pagecount=a.pagecount,serverTags.length>0?callTagsDialog(e):showMessage("消息","没有查询到历史标签数据!"),hideLoading()},"json"))},callTagsDialog=function(e){if(serverTags&&serverTags.length>0){var a=new ht.widget.Toolbar([{id:"tagname",label:"标签名称:",icon:"images/search.png",unfocusable:!0,textField:{width:100}},"separator",{id:"plug",label:"驱动:",unfocusable:!0,textField:{width:50}},"separator",{id:"desc",label:"描述:",unfocusable:!0,textField:{width:150}}]);a.setItemGap(5),a.getView().style.background="#E1E1E1";var t=new ht.widget.BorderPane;t.setTopView(a);var n=new ht.DataModel,i=new ht.widget.TablePane(n);t.setCenterView(i),i.addColumns([{name:"index",width:50,displayName:"序号",accessType:"attr",align:"left",valueType:"number"},{name:"tagname",width:200,displayName:"标签名称",accessType:"attr",align:"left"},{name:"plug",width:80,displayName:"驱动",accessType:"attr",align:"left"},{name:"unit",width:50,displayName:"单位",accessType:"attr",align:"left"},{name:"type",width:65,displayName:"类型",accessType:"attr",align:"left"},{name:"desc",width:200,displayName:"描述",accessType:"attr",align:"left"}]);var o=(_currentPage-1)*_rows+1;serverTags.forEach(function(e){var a=e.tagname;if(null==tabledataModel.getDataByTag(a)){var t=new ht.Data;t.a({index:o,tagname:a,unit:e.unit,type:e.type,plug:e.plugid,desc:e.desc,rangemax:e.rangemax,rangemin:e.rangemin}),n.add(t),o++}});var r=i.getTableHeader();r.setColumnLineColor("#C8C8C8"),r.setInsertColor("#6DCDF3"),r.getLabelFont=function(e){return"bold 12px Arial"},r.getView().style.background="#F1F1F1";var l=i.getTableView();l.setSelectBackground("#E1E1E1"),l.setRowLineColor("#EDEDED"),l.setColumnLineVisible(!1),l.setRowHeight(22),l.setAutoHideScrollBar(!1),l.drawRowBackground=function(e,a,t,n,i,o,r){e.fillStyle=t?"#87A6CB":"#FAFAFA",e.beginPath(),e.rect(n,i,o,r),e.fill()},a.getView().style.background="#F1F1F1";var s=a.getItemById("tagname").element;s.getElement().onkeyup=function(e){27===e.keyCode&&(s.getElement().value=""),l.invalidateModel()};var g=a.getItemById("desc").element;g.getElement().onkeyup=function(e){27===e.keyCode&&(g.getElement().value=""),l.invalidateModel()};var d=a.getItemById("plug").element;d.getElement().onkeyup=function(e){27===e.keyCode&&(d.getElement().value=""),l.invalidateModel()},l.isVisible=function(e){if(e.isEmpty()){var t=a.v("tagname"),n=a.v("desc"),i=a.v("plug"),o=!0;""!=t&&(o=e.a("tagname").toLowerCase().indexOf(t.toLowerCase())>=0),o&&""!=i&&(o=e.a("plug").toLowerCase().indexOf(i.toLowerCase())>=0),o&&""!=n&&(o=e.a("desc").toLowerCase().indexOf(n.toLowerCase())>=0)}return o};var c=new ht.widget.Dialog,u="("+_currentPage+"/"+_pagecount+")";c.setConfig({title:"标签浏览器"+u,width:660,height:450,closable:!0,draggable:!0,resizeMode:"wh",content:t,maximizable:!0,buttons:[{label:"上一页",action:function(e,a){_currentPage>1&&(_currentPage--,n.clear(),$.post("server/scada/histquery_tags.ashx",{rows:_rows,page:_currentPage},function(e){serverTags=e.rows,_pagecount=e.pagecount,u="标签浏览器("+_currentPage+"/"+_pagecount+")",c.setTitle(u),o=(_currentPage-1)*_rows+1,serverTags.forEach(function(e){var a=new ht.Data,t=e.tagname;a.a({index:o,tagname:t,unit:e.unit,type:e.type,plug:e.plugid,desc:e.desc,rangemax:e.rangemax,rangemin:e.rangemin}),o++,n.add(a)})},"json")),_currentPage<_pagecount&&(p._background="rgb(231, 76, 60)",p._selectBackground="rgb(196, 65, 51)",p.iv()),1==_currentPage&&(m._background="rgb(128, 128, 128)",m._selectBackground="rgb(128, 128, 128)")}},{label:"下一页",action:function(e,a){_currentPage<_pagecount&&(_currentPage++,n.clear(),$.post("server/scada/histquery_tags.ashx",{rows:_rows,page:_currentPage},function(e){serverTags=e.rows,_pagecount=e.pagecount,u="标签浏览器("+_currentPage+"/"+_pagecount+")",c.setTitle(u),o=(_currentPage-1)*_rows+1,serverTags.forEach(function(e){var a=new ht.Data,t=e.tagname;a.a({index:o,tagname:t,unit:e.unit,type:e.type,plug:e.plugid,desc:e.desc,rangemax:e.rangemax,rangemin:e.rangemin}),o++,n.add(a)})},"json")),_currentPage==_pagecount&&(p._background="rgb(128, 128, 128)",p._selectBackground="rgb(128, 128, 128)"),_currentPage>1&&(m._background="rgb(231, 76, 60)",m._selectBackground="rgb(196, 65, 51)",m.iv())}},{label:"确定",action:function(a,t){if(c.hide(),e){var i=n.getSelectionModel().toSelection();i&&e(i)}}},{label:"取消",action:function(e,a){c.hide()}}],buttonsAlign:"right"});var m=c.$42d[0],p=c.$42d[1];m._background="rgb(128, 128, 128)",m._selectBackground="rgb(128, 128, 128)";var w=new ht.widget.ContextMenu;w.addTo(c.getView()),w.setItems([]),c.onShown=function(){a.iv()},c.show()}};