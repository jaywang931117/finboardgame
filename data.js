export const METRICS = ['revenue','labor','material','energy','import_tax','export_cost','interest','fixed','tax','investment'];
export const METRIC_LABELS = {revenue:'營業收入',labor:'人力成本',material:'原物料／商品',energy:'能源／運輸',import_tax:'進口關稅',export_cost:'出口貿易',interest:'利息收支',fixed:'固定營運',tax:'稅金',investment:'投資損益',asset_value:'投資資產價值'};
export const ROLES = [
  ['auto','汽車製造商','製造業',[1000,-200,-250,-100,0,-80,-20,-100,-50,0],150,'🚘'],
  ['electronics','電子製造商','製造業',[1200,-250,-300,-100,-60,-70,-30,-120,-70,30],140,'💻'],
  ['retail','百貨零售商','消費業',[900,-180,-400,-40,-60,0,-20,-120,-30,0],150,'🛍️'],
  ['bank','銀行','金融業',[250,-140,0,-10,0,0,450,-100,-70,40],70,'🏦'],
  ['investment','投資公司','金融業',[180,-100,0,-5,0,0,-30,-45,-60,500],30,'📈'],
  ['energy','能源公司','能源與運輸',[1100,-130,-350,-120,-20,-40,-70,-140,-70,0],85,'⚡'],
  ['logistics','物流運輸公司','能源與運輸',[850,-220,-30,-250,-10,-20,-30,-100,-25,0],110,'🚚'],
  ['property','房地產公司','民生業',[800,-80,-60,-40,0,0,-150,-170,-50,80],55,'🏙️'],
  ['agriculture','農業食品公司','民生業',[800,-180,-260,-120,-20,-20,-20,-90,-25,0],100,'🌾'],
  ['technology','科技服務公司','科技業',[900,-350,0,-40,0,-10,-20,-120,-65,20],60,'🧪']
].map(([id,name,sector,values,headcount,icon])=>({id,name,sector,base:Object.fromEntries(METRICS.map((m,i)=>[m,values[i]])),baseHeadcount:headcount,icon}));

