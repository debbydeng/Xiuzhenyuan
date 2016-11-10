/**
 * Created by ZTHK10 on 2016/11/2.
 */
$(function(){
    $.ajax({
        type:"get",
        url:"/test/students",
        dataType:"JSON",
        success:function(message,data,code){
            
            var arr=message.data;
            var len=arr.length;
            var page=Math.ceil(len/10);
			var temp="";
            //添加page
            $("ul").append("<li class='prev'><</li><li class='next'>></li>");
            if(page>11){
                for(var i=1;i<8;i++){
                    temp+= "<li class='page'>"+i+"</li>";
                }
                temp+="<li class='more'>.....</li>"+"<li>"+(page-1)+"</li>"+"<li>"+page+"</li>";
            }else{
                for( i=1;i<=page;i++){
                    temp+="<li class='page'>"+i+"</li>"
                }
            }
            $("ul li.prev").after(temp);


            //添加page点击事件
            $("ul li").not(".prev,.next,.more").click(function(){
				//Reset;
				//将checkbox list隐藏
				$(".dellist").hide();
				$(".dellist :checkbox").show();
				//将所有之前建立table删除
				$("table").remove();
                var $index=$(this).html()-1;
                var tablerow="<table ><tbody><tr><th>姓名</th><th>修真类型</th><th>报名时间</th></tr>";
                $(this).addClass("active").siblings().removeClass("active");
                for(var j=0;j<10;j++){
                    var m=$index*10+j;
                    if(m<len){
						console.log(arr[m]);
                    //修真类型转换成字符
					var type="";
                    switch(arr[m].type){
                        case 1:{type="CSS";break;}
                        case 2:{type="JS";break;}
                        case 3:{type="JAVA";break;}
                        case 4:{type="运维";break;}
                        case 5:{type="DBA";break;}
                        case 6:{type="产品";break;}
                        case 7:{type="IOS";break;}
                        case 8:{type="Android";break;}
                    }
                    //将时间戳转换成字符
                    var timestamp=new Date(arr[m].createAt);
                    var Y,M,D,H,Mi,createTime="";
                    function timeformat(T){
                        Y=T.getFullYear();
                        M=T.getMonth()+1;
                        D=T.getDate();
                        H=T.getHours();
                        Mi=T.getMinutes();
                        M=M<10? "0"+M : M;
                        D=D<10? "0"+D : D;
                        H=H<10? "0"+H : H;
                        Mi=Mi<10? "0"+Mi : Mi;
                        createTime= Y+"-"+M+"-"+D+"&nbsp&nbsp&nbsp "+H+":"+Mi ;
                    }
                    timeformat(timestamp);

                    //添加table列表
                    tablerow+="<tr><td>"+arr[m].name+"</td><td>"+type+"</td><td>"+createTime+"</td></tr>"
                }}
                tablerow+="</tbody></table>";
                $(".tableWrap").append(tablerow);
				//动态给每个新建立的table绑定click功能！如果放在外面，JS文件只加载一次，只给第一次建立的table绑定了click的功能，后面重新动态创建的table将不会有click的功能。
	            $("table tr td").click(function(){
		          var $index=$(this).parent("tr").index()-1;
		          var ID=arr[(parseInt($("li.active").html())-1)*10+$index].id;
		          console.log($index+" "+ID);
		
		          localStorage.id=ID;
		          window.location.href="detail-info.html";
	})
				
            });
			 $("ul li").eq(1).trigger("click");
			 
			 //添加页面中more键点击事件
			 $("li.more").click(function(){
        var dif=parseInt((page-3)-($("li").eq(7).html()));
        if(dif>7){
            $("li.page").each(function(){
                var valM=parseInt($(this).html())+7;
                $(this).html(valM);
            });
			 $("li.active").trigger("click");
        }else if(dif<=7){
            $("li.page").each(function(){
                var valM=parseInt($(this).html())+dif;
                $(this).html(valM);
            });
            $("li.more").html(page-2)
			 $("li.active").trigger("click");
        }

    });
			  //添加页面中prev键点击事件

    $("li.prev").click(function(){
        if($("li").eq(1).html()>1){
            $("li.more").html("......");
            $("li.page").each(function(){
                var valP=$(this).html();
                $(this).html(--valP);
            });
        }
        $("li.active").trigger("click");
    });
    //添加页面中next键点击事件
    $("li.next").click(function(){
        if($("li").eq(7).html()<(page-3)){
            $("li.page").each(function(){
                var valN=$(this).html();
                $(this).html(++valN);
            })}else if($("li").eq(7).html()==(page-3)){
                $("li.more").html(page-2);
            }
            $("li.active").trigger("click");

    });
	
		//checkbox 联动功能的实现
	$("input:checkbox").eq(0).click(function(){
		var flag=true;
		$("input:checkbox").not($(this)).each(
		function(){
			if(!this.checked){flag=false;}
		})
		$("input:checkbox").prop("checked",!flag)
	})
	$("input:checkbox").not(":checkbox:eq(0)").click(function(){
		var flag=true;
		$("input:checkbox").not(":checkbox:eq(0)").each(function(){
			if(!this.checked){flag=false;}
		} )
		$("input:checkbox").eq(0).prop("checked",flag)
	} )
	//添加删除button功能
	$("button.del").click(function(){
		var len=$("table tr").length-1;
		console.log(len);
	if(len<11){
		$(".dellist :checkbox:gt("+len+")").hide();
	}
		
		//Ajax 中data数据的param()序列化方法！
		var str=[],idNum=[];var obj={};
		if($(".dellist").is(":hidden")){
			$(".dellist").show();
			
		}else{
			$(":checkbox:checked").each(function(){
				var $index=$(this).index();
				if($index>0){str.push($index);};
			} )
			$.each(str,function(i,item){
				item+=(parseInt($("li.active").html())-1)*10;
				console.log(item);
				idNum.push(arr[item-1].id);
			} )
			console.log(idNum);
			obj={id:idNum};
			var serialize=$.param(obj,true);
			console.log(serialize);
			
			$.ajax({
			type:"post",
			url:"/test/students",
			data:serialize,
			success:function(message){
				alert(message);
				//页面重载
				location.reload();
			},
			error:function(){
				alert("failed")
			}
		})
		}

	})
	
        },
        error:function(){
            alert("请求失败")
        }

    })
	
	$(".add").click(function(){
		window.location.href="task5.html";
	})
	

	
	
	
	

});