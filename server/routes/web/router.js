module.exports = app => {
  const express = require('express')
  const router = express.Router()
  const mongoose = require('mongoose')
  const Article = require('../../models/Article')
  const Category = require('../../models/Category')

  // router.get('/news/init', async(req,res) => {
  //   const parent = await Category.findOne({name: 'article'})
  //   //res.send(parent)
  //   const cats = await Category.find().where({
  //     parent: parent
  //   }).lean()
  //   const newsTitles = ["电竞人若风多次捐款宣扬电竞圈正能量！", "Meiko出道5周年 将资金全数捐给韩红慈善会", "Teddy专访：第一次体验现场无观众的比赛", "T1主教练金晶洙：我们要一步一步地走上去", "拳头正在向英雄联盟引进新的反作弊系统", "外媒评欧美最佳阵容：G2中野辅三人上榜", "拳头确认：冠军杯赛2月22至23日外服上线", "卡特剑圣加入血月教派 腥红之月原画特效鉴赏", "DIG经理：Huni是LCS唯一能成为核心的选手", "LCS第二周结束：C9拿下全胜领跑积分榜", "外媒：影响力前三的ADC下个版本均遭削弱", "Caps：厄斐琉斯和赛娜是目前最强的两个ADC", "T1揭幕战打响，Faker能否拿下开门红？", "LPL推出百大经典战役 你最期待哪场？", "经典战役：OMG战队50血翻盘 RW扮演救世主", "大魔王Faker带领全新T1迎战新锐豪强DWG", "LPL百大经典战役回顾 重温往日巅峰对决", "设计师确认：上单索拉卡将被大幅度削弱", "2020赛季玩法排位：设计师问答汇总", "轻易不直播 直播看三年？Shy哥誓要熬秃粉丝"]
  //   const newsList = newsTitles.map(title => {
  //     const randomCats = cats.slice(0).sort((a,b) => Math.random() - 0.5)
  //     return{
  //       title: title,
  //       category: randomCats[1]
  //     }
  //   })
  //   await Article.insertMany(newsList)
  //   res.send(newsList)
  // })

  router.get('/news/list',async(req, res) => {

    const parent = await Category.findOne({name: 'article'})

    const cats = await Category.aggregate([

      {$match: {parent: parent._id}},

      {
        $lookup: {
          from: 'articles',   //注意这个地方是集合名称，不是填模型对象-----mongoose自动根据模型名生成的，模型名单数大写这是负数小写
          localField: '_id',
          foreignField: 'category',
          as: 'articleList',
        }
      },
      {
        $project: {_id: 0,name: 1, articleList: {$slice: ['$articleList',5]}}
      }
    ])


    res.send(cats)
  })

  app.use('/web/api',router)
}