## 小程序详情

动词变位残的福音…emmmmm 就是这样。 加新功能啦：

- 📝 [法语背、默单词](https://budanding.cn/conj-helper-3-0-0/)：使用频率最高 5000 词背诵学习
- 🎉 [动词变位残福音](https://budanding.cn/conj-helper-2-0-0/)：法语动词变位默写和查询、7000+变位正查反查
- 🔍 [法汉汉法小词典](https://budanding.cn/conj-helper-3-7-0/)：12000+词条
- 🇫🇷 [法汉双解释义和例句](https://budanding.cn/conj-helper-3-0-0/)
- 🌃 [黑夜模式](https://budanding.cn/conj-helper-3-3-0/)
- 🙋‍♀️ [法语真人发音](https://budanding.cn/conj-helper-3-4-0/)

## 项目地址

- 项目博客地址：[法语记忆 学背单词动词变位](https://budanding.cn/conj-helper/)
- 项目的使用方法（for 普通用户）：点击[此篇文章](https://budanding.cn/conj-helper/)或直接使用微信扫描小程序码体验
- 项目的使用方法（for 开发者）：阅读下文即可。

- 👀[点击这里](https://www.bilibili.com/video/BV1tz4y197Yz)以查看演示。
- 🚩[点击这里](https://budanding.cn/conj-helper-version/)以查看历史更新详情。

![](https://budanding.cn/uploads/2019/12/2019-12-24-01_23_07-conj-helper-v3-3-0.jpg)

![](https://budanding.cn/uploads/2019/12/2019-12-24-01_10_37-conj-helper-v3-3-0.jpg)

📱**打开微信扫一扫的小程序码**就能用啦。

🔍 最好搜全称「**法语记忆：学背单词动词变位**」或者**扫描上方小程序码**或者**截屏保存 ➡ 从相册选取二维码**。

## 注意事项

1. 开源部分无法链接到小程序云开发，所以涉及到数据的部分无法直接显示。
2. 使用时克隆整个仓库即可，在使用`微信开发者工具`时，应当选择`测试号`作为AppID。
3. 项目中的代码、变量名或者提交可能不规范，尽量慢慢改。

## 页面详情

| 文件名称                                    | 说明                                                                                   |
| ------------------------------------------- | -------------------------------------------------------------------------------------- |
| cloud-functions\login\index.js              | 用户登录云函数。                                                                       |
| cloud-functions\subscribe\index.js          | 订阅消息云函数，负责将消息模板存入小程序云开发数据库。                                 |
| cloud-functions\templateMessage\index.js    | 发送订阅消息的云函数，负责发送小程序云开发数据库中未被发送的数据库，并将其置为已发送。 |
| cloud-functions\templateMessage\config.json | 发送订阅消息的云函数的配置文件，配置多久检查一次未被发送的订阅消息。                   |
| colorui                                     | 使用了 ColorUI 组件库。                                                                |
| data\avoir_etre.js                          | 存放了助动词 avoir 和 être 的所有变位情况。                                            |
| data\pour_word_test                         | 存放了动词变位练习的动词。                                                             |
| data\word_frequence.js                      | 存放了词库的列表。                                                                     |


| 页面名称                           | 说明                         |
| ---------------------------------- | ---------------------------- |
| pages\index\index                  | 动词变位练习页面             |
| pages\lab\lab                      | 法汉小词典查询主页           |
| pages\lab\lab_result               | 法汉小词典查询结果列表       |
| pages\lab\lab_index_result         | 法汉小词典查询结果单词详情页 |
| pages\lab\result\result            | 动词变位查询结果详情页       |
| pages\settings\settings            | 个性化（设置）主页           |
| pages\settings\settings_conj       | 动词变位设置页面             |
| pages\settings\settings_vocab      | 法语背单词设置页面           |
| pages\settings\help\help           | 关于页面                     |
| pages\settings\help\help_detail    | 帮助页面1：使用帮助          |
| pages\settings\help\help_subscribe | 帮助页面2：订阅消息帮助      |
| pages\vocab\vocab_analyse          | 法语背单词统计列表页面       |
| pages\vocab\vocab_index_result     | 法语背单词单词详情页面       |
| pages\vocab\vocab_index            | 法语背单词主页               |
| pages\vocab\vocab_result_reverse   | 法语默单词页面               |
| pages\vocab\vocab_result           | 法语背单词页面               |
| pages\vocab\vocab_success          | 当日任务完成页面             |
| pages\welcome\welcome              | 初始欢迎页面                 |
