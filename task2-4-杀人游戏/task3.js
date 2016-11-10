/**
 * Created by ZTHK10 on 2016/10/28.
 */
$(function(){
    var totalNum=$(".assign span.total"),
        killerNum=$(".assign span.killer"),
        copNum=$(".assign span.cop"),
        peopleNum=$(".assign span.people");

    var getStorageNum=function(){
        totalNum.html(window.localStorage.totalNum);
        killerNum.html(window.localStorage.killerNum);
        copNum.html(window.localStorage.copNum);
        peopleNum.html(window.localStorage.peopleNum);
    };
    getStorageNum();

    var getRoleArr=function(T,K,C,P){
        var roleArr=["killer", "cop", "people"],role,KN=0,CN=0,PN=0;
        var arr=[];
        while(arr.length<parseInt(T)) {
            role = roleArr[Math.floor(Math.random() * 3)];
            if (role == "killer") {
                if (KN < K) {
                    KN += 1;
                    arr.push(role);
                }
            }
            else if (role == "cop") {
                if (CN < C) {
                    CN += 1;
                    arr.push(role);
                }
            }
            else if (role == "people") {
                if (PN < P) {
                    PN += 1;
                    arr.push(role);
                }
            }
        }
        return arr;

    };
    var arr=getRoleArr(totalNum.html(),killerNum.html(),copNum.html(),peopleNum.html());
    window.localStorage.roleArr=arr;
    console.log(arr);

    var checkID=function(){
        var i=0; var flag=true;
        $(".check").bind("click",function(){
            if(flag){
                flag=false;
            if(i<totalNum.html()){
            if(arr[i]=="cop"){
                $(".id-details .change").html('<div class="cop"><div class="role"><span>角色</span><span>警察</span></div><p class="hint">角色提示：你是好人的领路人，仔细分析，谨慎查证，用你的智慧带领平民走向胜利</p><div class="foot">*请用自己的手机拍照，记住身份信息，点击擦掉身份，以免泄露</div></div>')
            }else if(arr[i]=="killer"){
                $(".id-details .change").html('<div class="killer"><div class="role"><span>角色</span><span>杀手</span></div><p class="hint">角色提示：通过分析发言找到警察，杀光他们，同时注意隐藏自己的身份</p><div class="foot">*请用自己的手机拍照，记住身份信息，点击擦掉身份，以免泄露</div></div>')
            }else if(arr[i]=="people"){
                $(".id-details .change").html('<div class="people"> <div class="role"><span>角色</span><span>水民</span></div><p class="hint">角色提示：通过逻辑分析抓出隐藏的杀手，同时也要通过巧妙的发言来保护警察</p><div class="foot">*请用自己的手机拍照，记住身份信息，点击擦掉身份，以免泄露</div></div>')
            }
            $(".id-details .idNum").html(++i);
            $(".id-details").css({display:"block"});}
        }
            return false;
        });


        $(".remove").click(function(){
            flag=true;
            $(".id-details").css({display:"none"});
            var next=$(".num .next").html();
            var active=$(".num .active").html();
            var prev=$(".num .prev").html();
            var total=totalNum.html();
            if(parseInt(next)<parseInt(total)){
            if(active=="1"){
                $(".num .prev").html(1);
            }else{
                $(".num .prev").html(++prev)
            }
                $(".num .next").html(++next);
                $(".num .active").html(++active);
        }else if(parseInt(next)==parseInt(total)){
                $(".num .prev").html(++prev);
                $(".num .active").html(++active);
                $(".num .next").html("结束");
            }else if(parseInt(active)==parseInt(total)){
                $(".num .next").html(" ");
                $(".num .prev").html(++prev);
                $(".num .active").html("结束").css({background:"darkred"});
                $(".remove").hide();
                $(".check").html("法官查看").addClass("judge").css({background:"transparent",color:"#000"});
                $(".judge").click(function(){
                    window.location.href="task4.html";
                })
            }
            return false;
        })
    };
    checkID();

    $(".game .clear .stop").click(function(){
        window.location.href="task2-4.html";
    })



});