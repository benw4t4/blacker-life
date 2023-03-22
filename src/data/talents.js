import {map} from '../functions/util.js';

const talentList = [
  {
    // 智商+3，且有可能找到更好的地方
    id: 1001,
    name: "名校大神",
    description: "在全球知名音乐学院学习",
    grade: 2,
    effect: {
      INT: 3
    }
  }, {
    // 没什么作用
    id: 1002,
    name: "闷骚",
    description: "大部分blacker的特征",
    grade: 0
  }, {
    id: 1003,
    name: "蓝颜",
    description: "性别为男",
    grade: 1,
    exclusive: [
      1004,
      1047
    ]
  }, {
    id: 1004,
    name: "红颜",
    description: "性别为女",
    grade: 1,
    exclusive: [
      1003,
      1054, // 女孩子不能是直男
      2024  // 女孩子不能是女装大佬
    ]
  }, {
    id: 1047,
    name: "独立女性",
    description: "心态+1，颜值+1，智商+1",
    grade: 2,
    exclusive: [
      1003,
      1054,
      2024,
    ],
    effect: {
      INT: 1,
      SPR: 1,
      CHR: 1,
    }
  }, {
    id: 2024,
    name: "女装大佬",
    description: "颜值+2，快乐+4，可能被男生追求",
    grade: 3,
    exclusive: [
      1004,  // 女孩子不能是女装大佬
      1047  // 独立女性不能是女装大佬
    ],
    effect: {
        SPR: 4,
        CHR: 2
    }
  }, {
    // 不懂得怜香惜玉
    id: 1054,
    name: "直男",
    description: "在感情方面并不开窍的男生",
    grade: 1,
    exclusive: [
      1004,
    ],
  }, {
    id: 1005,
    name: "追求完美",
    description: "发现曲子有问题的几率增加",
    grade: 0
  }, {
    id: 1006,
    name: "维新派",
    description: "心态+1, 倾向于使用新技术",
    grade: 1,
    exclusive: [
      1025,
    ],
    effect: {
      SPR: 1
    }
  }, {
    // 你不会参与吵架
    id: 1007,
    name: "乖孩子",
    description: "不喜欢惹麻烦",
    grade: 0,
  }, {
    id: 1008,
    name: "大器晚成",
    description: "35岁才入坑，心态+1",
    grade: 0,
    effect: {
      SPR: 1
    }
  }, {
    id: 1009,
    name: "好的家庭",
    description: "你家还不错，心态+2",
    grade: 1,
    effect: {
      SPR: 2
    }
  }, {
    id: 1010,
    name: "富二代",
    description: "你是富二代，不差钱，财富+2，心态+2",
    grade: 2,
    exclusive: [
      1011,
    ],
    effect: {
      SPR: 2,
      MNY: 2,
    }
  }, {
    id: 1011,
    name: "不好的家庭",
    description: "你家情况不好，心态-2，财富-2",
    exclusive: [
      1010,
    ],
    grade: 0,
    effect: {
      SPR: -2,
      MNY: -2
    }
  }, {
    id: 1012,
    name: "纯血blacker",
    description: "你不买音源和合成器",
    exclusive: [
      1050,
    ],
    grade: 0
  }, {
    id: 1013,
    name: "再来一单",
    description: "你喜欢接单和约稿",
    grade: 1,
    exclusive: [
      1015
    ]
  }, {
    id: 1014,
    name: "接单达人",
    description: "接单赚钱的几率增加",
    grade: 1,
  }, {
    id: 1015,
    name: "不约谢谢",
    description: "你不喜欢接单和约稿",
    grade: 1,
    exclusive: [
      1013
    ]
  }, {
    id: 1016,
    name: "普通话不好",
    description: "说方言",
    grade: 0
  }, {
    id: 1017,
    name: "头发茂密",
    description: "你不会秃头",
    grade: 2
  }, {
    id: 1018,
    name: "天生我才",
    description: "所有属性+1",
    grade: 2,
    effect: {
        SPR: 1,
        MNY: 1,
        CHR: 1,
        STR: 1,
        INT: 1
    }
  }, {
    id: 1019,
    name: "金手指",
    description: "初始可用属性点+2",
    grade: 1,
    status: 2
  }, {
    id: 1020,
    name: "书香门第",
    description: "智力+2",
    grade: 1,
    effect: {
        INT: 2
    }
  }, {
    id: 1021,
    name: "红颜薄命",
    description: "颜值+2，健康-2",
    grade: 0,
    effect: {
        CHR: 2,
        STR: -2
    }
  }, {
    id: 1022,
    name: "能吃能睡",
    description: "心态+1，容易肥胖",
    effect: {
      SPR: 1,
    },
    exclusive: [
      1122,
    ],
    grade: 0
  }, {
    id: 1122,
    name: "坚持锻炼",
    description: "健康+1，你不会过于肥胖",
    effect: {
      STR: 1,
    },
    exclusive: [
      1022,
    ],
    grade: 0
  }, {
    id: 1023,
    name: "诸神眷顾",
    description: "所有属性+2",
    grade: 3,
    effect: {
        SPR: 2,
        MNY: 2,
        CHR: 2,
        STR: 2,
        INT: 2
    }
  }, {
    id: 1025,
    name: "保守派",
    description: "倾向于使用老旧技术",
    grade: 0,
    exclusive: [
      1006
    ]
  }, {
    id: 1026,
    name: "树洞",
    description: "你可能会成为听大家倒苦水的树洞",
    grade: 0
  }, {
    id: 1027,
    name: "开挂",
    description: "初始可用属性点+4",
    grade: 2,
    status: 4,
  }, {
    id: 1028,
    name: "桃花连连",
    description: "恋爱机会提升",
    grade: 2
  }, {
    id: 1029,
    name: "背锅侠",
    description: "被甩锅可能性增大",
    exclusive: [
      1030,
    ],
    grade: 0
  }, {
    id: 1030,
    name: "老好人",
    description: "不容易被甩锅，但容易被发好人卡",
    exclusive: [
      1029,
    ],
    grade: 0
  }, {
      id: 1031,
      name: "天生残疾",
      description: "健康-2",
      grade: 0,
      effect: {
          STR: -2
      }
  }, {
    id: 1032,
    name: "学渣",
    description: "所有属性-1",
    grade: 0,
    effect: {
        SPR: -1,
        MNY: -1,
        CHR: -1,
        STR: -1,
        INT: -1
    }
  }, {
    id: 1033,
    name: "你完全不运动是吗",
    description: "体质-10",
    grade: 0,
    effect: {
        STR: -10
    }
  }, {
    id: 1034,
    name: "家运不顺",
    description: "财富-2",
    grade: 0,
    effect: {
        MNY: -2
    }
  }, {
    id: 1035,
    name: "大智若愚",
    description: "智商-1，初始可用属性点+3",
    grade: 1,
    effect: {
        INT: -1
    },
    status: 3
  }, {
    id: 1036,
    name: "砖家",
    description: "智力-1",
    grade: 0,
    effect: {
        INT: -1
    }
  }, {
    id: 1037,
    name: "八面玲珑",
    description: "和大家容易处好关系",
    grade: 0
  }, {
    id: 1038,
    name: "逐梦电音",
    description: "可能会选择去写电音",
    grade: 0
  }, {
    id: 1039,
    name: "永远的神",
    description: "音乐小天才",
    grade: 1
  }, {
    id: 1040,
    name: "洒脱",
    description: "心态+1",
    grade: 1,
    effect: {
      SPR: 1
    }
  }, {
    id: 1041,
    name: "掉毛体质",
    description: "容易掉头发",
    grade: 0
  }, {
    id: 1042,
    name: "歪果仁",
    description: "中文不是很好",
    grade: 0
  }, {
    id: 1043,
    name: "老司机",
    description: "一言不合就开车",
    grade: 0
  }, {
    id: 1044,
    name: "铁颈椎",
    description: "你不会得颈椎病",
    grade: 1
  }, {
    id: 1045,
    name: "大红人",
    description: "你很受欢迎",
    grade: 1
  }, {
    id: 1046,
    name: "乐神附体",
    description: "你的曲子很少出问题",
    grade: 1
  }, {
    id: 1048,
    name: "异世界",
    description: "可能会穿越到异世界",
    grade: 3
  }, {
    id: 1049,
    name: "you jump I jump",
    description: "每年都要换一个协会/社团/企划",
    grade: 1
  }, {
    id: 1050,
    name: "即使吃土也要写曲",
    description: "拼尽全力买音源和合成器",
    exclusive: [
      1012
    ],
    grade: 0,
  }, {
    id: 1051,
    name: "傻人傻福",
    description: "智力-2，财富+2",
    grade: 0,
    effect: {
        INT: -2,
        MNY: 2
    }
  }, {
    id: 1052,
    name: "佛系青年",
    description: "心态+2",
    grade: 1,
    effect: {
        SPR: 2
    }
  }, {
    id: 1053,
    name: "面霸",
    description: "更容易被大企划看中",
    grade: 2
  }, {
    id: 1055,
    name: "聪明绝顶",
    description: "智商高地，发量堪忧",
    grade: 0,
    effect: {
      INT: 1,
      CHR: -1,
    }
  }, {
    id: 1056,
    name: "搓曲狂魔",
    description: "你愿意连续好几天加班加点写曲",
    grade: 1,
  }, {
    id: 1057,
    name: "火葬场常驻员工",
    description: "写的曲子容易出问题",
    grade: 0,
  }, {
    id: 1058,
    name: "没钱又如何",
    description: "即使财富低也能保持好心态",
    grade: 0,
  }, {
    id: 1059,
    name: "自知之明",
    description: "你不会参加大企划和游戏企划",
    grade: 1,
  }, {
    id: 1060,
    name: "天选之人",
    description: "你的运气比他人好",
    grade: 2,
    effect: {
      LCK: 2
    }
  }, {
    id: 1061,
    name: '心如止水',
    description: '你被批评不会影响心态',
    grade: 1,
  }, {
    id: 1062,
    name: '三年磨练',
    condition: "AGE?[36]",
    description: '3年后智力、心态+1',
    effect: {
      INT: 1,
      SPR: 1,
    },
    grade: 1,
  }, {
    id: 1063,
    name: '耳听八方',
    description: '能够打听到一些奇奇怪怪的消息。',
    grade: 2,
  },
  {
    id: 1064,
    name: '好学青年',
    description: '即使参加了大企划，也能持续学习。',
    grade: 1,
  },
  {
    id: 1065,
    name: '学富五车',
    description: '智力+3',
    grade: 2,
  },
  {
    id: 1066,
    name: '圈内老人',
    description: '在一个社团/协会/企划超过5年，智力、心态+1',
    effect: {
      INT: 1,
      SPR: 1,
    },
    grade: 1,
  },
  {
    id: 1067,
    name: '悟道',
    grade: 1,
    description: '智力>10时心态+3',
    condition: 'INT>10',
    effect: {
      SPR: 3,
    }
  },
  {
    id: 1068,
    name: '驻颜',
    grade: 1,
    description: '健康>10时颜值+3',
    condition: 'STR>10',
    effect: {
      CHR: 3,
    }
  },
  {
    id: 1069,
    name: '洛神',
    grade: 1,
    description: '颜值>10时健康+3',
    condition: 'CHR>10',
    effect: {
      STR: 3,
    }
  },
  {
    id: 1070,
    name: '智可生财',
    grade: 1,
    description: '智力>10时财富+3',
    condition: 'INT>10',
    effect: {
      MNY: 3,
    }
  },
  {
    id: 1071,
    name: '进修',
    grade: 1,
    description: '财富>10时智力+3',
    condition: 'MNY>10',
    effect: {
      INT: 3,
    }
  },
  {
    id: 1072,
    name: '相由心生',
    grade: 1,
    description: '智力>10时颜值+3',
    condition: 'INT>10',
    effect: {
      CHR: 3,
    }
  },
  {
    id: 1073,
    name: '整容',
    grade: 1,
    description: '财富>10时颜值+3',
    condition: 'MNY>10',
    effect: {
      CHR: 3,
    }
  },
  {
    id: 1074,
    name: '钻石健身卡',
    grade: 1,
    description: '财富>10时健康+3',
    condition: 'MNY>10',
    effect: {
      STR: 3,
    }
  },
  {
    id: 1075,
    name: '献祭',
    grade: 0,
    description: '初始属性-2，幸运+3',
    effect: {
      BLCK: 3,
    },
    status: -2,
  },
  {
    id: 1076,
    name: '起死回生',
    grade: 2,
    description: '健康<-3时，健康转变为0',
    condition: 'STR<-3',
    effect: {
      STR: '0!',
    },
  },
  {
    id: 1077,
    name: '矢志不渝',
    description: '你不会出轨',
    grade: 0,
  },
  {
    id: 1078,
    name: '生财有道',
    description: '心态>10时财富+3',
    grade: 1,
    condition: 'SPR>10',
    effect: {
      MNY: 3,
    }
  },
  {
    id: 1079,
    name: '柳暗花明',
    description: '心态<-4时，心态转变为1',
    grade: 3,
    condition: 'SPR<-4',
    effect: {
      SPR: '1!',
    }
  },
  {
    id: 1080,
    name: '满血复活',
    description: '你有两条命',
    grade: 3,
    effect: {
      LIF: 2,
    }
  },
  {
    id: 1081,
    name: '作曲AI',
    description: '你是一个智能作曲机器人',
    grade: 3,
    // effect: {
    //   LIF: 2,
    // }
  },
];

export const talents = map(talentList);