const ALL='all';
const fx=(metric,pct,target=ALL)=>({metric,pct,target});
export const GLOBAL_EVENTS = [
  {id:'E01',name:'海灣戰爭爆發',duration:5,decay:[1,.75,.5,.25,.125],effects:[fx('material',20),fx('energy',40),fx('export_cost',15),fx('revenue',25,'energy')]},
  {id:'E02',name:'全球金融海嘯',duration:6,decay:[1,.8,.6,.4,.2,.1],effects:[fx('revenue',-25),fx('asset_value',-35),fx('interest',15,'interest_negative'),fx('interest',-10,'bank')]},
  {id:'E03',name:'全球供應鏈中斷',duration:4,decay:[1,.7,.4,.1],effects:[fx('material',25),fx('energy',20),fx('revenue',-15,'electronics'),fx('revenue',-10,'agriculture')]},
  {id:'E04',name:'全球貿易戰',duration:6,decay:[1,.8,.6,.4,.2,.1],effects:[fx('import_tax',50),fx('export_cost',40),fx('material',15),fx('revenue',-10,'auto,electronics')]},
  {id:'E05',name:'AI 技術革命',duration:6,decay:[1,.8,.6,.4,.2,.1],effects:[fx('revenue',40,'technology'),fx('revenue',25,'electronics'),fx('labor',20,'technology'),fx('labor',-10,'except_technology')]},
  {id:'E06',name:'全球能源危機',duration:4,decay:[1,.7,.4,.1],effects:[fx('energy',60),fx('material',10),fx('revenue',40,'energy'),fx('revenue',-10,'logistics')]},
  {id:'E07',name:'全球疫情爆發',duration:6,decay:[1,.8,.6,.4,.2,.1],effects:[fx('revenue',-35,'retail'),fx('revenue',20,'logistics'),fx('revenue',25,'technology'),fx('labor',10),fx('energy',15)]},
  {id:'E08',name:'政府擴大基礎建設',duration:5,decay:[1,.75,.5,.25,.125],effects:[fx('revenue',25,'property'),fx('revenue',15,'auto,electronics'),fx('material',20),fx('revenue',20,'logistics')]},
  {id:'E09',name:'全球消費熱潮',duration:3,decay:[1,.5,.25],effects:[fx('revenue',35,'retail'),fx('revenue',25,'auto'),fx('revenue',20,'electronics'),fx('material',15),fx('revenue',15,'logistics')]},
  {id:'E10',name:'全球經濟衰退',duration:6,decay:[1,.8,.6,.4,.2,.1],effects:[fx('revenue',-20),fx('material',-20),fx('energy',-15),fx('asset_value',-20)]}
];
export const PERSONAL_EVENTS = [
  {id:'P01',name:'關鍵客戶續約',duration:3,decay:[1,.65,.3],effects:[fx('revenue',25)]},
  {id:'P02',name:'設備故障維修',duration:2,decay:[1,.5],effects:[fx('fixed',35),fx('energy',15)]},
  {id:'P03',name:'管理效率提升',duration:3,decay:[1,.6,.3],effects:[fx('fixed',-25),fx('labor',-10)]},
  {id:'P04',name:'稅務補繳',duration:2,decay:[1,.5],effects:[fx('tax',40)]},
  {id:'P05',name:'市場行銷奏效',duration:3,decay:[1,.7,.4],effects:[fx('revenue',20),fx('fixed',10)]},
  {id:'P06',name:'投資判斷失準',duration:3,decay:[1,.6,.2],effects:[fx('investment',-30),fx('asset_value',-15)]}
];
export const SECTOR_EVENTS = [
  {id:'S01',name:'製造業接單潮',sector:'製造業',duration:3,decay:[1,.65,.3],effects:[fx('revenue',20),fx('material',10)]},
  {id:'S02',name:'消費市場轉弱',sector:'消費業',duration:3,decay:[1,.6,.3],effects:[fx('revenue',-22)]},
  {id:'S03',name:'金融信用擴張',sector:'金融業',duration:3,decay:[1,.65,.3],effects:[fx('interest',20),fx('asset_value',12)]},
  {id:'S04',name:'運輸燃料補貼',sector:'能源與運輸',duration:3,decay:[1,.6,.3],effects:[fx('energy',-25)]},
  {id:'S05',name:'民生供應吃緊',sector:'民生業',duration:3,decay:[1,.6,.3],effects:[fx('material',30),fx('revenue',10)]},
  {id:'S06',name:'科技採購熱潮',sector:'科技業',duration:3,decay:[1,.65,.3],effects:[fx('revenue',30),fx('labor',15)]}
];
export const EVENT_CATEGORIES=['政策與法規','科技與資安','氣候與能源','供應鏈與貿易','市場與消費','企業與人才'];
// Themes describe the subject; global/personal/sector still determine who is affected.
const originalThemes={E01:2,E02:4,E03:3,E04:3,E05:1,E06:2,E07:4,E08:0,E09:4,E10:4,P01:4,P02:5,P03:5,P04:0,P05:4,P06:4,S01:3,S02:4,S03:4,S04:0,S05:3,S06:1};
for(const e of [...GLOBAL_EVENTS,...PERSONAL_EVENTS,...SECTOR_EVENTS])e.category=EVENT_CATEGORIES[originalThemes[e.id]];
const themed=(id,name,category,effects,sector)=>({id,name,category:EVENT_CATEGORIES[category],duration:3,decay:[1,.6,.3],effects,...(sector?{sector}:{})});
GLOBAL_EVENTS.push(
  themed('E11','綠能投資抵稅',0,[fx('tax',-20),fx('revenue',15,'energy,technology')]),
  themed('E12','跨國資料保護新規',0,[fx('fixed',15),fx('revenue',-10,'technology')]),
  themed('E13','全球資安攻擊潮',1,[fx('fixed',15),fx('revenue',-12),fx('revenue',25,'technology')]),
  themed('E14','自動化設備普及',1,[fx('labor',-12),fx('fixed',10)]),
  themed('E15','極端高溫與限電',2,[fx('energy',25),fx('revenue',-18,'agriculture'),fx('revenue',-10,'auto,electronics')]),
  themed('E16','再生能源供應增加',2,[fx('energy',-20),fx('revenue',-10,'energy')]),
  themed('E17','主要港口恢復通航',3,[fx('export_cost',-20),fx('material',-10),fx('revenue',10,'logistics')]),
  themed('E18','區域自由貿易協定',3,[fx('import_tax',-25),fx('export_cost',-15),fx('revenue',10,'auto,electronics')]),
  themed('E19','旅遊與實體消費復甦',4,[fx('revenue',20,'retail,logistics'),fx('energy',10)]),
  themed('E20','家庭預防性儲蓄增加',4,[fx('revenue',-15,'retail,auto,property'),fx('interest',8,'bank')]),
  themed('E21','專業人才短缺',5,[fx('labor',18),fx('revenue',-8,'electronics,technology')]),
  themed('E22','職能培訓補助',5,[fx('labor',-10),fx('revenue',8)])
);
PERSONAL_EVENTS.push(
  themed('P07','研發成果取得專利',1,[fx('revenue',18),fx('fixed',8)]),
  themed('P08','公司資料外洩',1,[fx('fixed',25),fx('revenue',-15)]),
  themed('P09','節能設備完成升級',2,[fx('energy',-20),fx('fixed',8)]),
  themed('P10','倉庫遭遇暴雨',2,[fx('fixed',25),fx('revenue',-12)]),
  themed('P11','替代供應商簽約',3,[fx('material',-15),fx('export_cost',-10)]),
  themed('P12','主要供應商延遲交貨',3,[fx('material',18),fx('revenue',-12)]),
  themed('P13','品牌口碑帶動回購',4,[fx('revenue',22)]),
  themed('P14','核心團隊離職',5,[fx('revenue',-18),fx('fixed',12)]),
  themed('P15','團隊流程改善',5,[fx('labor',-12),fx('revenue',8)]),
  themed('P16','取得政府創新補助',0,[fx('tax',-20),fx('fixed',-12)]),
  themed('P17','產品法規檢驗延誤',0,[fx('fixed',18),fx('revenue',-10)]),
  themed('P18','新品上市反應冷淡',4,[fx('revenue',-18),fx('fixed',10)])
);
SECTOR_EVENTS.push(
  themed('S07','製造業智慧工廠升級',1,[fx('labor',-15),fx('revenue',12)],'製造業'),
  themed('S08','製造業出口認證加嚴',0,[fx('export_cost',20),fx('revenue',-12)],'製造業'),
  themed('S09','零售購物節熱潮',4,[fx('revenue',25),fx('labor',10)],'消費業'),
  themed('S10','零售資安事件',1,[fx('fixed',20),fx('revenue',-15)],'消費業'),
  themed('S11','金融監理成本增加',0,[fx('fixed',20),fx('revenue',-8)],'金融業'),
  themed('S12','金融數位服務普及',1,[fx('fixed',-15),fx('revenue',15)],'金融業'),
  themed('S13','燃料運輸中斷',3,[fx('energy',30),fx('revenue',-10)],'能源與運輸'),
  themed('S14','低碳物流需求成長',2,[fx('revenue',18),fx('fixed',10)],'能源與運輸'),
  themed('S15','民生設施修復補助',0,[fx('fixed',-20),fx('revenue',12)],'民生業'),
  themed('S16','旱災衝擊民生供應',2,[fx('material',25),fx('revenue',-15)],'民生業'),
  themed('S17','科技人才競薪潮',5,[fx('labor',25),fx('revenue',8)],'科技業'),
  themed('S18','雲端服務訂單擴大',4,[fx('revenue',22),fx('fixed',8)],'科技業')
);
export const ALL_EVENTS=[...GLOBAL_EVENTS,...PERSONAL_EVENTS,...SECTOR_EVENTS];
export const FED_RULES=[
  {id:'F01',name:'惡性通膨',fields:['inflationPct'],formula:'π(t) ≥ 8%'},
  {id:'F02',name:'持續性通膨',fields:['inflationPct','previousInflationPct'],formula:'π(t) ≥ 4% 且 π(t−1) ≥ 4%'},
  {id:'F03',name:'停滯性通膨',fields:['inflationPct','growthPct'],formula:'π(t) ≥ 6% 且 g(t) ≤ −5%'},
  {id:'F04',name:'經濟嚴重衰退',fields:['growthPct','previousGrowthPct'],formula:'g(t) ≤ −10% 且 g(t−1) ≤ −10%'},
  {id:'F05',name:'失業率過高',fields:['unemploymentPct','previousUnemploymentPct'],formula:'u(t) ≥ 10% 且 u(t−1) ≥ 10%'},
  {id:'F06',name:'通貨緊縮',fields:['inflationPct','previousInflationPct'],formula:'π(t) ≤ −2% 且 π(t−1) ≤ −2%'},
  {id:'F07',name:'金融市場崩盤',fields:['stockReturn1Pct','growthPct'],formula:'股市單季 ≤ −25%；景氣 < 0% 才啟動 QE'},
  {id:'F08',name:'銀行流動性危機',fields:['liquidityPct','liquidAssets','shortTermLiabilities'],formula:'流動性 < 10%'},
  {id:'F09',name:'銀行系統性壞帳',fields:['nplPct','nonperformingLoans','totalLoans'],formula:'壞帳率 ≥ 8%'},
  {id:'F10',name:'資產泡沫過熱',fields:['stockReturn3Pct','loanGrowth3Pct','fedRatePct'],formula:'股市三季 ≥ 30% 且放款三季 ≥ 20%'}
];
export const FED_PRIORITY=['F08','F09','F07','F03','F01','F06','F04','F02','F05','F10'];
export const BOARD = Array.from({length:24},(_,i)=> i===0?{type:'start',label:'出發'}:{type:['global','personal','sector'][(i-1)%3],label:{global:'全球事件',personal:'個人事件',sector:'產業事件'}[['global','personal','sector'][(i-1)%3]]});
