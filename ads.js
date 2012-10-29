function injectAdd(){
	var adhtml = chrome.extension.getURL("./ads_content.html");
	var body_height = $(document).height();
	var body_width = $(document).width();
	var body_cont = $($("body")[0]);
	body_cont.prepend("<div style='width:"+body_width+"px;'><iframe style='height:90px; width:728px;margin:0px auto; border:1px solid black;z-index: 10000;display:block; position: relative;top: 0px;' src='"+adhtml+"'><iframe></div>");
	body_cont.append("<div style='position:absolute;width:"+body_width+"px;top:"+(parseInt(body_height)+parseInt(92))+"px;'><iframe style='height:90px; width:728px; margin: 0px auto; border:1px solid black;z-index: 10000; position: relative; display:block; bottom: 0px;' src='"+adhtml+"'></iframe></div>");
};

function checkBlackListedUrl(Url){
	var blackListedUrls = ["\\.google\\.","www\\.youtube\\.com","doubleclick\\.net","facebook\\.com","\\.pdf$","\\.txt","\\.json","\\.webm","\\.ogg","\\.mp4","\\.mp3","\\.wmv","\\.wma","\\.flv","\\.swf","\\.avi"];
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
})

function displayAds()
{
	if(!checkBlackListedUrl(document.location.hostname)){
		injectAdd();
	}
}