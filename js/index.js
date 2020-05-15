/**
 * Created by Administrator on 2020/5/15 0015.
 */
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
layui.use(["tree", "util","table"], function() {
  var tree = layui.tree
      , layer = layui.layer
      , util = layui.util,
      table = layui.table
  //模拟数据
      ,data = [{
    title: '安全菜单'
    ,id: 1
    ,field: 'name1'
    ,checked: true
    ,spread: true
    ,children: [{
      title: '安全'
      ,id: 3
      ,field: 'name11'
      ,href: 'https://www.layui.com/'
    },{
      title: '人员'
      ,id: 4
      ,spread: true
    }]
  },{
    title: '生产菜单'
    ,id: 2
    ,field: ''
    ,spread: true
    ,children: [{
      title: '二级2-1'
      ,id: 5
      ,field: ''
      ,spread: true
      ,children: [{
        title: '三级2-1-1'
        ,id: 11
        ,field: ''
      },{
        title: '三级2-1-2'
        ,id: 12
        ,field: ''
      }]
    },{
      title: '二级2-2'
      ,id: 6
      ,field: ''
      ,children: [{
        title: '三级2-2-1'
        ,id: 13
        ,field: ''
      },{
        title: '三级2-2-2'
        ,id: 14
        ,field: ''
        ,disabled: true
      }]
    }]
  }]
  //基本演示
  tree.render({
    elem: '#tree'
    ,data: data
    ,showCheckbox: true  //是否显示复选框
    //,id: 'demoId1'
    ,isJump: false //是否允许点击节点时弹出新窗口跳转
    ,click: function(obj){
      var data = obj.data;  //获取当前点击的节点数据
      layer.msg('状态：'+ obj.state + '<br>节点数据：' + JSON.stringify(data));
    }
  });
  table.render({
    elem: '#tableData1'
    ,url:'/demo/table/user/'
    ,cellMinWidth: 80 //全局定义常规单元格的最小宽度，layui 2.2.1 新增
    ,cols: [[
      {field:'id', width:80, title: 'ID'}
      ,{field:'username', width:'', title: '用户名'}
      ,{field:'sex', width:'', title: '性别'}
      ,{field:'city', width:'', title: '城市'}
      ,{field:'sign', title: '签名', width: '30%', minWidth: 100} //minWidth：局部定义当前单元格的最小宽度，layui 2.2.1 新增
      ,{field:'experience', title: '积分'}
      ,{field:'score', title: '评分'}
      ,{field:'classify', title: '职业'}
      ,{field:'wealth', width:'', title: '财富'}
    ]]
  });
  table.render({
    elem: '#tableData2'
    ,height:'360'
    ,url:'/demo/table/user/'
    , where: {
      page: 1
    }
    ,cols: [[
      {field:'id', width:80, title: 'ID'}
      ,{field:'username', width:'', title: '用户'}
      ,{field:'sex', width:80, title: '性别'}
      ,{field:'city', width:80, title: '城市'}
      ,{field:'sign', title: '签名', minWidth: 150}
      ,{field:'experience', width:80, title: '积分'}
      ,{field:'score', width:80, title: '评分'}
      ,{field:'classify', width:80, title: '职业'}
      ,{field:'wealth', width:135, title: '财富'}
    ]]
    ,page: true
    , limit: 10
  });
})
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