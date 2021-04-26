# 微信小程序项目-橙心音乐

> 项目介绍：一个音乐类小程序。本项目数据均来自使用网易云官方真实数据。
> 使用教程：命令行进入 NeteaseCloudMusicApi 目录，npm install,若遇到报错，输入 npm install —g nodemon。然后 node app.js,启动后端接口。启动微信小程序。如需微信小程序真机调试，开启 utools 内网穿透,内网地址：localhost，内网端口 3000。将 request.js 内 baseURL 改成外网域名
> 演示地址：暂无上线。

项目开源地址：https://github.com/liuyuanzhi-xx/orange_music.git

```
橙心音乐                       // 橙心音乐
├── components                  // 组件
├── NeteaseCloudMusicApi        // node版本网易云音乐接口
├── pages                       // 小程序页面
│       └── index                 // 首页
│       └── login                 // 登录页
│       └── mine                 // 个人中心
│       └── musicPage            // 每日推荐
│       └── search                // 搜索页
│       └── play                 // 音乐播放器页
│       └── songListDetail        // 歌单页
│       └── video                 // 视频页
│       └── forget                 // 忘记密码
│       └── login                 // 登陆页
│       └── register                 // 注册页
├── utils                       // 工具
│       └── request.js            // 请求封装体
│       └── getSystem.js          // 获取手机系统类型
│       └── group.js              // 数组分组
│       └── verify.js             // 表单验证
│       └── play.js               // 音乐播放
│       └── getRandomArrayElements.js       // 随机获取指定个数的组内元素


├── static                      // 静态资源
```

后端应用来 node 版本：https://binaryify.github.io/NeteaseCloudMusicApi/

## 项目截图
