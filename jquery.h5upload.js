
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
	            		var reader = new FileReader();
						reader.readAsDataURL(file);
						reader.onload = function(e){
							var fileItem = $('<div class="fileItem"><img src="'+this.result+'" /></div>');
							_this.append(fileItem);
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
            this.append(fileInput).append(selectBtn);
            
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
		            	
		            },
		            success: function (data) {
		                options.success(data,item)
		            }
		        });
            }
            
        }  
    });  
  
})(jQuery);