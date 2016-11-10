$(function(){
	var id=localStorage.id;
	//查询学生
	$.ajax({
        type:"get",
        url:"/test/student/"+id,
        data:id,
        success:function(message,code,data){
			//返回message为字符串，先用JSON.parse()转换为JSON对象。
			var Message=JSON.parse(message);var type;
			console.log(Message.type);
			switch($(".forminfo input").attr("name")){
				case "name":{$("input[name=name]").val(Message.name);}
				case "qq":{ $("input[name=qq]").val(Message.qq);}
				case "type":{
					 switch(Message.type){
                        case 1:{type="CSS";break;}
                        case 2:{type="JS";break;}
                        case 3:{type="JAVA";break;}
                        case 4:{type="运维";break;}
                        case 5:{type="DBA";break;}
                        case 6:{type="产品";break;}
                        case 7:{type="IOS";break;}
                        case 8:{type="Android";break;}
                    }
					$('.forminfo input[name="type"]').val(type);
					$(":radio[name='type'][value="+Message.type+"]").attr("checked",true);
				}
				case "school":{$("input[name=school]").val(Message.school);}
				case "talent":{
					switch(Message.talent){
						case 1:{talent="学霸";break;}
						case 2:{talent="学渣";break;}
					}
					//注意此处一定要带上input的选择器，否则第二行相同name的radio的值就被覆盖了。不能选中了。
					$(".forminfo input[name=talent]").val(talent);
					$(":radio[name=talent][value="+Message.talent+"]").attr("checked",true);
				}
				case "level":{
					switch(Message.level){
						case 1:{level="0基础";break;}
                        case 2:{level="3个月内";break;}
                        case 3:{level="6个月内";break;}
                        case 4:{level="1年内";break;}
                        case 5:{level="3年内";break;}
                        case 6:{level="3年以上";break;}
					}
					$(".forminfo input[name=level]").val(level);
					$(":radio[name=level][value="+Message.level+"]").attr("checked",true);
				}
				case "joinTime":{
					var time=(Message.joinTime).toString();
					var timeStr=time.substr(0,4)+"年"+time.substr(4,2)+"月"+time.substr(6,2)+"日";
					$(".forminfo input[name=joinTime]").val(timeStr);
					$("#form1 input[name=joinTime]").val(Message.joinTime);
				}
				case "wish":{
					$("input[name=wish]").val(Message.wish);
					$("textarea[name=wish]").val(Message.wish);
				}
			}
			//让input失去编辑功能
			$(".forminfo input").attr("disabled",true);
			$(".edit").click(function(){
				if($(this).html()=="编辑"){
					$(this).html("确认");
				    $(".forminfo").hide();
					$("#form1").show();
				}else{

					//修改学生信息
					$.ajax({
                         type:"put",
                         url:"/test/student/"+id,
						 data:$("#form1").serialize(),
						 success:function(data,message){
							
							 $("#form1").hide();
							 window.location.reload()
							 $(".forminfo").show();

						 },
						 error:function(){
							 alert("failed")
						 }

                            })
					
				}
				
				
			})
        
        },
        error:function(){
            alert("failed")
        }
    })
})