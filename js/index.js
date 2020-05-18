/**
 * Created by Administrator on 2020/5/15 0015.
 */
var ipStr = 'http://192.168.0.34:8081';
var ipStrs = 'http://122.112.170.1:8081';
/*
 ** randomWord 产生任意长度随机字母数字组合
 ** randomFlag-是否任意长度 min-任意长度最小位[固定位数] max-任意长度最大位
 ** xuanfeng 2014-08-28
 */
function randomWord(randomFlag, min, max) {
  var str = "",
      range = min,
      arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  // 随机产生
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min;
  }
  for (var i = 0; i < range; i++) {
    pos = Math.round(Math.random() * (arr.length - 1));
    str += arr[pos];
  }
  return str;
}
var t = null;
t = setTimeout(time, 1000);
function time() {
  clearTimeout(t);
  var nowDate = new Date();
  var year = nowDate.getFullYear();
  var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) : nowDate.getMonth() + 1;
  var date = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate.getDate();
  var hour = nowDate.getHours()< 10 ? "0" + nowDate.getHours() : nowDate.getHours();
  var minute = nowDate.getMinutes()< 10 ? "0" + nowDate.getMinutes() : nowDate.getMinutes();
  var second = nowDate.getSeconds()< 10 ? "0" + nowDate.getSeconds() : nowDate.getSeconds();
  $("#time") .html( year + "年" + month + "月" + date + "日" +"&nbsp;&nbsp;"+ hour + ":" + minute + ":" + second);
  t = setTimeout(time, 1000);
}
layui.use(["tree", "util","table","laydate"], function() {
  var tree = layui.tree
      , layer = layui.layer
      , util = layui.util
      ,table = layui.table
      ,laydate = layui.laydate
      ,data = [{
        title: '安全环境'
        ,id:''
        ,type: 'all'
        ,checked: true
        ,spread: true
        ,children: [{
          title: '安全'
          ,type: 1
          ,id:1
        },{
          title: '人员'
          ,type: 2
          ,id:2
        },{
          title: '设备'
          ,type: 3
          ,id:3
        }]
      },{
        title: '生产环境'
        ,id: 'tab2'
        ,field: ''
        ,disabled:true
        ,spread: false
            ,checked: false
        ,children: [{
        title: '主皮带'
        ,type: 4
        ,field: ''
      ,disabled:true
        },{
          title: '主皮带'
          ,id: 7
          ,field: ''
      ,disabled:true
        },{
          title: '主提升'
          ,id: 8
          ,field: ''
      ,disabled:true
        },{
          title: '压风机'
          ,id: 9
          ,field: ''
      ,disabled:true
        },{
          title: '中央水泵房'
          ,id: 10
          ,field: ''
      ,disabled:true
        },{
          title: '10K变电站'
          ,id: 11
          ,field: ''
      ,disabled:true
        }]
      }]
  //基本演示
  tree.render({
    elem: '#tree'
    ,data: data
    ,showCheckbox: true  //是否显示复选框
    ,accordion:true //开启手风琴模式
    ,isJump: false //是否允许点击节点时弹出新窗口跳转
    ,showLine: true
    ,oncheck: function(obj) {
      var type = [];
      if (obj.data.type == 'all') {
        if (obj.checked) {
          type.push(1, 2, 3)
        } else {
          type.push()
        }
      } else {
        var inputList =$('#tree input:checked');
        $.each(inputList,function(index,item){
          type.push(item.value)
        })
      }
      table.reload('tableData1', {
        where: {
          type: JSON.stringify(type) + ''
        }
      })
    }
  });
  table.render({
    elem: '#tableData1'
    ,url:ipStr+'/safe_pc/getAlarmListInfo'
    ,cellMinWidth: 60 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    ,height:'220px'
    ,first: true //首次渲染表格
    ,cols: [[
      {field:'', width:60,fixed:'left',type:'numbers',title: '序号'}
      ,{field:'system_name', title: '系统',width:80,align:'center'}
      ,{field:'point',  title: '地点',width:''}
      ,{field:'TypeName', title: '类型',width:100,align:'center'}
      ,{field:'_value', title: '值',width:80,align:'center'}
      //,{field:'ssMinValue', width:60, title: '单位',align:'center'}
      ,{field:'max_value', title: '最大值' ,width:80,align:'center'}
      ,{field:'startTime', title: '开始时间',width:170,align:'center'}
      ,{field:'ssAlarmDuration', width:160, title: '持续时长',align:'center'}
      ,{field:'max_time', width:170, title: '最大值时刻',align:'center'}
    ]]
    ,where: {
      type:'[1,2,3]'
    }
    ,parseData: function(res) {
      return {
        "code":0,
        msg:"",
        count:res.total,
        data:res.rows
      }
      if (this.first) {
        this.first = false;
      }
    }
    ,page: false
    ,loading: true
  });
  table.render({
    elem: '#tableData2'
    ,height:'360'
    ,url:ipStr+'/safe_pc/getAlarmHistoryInfo'
    ,first: true //首次渲染表格
    ,cols: [[
      {field:'', width:60,fixed:'left',type:'numbers',title: '序号'}
      ,{field:'system_name', title: '系统',width:80,align:'center'}
      ,{field:'point',  title: '地点',width:''}
      ,{field:'TypeName', title: '类型',width:100,align:'center'}
      ,{field:'_value', title: '值',width:60,align:'center'}
      ,{field:'ssMinValue', width:60, title: '单位',align:'center'}
      ,{field:'max_value', title: '最大值' ,width:80,align:'center'}
      ,{field:'startTime', title: '开始时间',width:200,align:'center'}
      ,{field:'ssAlarmDuration', width:200, title: '持续时长',align:'center'}
      ,{field:'max_time', width:200, title: '最大值时刻',align:'center'}
    ]]
    ,parseData: function(res) {
      return {
        "code":0,
        msg:"",
        count:res.total,
        data:res.rows
      }
      if (this.first) {
        this.first = false;
      }
    }
    ,page: true
    ,loading: true
  });
  laydate.render({
    elem: '#date'
    ,type: 'datetime'
    ,range: true,
    done:function(value,date,enddate){
      table.reload('tableData2', {
        page: {
          curr: 1 //重新从第 1 页开始
        },
        where: {
          date: value
        }
      });
    }
  });
})
//安全websocket接受消息
var ws = new WebSocket("ws://" + ipStrs + "/net/websocket/mongoAlarmList/" + randomWord(false, 43));
console.log('websocket',ws)
ws.onopen = function (evt) {
  console.log("安全websocket连接成功");
};
//ws_person.onmessage = function (event) {
//  if (typeof event.data === String) {
////            console.log("Received data string");
//  }
//  if (event.data instanceof ArrayBuffer) {
//    var buffer = event.data;
//    console.log("Received arraybuffer");
//  }
//  if (event.data != null && event.data != '') {
//    var parseData = $.parseJSON(event.data);
//    perRefresh(parseData);
//  }
//};
var flag = false,flags = false;
var screen = function screen(type){
  var height = window.innerHeight - 80;
  if(type == 1){
    if(flag){
      $('.table2').show();
      $('.table1').css('height','39%').slideDown();
      flag = false;
    }else{
      $('.table2').hide();
      $('.table1').css('height',height+'px').slideDown();
      flag = true;
    }
  }else{
    if(flags){
      $('.table1').show();
      $('.table2').css('height','59%');
      $('.table2').slideDown()
      flags = false;
    }else{
      $('.table1').hide();
      $('.table2').css('height',height+'px').slideDown();
      flags = true;
    }
  }
}