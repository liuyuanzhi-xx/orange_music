const app = getApp();
import request from "./request"
export default async function (currentSongId) {
    const list = app.globalData.playSong.list;
    const curIndex = list.findIndex((item) => item.id == currentSongId);
    if (curIndex != -1) {
        list.splice(curIndex, 1);
    }
    const res = await request('/song/detail', {
        ids: currentSongId
    })
    if (res.data.code == 200) {
        let singer = res.data.songs[0].ar.reduce((prev, cur, index) => {
            if (index == res.data.songs[0].ar.length - 1) {
                return prev + cur.name;
            } else {
                return prev + cur.name + '/';
            }
        }, '')
        list.push({
            id: res.data.songs[0].id,
            name: res.data.songs[0].name,
            picUrl: res.data.songs[0].al.picUrl,
            singer: singer,
            duration: res.data.songs[0].dt
        })
        app.globalData.playSong = {
            current: list.length - 1,
            list: list
        }
        app.globalData.isPlay = true;
        wx.setStorageSync('playSong', app.globalData.playSong)
        const backgroundAudioManager = app.globalData.backgroundAudioManager
        const res = await request("/song/url", {
            id: this.data.playSong.id
        })
        if (res.data.code == 200) {
            backgroundAudioManager.title = this.data.playSong.name
            backgroundAudioManager.src = res.data.data[0].url
            this.setData({
                isPlay: true,
                backgroundAudioManager: backgroundAudioManager
            })
        }
    }


}