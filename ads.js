function injectAdd(){
	var adhtml = chrome.extension.getURL("./ads_content.html");
	var body_height = $("html").height();
	var body_width = $("html").width();
	$("body").prepend("<div style='width:"+body_width+"px;'><iframe style='height:90px; width:728px;margin:0px auto; border:1px solid black;z-index: 10000;display:block;\
position: relative;top: 0px;' src='"+adhtml+"'></iframe></div>");
$("body").append("<div style='width:"+body_width+"px;'><iframe style='height:90px; width:728px; margin: 0px auto; border:1px solid black;z-index: 10000;\
position: relative; display:block;\
bottom: 0px;' src='"+adhtml+"'></iframe></div>");
};

function checkBlackListedUrl(Url){
	var blackListedUrls = ["\\.google\\.","www\\.youtube\\.com","doubleclick\\.net","facebook\\.com"];
	for( x in blackListedUrls ){
		var patt = new RegExp(blackListedUrls[x]);
		if(patt.test(Url)){
			return true;
		}
	}
	return false;
}

$(document).ready(function(){
	displayAds();
	captureBackButton();
})

function displayAds()
{
	if(!checkBlackListedUrl(document.location.hostname)){
		injectAdd();
	}
}