
/*
 *  
 *  http://hking.me 
 *  @author HKing  <513935463@qq.com>
 *
 */
;(function($){
    $.fn.extend({  
        h5upload:function(options){  
        	var defaults = {
        		url:"",
        		multiple:true
        	};
            var options = $.extend({},defaults, options);  
            var _this = this;
            this.addClass("uploadWrap");
            var fileInput = $("<input />",{
            	type: "file",
            	multiple:options.multiple,
            	id: "fileInput",
            	style:"display:none;",
            	change: function(){
            		var _t = this;
            		for(var i=0,len=this.files.length;i<len;i++){
            			var file = this.files[i];
//          			if($("#"+file.lastModified).length > 0){
//          				alert("请勿选择重复文件！");
//          				return false;
//          			}
	            		var reader = new FileReader();
						reader.readAsDataURL(file);
						reader.onload = function(e){
							var fileItem = $('<div class="fileItem" id="'+file.lastModified+'"><img src="'+this.result+'" /><div class="cancle" title="删除">X</div></div>');
							_this.append(fileItem);
							fileItem.data("file",file);
							fileItem.find(".cancle").click(function(){
								var fileData = $(this).parent().data("file");
								$(this).parent().remove();
								var allData = getAllData();
								options.onCancel(fileData,allData);
							});
							sendFile(file,fileItem);
						};
            		}
            	}
            });
            var selectBtn = $("<div />",{
            	id: "selectBtn",
            	class:"selectBtn",
            	click: function(){
            		_this.find("#fileInput").trigger('click');
            	}
            })
            var uploading = $('<div class="uploading"><div><i class="fa fa-spinner fa-pulse fa-2x"></i><p>上传中...</p></div></div>');
            this.append(fileInput).append(selectBtn).append(uploading);
            
            function getAllData(){
            	var allData = [];
            	$(".fileItem").each(function(i,t){
            		allData.push($(t).data("file"));
            	});
            	return allData;
            }
            
            function sendFile(file,item){
            	var fd = new FormData();
		        fd.append("upload", 1);
		        fd.append("upfile", file);
		        $.ajax({
		            url: options.url,
		            type: "POST",
		            processData: false,
		            contentType: false,
		            data: fd,
		            beforeSend:function(data){
		            	$(_this).find(".uploading").show();
		            },
		            success: function (data) {
		            	$(item).data("file",data);
		            	var allData = getAllData();
		                options.success(data,allData,item)
		                $(_this).find(".uploading").hide();
		            }
		        });
            }
            return this;
        }  
    });  
  
})(jQuery);