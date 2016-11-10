/**
 * Created by Administrator on 2016/10/30.
 */
$(function(){
    var getStorageNum=function(){
        $(".totalNum").val(window.localStorage.totalNum);
        $(".killerNum").val(window.localStorage.killerNum);
        $(".copNum").val(window.localStorage.copNum);
        $(".peopleNum").val(window.localStorage.peopleNum);
    };
    getStorageNum();
    var RoleArr=window.localStorage.roleArr;
    var roleArr=RoleArr.split(",");
    var gettable=function(){
        var len=roleArr.length;
        for(var i=0;i<len;i++){
            switch (roleArr[i]){
                case "people":{roleArr[i]="水民";break;}
                case "cop":{roleArr[i]="警察";break;}
                case "killer":{roleArr[i]="杀手";break;}
            }
            $("table tbody").append('<tr><td>'+(i+1)+'</td><td>'+roleArr[i]+'</td></tr>')
        }
    };
    gettable();
    var change=function(){
        $(".game ul li").each(function(){
            var $this=$(this);
            var $index=$this.index();
            console.log($index);
            $this.click(function(){
                $this.addClass("active").siblings().removeClass("active");
                $(".changeable>div").eq($index).removeClass("hide").siblings().addClass("hide");
            })
        })
    };
    change();

    $(".game .intro button").click(function(){
        window.location.href="task2-4.html";
    })
});