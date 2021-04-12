const baseURL = "http://localhost:3000";
const mobileURL = "http://imocl.cn.utools.club"
export default function (url, data = {}, method = "get") {
    return new Promise((resolve, reject) => {
        wx.request({
            url: mobileURL + url,
            method,
            data,
            success(data) {
                resolve(data)

            },
            fail(err) {
                reject(err)
            }
        })
    })
}