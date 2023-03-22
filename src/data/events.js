import {map} from '../functions/util.js';

//const conAlreadyHaveJob = 'EVT?[100003,100004,100005,100006,100007,100008,100009,100010,100011,100012,100021]';
const conAlreadyHaveJob = 'ENV>0';
const conFemale = 'EVT?[100002,150023, 510004]'; // 妹纸
const conFemale2 = 'EVT?[100002,150023, 510004, 150024]'; // 妹纸和女装大佬
const conMale = 'EVT?[100001]';

// 跳槽分支
const jump1 = [
  "(LCK>3)&(TLT?[1059]):241002",
  "(LCK>0)&(TLT?[1053]):241000", // 面霸
  "LCK>7:241000", // 大企划
  "LCK>5:241001", // 游戏企划
  "LCK>3:241002", // 协会1
  "(INT>5)&(LCK>0):241009", // 被挽留
  "LCK>0:241003", // 协会2
  "(LCK>-3)&(TLT?[1059]):241005",
  "LCK>-3:241004",  // 音乐社团
  "LCK>-5:241005",  // 音乐社团2
  "(INT<4)&(LCK>-7):241006",  // 没找到地方，回去了
  "(INT<4)&(LCK<-6):241007", // 找不到地方
  "LCK<-4:241008",  // 不跳槽
];

const jump2 = [
  "(LCK>3)&(TLT?[1059]):231002",
  "(LCK>0)&(TLT?[1053]):231000", // 面霸
  "LCK>7:231000", // 大企划
  "LCK>5:231001", // 游戏企划
  "LCK>3:231002", // 协会
  "(INT>5)&(LCK>0):231009", // 被挽留
  "LCK>0:231003",
  "(LCK>-3)&(TLT?[1059]):231005",
  "LCK>-3:231004",
  "LCK>-5:231005",
  "(INT<4)(LCK>-7):231006",  // 没找到地方，回去了
  "(INT<4)&(LCK<-6):231007", // 找不到地方
  "LCK<-4:241008",  // 不跳槽
];

// 结局分支
const gameOver = [
  "TLT?[1038]:999115", // 写电音
  "STR<-3:900008", // 猝死
  "SPR<-5:900011", // 抑郁自杀
  "(CHR>6)&(MNY<-7):900016", // 举债结局2
  "MNY<-3:900015", // 举债结局
  "(EVT?[150024])&(EVT?[150023]):900006", // 女装大佬真爱结局
  "(EVT?[150024])&(EVT?[150020]):900007", // 女装大佬真爱结局2
  "(MNY>7)&(LCK>5)&(SPR>5):900002", // 意外继承了一大笔遗产
  "(MNY>7)&(LCK>5):900003", // 意外继承了一大笔遗产2
  `(CHR>12)&(${conFemale}):900013`, // 霸道总裁结局1
  `(CHR>12)&(EVT?[150024]):900014`, // 霸道总裁结局2
  "(CHR>7)&(EVT?[150009]):900005", //主播结局
  "(CHR>7):900012", // 明星结局
  "(MNY>7)&(CHR>5):900004", // 演艺圈结局
  "INT>9:900009", // 音乐家结局
  "INT>7:900010", // 老师结局
  "STR<0:900001", // 工地搬砖累死
  "LCK<1000:900000", // 工地搬砖
];

// 退休结局分支
const retireGameOver = [
  "TLT?[1038]:999115", // 写电音
  "INT>10:999100", // 音乐家
  "INT>8:999101", // 音乐教授
  "INT>5:999102", // 网络音乐人
  "(MNY>10&SPR>8):999106",  // 会长
  "SPR>10:999103", // 哲学家
  "SPR>8:999104", // 黑圈元老
  "(SPR>5&MNY>5):999105", // 旅游
  "SPR>-10:999107"  // 安享晚年
];

const retireGameOver2 = [
  "STR>10:999108", // 身体好，活到了101岁
  "STR>7:999109", // 身体不错，90多岁无疾而终
  "STR>4:999110", // 身体不错，80多岁摔跤死亡
  "STR>0:999111", // 身体还可以，80多岁
  "STR>-3:999112", // 小病不断，活到79岁
  "STR>-6:999113", // 5年后查出癌症，2年后去世
  "STR>-20:999114", // 身体很差，很快就离世
];

