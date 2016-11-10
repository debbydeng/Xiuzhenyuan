/**
 * Created by debby on 2016/10/25.
 */
$(function(){
    var assignPeople=function(){
    var totalNum, killerNum, copNum, peopleNum;var r = /^[0-9]*[1-9][0-9]*$/;var flag;
    $(".total form input").blur(function(){
        totalNum=$(this).val();
        if(totalNum<8||totalNum>20||!(r.test(totalNum))||(isNaN(totalNum))){
            flag=false;
            $(this).css({background:"yellow"});
            $(".total .hint").css({color:"#af4925"})
        }else{
            flag=true;
            $(this).css({background:"transparent"});
            $(".total .hint").css({color:"#ccc"});
            if(totalNum<=10){
                killerNum=2;copNum=2;
            }else if(totalNum>10&&totalNum<=14){
                killerNum=3;copNum=3;
            }else if(totalNum>14&&totalNum<=17){
                killerNum=4;copNum=4;
            }else{
                killerNum=5;copNum=5;
            }
            peopleNum=totalNum-killerNum-copNum;
            $("form").not(".total form").each(function(){
                var arr=[killerNum,copNum,peopleNum];
                var $index=$(this).parent().index()-1;
                $(this).find("input").val(arr[$index])
            });

            window.localStorage.totalNum=totalNum;
            window.localStorage.killerNum=killerNum;
            window.localStorage.copNum=copNum;
            window.localStorage.peopleNum=peopleNum;
        }
    }).keyup(function(){$(this).triggerHandler("blur")})
        .focus(function(){
            $(this).triggerHandler("blur");
        });

        $(".start").click(function(){
            if(flag){
                $(this).find("a").attr("href","task3.html");
            }else{
                alert("请输入数值")
            }
        })
    };
    assignPeople();
    
});