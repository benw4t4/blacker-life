import {map} from '../functions/util.js';

const achievementList = [
  {
    id: 101,
    name: "既视感",
    description: "重开10次",
    grade: 0,
    condition: "TMS>9",
    hide: 0,
    opportunity: "END"
  },
  {
    id: 102,
    name: '我全都要',
    description: '出轨',
    grade: 1,
    condition: 'EVT?[131102]',
    hide: 0,
    opportunity: 'TRAJECTORY',
  },
  {
    id: 103,
    name: '出柜',
    description: '女装大佬出柜',
    grade: 0,
    condition: 'EVT?[150024]',
    hide: 0,
    opportunity: 'TRAJECTORY',
  },
  {
    id: 104,
    name: '跨性别',
    description: '女装大佬的不归路',
    grade: 2,
    condition: 'EVT?[150023]',
    hide: 1,
    opportunity: 'TRAJECTORY',
  },
  {
    id: 105,
    name: "契而不舍",
    description: "重开50次",
    grade: 1,
    condition: "TMS>49",
    hide: 0,
    opportunity: "END"
  },
  {
    id: 106,
    name: '钢铁之心',
    description: '拒绝恋爱...',
    grade: 1,
    condition: '(EVT?[131101])&(TLT?[1054])',
    hide: 0,
    opportunity: 'TRAJECTORY',
  },
  {
    id: 107,
    name: "blacker之魂",
    description: "重开200次",
    grade: 2,
    condition: "TMS>199",
    hide: 0,
    opportunity: "END"
  },
  {
    id: 108,
    name: "注定的blacker",
    description: "重开500次",
    grade: 3,
    condition: "TMS>499",
    hide: 0,
    opportunity: "END"
  },
  {
    id: 115,
    name: "嫁给他",
    description: "性别而已，不要卡那么死~",
    grade: 2,
    condition: "EVT?[900007]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 116,
    name: "颜如玉",
    description: "颜值>10",
    grade: 0,
    condition: "CHR>10",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 117,
    name: "天生我才",
    description: "智商>10",
    grade: 0,
    condition: "INT>10",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 118,
    name: "四肢发达",
    description: "健康>10",
    grade: 0,
    condition: "STR>10",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 119,
    name: "看破红尘",
    description: "心态>10",
    grade: 0,
    condition: "SPR>10",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 120,
    name: "福星高照",
    description: "幸运>3",
    grade: 1,
    condition: "BLCK>3",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 121,
    name: "天道之子",
    description: "幸运>4",
    grade: 2,
    condition: "BLCK>4",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 122,
    name: "位面之子",
    description: "幸运>5",
    grade: 3,
    condition: "BLCK>5",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 123,
    name: "异世界",
    description: "原来异世界是真的？！",
    grade: 0,
    condition: "EVT?[1110000]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 124,
    name: "穿越咸鱼",
    description: "拒绝恋爱脑剧情！",
    grade: 1,
    condition: "EVT?[1110001]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 125,
    name: "黑魔法师",
    description: "以一敌二",
    grade: 3,
    condition: "EVT?[1111008,1111009]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 126,
    name: "一棍之仇",
    description: "打败公子哥",
    grade: 3,
    condition: "EVT?[1111011,1111012]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 127,
    name: "岂可修",
    description: "没能打败公子哥",
    grade: 3,
    condition: "EVT?[1111010]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 128,
    name: "走火入魔",
    description: "你因为不能加班加点搓曲子而不开心。",
    grade: 2,
    condition: "EVT?[850053]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 129,
    name: "不要吵架",
    description: "吵架是不好的！",
    grade: 1,
    condition: "EVT?[130000]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 130,
    name: "脑门闪亮",
    description: "秃头也挡不住你的颜值。",
    grade: 0,
    condition: "EVT?[500002]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 131,
    name: "为了颜值",
    description: "你用雌激素治疗脱发。",
    grade: 1,
    condition: "EVT?[510003]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 132,
    name: "美丽的代价",
    description: "用雌激素结果变性。",
    grade: 2,
    condition: "EVT?[510004]",
    hide: 1,
    opportunity: "TRAJECTORY"
  },
  {
    id: 133,
    name: "喜+1",
    description: "购买音源和合成器。",
    grade: 1,
    condition: "(EVT?[400005,400105])",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 134,
    name: "人生赢家",
    description: "家庭事业双丰收",
    grade: 2,
    condition: "(EVT?[400005,400105])&(EVT?[220003,220004])&(MNY>5)",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 135,
    name: "如果我是DJ",
    description: "退坑后去写电音",
    grade: 1,
    condition: "EVT?[999115]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 136,
    name: "自恋狂",
    description: "喜欢照镜子",
    grade: 1,
    condition: "EVT?[880005,870011]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 137,
    name: "润之",
    description: "不到一年就退圈了。",
    grade: 0,
    condition: "AGE<13",
    hide: 0,
    opportunity: "SUMMARY"
  },
  {
    id: 138,
    name: "光荣淡圈",
    description: "你在圈内待了50年。",
    grade: 3,
    condition: "AGE>599",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 139,
    name: "十年一梦",
    description: "坚持了十年，最终退圈。",
    grade: 0,
    condition: "EVT?[999001,999002,999003]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 140,
    name: "廿年终悔",
    description: "坚持了二十年，最终退圈。",
    grade: 1,
    condition: "EVT?[999004,999005,999006]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 141,
    name: "卅年人生",
    description: "坚持了三十年，最终退圈。",
    grade: 2,
    condition: "EVT?[999007,999008,999009]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 142,
    name: "钱包满满",
    description: "你财务自由，退圈了。",
    grade: 1,
    condition: "EVT?[999010]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 143,
    name: "兔子",
    description: "换地方达到5次。",
    grade: 1,
    condition: "JUMP>4",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 144,
    name: "白白胖胖",
    description: "你最可爱。",
    grade: 1,
    condition: "(EVT?[850070])&(EVT?[850071])&(EVT?[850072,850073])",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 145,
    name: '音乐家',
    description: '你成为音乐家。',
    grade: 1,
    condition: 'EVT?[999100,900009]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 146,
    name: '悲惨人生',
    description: '你在工作中死了。',
    grade: 1,
    condition: 'EVT?[900008,999999,800000,900001,900011,400016]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 147,
    name: '接单达人',
    description: '你通过接单写曲赚了大钱。',
    grade: 3,
    condition: '(EVT?[420006])&(EVT?[420008])',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 148,
    name: '大冤种',
    description: '你总在约稿接单上吃亏。',
    grade: 2,
    condition: '(EVT?[400014])&(EVT?[420000,420001,420004,420009])',
    hide: 0,
    opportunity: "TRAJECTORY"
  }, 
  {
    id: 149,
    name: '笑到最后',
    description: '你自己办了企划。',
    grade: 2,
    condition: 'EVT?[900003]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 150,
    name: '活得潇洒',
    description: '有钱有闲，潇洒人生。',
    grade: 1,
    condition: 'EVT?[900002]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 151,
    name: '友尽',
    description: '亲友不过如此',
    grade: 1,
    condition: 'EVT?[800001]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 152,
    name: '去搬砖',
    description: '不说了，搬砖去了。',
    grade: 0,
    condition: 'EVT?[900000,700004]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 153,
    name: '为人师表',
    description: '当上音乐老师。',
    grade: 1,
    condition: 'EVT?[999101,900010]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 154,
    name: '网红曲师',
    description: '当上网络音乐人。',
    grade: 0,
    condition: 'EVT?[999102]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 155,
    name: '哲学家',
    description: '当上哲学家。',
    grade: 1,
    condition: 'EVT?[999103]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 156,
    name: '大红人',
    description: '当上网红或明星。',
    grade: 1,
    condition: 'EVT?[999104,900004,900005,900012]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 157,
    name: '第二春',
    description: '退圈后去旅游或当会长。',
    grade: 1,
    condition: 'EVT?[999105,999106]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 158,
    name: '家有贤妻',
    description: '退圈后顾家。',
    grade: 1,
    condition: 'EVT?[900006]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 159,
    name: '值得吗？',
    description: '当女装大佬遇上霸道总裁。',
    grade: 2,
    condition: 'EVT?[900014]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 160,
    name: '爱上你',
    description: '霸道总裁爱上你。',
    grade: 2,
    condition: 'EVT?[900013]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 161,
    name: '负债累累',
    description: '欠下了巨额债务。',
    grade: 0,
    condition: 'EVT?[900015,900016]',
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 162,
    name: "小金人",
    description: "在一个组织待满十年。",
    grade: 3,
    condition: "WRK>119",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 163,
    name: "五年一日",
    description: "在一个组织待满五年。",
    grade: 2,
    condition: "WRK>59",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 164,
    name: "三年坚持",
    description: "在一个组织待满三年。",
    grade: 1,
    condition: "WRK>35",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 165,
    name: "火葬场员工",
    description: "干烂一个组织。",
    grade: 1,
    condition: "EVT?[850059]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 166,
    name: "火葬场之子",
    description: "干烂两个组织。",
    grade: 2,
    condition: "EVT?[850062]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 167,
    name: "火葬场之主",
    description: "干烂三个组织。",
    grade: 3,
    condition: "EVT?[850065]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 168,
    name: "学业为重",
    description: "leader为了学业解散了组织。",
    grade: 0,
    condition: "EVT?[850066]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 169,
    name: "涅槃",
    description: "你重生了。",
    grade: 1,
    condition: "EVT?[999888]",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
  {
    id: 170,
    name: "人机",
    description: "你上辈子是机器人。",
    grade: 3,
    condition: "(EVT?[888726])&(EVT?[999888])",
    hide: 0,
    opportunity: "TRAJECTORY"
  },
];

export const achievements = map(achievementList);