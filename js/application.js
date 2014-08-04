//= require jquery
//= require jquery_ujs
//= require jquery.remotipart
//= require twitter/bootstrap
//= require angular
//= require my_angular
//= require highlight
//= require jquery.validate
//= require jquery.validate.file
//= require additional-methods
$(function(){
	$('body').keypress(function(e){
		var actdiv = $(':focus');
		if(e.ctrlKey && e.which == 13 || e.which == 10) {
			actdiv.parents("form").submit();
		}
	});	
})

function setHash(a) {
	location.hash = a;
//$.browser.msie ? $.locationHash(a) : location.hash = a;
}

var mini_to_thumb_re = new RegExp("mini","g");
var thumb_to_mini_re = new RegExp("thumb","g");

function init_zoom_image() {
	$('img.image_of_entry').bind("click",function(){
		var old_src = $(this).attr("src");
		var new_src = "";
		console.log("old_src:"+old_src);
		if (old_src.indexOf("mini") > -1) {
			new_src = old_src.replace(mini_to_thumb_re,"thumb");
			$(this).removeClass("mini").addClass("thumb");
		} else if (old_src.indexOf("thumb") > -1) {
			new_src = old_src.replace(thumb_to_mini_re,"mini");
			$(this).removeClass("thumb").addClass("mini");
		}
		console.log("new_src:"+new_src)
		if (new_src.length > 0) {
			//$(this).fadeOut("slow",function(){
			$(this).attr("src",new_src);
			//}).fadeIn("slow");
		}
	});
};
