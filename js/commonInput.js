/*
conditions
 - jquery obj for input
 - data type(AP: alphabet, N: number, HA: hangul, AN: alphanumeric)
 - event type (click, keydown, keypress, keyup(*default) ...)
 - handler binded event type (*optional)
 - max length( *optional)
 
*/
function addInputHandler(conditions){
	var $input = conditions.input;
	var dataType = conditions.dataType;
	var eventType = conditions.eventType;
	if ((!$input) || (!dataType)) {
	    throw {error:"NotEnoughArguments", errorMsg:"required argument is missing " +((!$input)?" target input element":" dataType")}
	    return;
	}
	if ($input[0].tagName != "INPUT") {
	    throw {error:"IlregalTargetElement", errorMsg:"target element is not input"};
	    return;
	}
	if ((!eventType)) {
	    eventType = "keyup";
	}
	var handlerFunc = conditions.handler;
	if ((!handlerFunc)) {
	    handlerFunc = function(event){
	        var regEx = null;
	        if (dataType == "N") {
	            regEx = /[^0-9]/gi;
	        } else if (dataType == "AP") {
	            regEx = /[^a-z]/gi;
	        }else if (dataType == "AN") {
	            regEx = /[^a-z0-9]/gi;
	        }else if (dataType == "H") {
	            //regEx = /[a-z0-9]/gi;
	        	//regEx = /[^가-힣]/gi;
	        	regEx = /[^ㄱ-ㅎㅏ-ㅣ가-힣\s]/gi;
	        }else if (dataType == "AH") {
	            regEx = /[^a-zA-Zㄱ-ㅎㅏ-ㅣ가-힣\s]/gi;
	        }else{
	            throw {error:"IlregalDataType", errorMsg:"dataType("+dataType+") is incorrect"}     
	        }
	        remainOnlyTargetValue(regEx, $input,event);
	        //return true;
	    };  // end of handlerFunc
	} // end of if to check handlerFunc
	$input.on(eventType,handlerFunc);
	
	if (conditions.maxlength) {
	    $input.attr("maxlength",conditions.maxlength);
	    }
	    
	}
	function remainOnlyTargetValue(regEx, $input,event) {
	    if ((!(event.keyCode >=34 && event.keyCode<=40)) && event.keyCode != 16) {
	        var inputVal = $input.val();
	        if (regEx.test(inputVal)) {
	            $input.val(inputVal.replace(regEx,''));    
	        }
	    }
	}
	
	/*
	 * //사용예시
	$(document).ready(function(){	    
	    try {
	        addInputHandler({input:$("#onlyNumber"),dataType:"N",maxlength:7});	//숫자만 최대 7글자
		    addInputHandler({input:$("#onlyAlphabet"),dataType:"AP"});			//영문만
		    addInputHandler({input:$("#alphaNumeric"),dataType:"AN"});			//영문+숫자
		    addInputHandler({input:$("#hangul"),dataType:"H"});					//한글만
		    addInputHandler({input:$("#name"),dataType:"AH"});					//영문+한글
	    } catch(e) {
	        console.log(e);
	    }
	});
	*/