// 최초작성: 애드캡슐 조희욱
//pie 그래프 dot 따라다니게//디자인이상 메인의 큰 그래프만 적용되는 함수
var PiegraphDotSet = function(){
	var r = {"main" : 52, "sub" : 40} //반지름
	var center_dot, value;
	if (jQuery('body').hasClass('notlow'))//하이버전일때 (아이스크림 초과)
	{	
		center_dot = jQuery('#version_high #center_point #dot')
		value = Number(jQuery('#version_high.progress-big').attr('data-progress'))//큰것만 적용
	}else{//로우버전일때
		center_dot = jQuery('#version_low #center_point #dot')
		value = Number(jQuery('#version_low.progress-big').attr('data-progress'))//큰것만 적용
	}
	setPoxXY();
	function setPoxXY(){
		var angle = value * 3.6 +267; //3.6은 360/100.. 267은 각도270(0 90 180 270 360)의 대략적인 값
		var posX , posY;
		b_posX = Math.ceil(r.main * Math.cos(angle * (Math.PI / 180)));   //가로좌표x,  r은 반지름
		b_posY = Math.ceil(r.main * Math.sin(angle * (Math.PI / 180))); //세로좌표 y,  r은 반지름
		if (value >= 2  && value <= 17)//대략 1사분면
		{
			posX = b_posX-2; posY = b_posY-2;
		}else if (value >= 18  && value <= 60){//대략 2사분면
			posX = b_posX-6; posY = b_posY-8;
		}else if (value >= 61  && value <= 74){//대략 3사분면
			posX = b_posX-5; posY = b_posY-6;
		}else if (value >= 75  && value <= 100){//대략 4사분면
			posX = b_posX-5; posY = b_posY-5; 
		}
		center_dot.css({'top':posY,'left':posX}).fadeIn(1000);
	}
}
//체크박스나 라디오 on off 공통
var ChkRaOnOff = function(fl,size){
	var jQChkRa = jQuery('.ChkRa');
	jQChkRa.live('click', function(){
	if (fl == 'fl_check')
		{	if (jQuery(this).hasClass('on')){jQuery(this).removeClass('on').addClass('off');
			}else{jQuery(this).removeClass('off').addClass('on');}//off
		}else if(fl == 'fl_radio'){
			if (!jQuery(this).hasClass('on')){jQuery(this).addClass('on').siblings('.ChkRa').removeClass('on')}
		}
	if (size =='chk_length'){chkSize()} //확인버튼 등의 비활성화 관련 현재는 학습리스트만
	if (size =='num_count'){chknum_count(jQuery(this),jQuery(this).text())}//학습뷰의 좋아요 버튼 숫자 더하고 빼기,jQuery(this).text()로 초기치 넘버도 넘겨야함 
	});
}
var chkSize = function (){//확인버튼 등의 비활성화 관련 opacity값 조절
	var leng = jQuery('.ChkRa.on').length;
	var jQfrm_btn = jQuery('.frm_btn');
	if (leng<3)
	{
		jQfrm_btn.addClass('disabled');
	}else{
		jQfrm_btn.removeClass('disabled');
	}
}
var chknum_count = function (this_dom2,initial_num2){//학습뷰의 좋아요 버튼 숫자 더하고 빼기
	var num_spot = this_dom2.find('span');var initial_num = Number(initial_num2);
	if (!this_dom2.hasClass('on')){minus();}else{add();}
	function minus(){num_spot.text(initial_num-1)}
	function add(){num_spot.text(initial_num+1)}
}
var use_like_placeholder = function(){
	var use_placeholder_label = jQuery('.use_placeholder').find('.label')
	var use_placeholder_input = jQuery('.use_placeholder').find('.input_txt')
	use_placeholder_label.click(function(){
		jQuery(this).hide().prev('span').find('.input_txt').focus();
	});
	use_placeholder_input.focus(function(){
		jQuery(this).parent('span').next('.label').hide();
	});
	use_placeholder_input.blur(function(){
		if (jQuery(this).val().length > 0)
		{	jQuery(this).parent('span').next('.label').hide();
			jQuery('.btn_enroll').removeClass('disabled')
		}else{
			jQuery(this).parent('span').next('.label').show();
			jQuery('.btn_enroll').addClass('disabled')
		}
	});
	use_placeholder_input.keyup(function(){
		if(jQuery(this).parent('span').siblings('.btn_enroll').length > 0){
			if (jQuery(this).val().length > 0)
			{	
				jQuery('.btn_enroll').removeClass('disabled')
			}else{
				jQuery('.btn_enroll').addClass('disabled')
			}
		}
	});
}
var layerOpenTrigger = function(){
	jQuery('.layer_open_trigger').on('click',function(){//팝업 호출 버튼
		layerfocusTarget2016 = jQuery(this);
		layer_popup();
		setTimeout(function(){//스크롤러 처리
			jQuery('.nano_popup_ar').nanoScroller();//스크롤러
		},300)
		//jQuery('.nano_popup_ar .nano-slider').append('<div class=\'r_top\'></div><div class=\'r_mid\'></div><div class=\'r_bot\'></div>');
	});
}
//레이어 팝업
var layerfocusTarget2016;//레이어팝업용;
var layer_popup = function(){	
	var jQbody = jQuery('body');
	//레이어팝업
	function cmset_layerpop(){
		jQbody.scrollTop(0);
		//var jQbodyHtml = jQuery('body,html');
		var target = layerfocusTarget2016.attr('href');
		var tsubstr = target.substr(1);
		jQuery(target).show();
		jQuery('.dimm_layer').show();
		setTimeout(function(){
			jQuery('.nano-content').scrollTop(0);//레이어팝업 스크롤0으로
		},50)
		jQbody.addClass('use_layer');
	};
	cmset_layerpop();
	//ie9때문에 반드시 필요,
	//jQuery('.em_pop_newser100 .vod_view_area .video').animate({'width':881}).animate({'width':880})//ie9때문에 반드시 필요
	//setTimeout(function(){},300)
	
	//닫기
	jQuery('.cls_new_ser2016,.dimm_layer').click(function(){//닫기
		jQbody.removeClass('use_layer');
		jQuery('.pop_layer_newansim').hide();
		jQuery('.dimm_layer,.pop_wrap2016').hide();
		//return false;
	});
	//비디오 댓글 지우기
	jQuery('.vod_rpl_area .btn_close').click(function(){
		jQuery(this).parents('.vod_rpl_area').hide();
	})
}
var tabstyle01 = function(){//탭스타일
	var jQtab_type01 = jQuery('.tab_type01');
	var jQtab_type01_a = jQtab_type01.find('>.tit >a')
	jQtab_type01_a.click(function(){
		var idx =jQuery(this).index()
		jQtab_type01_a.removeClass('on');
		jQuery(this).addClass('on');
		jQuery(this).parent('.tit').siblings('.content').hide().eq(idx).show();
	})
}
////슬라이더(메인)
//var call_basic_slider = function(){
	//var slider = jQuery('#slide_area_in').bxSlider({auto: true,autoControls: true});
	//var callautoroll;//클리어 인터벌용
	//var jQdots = jQuery('.bx-default-pager .bx-pager-link');
	////var lengdots = jQdots.length -1;
	//jQdots.on('click',function(){
		////마지막 dot버튼에서 첫번째dot 눌렀을때도 루프처럼 모양나게
		////var act_idx = jQuery('.bx-default-pager .bx-pager-link.active').attr('data-slide-index')
		////if (act_idx == lengdots)
		////{	
		////	if (jQuery(this).attr('data-slide-index') == 0)
		////	{	
		////		slider.goToNextSlide();
		////	}
		////}
		//clearInterval(callautoroll)
		//callautoroll = setInterval(function(){
			//slider.goToNextSlide();
		//},4000)
	//});
//}
jQuery(document).ready(function(){
	chk_pc_v();//check pc 버전
});