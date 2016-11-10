/**
 * Created by ZTHK10 on 2016/10/24.
 */
$(function(){
    var switchColor=function(elem){
        var $index=elem.parent().index()+1;
        $(".box>div span").css({background:"#ccc"});
            var colorArr=[["pink","红色"],["lightblue","蓝色"],["lawngreen","绿色"]];
            var num=Math.floor(Math.random()*3);
            var color=colorArr[num][0];
            elem.css("background",color);
            console.log("格子"+$index+"颜色变成了 "+colorArr[num][1]);

    };
    var i=-1,t;
    function autoChange(){
        t=setTimeout(function(){
            i=i<9? ++i: 0;
            var elem=$(".box>div span").eq(i);
            switchColor(elem);
            autoChange();
        },400)
    }


    $("button").click(function(){
        if(!t){
            autoChange();
            $(this).find("span").html("Stop");
        }
        else{
            clearTimeout(t);
            $(this).find("span").html("Change Color");
            t=null;
            }
    })

});