var chk_pc_v = function(){//check pc 버전
	var ua = navigator.userAgent.toLowerCase();
	if (ua.indexOf('msie 7') != -1)
	{
		locate_to_lowversion();
	}else if(ua.indexOf('msie 8') != -1){
		locate_to_lowversion();
	}else if(ua.indexOf('msie 9') != -1){
		jQuery('body').addClass('low')
		return UaObjDev ={'notlow':'no'}//그래프관련 분기용
	}else{
		jQuery('body').addClass('notlow')
		return UaObjDev ={'notlow':'yes'}//그래프관련 분기용
	}
}
function locate_to_lowversion(){
	window.location.href('/front/broInfo.do')//브라우저 업데이트 권유 화면
}
jQuery(document).ready(function(){
	chk_pc_v();//check pc 버전
});