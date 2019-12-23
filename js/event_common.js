UI = {
	Load: function(){
		UI.Common();
	},

	Common: function(){
		$(function(){
			var select = $("select.select_st1");
			select.click(function(){
				var select_name = $(this).children("option:selected").text();
				$(this).siblings("label").text(select_name);
			});
		});		
	}
}

$(document).ready(function(){
	UI.Load();
	$('.bxslider').bxSlider({
		speed:500,
		auto: true
	});
});
