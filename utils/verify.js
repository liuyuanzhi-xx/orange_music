function isPhone(v) {
    var patrn = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
    if (!v) {
        return {
            msg: "请输入手机号码",
            flag: false
        }
    } else if (!patrn.exec(v)) {
        return {
            msg: "手机号码格式错误",
            flag: false
        }
    } else {
        return {
            msg: "",
            flag: true
        }

    }
}

function isSame(v1, v2) {
    console.log
    if (!v2) {
        return {
            msg: "请确认密码",
            flag: false
        }
    } else if (v1 != v2) {
        return {
            msg: "密码不一致",
            flag: false
        }
    } else {
        return {
            msg: "",
            flag: true
        }
    }
}

function isEmpty(v) {

    if (!v) {
        return {
            msg: "该项不能为空",
            flag: false
        }
    } else {
        return {
            msg: "",
            flag: true
        }
    }
}
export default {
    isPhone,
    isSame,
    isEmpty
}