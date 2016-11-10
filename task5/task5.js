$(function(){
	var flag=true;
    $(document).on("blur","#form1 input[type='text'], #form1 textarea", function(){
        switch($(this).attr("id")){
            case "name":
            case "qq":
            case "school":
            case "wish":
            {
                if($(this).val()==""){
                    flag=false;
                    $(this).val("输入不能为空");
                    $(this).css({background:"yellow",color:"blue"})} else{
                    if(this.value=="输入不能为空"){
                        $(this).val("输入不能为空");
                    }else{
                       
                        $(this).css({background:"white",color:"black"});
                        $(this).val(this.value.toString());
                    }
                }
                break;
            }
           
        }
    });
	function getString(){
            var joinTime=$("#joinTime").val();
            if(joinTime==""){
                flag=false;
            }else{
                flag=true;
                var num=joinTime.toString().replace(/[^0-9]/g,"");
                $("#joinTime").val(parseInt(num));
                
            }
        }
		

    $(".regist").bind("click",function(){
		getString();
	var odata=$("#form1").serialize();
        $.ajax({
            url:"/test/student",
			dataType:"JSON",
            data:odata,
            type:"post",
            success:function(code,message,data){
            window.location.href="list.html";
            },
            error:function(XMLHttpRequest){
alert("添加失败")
            }
        })
	

    })
});