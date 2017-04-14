/*
$(function () {
    //键盘回车事件
    $(document).keypress(function (e) {
        // 回车键事件 
        if (e.which == 13) {
            loginSystem();
        }
    });
});
function loginSystem() {
    var userName = $("#UserName").val();
    if (userName == "") {
        $("#userNameError").text("请输入账号");
        return false;
    } else {
        $("#userNameError").text("");
    }
    var userPwd = $("#UserPwd").val();
    if (userPwd == "") {
        $("#userPwdError").text("请输入密码");
        return false;
    } else {
        $("#userPwdError").text("");
    }
    loginSSO(userName, userPwd);
}

//登陆sso
function loginSSO(userName, userPwd) {

    $.ajax({
        url: "http://" + SSOIp + "/PassportHandler.ashx",
        data: "action=login&module=SubSystem&name=" + userName + "&pwd=" + userPwd,
        type: "post",
        dataType: "jsonp",
        jsonp: 'jsonp',
        jsonpCallback: "checkLogin",
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data == "1") {
                $.ajax({
                    url: "/Login/AdminLogin",
                    data: { userName: userName, userPwd: userPwd },
                    type: "post",
                    dataType: "json",
                    async: false,
                    success: function (data) {
                        if (data.status == 1) {
                            alert(data.msg);
                        } else if (data.status == 2) {
                            alert("抱歉，账号或密码错误");
                            return;
                        } else if (data.status == 0) {
                            //window.location = "/Map/Index";
                            loginSSO(userName, userPwd);
                        }
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        alert(XMLHttpRequest.status + "错误请联系管理员！");
                    }
                })
                //} else {
                //    alert("抱歉，账号或密码错误");
                //    return;
                //}

            } else {
                $.cookie('userName', userName, { path: '/' });
                //document.cookie = "userName=" + userName+";path='/'";
                window.location = "/Map/Index";
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert("登录失败:" + XMLHttpRequest.status + "错误请联系管理员！");
        }
    });
}

*/

/*--------------------------------------面向对象的登录实现--------------------------------------*/
/*User对象，给对象声明属性并且实现构造函数*/
var MyUser = function () {
    this.UserName = "",
    this.UserPwd = "",
    this.IsValid = true
};

//初始化默认值
MyUser.prototype.InitObj = function () {
    this.UserName = "";
    this.UserPwd = "";
    this.IsValid = true;
    return this;
};
//Setter
MyUser.prototype.SetUserName = function (name) {
    this.UserName = name;
    return this;
};
MyUser.prototype.SetUserPwd = function (pwd) {
    this.UserPwd = pwd;
    return this;
};
//对象验证
MyUser.prototype.ValidData = function () {

    var userName = $("#UserName").val();
    var userPwd = $("#UserPwd").val();

    if (!userName) {
        $("#userNameError").text("请输入账号");
        this.IsValid = false;
    } else {
        this.SetUserName(userName);
        $("#userNameError").text("");
    }

    if (!userPwd) {
        $("#userPwdError").text("请输入密码");
        this.IsValid = false;
    } else {
        this.SetUserPwd(userPwd);
        $("#userPwdError").text("");
    }
    return this;
};
//获取SSO验证
MyUser.prototype.LoginSSO = function (success, fail) {
    if (this.IsValid) {
        var userName = this.UserName;
        var userPwd = this.UserPwd;
        $.ajax({
            url: "http://" + SSOIp + "/PassportHandler.ashx",
            data: "action=login&module=SubSystem&name=" + userName + "&pwd=" + userPwd,
            type: "post",
            dataType: "jsonp",
            jsonp: 'jsonp',
            jsonpCallback: "checkLogin",
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                success(data);
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                fail();
                //alert("登录失败:" + XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    } else {
        fail();
    }
    return this;
}
//登录子系统
MyUser.prototype.LoginSystem = function (resData) {
    var self = this;
    if (resData == "1") {
        var userName = this.UserName;
        var userPwd = this.UserPwd;
        $.ajax({
            url: "/Login/AdminLogin",
            data: { userName: userName, userPwd: userPwd },
            type: "post",
            dataType: "json",
            async: false,
            success: function (data) {
                if (data.status == 1) {
                    alert(data.msg);
                } else if (data.status == 2) {
                    alert("抱歉，账号或密码错误");
                    return;
                } else if (data.status == 0) {
                    //重新登录
                    self.LoginOn();
                    //loginSSO(userName, userPwd);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                alert(XMLHttpRequest.status + "错误请联系管理员！");
            }
        });
    } else {
        $.cookie('userName', userName, { path: '/' });
        window.location = "/Map/Index";
    }
    return this;
};
//登录方法
MyUser.prototype.LoginOn = function(){
    var self = this;
    this.LoginSSO(
        function(res){
            self.LoginSystem(res);
        },
        function(res){
            console.log('登录失败');
        });
    return this;
};
//实例化对象
var User = new MyUser;
$(function () {  
    //键盘回车事件
    $(document).keypress(function (e) {
        // 回车键事件 
        if (e.which == 13) {
            User.InitObj().ValidData().LoginOn();
        }
    });
});
//登录方法
function loginSystem() {
    User.InitObj().ValidData().LoginOn();
};