const eventList = [
  {
    id: 999100,
    event: "你年纪大了，在音乐上深入研究，成为了著名的音乐家。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 999101,
    event: "你年纪大了，一所民办学校返聘你为音乐教授。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 999102,
    event: "你年纪大了，因为你写曲相当厉害，你成为了网络音乐人。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 999103,
    event: "你年纪大了，不研究音乐了，转头开始研究哲学，成为了哲学家。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 999104,
    event: "你年纪大了，依然活跃在网络上，成为了黑乐谱界的元老。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 999105,
    event: "你年纪大了，去到处旅游，见识大好河山。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 999106,
    event: "你年纪大了，但是闲不住，自己创立了一个音乐协会，成为会长。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 999107,
    event: "你年纪大了，做不动黑乐谱了，于是在家安享晚年。",
    branch: retireGameOver2,
    highlight: 1,
  }, {
    id: 999108,
    event: "你的身体很好，活到了101岁，无疾而终。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
  },{
    id: 999109,
    event: "你的身体不错，活到了90多岁，在梦中平静离世。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
  },{
    id: 999110,
    event: "你的身体不错，80岁时不小心摔了一跤，之后身体不好，一年多后离世。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
  },{
    id: 999111,
    event: "你的身体还可以，活到了79岁。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
  },{
    id: 999112,
    event: "你小病不断，77岁后离世。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
  },{
    id: 999113,
    event: "年纪大了的你去医院体检，查出了癌症，2年后医治无效去世。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
  },{
    id: 999114,
    event: "你年纪大了后身体不好，留下顽疾，不久之后就去世了。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
  },{
    id: 999115,
    event: "离开黑乐谱界后，你闲不住，开始写电音，找厂牌和企划去了。",
    branch: retireGameOver2,
    highlight: 1,
  },
  {
    id: 700000,
    event: "你在好心人的帮助下从烂尾音游企划脱身，进了一个小协会。",
  },
  {
    id: 700001,
    event: "生活开销有点大，你觉得手头拮据。",
    effect: {
      MNY: -1,
    }
  },
  {
    id: 700002,
    event: "你找不到能够靠写曲子赚钱的门道，只能先暂时打点零工。",
    effect: {
      MNY: 1,
    }
  },{
    id: 700003,
    event: "迟迟找不到组织，你觉得有点烦。",
    effect: {
      SPR: -2,
    }
  },{
    id: 700004,
    event: "你放弃写曲子了，决定去工地搬砖。",
    NoRandom: 1,
    effect: {
      LIF: -1,
    },
    branch: [
      "STR<4:800000"
    ]
  },
  {
    id: 800000,
    event: "但是你身体不好，搬砖时出了意外，死了",
    NoRandom: 1,
  },
  {
    id: 800001,
    event: "刚加入这个小团队没多久，你就和那个亲友闹了矛盾，退出了团队。你觉得很受打击，不打算再混圈了。",
    effect: {
      LIF: -1,
    },
    NoRandom: 1,
    highlight: 1,
  },
  {
    id: 900000,
    event: "你意识到写曲子赚不到钱，为了生活，你去工地搬砖了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900001,
    event: "你意识到写曲子赚不到钱，为了生活，你去了工地搬砖，但是身体不好，出意外死了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900002,
    event: "你意外继承了一大笔遗产，潇洒去了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900003,
    event: "你意外继承了一大笔遗产，出钱办了个企划，把你看不爽的人招进来天天PUA他们。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900004,
    event: "你退圈后用钱整容，进军演艺界，成为了三线明星。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900005,
    event: "你退圈后，继续做主播，成为了著名网红。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900006,
    event: "你退了圈，陪伴着深爱的他，一边做美妆主播，一边做家庭主妇。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900007,
    event: "你退圈后，日夜思念那个你放不下的男人，最终为了爱情，你义无反顾地做了手术，成为真正的女人，嫁给了他，婚后过上了幸福的生活。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900008,
    event: "由于身体状况太差，你猝死了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900009,
    event: "你到著名音乐学院去继续深造，成为了音乐家。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900010,
    event: "家里人托关系，介绍你去一所民办学校当了音乐老师。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900011,
    event: "退圈之后，你挣扎了几个月，抑郁症越来越严重，自杀了。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900012,
    event: "你凭借着高颜值，通过明星选秀，成为了影视明星。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900013,
    event: "你的颜值实在太高了，一位霸道总裁看上你，在他猛烈追求下，你最终以身相许。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  },{
    id: 900014,
    event: "你的颜值实在太高了，一位霸道总裁看上你，在他猛烈追求下，你做了手术，最终以身相许。",
    effect : {
        LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900015,
    event: "你欠了一堆外债，只能去给债主打工偿还。",
    effect : {
      LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 900016,
    event: "你欠下了这辈子都还不起的外债，只能靠颜值肉偿了。",
    effect : {
      LIF: -1
    },
    NoRandom: 1,
    highlight: 1,
  }, {
    id: 100000,
    event: "你退圈了，开始写电音，到处找厂牌和企划。",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 100001,
    event: "你是一个男生，对写曲子感兴趣，最近决定开始学习黑乐谱，成为一名blacker。",
    highlight: 1,
    exclude: "TLT?[1004, 1047]",
    // effect: {
    //   SPR: '1000!',
    // },
  }, {
    id: 100002,
    event: "你是一个女生，对写曲子感兴趣，最近决定开始学习黑乐谱，成为一名blacker。",
    highlight: 1,
    exclude:  "TLT?[1003,2024,1054]",
    // hook(property) {
    //   console.log(property);
    // }
  }, {
    id: 100003,
    event: "你加入了一个黑乐谱协会。",
    postEvent: "开始适应协会里的气氛。",
    include: "SPR>7", // 心态>7 才能加入
    effect: {
        MNY: 0,
        ENV: "2!",
    },
    exclude: conAlreadyHaveJob,
  }, {
    id: 100004,
    event: "你加入了一个黑乐谱协会。",
    postEvent: "开始适应协会里的气氛。",
    include: "SPR>7", // 心态>7 才能加入
    effect: {
      MNY: 0,
      ENV: "2!",
    },
    exclude: conAlreadyHaveJob,
  }, {
    id: 100005,
    event: "你加入了一个音乐社团。",
    postEvent: "开始适应社团里的气氛。",
    include: "SPR>6", // 心态>6 才能加入
    effect: {
      MNY: 0,
      ENV: "3!",
    },
    exclude: conAlreadyHaveJob,
  }, {
    id: 100006,
    event: "你加入了一个音乐社团。",
    postEvent: "开始适应社团里的气氛。",
    include: "(SPR>5)&(INT>4)", // 心态>5，智商>4 才能加入
    effect: {
      MNY: 0,
      ENV: "3!",
    },
    exclude: conAlreadyHaveJob,
  }, {
    // 大企划要求高智商
    id: 100007,
    event: "你加入了一个大企划。",
    postEvent: "开始适应写曲吃饭的日子。",
    include: "INT>5",
    effect: {
      MNY: 4,
      ENV: "4!",
    },
    exclude: `(${conAlreadyHaveJob})|(TLT?[1059])`,
  }, {
    // 游戏企划看智商和形象
    id: 100008,
    event: "你加入了一个游戏企划。",
    postEvent: "开始适应写曲吃饭的日子。",
    include: "(INT>4)&(CHR>4)",
    effect: {
      MNY: 3,
      SPR: 1,
      ENV: "5!",
    },
    exclude: `(${conAlreadyHaveJob})|(TLT?[1059])`,
  }, {
    id: 100009,
    event: "你加入了一个小企划，给大企划做外包。",
    postEvent: "开始靠写曲子吃饭。",
    exclude: conAlreadyHaveJob,
    effect: {
      MNY: 2,
      ENV: "1!",
    }
  }, {
    id: 100010,
    event: "你加入了一个小企划，给曲师当枪手。",
    postEvent: "开始靠写曲子吃饭。",
    exclude: conAlreadyHaveJob,
    effect: {
      MNY: 2,
      ENV: "1!",
    },
    highlight: 1,
  }, {
    id: 100011,
    event: "你加入了一个小团队。",
    postEvent: "开始适应团队内的气氛。",
    exclude: conAlreadyHaveJob,
    effect: {
      SPR: -1,
      ENV: "1!",
    }
  }, {
    id: 100021,
    event: "你加入了一个亲友组织的小团队。",
    postEvent: "开始适应团队内的气氛。",
    exclude: conAlreadyHaveJob,
    effect: {
      SPR: 1,
      ENV: "1!",
    },
    branch: [
      "LCK<-5:800001"
    ]
  }, {
    // 智商太低会被骗入烂尾企划
    id: 100012,
    event: "你在刷视频时看到了一个音游企划，你很心动，加了他们的群。",
    postEvent: "开始适应群里的气氛。",
    effect: {
      SPR: -1,
    },
    exclude: `(INT>3)|(${conAlreadyHaveJob})`,
    branch: [
      "EVT?[100001,100002]:700000"
    ]
  }, {
    // 智商太低，无人问津
    id: 100013,
    event: "你希望能找到组织，但是并没有人注意到你。",
    exclude:  `(INT>3)|(${conAlreadyHaveJob})`,
    branch: [
      "(NMY<-3|SPR<0):700004",
      "EVT?[100001,100002]:700001",
    ],
    highlight: 1,
  }, {
    // 智商太低，无人问津
    id: 100014,
    event: "你希望能找到组织，但是并没有人注意到你。",
    exclude:  `(INT>3)|(${conAlreadyHaveJob})`,
    branch: [
      "(NMY<-3|SPR<0):700004",
      "EVT?[100001,100002]:700002",
    ],
    highlight: 1,
  }, {
    // 智商太低，无人问津
    id: 100015,
    event: "你希望能找到组织，但是并没有人注意到你。",
    exclude:  `(INT>3)|(${conAlreadyHaveJob})`,
    branch: [
      "(NMY<-3|SPR<0):700004",
      "EVT?[100001,100002]:700003",
    ],
    highlight: 1,
  }, {
    id: 800004,
    event: "这是测试结局，不是真实结局！",
    effect: {
        MNY: -1,
        SPR: -1
    },
    branch: gameOver
  }, {
    id: 999999,
    event: "你天天熬夜加班加点写曲子，结果猝死了。",
    exclude: "STR>6",
    effect : {
        LIF: -1
    },
    NoRandom: 1
  }, {
    id: 110001,
    event: "你得到了前辈的指点。",
    exclude: "EVT?[110001,110002]",
    include: conAlreadyHaveJob,
  }, {
    id: 110002,
    event: "你得到了前辈的指点。",
    postEvent: "写曲的技术好像提升了。",
    effect : {
        INT: 1
    },
    exclude: "EVT?[110001,110002]",
    include: `(INT>4)&(${conAlreadyHaveJob})`,
  }, {
    id: 120001,
    event: "大家都很欣赏你的能力，夸你能干。",
    include: "INT>5",
    effect: {
      SPR: 1
    },
  }, {
      id: 120002,
      event: "你努力写曲。"
  }, {
    id: 120003,
    event: "你最近认识了几个CBMS的blacker。",
    postEvent: "和他们一起学习了乐理，你的技术提升了。",
    effect : {
      INT: 1
    },
    exclude: "EVT?[120003]"
  }, {
    id: 120004,
    event: "总结了一下写曲子的经验，你的技术提升了。",
    effect: {
      INT: 1,
    },
    exclude: "INT>5",
  }, {
    id: 120005,
    event: "你突然有了一个曲子的ddl，搞得你加班加点的赶着写曲。",
    effect: {
      STR: -1,
    },
  }, {
    id: 120006,
    event: "最近天天写曲，搞得你都没时间学习了。",
    effect: {
      INT: -1,
    },
  }, {
    id: 120007,
    event: "你把一首东方曲扒谱黑化做成了黑乐谱。",
    highlight: 1,
  }, {
    id: 120008,
    event: "你把一首动漫歌曲扒谱黑化做成了黑乐谱。",
    highlight: 1,
  }, {
    id: 120009,
    event: "你把一首游戏配乐扒谱黑化做成了黑乐谱。",
    highlight: 1,
  }, {
    id: 120010,
    event: "你把一首最近很热的梗曲扒谱黑化做成了黑乐谱。",
    highlight: 1,
  }, {
    id: 120011,
    event: "你把一首音游曲扒谱黑化做成了黑乐谱。",
    highlight: 1,
  }, {
    id: 120012,
    event: "你把一首很冷门但是你很喜欢的曲扒谱黑化做成了黑乐谱。",
    highlight: 1,
  }, {
    id: 120013,
    event: "你把一首著名曲师的曲扒谱黑化做成了黑乐谱。",
    highlight: 1,
  }, {
    id: 120014,
    event: "你把一首古典乐曲扒谱黑化做成了黑乐谱。",
    highlight: 1,
  }, {
    id: 120015,
    event: "你把一首电音歌曲扒谱黑化做成了黑乐谱。",
    highlight: 1,
  }, {
    id: 120016,
    event: "你把一首流行歌曲扒谱黑化做成了黑乐谱。",
    highlight: 1,
  }, {
    id: 130000,
    event: "大家似乎因为什么事情吵了起来。",
    highlight: 1,
    effect : {
        MNY: 1
    },
    include: "INT>6",
    exclude: "TLT?[1007]",
    branch: [
        "CHR<7:130001",
        "CHR>6:130002"
    ]
  }, {
    // 特殊结局
    id: 130001,
    event: "你因为加入了他们的吵架，被踢出去了。",
    effect : {
        LIF: -1
    }
  }, {
    id: 130002,
    event: "大家本来决定要把你踢了，但因为你长得好看，被保下来了。"
  }, 
  // ----------- 一些比较无聊的事件 --------------
  {
    id: 140001,
    event: "闲着没事，看了一些黑乐谱视频。"
  }, {
    id: 140002,
    event: "你左眼不停地跳，觉得可能有好运降临。",
    effect: {
      BLCK: 1
    }
  }, {
    id: 140003,
    event: "你右眼不停地跳，最近可能得小心一些。",
    effect: {
      BLCK: -1,
    }
  }, {
    id: 140004,
    event: "你觉得有点无聊，但是你又不想写曲。",
  }, {
    id: 140005,
    event: "你下载了一个新的midi。",
  }, {
    id: 140006,
    event: "你下载了一个新的音色库。",
  }, {
    id: 140007,
    event: "黑圈大手又发新作品了，赶紧去看了一眼。",
    exclude: "EVT?[140007]",
  }, {
    id: 140008,
    event: "你看了新来的新人的作品，发现人家不仅比你年轻，写得也比你牛逼，自闭了。",
    effect: {
      SPR: -1
    }
  }, {
    id: 140009,
    event: "闲着没事，做了几个翻录，不过没有人看。",
  }, {
    id: 140010,
    event: "月末了，没什么事，摸鱼就完了。",
  }, {
    id: 140011,
    event: "新做了一个黑乐谱，但是无所谓，反正也没有人看。",
  }, {
    id: 140012,
    event: "写的曲子老出问题，被批评了好几次。",
    effect: {
      SPR: -1
    }
  }, {
    id: 140013,
    event: "看到一个很棒的黑乐谱，但是作者并没有给midi下载链接。",
    exclude: 'EVT?[140013]',
  }, {
    id: 140014,
    event: "看到一个很棒的黑乐谱，太棒了，直接点开分享链接激情下载。",
    exclude: 'EVT?[140014]',
  }, {
    id: 140015,
    event: "你写的黑乐谱出现了一个小的听感问题，幸好及时解决了。",
  }, 
  // --------- 颜值事件 ----------------------
  {
    id: 150000,
    event: "你由于高颜值，在组织成为万众瞩目的焦点",
    include: "CHR>6",
  }, {
    id: 150001,
    event: "你今天精心化了妆，心情超好。",
    include: `(CHR>6)&(${conFemale2})`,
    exclude: 'EVT?[150001]',
    branch: [
      "EVT?[150024]:153000"
    ],
    effect: {
      SPR: 1,
    }
  },
  {
    id: 153000,
    event: "身边的大家都惊呆了。"
  },
  {
    id: 150002,
    event: "你的颜值让同性都忍不住多看几眼。",
    include: "CHR>7",
  }, {
    id: 150003,
    event: "大家都夸你妆容好看。",
    include: `(CHR>5)&(${conFemale2})`,
  }, {
    id: 150004,
    event: "越来越多的人把你当做女生来对待。",
    include: `(CHR>5)&(EVT?[150024])`,
    exclude: 'EVT?[150023]'
  }, {
    id: 150005,
    event: "你身边的人开始怀疑并私下讨论你的真实性别。",
    include: `EVT?[150027]`,
    exclude: 'EVT?[150005,150023]'
  }, {
    id: 150006,
    event: "你身边的人打赌你其实是女扮男装，据说赔率已经接近1比100。",
    include: `EVT?[150024]`,
    exclude: 'EVT?[150006,150023]'
  }, {
    id: 150007,
    event: "组织里的男生频频对你献殷勤。",
    include: `(CHR>7)&(EVT?[150024,100002])`,
  }, {
    id: 150008,
    event: "你的化妆技术越来越好了",
    include: conFemale2,
    exclude: "(CHR>7)|(EVT?[150008])",
    effect: {
      CHR: 1,
    }
  }, {
    id: 150009,
    event: "你开始兼职做颜值主播",
    include: "CHR>6",
    exclude: "EVT?[150009]"
  }, {
    id: 150010,
    event: "你做颜值主播粉丝增长迅速",
    include: "(CHR>7)&(EVT?[150009])",
  }, {
    id: 150011,
    event: "你觉得自己越来越喜欢颜值主播这个行业",
    include: "(CHR>7)&(EVT?[150009])",
    effect: {
      SPR: 1,
    }
  }, {
    id: 150012,
    event: "你是平台当红主播，粉丝打赏收入已经非常高了。",
    include: "(CHR>8)&(EVT?[150009])",
    exclude: "EVT?[150012]",
    effect: {
      MNY: 2,
    }
  }, {
    id: 150013,
    event: "你觉得自己更适合做主播，决定转行全职做主播。",
    include: "(CHR>8)&(INT<5)&(EVT?[150012])",
    branch: [
      "EVT?[150012]: 900005"
    ]
  }, {
    id: 150014,
    event: "组织里的女生频频对你献殷勤。",
    include: `(CHR>7)&(${conMale})`,
    exclude: 'EVT?[150023]'
  }, {
    id: 150015,
    event: "你本来去理发，结果被黑心整容机构忽悠去做了微整形。",
    highlight: 1,
    postEvent: "花了一大笔钱，好在颜值有些提升。",
    exclude: 'EVT?[150015]',
    effect: {
      CHR: 1,
      MNY: -1,
    }
  }, {
    id: 150016,
    event: "你化了个妆，感觉还不错。",
    include: `(CHR>4)&(${conFemale2})`,
    exclude: 'EVT?[150016]',
  }, {
    id: 150017,
    event: "你化了个妆，自己欣赏了好久。",
    include: `(CHR>4)&(${conFemale2})`,
    exclude: 'EVT?[150017]',
  }, {
    id: 150018,
    event: "因为你的高跟鞋磨脚，脚踝受了伤。",
    include: `(CHR>4)&(${conFemale2})`,
    exclude: "EVT?[150018]",
    effect: {
      STR: -1,
    }
  },
  {
    id: 150019,
    event: "一位风度翩翩，家境优越的男子向你发起猛烈追求。",
    include: `(CHR>4)&(${conFemale2})`,
    exclude: "EVT?[150019, 510004]",
    branch: [
      "LCK>5:151002",
      "LCK>0:151001",
      "LCK<1:151000",
    ],
    // hook(prop) {
    //   console.log('>', prop.get('LCK'));
    // }
  },
  {
    id: 150020,
    event: "经过一段时间的交往，你和他的感情加深了。",
    include: "EVT?[151002]",
    exclude: "EVT?[150020,220000]",
  },
  {
    id: 150021,
    event: "你爱他已经爱得轰轰烈烈，难舍难分。",
    include: "EVT?[150020]",
    exclude: "EVT?[150021,220000]",
  },
  {
    id: 150022,
    event: "你还是难以下定决心，毕竟一旦决定了就再也无法回头。",
    include: "EVT?[150029]",
    exclude: "EVT?[150022]",
    branch: [
      'EVT?[220000]:152002',
      'LCK>-100:152001',
    ],
  },
  {
    id: 152001,
    event: '你询问你的闺蜜们，她们大部分支持你走出这一步，觉得你会是她们的好姐妹。',
  },
  {
    id: 152002,
    event: '你把苦恼告诉你的妻子，意外的是你的妻子完全支持你，她觉得就算和你做姐妹也很幸福。',
  },
  {
    id: 150023,
    event: "你终于义无反顾，去做了性别纠正手术，成为了真正的女人。",
    highlight: 1,
    postEvent: "你回来后，身边的朋友都接纳了你，你觉得获得了新生。",
    include: "EVT?[150022]",
    exclude: "EVT?[150023]",
    effect: {
      SPR: 2,
    },
  },
  {
    id: 151000,
    event: "不是你喜欢的类型，你婉拒了他。"
  },
  {
    id: 151001,
    event: "你有点心动，但还是拒绝了他。"
  },
  {
    id: 151002,
    event: "你有点小窃喜，打算交往一段时间看看。"
  },
  {
    id: 150024,
    event: "你决定出柜，日常穿女装。",
    highlight: 1,
    include: "(CHR>5)&(TLT?[2024])&(EVT?[150027])",
    exclude: "EVT?[150024]",
    effect: {
      SPR: 1,
    }
  },
  {
    id: 150025,
    event: "组织要线下面基，因为你的颜值，朋友让你穿女装，你嘴上说不愿意，心中却有些小窃喜。",
    include: "(CHR>5)&(TLT?[2024])",
    exclude: "EVT?[150025]",
  },
  {
    id: 150026,
    event: "面基那天，穿了女装的你仿佛真的就是个女生一样，惊艳了全场。",
    highlight: 1,
    include: "(CHR>5)&(TLT?[2024])&(EVT?[150025])",
    exclude: "EVT?[150026]",
  },
  {
    id: 150027,
    event: "穿女装只有第一次和无数次。",
    highlight: 1,
    postEvent: "你越来越喜欢穿女装了。",
    include: "(CHR>5)&(TLT?[2024])&(EVT?[150026])",
    exclude: "EVT?[150027]",
  },
  {
    id: 150028,
    event: "连你自己也开始怀疑自己的性别，不知道自己究竟是不是真的应该更适合做女孩子。",
    highlight: 1,
    postEvent: "你身边的人基本上已经完全把你当做女人。",
    include: "(CHR>5)&(TLT?[2024])&(EVT?[150024])",
    exclude: "EVT?[150028]",
  },
  {
    id: 150029,
    event: "你最近性别焦虑有点严重。",
    postEvent: "你在想是不是该下最终决定了。",
    include: "(CHR>5)&(TLT?[2024])&(EVT?[150028])",
    exclude: "EVT?[150029]",
    effect: {
      SPR: -1,
    }
  },
  // ---- 智商事件 -----
  {
    id: 160000,
    event: "你的写曲技术越来越好，大家都很羡慕你。",
    exclude: "EVT?[160000]",
    include: "INT>6",
  },
  // ---- 健康事件 -----
  {
    id: 440000,
    event: '由于长时间坐在电脑前写曲子，你得了颈椎病。',
    include: 'AGE>60',
    exclude: '(TLT?[1044])|(EVT?[440000])',
    effect: {
      STR: -1,
    }
  },
  {
    id: 440001,
    event: '你的颈椎病越来越严重。',
    include: 'EVT?[440000]',
    exclude: '(TLT?[1044])|(EVT?[440001,440002])',
    effect: {
      STR: -1,
    }
  },
  {
    id: 440002,
    event: '朋友经常给你转发有关颈椎病的视频，还嘱咐你注意身体。',
    include: '(TLT?[1037])&(EVT?[440000,440001])',
    exclude: 'EVT?[440002]',
    effect: {
      STR: 1,
    }
  },
  // ---- 心态事件 -----
  {
    id: 270000,
    event: '你觉得自己很烂，情绪低落。',
    include: 'SPR<1',
    branch: [
      "LCK>7:271000"
    ]
  },
  {
    id: 271000,
    event: '你稍微休息了几天，调整了心情。',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 271001,
    event: '你情绪低落，觉得很压抑。',
    effect: {
      SPR: -1,
    } 
  },
  {
    id: 271002,
    event: '恶劣心情让你气质不佳，颜值受损。',
    effect: {
      CHR: -1,
    }
  },
  {
    id:270001,
    event: '最近你状态不佳，约了心理咨询调节心情。',
    include: '(SPR<2)&(ENV>3)',
    effect: {
      SPR: 1,
    }
  },{
    id:270002,
    event: '和别人因为小事无缘无故大吵了一架。',
    include: 'SPR<4',
    branch: [
      "LCK<-3:271001",
    ]
  },{
    id:270003,
    event: '你觉得你就像是金木研，错的不是我，是这个世界。',
    include: 'SPR<0',
  },{
    id:270004,
    event: '你觉得写曲子就跟坐牢一样。',
    include: 'SPR<-1',
  },{
    id:270005,
    event: '你最近压力很大，总是掉头发。',
    include: 'SPR<-1',
    branch: [
      "LCK<-7:271002",
    ]
  },
  // -------- 婚姻，爱情 ----------------------
  {
    id: 220000,
    event: "你结婚了，有了自己的家庭。", 
    exclude: "EVT?[220000,150021]",
  }, {
    id: 220001,
    event: "你的妻子告诉你她怀孕了。",
    include: "(EVT?[100001])&(EVT?[220000])",
    exclude: "(PRG>0)|(PRG<0)|(EVT?[220001])|(EVT?[150023])|(EVT?[510004])",
    effect: {
      PRG: 1
    }
  }, {
    id: 220002,
    event: "你发现自己怀孕了。",
    include: "(EVT?[100002])&(EVT?[220000])",
    exclude: "(PRG>0)|(PRG<0)|(EVT?[220002])",
    effect: {
      PRG: 1
    }
  }, {
    id: 220003,
    event: "你的女儿出生了。",
    include: "(EVT?[220000])&(PRG>9)",
    exclude: "EVT?[220003, 220004]",
    effect: {
      PRG: "-2!",
      SPR: 1,
    }
  }, {
    id: 220004,
    event: "你的儿子出生了。",
    include: "(EVT?[220000])&(PRG>9)",
    exclude: "EVT?[220003, 220004]",
    effect: {
      PRG: "-2!",
      SPR: 1,
    }
  }, {
    id: 220005,
    event: "因为怀孕，你觉得有点累。",
    include: "(EVT?[100002])&(PRG>0)",
    effect: {
      STR: -1,
    }
  }, {
    id: 220006,
    event: "因为怀孕心情不好，你和另一半吵架了。",
    include: "(EVT?[100002])&(PRG>0)",
    effect: {
      SPR: -1,
    }
  }, {
    id: 220007,
    event: "因为怀孕，胃口有点差。",
    include: "(EVT?[100002])&(PRG>0)",
    effect: {
      STR: -1,
    }
  }, {
    id: 220008,
    event: "想到小生命即将出生，你觉得自己充满干劲。",
    include: "PRG>0",
    effect: {
      SPR: 1,
    }
  }, {
    id: 220009,
    event: "你开始了产假。",
    include: "(EVT?[100002])&(PRG=8)",
  }, {
    id: 220010,
    event: "休产假中...",
    include: "(EVT?[100002])&(PRG>8|PRG<0)",
    exclude: "PRG>9",
    branch: [
      "LCK<0:221000"
    ]
  },
  {
    id: 220015,
    event: "你的家庭矛盾不断。",
    include: "(EVT?[220000])&(SPR<4)",
    effect: {
      SPR: -1
    }
  },{
    id: 220016,
    event: "你的另一半很爱你，你觉得很幸福。",
    include: "(EVT?[220000])&(SPR>5)",
    effect: {
      SPR: 1
    }
  },{
    id: 220017,
    event: "你的另一半非常尊重你，家里的大小事情都让你做主。",
    include: "(EVT?[220000])&(INT>5)",
  },
  {
    id: 221000,
    event: "你听说在这期间有新人接手了原本你负责的比较重要的曲子。",
    exclude: "EVT?[221000]",
    effect: {
      SPR: -1
    }
  },
  // 跳槽 && 结局
  {
    id: 230000,
    event: "你觉得在这干得实在太累了，打算换个地方。",
    include: "(WRK>3)&(STR<3)",
    exclude: "EVT?[1110000]",
    branch: jump2,
  },
  {
    id: 230001,
    event: "你觉得在这干得不开心，打算换个地方。",
    include: "(WRK>3)&(SPR<3)",
    exclude: "EVT?[1110000]",
    branch: jump1,
  },
  {
    id: 230002,
    event: "你的经济水平让你干不下去了。",
    include: "(WRK>3)&(MNY<-3)",
    branch: gameOver,
  },
  {
    id: 230003,
    event: "你的身体实在受不了，干不下去了。",
    include: "(WRK>3)&(STR<-3)",
    branch: gameOver,
  },
  {
    id: 230004,
    event: "你精神抑郁，不想干了。",
    include: "(WRK>3)&(SPR<-3)",
    branch: gameOver,
  },
  {
    id: 230005,
    event: "你在这呆久了，觉得无聊，准备换个地方。",
    include: "WRK>30",
    exclude: "EVT?[1110000]",
    branch: jump1,
  },
  {
    id: 230006,
    event: "你的颜值实在太逆天了，这里已经承受不起。",
    highlight: 1,
    include: "(WRK>30)&(CHR>12)",
    exclude: "EVT?[1110000]",
    branch: jump1,
  },
  {
    id: 231000,
    event: "你换到一个大企划，报酬比较高，也不那么累了。",
    effect: {
      STR: 2,
      MNY: 1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 231001,
    event: "你换到一个游戏企划，钱虽然少了，但轻松了不少。",
    effect: {
      STR: 3,
      MNY: -1,
      WRK: "0!",
      ENV: "5!",
      JMP: 1,
    }
  }, {
    id: 231002,
    event: "你换到另一个黑乐谱协会。",
    effect: {
      STR: 1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 231003,
    event: "你换到另一个黑乐谱协会。",
    effect: {
      STR: 1,
      WRK: "0!",
      ENV: "2!",
      JMP: 1,
    }
  }, {
    id: 231004,
    event: "为了发展，你去了一个音乐社团。",
    effect: {
      STR: 1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 231005,
    event: "你发现靠写曲子吃饭并不容易，你只能先找了一个音乐社团。",
    effect: {
      STR: 1,
      WRK: "0!",
      ENV: "1!",
      JMP: 1,
    }
  }, {
    id: 231006,
    event: "你没找到满意的地方，只好又回去了。",
    effect: {
      STR: 1,
      WRK: "0!",
      JMP: 1,
    }
  }, {
    id: 231007,
    event: "你找不到新的地方，本来的地方也不要你了，无奈的你只能退圈了。",
    branch: gameOver,
  },{
    id: 231008,
    event: "你没找到新的地方，放弃了，继续待着吧。",
  }, {
    id: 231009,
    event: "听说你想换个地方，大家和你说了许多话，挽留了你。",
    effect: {
      STR: 1,
    }
  },
  {
    id: 241000,
    event: "你换到一个大企划，报酬比较高，也不那么累了。",
    effect: {
      SPR: 2,
      MNY: 1,
      WRK: "0!",
      ENV: "4!",
      JMP: 1,
    }
  }, {
    id: 241001,
    event: "你换到一个游戏企划，钱虽然少了，但轻松了不少。",
    effect: {
      SPR: 3,
      MNY: -1,
      WRK: "0!",
      ENV: "5!",
      JMP: 1,
    }
  }, {
    id: 241002,
    event: "你换到另一个黑乐谱协会。",
    effect: {
      SPR: 1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 241003,
    event: "你换到另一个黑乐谱协会。",
    effect: {
      SPR: 1,
      WRK: "0!",
      ENV: "2!",
      JMP: 1,
    }
  }, {
    id: 241004,
    event: "为了发展，你去了一个音乐社团。",
    effect: {
      SPR: 1,
      WRK: "0!",
      ENV: "3!",
      JMP: 1,
    }
  }, {
    id: 241005,
    event: "你发现靠写曲子吃饭并不容易，你只能先找了一个音乐社团。",
    effect: {
      SPR: 1,
      WRK: "0!",
      ENV: "1!",
      JMP: 1,
    }
  }, {
    id: 241006,
    event: "你没找到满意的地方，只好又回去了。",
    effect: {
      SPR: 1,
      WRK: "0!",
      JMP: 1,
    }
  }, {
    id: 241007,
    event: "你找不到新的地方，本来的地方也不要你了，无奈的你只能退圈了。",
    branch: gameOver
  }, {
    id: 241008,
    event: "你没找到新的地方，放弃了，继续待着吧。",
  }, {
    id: 241009,
    event: "听说你想换个地方，大家和你说了许多话，挽留了你。",
    effect: {
      SPR: 1,
    }
  },
  // --------------- 搓曲相关 ---------------
  {
    id: 300000,
    event: "周末了，你熬夜搓了一首曲子。",
    exclude: "ENV=5",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300001,
    event: "连续通宵了三个晚上，身体有些吃不消。",
    exclude: "ENV=5",
    effect: {
      STR: -1,
    }
  }, {
    id: 300002,
    event: "有了点闲暇时间，于是去健身了。",
    exclude: "ENV=1",
    effect: {
      STR: 1,
    }
  }, {
    id: 300003,
    event: "有了点闲暇时间，浅保养了一下自己的皮肤。",
    exclude: "ENV=1",
    effect: {
      SPR: 1,
    }
  }, {
    id: 300004,
    event: "觉得自己写的曲子还不错，心情愉悦。",
    effect: {
      SPR: 1,
    }
  }, {
    id: 300005,
    event: "和别人大吵了一架。",
    effect: {
      SPR: -1,
    }
  },  {
    id: 300006,
    event: "新买的乐理书看得你头昏脑胀。",
    exclude: "ENV>3",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300007,
    event: "这周末没什么事，于是加班加点把之前没写完的曲子给搓完了。",
    exclude: "ENV=5",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300008,
    event: "因为天天戴着耳机高强度写曲，而且还天天混音火葬场，你的耳朵发炎了，不得不花钱去看了医生。",
    exclude: "TLT?[1046]",
    effect: {
      MNY: -1,
    }
  }, {
    id: 300009,
    event: "这个月省吃俭用，攒下来一点小钱。",
    effect: {
      MNY: 1,
    }
  }, {
    id: 300010,
    event: "你写曲的时候手滑了一下，写进去几个音符，歪打正着写出来了一个还不错的旋律。",
    effect: {
      SPR: 1,
    }
  }, {
    id: 300011,
    event: "每天都混音火葬场，你觉得很烦。",
    include: "ENV>3",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300012,
    event: "经常能看到几个本事不大又爱吹牛逼的人。",
    exclude: "TLT?[1061]",
    effect: {
      SPR: -1,
    }
  }, {
    id: 300013,
    event: "经常能看到几个本事不大又爱吹牛逼的人。",
    include: "TLT?[1061]",
  }, {
    id: 300014,
    event: "你觉得在这里已经学不到什么东西了。",
    include: "WRK>15",
    effect: {
      SPR: -1,
    }
  },

  // 健康、头发量
  {
    id: 500000,
    event: "你拼命写曲子，经常觉得睡眠不足。",
    exclude: "(ENV=5)|(EVT?[510001])",
    include: "AGE>12",
    branch: [
      `(${conMale})&(LCK<3)&(AGE>18)&(EVT?[510000]):510001`,
      `(${conFemale2})&(LCK<-5)&(AGE>18)&(EVT?[510000]):510001`,
      `(${conMale})&(LCK<3)&(AGE>18):510000`,
      `(${conFemale2})&(LCK<-5)&(AGE>18):510000`, // 女性掉发的情况少一些
    ]
  },
  {
    id: 510000,
    event: "你的发际线越来越高，颜值不再。",
    effect: {
      CHR: -1,
    }
  },
  {
    id: 510001,
    event: "你的头发越来越少了",
    effect: {
      CHR: -1
    }
  },
  {
    id: 500001,
    event: "你花大笔钱去植发，以拯救有点绷不住的颜值。",
    include: "(EVT?[510001])&(MNY>4)",
    exclude: "EVT?[500002]",
    effect: {
      CHR: 1,
      MNY: -2,
    }
  }, {
    id: 500002,
    event: "你谢顶了。",
    include: "EVT?[510001]",
    exclude: "(TLT?[1017])|(EVT?[500002])",
    effect: {
      CHR: -2,
    },
    branch: [
      `${conFemale2}:510002`,
    ]
  },
  {
    id: 510002,
    event: "不得不戴假发。",
    effect: {
      SPR: -1,
      CHR: 1,
    }
  }, {
    id: 500003,
    event: "自媒体的砖家说，服用雌激素可以增加发量。",
    include: "EVT?[500002]",
    exclude: "EVT?[500003]",
    branch: [
      `(INT<5)&(${conFemale2}):510003`
    ]
  },
  {
    id: 510003,
    event: "你决定试一试效果。",
  },
  {
    id: 500004,
    event: "雌激素果然有效果。",
    postEvent: "你加大了药量。",
    include: "EVT?[510003]",
    exclude: "EVT?[500004]",
    effect: {
      CHR: 1,
    }
  }, {
    id: 500005,
    event: "外来激素破坏了身体的内分泌平衡。",
    postEvent: "你觉得自己身体越来越差。",
    include: "EVT?[500004]",
    exclude: "EVT?[500005]",
    effect: {
      STR: -2,
    },
    branch: [
      `EVT?[150024]:510004`
    ]
  },
  {
    id: 510004,
    event: "医生说激素破坏了你的男性功能，建议你做手术。",
    postEvent: "你无奈做了性别纠正手术，成为了女性。",
    highlight: 1,
  },
  // 周年 
  {
    id: 600000,
    event: "今天是你加入组织的一周年，大家向你表示了祝贺。",
    exclude: "ENV<2",
    include: "WRK=13",
  },
  {
    id: 600001,
    event: "今天是你加入组织的两周年，大家向你表示了祝贺。",
    exclude: "ENV<2",
    include: "WRK=25",
  },
  {
    id: 600002,
    event: "今天是你加入组织的三周年，大家为你准备了一份礼物。",
    exclude: "ENV<2",
    include: "WRK=37",
    effect: {
      SPR: 1,
    }
  },
  {
    id: 600003,
    event: "今天是你加入组织四周年，大家为你准备了一份礼物。",
    exclude: "ENV<2",
    include: "WRK=49",
  },
  {
    id: 600004,
    event: "今天是你加入组织五周年，大家为你准备了一份礼物。",
    exclude: "ENV<2",
    include: "WRK=61",
  },
  // 经济
  {
    id: 400000,
    event: "你看了看自己的钱包和银行账号。",
    exclude: "(WRK<6)|(ENV<3)|(EVT?[1110000])",
    branch: [
      "LCK>6:410006",
      "LCK>3:410001",
      "LCK>1:410002",
      "LCK>-1:410003",
      "LCK>-4:410004",
      "LCK<-3:410005",
    ],
  }, {
    id: 400001,
    event: "今年的财运不错，生活费比较多，自己也挣了不少钱。",
    exclude: "(WRK<6)|(ENV<3)|(INT<4)|(EVT?[1110000])",
    effect: {
      MNY: 2,
    },
  }, {
    id: 400002,
    event: "今年的财运一般，勉勉强强攒下来一点。",
    exclude: "(WRK<6)|(ENV<3)|(EVT?[1110000])",
    branch: [
      "LCK>6:410006",
      "(LCK>3)&(EVT?[400005,400105]):410006",
      "LCK>3:410001",
      "LCK>1:410002",
      "LCK>-1:410003",
      "LCK>-4:410004",
      "LCK<-3:410005",
    ],
  }, {
    id: 400003,
    event: "今年的财运不理想，基本没攒下来什么钱。",
    exclude: "(WRK<6)|(ENV<3)|(EVT?[1110000])",
  },
  {
    id: 410001,
    event: "虽然攒了一点钱，但是这些钱都被你拿去买耳机，音箱之类的东西了。",
  },
  {
    id: 410002,
    event: "虽然攒了一点钱，但是这些钱都被你拿去胡吃海喝了。",
  },
  {
    id: 410003,
    event: "虽然攒了一点钱，但你用攒下来的钱在steam上原价买了游戏，结果几天后游戏打折了。",
  },
  {
    id: 410004,
    event: "虽然攒了一点钱，但是物价上涨了。",
  },
  {
    id: 410005,
    event: "虽然攒了一点钱，但你把攒下来的钱拿去约曲子了。",
    highlight: 1,
    exclude: 'TLT?[1015]',
    effect: {
      MNY: -1,
    }
  },{
    id: 410006,
    event: "你到手的钱稍微多了一些，手头宽裕了。",
    effect: {
      MNY: 1,
    }
  },
  {
    id: 400004,
    event: "你觉得你需要买一些专业的音源和合成器，于是物色了起来。",
    include: '(MNY>3)|(TLT?[1050])',
    exclude: '(EVT?[400004])|(TLT?[1012])',
  },
  {
    id: 400005,
    event: '你终于挑好了喜欢的音源和合成器，不惜用花呗也要买。',
    postEvent: '每个月开始还花呗。',
    include: 'EVT?[400004]',
    exclude: '(EVT?[400005,400105])|(MNY>5)',
    effect: {
      MNY: -2,
    }
  },
  {
    id: 400105,
    event: '你终于挑好了喜欢的音源和合成器，付了全款。',
    include: 'EVT?[400004]',
    exclude: '(EVT?[400005,400105])|(MNY<6)',
  },
  {
    id: 400006,
    event: '经济状况不好，每个月还要还花呗，你觉得压力有点大。',
    include: '(EVT?[400005])&(MNY<3)',
    exclude: '(EVT?[400006])|(TLT?[1058])',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 400007,
    event: '最近音源和合成器之类的越来越贵，虽然你的生活没什么实际的改变，但是似乎资产增加了，还是有点开心。',
    include: 'EVT?[400005,400015]',
    exclude: 'EVT?[400007]',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 400008,
    event: '想买的音源和合成器的价格不断上涨，但你又没有钱，你有点焦虑。',
    exclude: '(EVT?[400005,400105])|(TLT?[1012,1058])',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 400009,
    event: '你看到有人接单写曲，觉得还不错，于是浅花了点钱约曲子。',
    include: '(MNY>3)|(TLT?[1013])',
    exclude: '(EVT?[400009])|(TLT?[1015])',
    effect: {
      MNY: -1,
    }
  },
  {
    id: 400010,
    event: '你看到有人接单写曲，觉得自己也想试一试，于是你也开始接单写曲了。',
    include: 'EVT?[400009]',
    exclude: 'EVT?[400010]',
    branch: [
      'LCK>5:420003',
      '(LCK>2)&(TLT?[1014]):420003',
      'LCK>1:420002',
      '(LCK>-2)&(TLT?[1014]):420002',
      'LCK>-3:420000',
      'LCK>-6:420001',
      'LCK>-100:420004'
    ]
  }, {
    id: 420000,
    event: '你接到了一单，但是对面要求实在太多了，写得你特别累，你觉得亏了。',
    effect: {
      MNY: 1,
      SPR: -1,
    }
  },
  {
    id: 420001,
    event: '你接到了一单，但你改了很多次对面都不满意，你干脆不干了，结果还赔了人家一笔违约金。',
    effect: {
      MNY: -2,
      SPR: -1,
    }
  },
  {
    id: 420002,
    event: '你接单写曲，小赚了一笔。',
    effect: {
      MNY: 2,
    }
  },
  {
    id: 420003,
    event: '你接单写曲，赚到了蛮多的，开心。',
    effect: {
      MNY: 3,
      SPR: 1,
    }
  },
  {
    id: 420004,
    event: '你接单写曲，结果对面不仅坑了你一笔，还拿了你的demo就跑了。',
    highlight: 1,
    effect: {
      MNY: -1,
      SPR: -1,
    }
  },
  {
    id: 400011,
    event: '你心灰意冷，决定此生不再接单写曲。',
    include: 'EVT?[420004, 420001]',
    exclude: '(TLT?[1013])|(EVT?[400011,400012])',
  },
  {
    id: 400012,
    event: '你继续找人约曲子。',
    include: 'EVT?[400010]',
    exclude: 'EVT?[400011,400012]',
    effect: {
      MNY: -2
    }
  },
  {
    id: 400013,
    event: '你物色了许多各种各样的音乐人，出钱让他们给你写曲。',
    include: 'EVT?[400012]',
    exclude: 'EVT?[400013]',
    branch: [
      'LCK>5:420006',
      '(LCK>2)&(TLT?[1014]):420006',
      'LCK>1:420005',
      '(LCK>-2)&(TLT?[1014]):420005',
      'LCK>-3:420000',
      'LCK>-6:420001',
      'LCK>-100:420004'
    ],
  },
  {
    id: 420005,
    event: '你约的音乐人写到一半写不下去了，把钱退给了你。',
    effect: {
      MNY: 3,
    }
  },
  {
    id: 420006,
    event: '你约的音乐人写着写着不想写了，你得到了一笔违约金。',
    effect: {
      MNY: 5,
      SPR: 1,
    }
  },
  {
    id: 400014,
    event: '你继续找人约曲子。',
    include: 'EVT?[400013]',
    exclude: 'EVT?[400011,400014]',
    effect: {
      MNY: -3
    }
  },
  {
    id: 400015,
    event: '你物色了许多各种各样的音乐人，出钱让他们给你写曲。',
    include: 'EVT?[400014]',
    exclude: 'EVT?[400015]',
    branch: [
      'LCK>5:420008',
      '(LCK>2)&(TLT?[1014]):420008',
      'LCK>1:420007',
      '(LCK>-2)&(TLT?[1014]):420007',
      'LCK>-3:420000',
      'LCK>-6:420001',
      'LCK<-8:420009',
      'LCK>-100:420004'
    ],
  },
  {
    id: 400016,
    event: '约单写曲的你折腾得头破血流，最终跳楼自杀了。',
    include: '(EVT?[420009])&(MNY<-3)&(SPR<-1)',
    effect: {
      LIF: -1,
    }
  },
  {
    id: 420007,
    event: '你约的音乐人写到一半写不下去了，把钱退给了你。',
    effect: {
      MNY: 4,
    }
  },
  {
    id: 420008,
    event: '你约的音乐人写着写着不想写了，你得到了一笔违约金。',
    effect: {
      MNY: 7,
      SPR: 1,
    }
  },
  {
    id: 420009,
    event: '你约的音乐人拿了你的钱就跑路了，你不仅没把人追回来，还损失了一大笔钱。',
    effect: {
      MNY: -7,
      SPR: -3,
    }
  },
  // 趣味---
  {
    id: 850000,
    event: '大家都夸你长得好看。',
    postEvent: '他们对你说：你那么好看，为什么不去做偶像，却要在这里写黑乐谱？',
    highlight: 1,
    exclude: 'CHR<6',
  },
  {
    id: 850001,
    event: '大家都夸你长得好看。',
    postEvent: '他们对你说：你那么好看，为什么不去做DJ，却要在这里写黑乐谱？',
    highlight: 1,
    exclude: 'CHR<6',
  },
  {
    id: 850002,
    event: '你参与了一个合录，结果你是合录里设备最拉胯的那个。',
  },
  {
    id: 850003,
    event: '视频网站上的rush系列视频越来越多，你开始想做微分音的rush。',
  },
  {
    id: 850004,
    event: '视频网站上的低质量widi钢琴唱歌视频越来越多，你开始想干脆也做一个这样的视频来吸引一点流量。',
  },
  {
    id: 850005,
    event: '听说国外的黑乐谱社区和国内的黑乐谱社区又吵起来了。',
    postEvent: '为了证明国内的实力，同时也想要证明国内并不需要依赖国外，组织里会程序开发的人加班加点做出了新的midi视频渲染器。'
  },
  {
    id: 850006,
    event: '最近有个梗曲特别火，你把它改成了黑乐谱，结果一下子就好几万播放了。',
    exclude: 'ENV<3'
  }, {
    id: 850007,
    event: '有人找你合作写黑乐谱，给你写进去一堆和声火葬场。',
  }, {
    id: 850008,
    event: '你戴着耳机写曲，完全没听到外面家里人的敲门声，结果被推门而入的家里人吓得从椅子上跳了起来。',
    highlight: 1,
  }, {
    id: 850009,
    event: '你看到一个写得很烂的midi，但发现作者是去年的自己。',
    exclude: 'AGE<13',
  }, {
    id: 850010,
    event: '你突然有点想披皮出道。',
    exclude: 'EVT?[850010]',
  }, {
    id: 850011,
    event: '你和组织里的人一起玩minecraft。',
  }, {
    id: 850012,
    event: '你梦见了小时候的自己。',
  }, {
    id: 850013,
    event: '有人找你合作写黑乐谱，给你写进去一堆力度火葬场。',
  }, {
    id: 850014,
    event: '听说隔壁的黑乐谱协会有个人因为在协会里跟人吵架被协会踢出去了。',
  }, {
    id: 850015,
    event: '看到有个人发了自己的电音作品，你一听，我去，爆电平。',
  }, {
    id: 850016,
    event: '你发现别人的头发都比你多。',
    highlight: 1,
  }, {
    id: 850017,
    event: '看到一个新的音游企划，有点想去投稿，但是音游企划大概率并不会收录黑乐谱。'
  }, {
    id: 850018,
    event: '这个月天天大爆肝，每天只睡4个小时。',
    exclude: 'ENV=5',
  }, {
    id: 850019,
    event: '你发现别人样样全能，而你啥都不会。',
    exclude: 'WRK>4',
  }, {
    id: 850020,
    event: '你来到了新的组织，认识了可爱的大家，于是写了一首曲以示纪念。',
    include: 'WRK=1',
  }, {
    id: 850021,
    event: '这个月前后改了十几次曲子，最后觉得不好听，删了。'
  }, {
    id: 850022,
    event: '我超，怎么会有blacker有对象呢，取关了。',
  }, {
    id: 850023,
    event: '你在看音符画大佬施法，然后发现看不懂。',
  }, {
    id: 850024,
    event: '你在津津有味地看奈乐谱，但是忽然想起自己是写韩式的。',
    exclude: 'EVT?[850024]',
  }, {
    id: 850025,
    event: '有人问你有没有好用的作曲软件，',
    postEvent: '你直接把domino，coolsoft和音色库发给了人家。',
    highlight: 1,
    exclude: 'EVT?[850025]'
  }, {
    id: 850026,
    event: '你不小心把一个放在桌面的工程文件给删掉了，那可是你肝了好久写出来的。',
    highlight: 1,
    exclude: 'EVT?[850026]',
  }, {
    id: 850027,
    event: '上次你误删了工程文件，你急得要死，到处找可以还原文件的方法。',
    postEvent: '差点就花钱开了文件恢复器的会员，还好有懂门道的群友阻止了你，帮忙把文件恢复了。',
    highlight: 1,
    include: 'EVT?[850026]',
    exclude: 'EVT?[850027]',
  }, {
    id: 850028,
    event: '你搓了好久黑乐谱，你的domino都已经被你盘出包浆来了。',
    include: 'AGE>24',
  }, {
    id: 850029,
    event: '你从家里的旧书柜中找到了一本小时候的音乐课本，勾起了你年少时的回忆。',
    exclude: 'EVT?[850029]',
  }, {
    id: 850030,
    event: '他们突然就在聊什么热米线啊炒粉条的，搞得你肚子都饿了。',
  }, {
    id: 850031,
    event: '你看到一个miditrail视频。',
    postEvent: '五颜六色的音符条就像长条状硬糖一样，你突然就在想，音符条能不能吃。',
    highlight: 1,
    exclude: 'EVT?[850031]',
  }, {
    id: 850032,
    event: '有人找你合作写黑乐谱，结果把你的主旋律和拍子啥的全都改了，搞得你都不好意思说这是你和他合作的了。',
    highlight: 1,
  }, {
    id: 850033,
    event: '你的domino突然用不了了，你被迫用FL。',
    postEvent: '你打开FL后花了好几个小时选音色，又花了好几个小时选采样，结果搞了半天一点都没写出来。',
    highlight: 1,
  }, {
    id: 850034,
    event: '你和别人吵了一架，因为他竟然说Microsoft GS Wavetable Synth不是世界上最好的音色库。',
    highlight: 1,
  },
  {
    id: 850035,
    event: '你写曲的时候犯困了，趴在电脑上就睡，睡醒之后发现你睡着的时候稀里糊涂按进去几个音符，你顿时有了灵感。',
    highlight: 1,
    effect: {
      LCK: 1,
    }
  },
  {
    id: 850036,
    event: '最近似乎要举办一个黑乐谱比赛。',
    exclude: 'EVT?[850036]',
  },
  {
    id: 850037,
    event: '好多人报名了比赛，你没敢报名，因为报了名的话自己就会丢人现眼了。',
    highlight: 1,
    include: 'EVT?[850036]',
    exclude: 'EVT?[850037]',
  },
  {
    id: 850038,
    event: '很多人问你是不是会用cc，尴尬的是你并不会。',
    highlight: 1,
    exclude: 'EVT?[850038]',
  },
  {
    id: 850039,
    event: '你看到了比赛的总结视频。',
    postEvent: '靠！比赛的倒数第一名甚至都比自己强！',
    highlight: 1,
    exclude: 'EVT?[850039]',
  },
  {
    id: 850040,
    event: '为了找灵感，你一口气喝了两斤白酒，摸来纸笔就开始把脑里的旋律记下来。',
    highlight: 1,
    postEvent: '醒了以后，发现纸上写了一堆乱七八糟，完全看不懂。',
    exclude: 'EVT?[850040]',
  },
  {
    id: 850041,
    event: '你给人改曲子，他很感激你。',
    postEvent: '不久之后，你突然发现你给他改进去好几个乐理错误。',
    highlight: 1,
    exclude: 'EVT?[850041]',
  },
  {
    id: 850042,
    event: '有人背着你翻录了你的黑乐谱，甚至还给你往里面加了奇怪的音符画。',
    exclude: 'EVT?[850042]',
  },
  {
    id: 850043,
    event: '你觉得你的技术越发的好了，结果看了一下黑圈大佬的作品，觉得自己的作品依然是垃圾。',
    exclude: 'EVT?[850043]',
  },
  {
    id: 850044,
    event: '你在曲子里塞了点奇怪的私货，然而没有人发现。',
    exclude: 'EVT?[850044]',
  },
  // 工作分支
  {
    // 游戏企划
    id: 850045,
    event: '企划里比你牛逼的人很多，你没负责到多少部分，技术都有点生疏了。',
    include: '(WRK>24)&(ENV=5)',
    exclude: '(WRK>36)|(TLT?[1064])',
    effect: {
      INT: -1,
    }
  },
  {
    // 游戏企划
    id: 850046,
    event: '重要的曲子都被其他更厉害的人负责了，你觉得无所事事，反正也没事做，开摆。',
    include: '(WRK>36)&(ENV=5)',
    exclude: '(WRK>48)|(TLT?[1064])',
    effect: {
      INT: -1,
    }
  },
  {
    // 游戏企划
    id: 850047,
    event: '你觉得自己再待下去，就彻底废了。',
    postEvent: '但你又感觉自己离不开这个舒适环境。',
    include: '(WRK>48)&(ENV=5)',
    exclude: '(WRK>60)|(TLT?[1064])',
    effect: {
      INT: -1,
      SPR: -1,
    }
  },
  {
    id: 850048,
    event: '企划管理混乱，一个重要的曲子工程文件被误删。',
    include: '(WRK>12)&(ENV<3)',
    exclude: '(WRK>24)',
    branch: [
      'LCK>-100:851000',
    ],
  },
  {
    id: 850049,
    event: '主催让大家加班加点搓曲子。',
    include: '(WRK>24)&(ENV<3)',
    exclude: '(WRK>24)',
    branch: [
      'TLT?[1056]:851001',
      '(LCK>-100):851000',
    ],
  },
  {
    id: 851000,
    event: '你不想加班加点搓曲子，但是主催催得很紧，你感觉很烦。',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 851001,
    event: '你加班加点地搓曲子。',
  },
  {
    id: 850050,
    event: '主催突然有了些新的需求，把需求告诉了你们。',
    postEvent: '你看着这些乱七八糟的抽象需求，心情一言难尽。',
    exclude: 'ENV=5',
  },
  {
    id: 850051,
    event: '这个月你每天都在加班加点地搓曲子。',
    include: 'TLT?[1056]',
  },
  {
    id: 850052,
    event: '主催流着泪求你别再拼命加班加点写曲了，这样会显得这个企划很不人道。',
    include: 'EVT?[850051]',
  },
  {
    id: 850053,
    event: '在游戏企划你负责不到什么需求，不能拼命搓曲子，非常不开心。',
    include: '(TLT?[1056])&(ENV=5)',
    exclude: 'EVT?[850053]',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 850054,
    event: '主催对音乐组组长说：需要写一首史诗感觉的战斗曲，要全程高燃。',
    postEvent: '音乐组组长对你说：往里边多写点弦乐，多放点电影音效。',
    highlight: 1,
  },
  {
    id: 850055,
    event: '你最近在学习一个知名曲师的写曲风格。',
    postEvent: '学着学着，结果这个曲师爆出了丑闻。',
  },
  {
    id: 850056,
    event: '没有理由地，你就是觉得最近很开心。',
    exclude: '(SPR<0)|(SPR>5)|(ENV<2)',
    effect: {
      SPR: 1,
    }
  },
  // 干烂一个组织
  {
    id: 850057,
    event: '由于你写曲子经常火葬场，你所在的组织的风评下降了。',
    exclude: 'TLT?[1046]'
  },
  {
    id: 850058,
    event: 'leader冲你发火：如果你再写火葬场曲子，这个组织就要被你玩完了。',
    exclude: '(INT>6)|(ENV>2)|(EVT?[850058])',
    include: 'EVT?[850057]',
  },
  {
    id: 850059,
    event: '由于你写了太多火葬场曲子，组织被冲烂了，解散了。',
    include: 'EVT?[850058]',
    exclude: '(ENV>2)|(EVT?[850059])',
    branch: jump1,
  },
  // 又干烂一个组织
  {
    id: 850060,
    event: '由于你写曲子经常火葬场，你所在的组织的风评下降了。',
    include: 'EVT?[850059]',
  },
  {
    id: 850061,
    event: 'leader冲你发火：如果你再写火葬场曲子，这个组织就要被你玩完了。',
    highlight: 1,
    exclude: '(INT>5)|(ENV>2)|(EVT?[850061])',
    include: 'EVT?[850060]',
  },
  {
    id: 850062,
    event: '由于你加班加点地写火葬场曲子，你所在的组织又被你干解散了。',
    include: 'EVT?[850061]',
    exclude: '(ENV>2)|(EVT?[850062])',
    branch: jump1,
  },
  // 再干烂一个组织
  {
    id: 850063,
    event: '由于你写曲子经常火葬场，你所在的组织的风评下降了。你的火葬场创造能力已经令人闻风丧胆。',
    include: 'EVT?[850062]',
  },
  {
    id: 850064,
    event: '由于你孜孜不倦地写火葬场曲子，你所在的组织摇摇欲坠。',
    postEvent: '其他人试图修改你曲子里的火葬场，然而修改的速度远远比不上你创造的速度。',
    highlight: 1,
    exclude: '(INT>4)|(ENV>2)|(EVT?[850064])',
    include: 'EVT?[850063]',
  },
  {
    id: 850065,
    event: '由于你写的火葬场曲子实在太多，leader被你逼疯，组织解散了。',
    include: 'EVT?[850064]',
    exclude: '(ENV>2)|EVT?[850065]',
    branch: jump1,
  },
  {
    id: 850066,
    event: 'leader由于学业繁重解散了组织，你只好重新找一个。',
    include: 'ENV<2',
    branch: jump1,
  },
  {
    id: 850067,
    event: '你和一个新来的人连麦，指导他写曲。',
    highlight: 1,
    postEvent: '但是因为你普通话不好，他听不懂你到底在说什么。',
    include: 'TLT?[1016]',
    exclude: 'EVT?[850067]',
    branch: jump1,
  },
  {
    id: 850068,
    event: '你和其他人合作的曲子里出现了一个很大的问题。',
    branch: [
      'TLT?[1037]:853000',  // 八面玲珑
      '(TLT?[1029])&(LCK<7):853001',  // 背锅侠
      '(TLT?[1030])&(LCK>-5):853000', // 老好人
      'LCK<0:853001',
      'LCK>-100:853000',
    ],
  },
  {
    id: 853000,
    event: '可能和你有关，但是大家都没有为难你。',
  },
  {
    id: 853001,
    event: '其他人把锅甩给你，你不仅被骂了，还要负责修改，烦死了。',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 850069,
    event: '最近吃得太好了，你的体重增加了。',
    exclude: 'EVT?[850069]',
    include: 'ENV>2',
  },
  {
    id: 850070,
    event: '你最近由于体重显著增加，颜值下降。',
    include: '(ENV>2)&(EVT?[850069])',
    exclude: '(EVT?[850070])|(TLT?[1122])',
    effect: {
      CHR: -1,
    }
  },
  {
    id: 850071,
    event: '你最近由于体重显著增加，感觉体力有所下降。',
    include: '(ENV>2)&(EVT?[850069])',
    exclude: '(EVT?[850071])|(TLT?[1122])',
    effect: {
      STR: -1,
    }
  },
  {
    id: 850072,
    event: '你看着自己小腹上日渐增多的赘肉，陷入焦虑。',
    include: `(ENV>2)&(EVT?[850069])&(${conFemale2})`,
    exclude: '(EVT?[850072])|(TLT?[1122])',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 850073,
    event: '你加强了锻炼，重新变得健康，也恢复了颜值和自信。',
    include: `(ENV>2)&(EVT?[850069])&(${conFemale2})`,
    exclude: '(EVT?[850073])|(TLT?[1022])',
    effect: {
      SPR: 1,
      CHR: 1,
      STR: 1,
    }
  },
  // --- 女生 ---
  {
    id: 870000,
    include: conFemale,
    event: '你发现组织里有个男生是个音游大佬。'
  },
  {
    id: 870001,
    include: `(CHR>6)&(${conFemale2})`,
    event: '你以一己之力拉高了整个组织的颜值',
  },
  {
    id: 870002,
    include: conFemale2,
    event: '你看到路上有个lo娘，穿的是小提琴主题的lo裙。',
    postEvent: '笑死，那个小提琴画得完全是错的。',
    highlight: 1,
  },
  {
    id: 870003,
    include: conFemale,
    event: '你走在路上，看到有个人穿的衣服上有钢琴元素，忍不住多看了几眼，可恶，好想要同款。',
  },
  {
    id: 870004,
    include: conFemale2,
    event: '你买了一个音符形状的发卡。',
  },
  {
    id: 870005,
    include: conFemale2,
    event: '组织线下面基，精心打扮的你成为了焦点。',
    highlight: 1,
  },
  {
    id: 870006,
    include: conFemale,
    event: '男票送了你一个midi键盘，给了你惊喜。',
    exclude: 'EVT?[220000]',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 870007,
    include: conFemale,
    event: '新写的曲被人说不好听，你情绪有点低落。',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 870008,
    include: `${conFemale2}&(TLT?[1026])&(CHR>4)`,
    event: '你成了团队里的树洞，同事们都宠着你。',
    highlight: 1,
    exclude: 'EVT?[870008]',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 870009,
    include: `(${conFemale})&(EVT?[220000])`,
    event: '老公送了你一个midi键盘，给了你惊喜。',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 870010,
    include: `(${conFemale})&(STR>4)`,
    event: '组织线下面基，你虽然是个女生，但体力却比一些男生还要牛。',
  },
  {
    id: 870011,
    include: `(${conFemale2})&(CHR>6)&(SPR>6)`,
    event: '早早起来，对着镜子拍拍脸蛋，自言自语：',
    postEvent: '我的曲子也要和我的人一样漂亮。',
    highlight: 1,
  },
  {
    id: 870012,
    event: '你跟男票说，你想要一个音色库。',
    postEvent: '你男票给你买了一个VST。',
    include: `${conFemale2}`,
    exclude: 'EVT?[850012,850013,220000]',
    highlight: 1,
  },
  {
    id: 870013,
    event: '你跟老公说，你想要一个音色库。',
    postEvent: '他给你买来一个VST。',
    include: `(${conFemale2})&(EVT?[220000])`,
    exclude: 'EVT?[850012,850013]',
    highlight: 1,
  },
  // --- 男生 ---
  {
    id: 880000,
    include: conMale,
    exclude: `(${conFemale2})|(EVT?[220000])`,
    event: '逛琴行时看到一些很不错的琴，你不禁想象与女朋友合奏。',
    postEvent: '……没有女朋友啊，那没事了。',
    highlight: 1,
  },
  {
    id: 880001,
    include: conMale,
    exclude: conFemale2,
    event: '联机玩minecraft，不小心把别人家给炸了。',
    postEvent: '趁没人发现，赶快溜走。',
    highlight: 1,
  },
  {
    id: 880002,
    include: conMale,
    exclude: conFemale2,
    event: '你在路上看到几个男生穿着DK还留了日系头发，觉得很帅，回去立马买了一套DK，并且立志要留日系男生发型。',
  },
  {
    id: 880003,
    include: conMale,
    exclude: conFemale2,
    event: '你买了一件乐谱图案的衬衫。',
  },
  {
    id: 880004,
    include: conMale,
    exclude: conFemale2,
    event: '你觉得自己有一天会成为著名曲师。',
  },
  {
    id: 880005,
    include: `(${conMale})&(CHR>6)&(SPR>6)`,
    exclude: conFemale2,
    event: '你在路上发现一个帅哥，仔细一看，原来是镜子里的自己。',
    highlight: 1,
  },
  {
    id: 880006,
    include: `(${conMale})&(TLT?[1026])`,
    exclude: conFemale2,
    event: '你想成为树洞，结果发现他们只喜欢找女生当树洞。',
    highlight: 1,
    exclude: 'EVT?[880006]',
  },
  {
    id: 880007,
    include: `(${conMale})&(TLT?[1026])&(EVT?[880006])`,
    exclude: `(EVT?[880007])|(${conFemale2})`,
    event: '隔壁部门的女装大佬成为了树洞。',
    postEvent: `你去询问他，他告诉你：性别不重要，重要的是要长得好看且会打扮。`,
    highlight: 1,
  },
  {
    id: 880008,
    include: `(${conMale})&(STR>4)`,
    exclude: `(${conFemale2})`,
    event: '组织线下面基，一起去打maimai，你体力很好，把好几个人都打趴了。',
  },
  {
    id: 880009,
    event: '你女友对你说，她想要去一个叫MIDI的精品店。',
    postEvent: '你笑个半死，她甚至还不知道你为啥笑这么厉害。',
    include: `${conMale}`,
    exclude: `(EVT?[870009,870010,220000])|(${conFemale2})`,
    highlight: 1,
  },
  {
    id: 880010,
    event: '你妻子对你说，她想要去一个叫MIDI的精品店。',
    postEvent: '你笑个半死，她甚至还不知道你为啥笑这么厉害。',
    include: `(${conMale})&(EVT?[220000])`,
    exclude: `(EVT?[870009,870010])|(${conFemale2})`,
    highlight: 1,
  },
  // ---- 吃饱没事 ----
  {
    id: 860000,
    event: '你读到了一篇CBMS的讲如何写黑乐谱的好文章。',
    include: "EVT?[120003]",
    branch: [
      'LCK>7:861001',
    ],
    highlight: 1,
  },
  {
    id: 860001,
    event: '你读到了一篇CBMS的讲如何使用cc的好文章。',
    include: "EVT?[120003]",
    branch: [
      'LCK>7:861001',
    ],
    highlight: 1,
  },
  {
    id: 860002,
    event: '你读到了一篇CBMS的讲如何使用domino的好文章。',
    include: "EVT?[120003]",
    branch: [
      'LCK>7:861001',
    ],
    highlight: 1,
  },
  {
    id: 860003,
    event: '你和CBMS的blacker们一起摸鱼。',
    include: "EVT?[120003]",
    branch: [
      'LCK>2:861002',
    ],
    highlight: 1,
  },
  {
    id: 861001,
    event: '你的能力提升了。',
    effect: {
      INT: 1,
    }
  },
  {
    id: 861002,
    event: '你和CBMS的blacker们聊天，很开心。',
    effect: {
      SPR: 1,
    },
    highlight: 1,
  },
  {
    id: 860004,
    event: '最近经常听CBMS的blacker们说什么炒粉条，粉条装盘，试吃粉条之类的。',
    postEvent: "你不知道他们在说啥，问了一下，才知道原来他们正在举办一个叫CFT的比赛，而cft可以写成炒粉条。",
    exclude: "EVT?[860004]",
    effect: {
      SPR:1,
    },
    highlight: 1,
  },

  // 退圈事件
  {
    id: 999000,
    event: '一晃50年过去了，你把最好的时光都献给了黑乐谱事业，现在你光荣淡圈了。',
    include: 'AGE>599',
    branch: retireGameOver,
  },
  {
    id: 999001,
    event: '你作为blacker已经10多年，觉得自己的生活没什么起色，你不打算干下去了。',
    include: '(AGE>120)&(MNY<2)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999002,
    event: '你作为blacker已经10多年，觉得自己不喜欢这个身份，不打算干下去了。',
    include: '(AGE>120)&(SPR<1)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999003,
    event: '你作为blacker已经10多年，觉得自己干不动了。',
    include: '(AGE>120)&(STR<1)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999004,
    event: '你作为blacker已经20多年，觉得自己的生活没什么起色，你不打算干下去了。',
    include: '(AGE>240)&(MNY<4)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999005,
    event: '你作为blacker已经20多年，觉得自己不喜欢这个身份，不打算干下去了。',
    include: '(AGE>240)&(SPR<3)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999006,
    event: '你作为blacker已经20多年，觉得自己干不动了。',
    include: '(AGE>240)&(STR<3)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999007,
    event: '你作为blacker已经30多年，觉得自己的生活没什么起色，你不打算干下去了。',
    include: '(AGE>360)&(MNY<5)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999008,
    event: '你作为blacker已经30多年，觉得自己不喜欢这个身份，不打算干下去了。',
    include: '(AGE>360)&(SPR<4)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999009,
    event: '你作为blacker已经30多年，觉得自己干不动了。',
    include: '(AGE>360)&(STR<4)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  {
    id: 999010,
    event: '你财务自由了，不想只拘泥于blacker了。',
    include: '(AGE>120)&(SPR>6)&(MNY>15)',
    exclude: "EVT?[1110000]",
    branch: gameOver,
  },
  // ---- 天赋 -----
  {
    id: 131000,
    event: '你耐不住寂寞，打算换个地方。',
    include: '(TLT?[1049])&(WRK>11)',
    exclude: "EVT?[1110000]",
    branch: jump1,
  },
  // 天赋 1054：直男、桃花连连，1028
  {
    id: 132000,
    event: '你很有异性缘。',
    exclude: `(${conFemale})|(EVT?[132000,131001])`,
    include: 'TLT?[1028]',
    branch: [
      'LCK>-7:131001',
    ],
  },
  {
    id: 131001,
    event: '有女生对你表示好感。',
    include: `(CHR>4)|(INT>5)`,
    exclude: `(${conFemale})|(EVT?[131001])`,
    branch: [
      'TLT?[1054]:131101',
      'LCK>-5:131100',
      'LCK>-100:131101',
    ],
  },
  {
    id: 131100,
    event: '你有点心动。',
  },
  {
    id: 131101,
    event: '你无动于衷：谈恋爱有搓曲子好玩吗？',
  },
  {
    id: 131002,
    include: 'EVT?[131100]',
    event: '你和那位女生感情加深了，大家都说你们很有默契。',
    exclude: `(${conFemale2})|(EVT?[131002])`
  },
  {
    id: 131003,
    include: 'EVT?[131002]',
    event: '你觉得和她一起写曲子很愉快，你们之间有一种道不清说不明的关系。',
    postEvent: '莫非……这就是爱情？',
    exclude: `(${conFemale2})|(EVT?[131003])`,
    effect: {
      SPR: 1,
    },
  },
  {
    id: 131004,
    include: 'EVT?[131003]',
    event: '你确定自己已经坠入爱河。',
    exclude: `(${conFemale2})|(EVT?[131004])|(TLT?[1077])`,
    effect: {
      SPR: 1,
    },
    branch: [
      'EVT?[220000]:131102',
      'LCK>-100:131103'
    ],
  },
  {
    id: 131102,
    event: '你出轨了，但你已无法回头。',
    highlight: 1,
  },
  {
    id: 131103,
    event: '你向她求婚了，大家都祝你们幸福。',
  },
  // 天赋1005、1006
  {
    id: 131005,
    event: '你发现了自己曲子里的问题，于是光速修复了。',
    include: 'TLT?[1005]',
    exclude: 'EVT?[131005]',
    highlight: 1,
  },
  {
    id: 131006,
    event: '你发现并修复了组织里其他人的曲子里的问题。',
    postEvent: '对方非常感激，给你发了一个红包。',
    include: 'TLT?[1005]',
    exclude: 'EVT?[131006]',
    effect: {
      MNY: 1,
    },
  },
  {
    id: 131007,
    event: '你在黑乐谱中使用了一项新技术，电脑没撑住崩了，流着泪花了钱修电脑。',
    include: 'TLT?[1006]',
    exclude: '(EVT?[131007])|(TLT?[1025])',
    effect: {
      MNY: -1,
    },
  },
  {
    id: 131008,
    event: '你在黑乐谱中使用了一项新技术，获得了不错的效果，得到了大家的夸奖。',
    include: 'TLT?[1006]',
    exclude: '(EVT?[131008])|(TLT?[1025])',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 131009,
    event: '你在黑乐谱中使用了一个最新最热音色库，结果几天之后音色库的作者突然宣布这个音色库变为私人音色库，不允许其他任何人使用。',
    highlight: 1,
    postEvent: '你不得不加班加点修改了好几天，直到把力度控制和cc等等调到适应你用的旧音色库为止。',
    exclude: 'EVT?[131009]',
    effect: {
      SPR: -1,
    },
  },
  {
    id: 131010,
    event: '你在midishow上发现一个有趣的黑乐谱，你研究了好几天，发现这个黑乐谱其实是一首东方曲改编的。',
    highlight: 1,
    exclude: 'EVT?[131010]',
  },
  {
    id: 131011,
    event: '你在midishow上发现一个有趣的黑乐谱，你研究了好几天，发现这个黑乐谱其实是一首音游曲改编的。',
    exclude: 'EVT?[131011]',
  },
  {
    id: 131012,
    event: '你在midishow上发现一个有趣的黑乐谱，你研究了好几天，发现这个黑乐谱其实是你自己之前写的。',
    highlight: 1,
    exclude: 'EVT?[131012]',
  },
  {
    id: 131013,
    event: '你在midishow上发现一个有趣的黑乐谱，你研究了好几天，发现完全看不懂这个黑乐谱到底是怎么编织的。',
    exclude: 'EVT?[131013]',
  },
  {
    id: 131014,
    event: '你在midishow上发现一个有趣的黑乐谱，你研究了好几天，发现这个黑乐谱其实是多乐器音符画绘乐谱。',
    highlight: 1,
    exclude: 'EVT?[131014]',
  },
  // ---- 奇怪的消息 -----
  {
    id: 988000,
    event: '【奇怪的消息】据说存在一个音乐至上的异世界，也不知道是不是真的。',
    exclude: 'EVT?[988000]',
    include: 'TLT?[1063]'
  },{
    id: 988001,
    event: '【奇怪的消息】女装大佬也是有嫁人的可能的。',
    exclude: 'EVT?[988001]',
    include: 'TLT?[1063]'
  },{
    id: 988002,
    event: '【奇怪的消息】似乎有不少blacker退坑之后转头就去写电音了。',
    exclude: 'EVT?[988002]',
    include: 'TLT?[1063]'
  },{
    id: 988003,
    event: '【奇怪的消息】大家最近似乎都很爱嗑一个缺一只耳朵的猫猫头和一个绿帽子的方块头的cp。',
    exclude: 'EVT?[988003]',
    include: 'TLT?[1063]'
  },{
    id: 988004,
    event: '【奇怪的消息】每年都会举办的黑乐谱拜年祭和黑乐谱黑色祭是blacker锻炼自我，展示自我的很棒的平台。',
    exclude: 'EVT?[988004]',
    include: 'TLT?[1063]'
  },
  // ---- 异世界 ----
  {
    id: 1110000,
    event: '某天你一觉醒来，突然发现自己穿越到了异世界。',
    include: '(TLT?[1048])&(ENV>2)',
    exclude: 'EVT?[1110000]',
  },
  {
    id: 1110001,
    event: '你看到一篇异世界穿越文，讲的是一个女blacker穿越到异世界，结果遇到了一个她在本来世界里喜欢的男blacker，于是在经历了许多事情之后他们终于在一起了，于是梦醒了。',
    highlight: 1,
    include: 'EVT?[1110000]',
    exclude: 'EVT?[1110001]',
  },
  {
    id: 1110002,
    event: '你穿越之后，发现这是一个诡异的异世界，这个世界存在着“音之力”，对音乐掌握得越多，所持有并能运用的“音之力”便越为强大。音之力可以具象化为任何事物，可以任意使用。但想使其具象化的存在越强大，所需要的音之力也会越高。',
    include: 'EVT?[1110000]',
    exclude: 'EVT?[1110002]',
  },
  {
    id: 1110003,
    event: '在这个音乐至上的异世界，学生们每天都在上音乐课，就连已经步入社会的人也会自己去报音乐班。',
    include: 'EVT?[1110000]',
    exclude: 'EVT?[1110003]',
  },
  {
    id: 1110004,
    event: '国内即将举办大型音之力比赛，先在市内进行对抗选出前三，而后在省内进行对抗选出前十，最终进行全国决赛。比赛的前三名能获得丰厚的奖金。',
    highlight: 1,
    include: 'EVT?[1110000]',
    exclude: 'EVT?[1110004]',
  },
  {
    id: 1110005,
    event: '音之力比赛开幕，但不断有选手失踪。你参与了比赛，几乎每天都能听说选手失踪的事使你有点不安。',
    highlight: 1,
    include: 'EVT?[1110004]',
    exclude: 'EVT?[1110005]',
  },
  {
    id: 1110006,
    event: '回家途中，你突然遭到黑衣人闷棍袭击。',
    highlight: 1,
    include: 'EVT?[1110005]',
    exclude: 'EVT?[1110006]',
    branch: [
      'EVT?[1110000]:1111000',
    ]
  },
  {
    id: 1111000,
    event: '你的头部受到重击，倒在了地上。',
    highlight: 1,
    branch: [
      "STR<5:1111001",
      "STR>4:1111002",
    ]
  },
  {
    id: 1111001,
    event: '你死了。',
    effect: {
      LIF: -1,
    }
  },
  {
    id: 1111002,
    event: '你的头部受到重击，倒在了地上。失去意识前的最后几秒钟，你看到一个穿着黑色斗篷，戴着墨镜的女生。',
    highlight: 1,
  },
  {
    id: 1110007,
    event: '你醒了。自己突然遭到袭击一事实在太过突然，你缓了一会才反应过来。',
    postEvent: '你检查全身上下，奇怪的是竟然没有一点伤痕。',
    highlight: 1,
    include: 'EVT?[1110006]',
    exclude: 'EVT?[1110007]',
  },
  {
    id:1110008,
    event: '你回到了家里，继续备战比赛。但遭到袭击的事依然是萦绕在你心里的一大疑问。',
    include: '(EVT?[1110007])&(INT<8)',
    exclude: 'EVT?[1110008]',
  },
  {
    id:1110009,
    event: '你了解到历代的冠军都是一个大家族的公子哥，出身名门，相貌堂堂，是国内众多女生追求的对象。',
    highlight: 1,
    include: '(INT>7)&(EVT?[1110007])',
    exclude: 'EVT?[1110009]',
    effect: {
      MNY: 1,
      ENV: "6!",
      WRK: "0!",
    }
  },{
    id:1110010,
    event: '你约了个练习室练习音之力。',
    include: 'EVT?[1110009]',
    effect: {
      STR: 2,
      SPR: 1,
    }
  },{
    id:1110011,
    event: '最近似乎听到那些爱慕那位公子哥的女生说：有一个穿黑色斗篷戴墨镜的女生把公子哥给打倒了。',
    highlight: 1,
    exclude: 'EVT?[1110011]',
    include: 'EVT?[1110009]',
  },{
    id:1110012,
    event: '最近总能听到那些爱慕那位公子哥的女生抱怨，说自从公子哥被打倒后就动用了大量人手到处找那个黑色斗篷戴墨镜的女生，但似乎并没有找到。',
    highlight: 1,
    include: 'EVT?[1110009]',
    exclude: 'EVT?[1110012]',
  },{
    id:1110013,
    event: '今天在观看比赛的时候惊讶地发现居然有一男一女用黑乐谱转化成音之力，碾压了对方。',
    highlight: 1,
    include: 'EVT?[1110009]',
    exclude: 'EVT?[1110013]',
  },{
    id:1110014,
    event: '你约了个练习室练习音之力，同时也复习乐理知识。',
    include: 'EVT?[1110009]',
    effect: {
      INT: 2,
    }
  }, {
    id: 1110015,
    event: '受到之前观战时看到有人使用黑乐谱的启发，你也开始使用黑乐谱转化成音之力，你的能力大幅提升了。',
    include: '(EVT?[1110010])&(WRK>10)',
    exclude: 'EVT?[1110015]',
    effect: {
      STR: 5,
      INT: 5,
    }
  }, {
    id: 1110016,
    event: '你来到了比赛的赛场上。',
    include: '(EVT?[1110010])&(WRK>10)',
    branch: [
      "INT>50:1111003",
      "INT>30:1111004",
      "INT>0:1111005",
      "INT>-100:1111006",
    ],
  }, {
    id: 1111003,
    event: '你大获全胜。',
    effect: {
      SPR: 2,
    }
  }, {
    id: 1111004,
    event: '你小胜一场。',
    effect: {
      SPR: 1,
    }
  },  {
    id: 1111005,
    event: '你小败收场。',
    effect: {
      SPR: -1,
    }
  }, {
    id: 1111006,
    event: '你大败而归。',
    effect: {
      SPR: -2,
      STR: -2,
    }
  },
  {
    id: 1110017,
    event: '经过锻炼和实战打磨，你的能力大大提升，成功进入了市级决赛。',
    highlight: 1,
    include: '(EVT?[1110010])&(STR>50)',
    exclude: 'EVT?[1110017]',
    effect: {
      SPR: 10,
      STR: 20,
    }
  },
  {
    id: 1110018,
    event: '经过锻炼和实战打磨，你的能力大大提升，成功进入了国内决赛。',
    highlight: 1,
    include: '(EVT?[1110017])&(STR>120)',
    exclude: 'EVT?[1110018]',
    effect: {
      SPR: 10,
      STR: 20,
    }
  }, {
    id: 1110019,
    event: '那两个使用黑乐谱的人也进入了国内决赛，你想要与他们切磋一下，交流经验。',
    highlight: 1,
    postEvent: '你们在练习室里切磋了起来。',
    include: '(WRK>120)&(EVT?[1110010])',
    exclude: 'EVT?[1110019]',
    branch: [
      "STR>150:1111009",
      "STR>100:1111008",
      "STR>-100:1111007"
    ],
  }, {
    id: 1111007,
    event: "你没能战胜他们，但他们依然愿意与你分享经验。",
  }, {
    id: 1111008,
    event: "你和他们打成了平手，他们同意与你交流经验。",
  }, {
    id: 1111009,
    event: "你战胜了他们，他们认可了你的能力，愿意与你交流经验。",
  }, {
    id: 1110020,
    event: '他们二人中的女生似乎对你有点印象，问你是不是被人袭击过。原来她就是那个黑色斗篷戴墨镜的女生，只是那次是乔装打扮，所以你现在看着她并没能认出来。',
    highlight: 1,
    include: 'EVT?[1110019]',
    exclude: 'EVT?[1110020]',
  }, {
    id: 1110021,
    event: '他们把真相告诉了你：袭击人的事是蝉联冠军的公子哥所为。为了得到冠军，公子哥出钱笼络人心，若不肯收受他的贿赂，他就要斩草除根。',
    highlight: 1,
    include: 'EVT?[1110020]',
    exclude: 'EVT?[1110021]',
  }, {
    id: 1110022,
    event: '在听到这样的消息后，你决定要在决赛上打赢公子哥。',
    highlight: 1,
    postEvent: '全国决赛开始了，紧张的战斗一触即发。',
    include: 'EVT?[1110021]',
    exclude: 'EVT?[1110022]',
  }, {
    id: 1110023,
    event: '你正好对上了公子哥。',
    highlight: 1,
    postEvent: '之前受到了袭击，你觉得必须要报一棍之仇。',
    include: 'EVT?[1110022]',
    exclude: 'EVT?[1110023]',
    branch: [
      "(STR>200)&(INT>100):1111012",
      "(STR>150)&(INT>50):1111011",
      "(STR>-100):1111010",
    ],
  },
  {
    id: 1111010,
    event: "你战败，被淘汰了，只能看着那两人打败了公子哥。在这个异世界里又过了一段时间后，异世界突然发生了严重的崩塌，你被卷入异世界的毁灭之中……",
    highlight: 1,
    effect: {
      LIF: -1
    }
  },
  {
    id: 1111011,
    event: "你打败了公子哥，最终与那两人来到了赛场上。你们用黑乐谱互轰。你并没有打败他们，但你还是获得了季军。最终的决赛上，他们二人中男生战胜了女生。",
    postEvent: "在这个异世界里又过了一段时间后，异世界突然发生了严重的崩塌，你被卷入异世界的毁灭之中……",
    highlight: 1,
    effect: {
      LIF: -1
    }
  },
  {
    id: 1111012,
    event: "你打败了公子哥，最终与那两人来到了赛场上。你们用黑乐谱互轰。你打败了他们，得到了比赛的冠军。",
    postEvent: "在这个异世界里又过了一段时间后，异世界突然发生了严重的崩塌，你被卷入异世界的毁灭之中……",
    highlight: 1,
    effect: {
      LIF: -1
    }
  },
  {
    id:1110024,
    event: '你训练刻苦，能力大幅提升。',
    include: 'EVT?[1110009]',
    effect: {
      STR: 10,
      SPR: 10,
    }
  },
  {
    id: 999888,
    event: '天赋【满血复活】发动：你醒了过来，躺在床上，好像做了个长长的梦。你记起你这段时间正要决定成为blacker。',
    include: 'LIF=2',
    postEvent: '你努力回想刚才做的梦，好像很真实，但又记不清。你隐约觉得有些东西不一样，但又似乎什么都没变。',
    highlight: 1,
    effect: {
      LIF: -1,
      AGE: '-1!',
      WRK: '0!',
      JMP: '0!',
      PRG: '0!',
      ENV: '0!',
    },
    hook(property) {
      let events = property.get('EVT');
      events = events.filter((e) => e === 999888 || e === 888726);
      property.set('EVT', events);
    }
  },
  {
    id: 888700,
    event: '你被创造出来了，是一个智能作曲机器人。',
    highlight: 1,
    include: 'TLT?[1081]',
    exclude: 'EVT?[999888]',
  },
  {
    id: 888701,
    event: '一个小哥哥购买了你。',
    include: 'EVT?[888700]',
    postEvent: '他所在的是一个大企划。',
  },
  {
    id: 888702,
    event: '一位小哥哥购买了你。',
    postEvent: '他所在的是一个小协会。',
    include: 'EVT?[888700]',
  },
  {
    id: 888703,
    event: '一位小姐姐购买了你。',
    postEvent: '她所在的是一个大企划。',
    include: 'EVT?[888700]',
  },
  {
    id: 888704,
    event: '一位小姐姐购买了你。',
    postEvent: '她所在的是一个小协会。',
    include: 'EVT?[888700]',
  },
  {
    id: 888705,
    event: '你根据他们的需求，从你的数据库里拿出样本，基于你的程序搓曲子。',
    include: 'EVT?[888700]',
  },
  {
    id: 888706,
    event: '组织里的人给你喂了一些曲子。',
    include: 'EVT?[888700]',
    effect: {
      INT: 1,
    }
  },
  {
    id: 888707,
    event: '你搭载有对话系统，组织里的人时不时会和你聊天。',
    include: 'EVT?[888700]',
  },
  {
    id: 888708,
    event: '组织里有个很会修程序和机器的人，帮你把一些问题修好了。',
    highlight: 1,
    include: 'EVT?[888700]',
    effect: {
      STR: 1,
    }
  },
  {
    id: 888709,
    event: '组织里环境很好，没有什么危险。',
    highlight: 1,
    postEvent: '你过得很健康，没有受到什么损坏。',
    include: 'EVT?[888700]',
    effect: {
      STR: 1,
    }
  },
  {
    id: 888710,
    event: '一个暴脾气的人看你写出来的曲子不合他的心意，踹了你几脚。',
    highlight: 1,
    include: 'EVT?[888700]',
    effect: {
      STR: -1,
    }
  },
  {
    id: 888711,
    event: '组织里的人常常会忘记给你充电。',
    highlight: 1,
    include: 'EVT?[888700]',
    effect: {
      STR: -1,
    }
  },
  {
    id: 888712,
    event: '你写了一首电音歌曲。',
    highlight: 1,
    include: 'EVT?[888700]',
  },
  {
    id: 888713,
    event: '你写了一首黑乐谱。',
    highlight: 1,
    include: 'EVT?[888700]',
  },
  {
    id: 888714,
    event: '你写了一首古典乐。',
    highlight: 1,
    include: 'EVT?[888700]',
  },
  {
    id: 888715,
    event: '有人夸你很智能，你很高兴。',
    highlight: 1,
    include: 'EVT?[888700]',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 888716,
    event: '组织里的大家对你很不错。',
    highlight: 1,
    include: 'EVT?[888700]',
    effect: {
      SPR: 1,
    }
  },
  {
    id: 888717,
    event: '有人和你聊天的时候故意骂你，但你的程序不允许你骂回去。',
    highlight: 1,
    include: 'EVT?[888700]',
    effect: {
      SPR: -1,
    }
  },
  {
    id: 888718,
    event: '最近组织里的人给你喂了很多数据，你有点处理不过来。',
    highlight: 1,
    include: 'EVT?[888700]',
    exclude: 'EVT?[888718]',
    effect: {
      INT: 1,
      SPR: -1,
    }
  },
  {
    id: 888719,
    event: '你分析了组织里一个人的曲子，帮他把曲子里的和声错误改正了。',
    highlight: 1,
    include: 'EVT?[888700]',
  },
  {
    id: 888720,
    event: '你的年纪大了，部件也有点老化了。',
    postEvent: '大家都格外照顾你。',
    include: '(EVT?[888700])&(AGE>59)',
    exclude: 'EVT?[888720]',
    effect: {
      STR: -1,
    }
  },
  {
    id: 888721,
    event: '你出故障了，被送回厂里返修。',
    include: '(EVT?[888700])&(AGE>23)',
    exclude: 'EVT?[888721]',
    effect: {
      STR: -1,
    }
  },
  {
    id: 888722,
    event: '你被修理得还不错。',
    include: '(EVT?[888700])&(EVT?[888721])',
    exclude: 'EVT?[888722]',
    effect: {
      STR: 1,
    }
  },
  {
    id: 888723,
    event: '你的部件老化了，开始出一些问题了。',
    include: '(EVT?[888700])&(AGE>83)',
    exclude: 'EVT?[888723]',
    effect: {
      STR: -1,
    },
  },
  {
    id: 888724,
    event: '你运行写曲子程序的时候由于部件老化，算力不足，宕机了一会儿。',
    include: '(EVT?[888700])&(AGE>83)',
    effect: {
      STR: -1,
    },
  },
  {
    id: 888725,
    event: '你运行起程序越来越吃力了。',
    include: '(EVT?[888700])&(AGE>83)',
    effect: {
      STR: -1,
    },
  },
  {
    id: 888726,
    event: '你彻底报废了。',
    postEvent: '大家都很难过，他们试图修好你，但无济于事，只能悼念了一下你，然后把你卖到了废品回收站。',
    highlight: 1,
    include: '(EVT?[888700])',
    exclude: '(STR>0)&(AGE<120)',
    effect: {
      LIF: -1,
    },
    branch: [
      'LIF>1:999888',
    ]
  },
];

export const events = map(eventList);