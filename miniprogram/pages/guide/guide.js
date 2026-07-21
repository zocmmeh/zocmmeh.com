Page({data:{steps1:[
{idx:1,title:'挂号',desc:'持身份证/医保卡到一楼收费处或微信公众号挂号'},
{idx:2,title:'候诊',desc:'在对应科室候诊区就座，留意叫号屏幕'},
{idx:3,title:'就诊',desc:'医生问诊、检查、开具处方或检查单'},
{idx:4,title:'缴费',desc:'一楼收费处或微信公众号在线缴费'},
{idx:5,title:'取药/治疗',desc:'药房取药或前往治疗室'},
{idx:6,title:'离院',desc:'遵医嘱按时复诊或用药'}],
steps2:[
{idx:1,title:'急诊挂号',desc:'直接到急诊科分诊台挂号，无需预约'},
{idx:2,title:'分诊评估',desc:'护士初步评估，危重患者优先处理'},
{idx:3,title:'抢救/治疗',desc:'医生紧急处置，必要时启动绿色通道'},
{idx:4,title:'留观/住院',desc:'根据病情决定留观或收入病房'}],
floorGroups:[
{label:'门诊服务区 (1F-3F)',items:[
{num:'1F',title:'入口枢纽',desc:'咨询台/挂号收费/药学部',cls:''},
{num:'2F',title:'综合门诊',desc:'5诊室+内镜+带教+大治疗',cls:''},
{num:'3F',title:'特需专科门诊',desc:'5诊室+VIP+大治疗',cls:''}]},
{label:'检查治疗区 (4F-6F)',items:[
{num:'4F',title:'眼前段视光',desc:'弱视治疗/验光配镜/眼前段检查',cls:'gn'},
{num:'5F',title:'眼后段激光',desc:'干眼治疗/眼后段检查/激光室',cls:'gn'},
{num:'6F',title:'医技支持',desc:'DR室/检验科/医护办公区',cls:'gn'}]},
{label:'后勤保障',items:[{num:'7F',title:'后勤保障',desc:'消毒供应中心',cls:'gy'}]},
{label:'手术中心 (8F-11F)',items:[
{num:'8F ★',title:'激光近视中心',desc:'全飞秒/半飞秒/准分子激光',cls:'or star'},
{num:'9F',title:'外伤眼底感染手术',desc:'手术室×3(含1间负压手术室)',cls:'or'},
{num:'10F',title:'内眼手术',desc:'手术室×3(内眼手术专用)',cls:'or'},
{num:'11F',title:'外眼手术',desc:'手术室×3(外眼手术专用)',cls:'or'}]},
{label:'住院病区 (12F-15F)',items:[
{num:'12F',title:'标准综合病区A',desc:'住院16张+日间12张',cls:'yl'},
{num:'13F',title:'标准综合病区B',desc:'住院16张+日间12张',cls:'yl'},
{num:'14F',title:'日间病区',desc:'日间11张(短期治疗专用)',cls:'yl'},
{num:'15F',title:'高端综合病区',desc:'住院13张+VIP套间×1',cls:'yl vip'}]}]},
onShareAppMessage(){return{title:'中山大学中山眼科中心茂名医院-就医指南'}}
})