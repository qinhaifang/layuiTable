/**
 * Created by Administrator on 2020/5/16 0016.
 */
/**
 * Created by Administrator on 2020/5/15 0015.
 */
var ipStr = 'http://192.168.1.131:8081'
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
var sendData = {
  //meikuang:$('select[lay-filter=meikuang]').val(),
  yujing: $('select[lay-filter=sensor]').val(),
  //baojing:$('select[lay-filter=baojing]').val(),
  //date:$('#date').val(),

}
layui.use(["tree", "util","table","laydate","form"], function() {
  var tree = layui.tree
      , layer = layui.layer
      , util = layui.util,
      table = layui.table,
      laydate = layui.laydate
      form = layui.form
  //模拟数据
      ,data = [{
        title: '安全菜单'
        ,id: 1
        ,field: 'name1'
        ,children: [{
          title: '安全'
          ,id: 3
          ,field: 'name11'
          ,href: 'https://www.layui.com/'
        },{
          title: '人员'
          ,id: 4
        }]
      }]
  //基本演示
  tree.render({
    elem: '#tree'
    ,data: data
    ,click: function(obj){
      var data = obj.data;  //获取当前点击的节点数据
      layer.msg('状态：'+ obj.state + '<br>节点数据：' + JSON.stringify(data));
    }
  });
  table.render({
    elem: '#tableData2'
    ,height:'360'
    ,url:ipStr+'/safe_pc/getAlarmHistoryInfo'
    , where: {
        curPage:1,
        pageSize:10
    },
    first: true //首次渲染表格
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
      console.log(333,res.rows);
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
      console.log(value)
      table.reload('tableData2', {
        page: {
          curr: 1
        },
        where: {
          date: value
        }
      });
    }
  });
  form.on('select(sensor)', function(data){
    alert(data)
    //if(data.value == 1){
    //  $("#searchSessionNum").attr("disabled","true");
    //  form.render('select');
    //}else{
    //  $("#searchSessionNum").removeAttr("disabled");
    //  form.render('select');//select是固定写法 不是选择器
    //}
  })
})
getYujing()
function getYujing(){
  $.ajax({
    url: ipStr +  '/safe_pc/typeData',
    type: 'GET',
    contentType: 'application/json;charset=utf-8',
    dataType: 'json',
    data: '',
    success: function (response) {
      var data = response.data.list;
      var option = '';
      if(response.code == 200){
        $.each(data,function(n,value){
          option += '<option value="'+value.id+'">'+value.name+'</option>'
        })

        $('select[lay-filter=sensor]').append(option);
        layui.form.render("select");
      }else{
        layer.msg(data.msg)
      }

    },
    error: function (response) {

    }
  })
}
//getBaojing()
//function getBaojing(){
//  $.ajax({
//    url: ipStr +  '/safe_pc/typeData',
//    type: 'GET',
//    contentType: 'application/json;charset=utf-8',
//    dataType: 'json',
//    data: '',
//    success: function (response) {
//      var data = response.data.list;
//      var option = '';
//      if(response.code == 200){
//        $.each(data,function(n,value){
//          option += '<option value="'+value.id+'">'+value.name+'</option>'
//        })
//
//        $('select[lay-filter=baojing]').append(option);
//        layui.form.render("select");
//      }else{
//        layer.msg(data.msg)
//      }
//
//    },
//    error: function (response) {
//
//    }
//  })
//}
//getMeikuang()
//function getMeikuang(){
//  $.ajax({
//    url: ipStr +  '/safe_pc/typeData',
//    type: 'GET',
//    contentType: 'application/json;charset=utf-8',
//    dataType: 'json',
//    data: '',
//    success: function (response) {
//      var data = response.data.list;
//      var option = '';
//      if(response.code == 200){
//        $.each(data,function(n,value){
//          option += '<option value="'+value.id+'">'+value.name+'</option>'
//        })
//
//        $('select[lay-filter=meikuang]').append(option);
//        layui.form.render("select");
//      }else{
//        layer.msg(data.msg)
//      }
//
//    },
//    error: function (response) {
//
//    }
//  })
//}
//var searchBtn = function searchBtn(){
//  console.log(111)
//  layui.use(["tree", "util","table","laydate","form"], function() {
//    var table = layui.table;
//    table.reload('tableData2', {
//      page: {
//        curr: 1
//      },
//      where: {
//        meikuang:$('select[lay-filter=meikuang]').val(),
//        yujing: $('select[lay-filter=sensor]').val(),
//        baojing:$('select[lay-filter=baojing]').val(),
//        date: $('#date').val()
//      }
//    });
//  })
//
//}