export default function () {
    try {
        var value = wx.getStorageSync('system') || null;
        if (value) {
            return value;
        } else {
            wx.getSystemInfo({
                success(res) {
                    console.log(res.system)
                    if (res.system.indexOf('Android') != -1) {
                        wx.setStorageSync('system', 1)
                        value = 1;

                    } else if (res.system.indexOf('iOS') != -1) {
                        wx.setStorageSync('system', 2)
                        value = 2;
                    }
                }
            })
            return value

        }
    } catch (e) {
        // Do something when catch error
    }

}