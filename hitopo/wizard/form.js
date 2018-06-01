//表单控件 mymyformPane
function getData(username, password, description){
    $.post('https://www.easy-mock.com/mock/5b06298aa5fec41287e785e8/hightopo/pipe/form',function(result){
        result.every(function (item) {
            if (item.username == username){
                if (item.password == password) {
                    alert(
                        '用户名：' + username + '\n' +
                        '描述:' + description + '\n'
                    )
                    return false
                } else {
                    alert('用户名与密码不匹配')
                    return false
                }
            }else{
                alert('用户名不存在')
                return false
            }           
        })
    })
}


function myformPane_init() {
    var myformPane = new ht.widget.FormPane();
    myformPane.getLabelFont = function (item) { return "bold 12px arial, sans-serif"; };
    myformPane.getLabelVAlign = function (item) { return 'top'; };
    myformPane.addRow([
                        '用户名称:',
                        {
                            id: 'firstName',
                            textField: {
                                text: 'Eric'
                            }
                        }
    ], [80, 0.1]);
    myformPane.addRow([
                        '密码:',
                        {
                            id: 'password',
                            textField: {
                                text: 'ht for web',
                                type: 'password'
                            }
                        }
    ], [80, 0.1]);

    myformPane.addRow([
                        '描述:',
                        {
                            id: 'description',
                            textArea: {
                                text: 'www.wtsoftware.cn'
                            }
                        }
    ], [80, 0.1], 0.1);

    myformPane.addRow([
                        null,
                        {
                            button: {
                                label: '提交',
                                onClicked: function () {                                 
                                    myformPane && getData(myformPane.v('firstName'), myformPane.v('password'), myformPane.v('description')); 
                                }
                            }
                        },
                        {
                            button: {
                                label: '清除',
                                onClicked: function () {
                                    myformPane.v({
                                        firstName: '',
                                        password: '',
                                        description: ''
                                    });
                                }
                            }
                        }
    ], [0.1, 100, 100]);
    //myformPane.getView().className = "main";
    var myformPane_view = myformPane.getView();
    myformPane_view.style.top = "0px";
    myformPane_view.style.right = "0px";
    myformPane_view.style.background = "#F1F1F1";
    myformPane.setWidth(350);
    myformPane.setHeight(200);
    document.body.appendChild(myformPane_view);
}

myformPane_init();