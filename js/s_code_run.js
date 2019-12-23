if (s.pageName){
	if (s.pageName.replace(/ /gi, '').length == 0 ){ //trim
		 s.pageName = null;
	}
	else{
		s.pageName = getSiteName() + ((s.pageName.indexOf('^')==0)?'':'^') + s.pageName;
	}
	//byte size check
	if( stringByteSize(s.pageName) > 100 ){
		s.pageName = byteSubstring(s.pageName) + "~@";
	}
} 
var s_code=s.t();if(s_code)document.write(s_code);


function byteSubstring(str){
	if (str == null || str.length == 0) {
		return 0;
	}
	var size = 0;
    var i = 0;
	for (i = 0; i < str.length; i++) {
		size += charByteSize(str.charAt(i));
        if( size > 98 ) break;
	}
    str = str.substring(0,i);
	return str;
}

function charByteSize(ch) {
	if (ch == null || ch.length == 0) {
		return 0;
	}
	var charCode = ch.charCodeAt(0);
	if (charCode <= 0x00007F) {
		return 1;
	} else if (charCode <= 0x0007FF) {
		return 2;
	} else if (charCode <= 0x00FFFF) {
		return 3;
	} else {
		return 4;
	}
}
//ex) stringByteSize(str)
function stringByteSize(str) {
	if (str == null || str.length == 0) {
		return 0;
	}
	var size = 0;
	for (var i = 0; i < str.length; i++) {
		size += charByteSize(str.charAt(i));
	}
	return size;
}
