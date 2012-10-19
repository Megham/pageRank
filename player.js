function show_player(player_height, player_width, onlineradio_userid, onlineradio_apikey)
{
	var src = "http:\/\/www.onlineradiostations.com/radioplayer/widget/";
	//var src = "";
	if (player_height==600 && player_width==190){
		src += "w190px.php?apikey="+onlineradio_apikey+"&userid="+onlineradio_userid;	
	}else if (player_height==274 && player_width==500){
		src += "w500px.php?apikey="+onlineradio_apikey+"&userid="+onlineradio_userid;
	}else if (player_height==265 && player_width==736){
		src += "w736px.php?apikey="+onlineradio_apikey+"&userid="+onlineradio_userid;
	}
	B=(function x(){})[-5]=='x'?'FF3':(function x(){})[-6]=='x'?'FF2':/a/[-1]=='a'?'FF':'\v'=='v'?'IE':/a/.__proto__=='//'?'Safari':/s/.test(/a/.toString)?'Chrome':/^function \(/.test([].sort)?'Opera':'Unknown';
	if (B=='IE'){
		var frameStr = "<iframe src=\""+src+"\" name=\"playerIframe\" id=\"player_iframe\" frameborder=\"no\" border=\"0\" scrolling=\"no\" width =\""+(player_width-3)+"px\" height = \""+(player_height-19)+"px\"><\/iframe>";
		document.getElementById("panel_top").innerHTML = frameStr;
	}else{
		ifrm = document.createElement("iframe");
		ifrm.setAttribute("name", "playerIframe");
		ifrm.setAttribute("id", "player_iframe");
		setTimeout(function(){
			ifrm.setAttribute("src", src);	
		}, 5);
		
		ifrm.setAttribute("frameborder", "no");
		ifrm.setAttribute("scrolling", "no");
		ifrm.setAttribute("border", "0");
		ifrm.setAttribute("width", (player_width-3)+"px");
		ifrm.setAttribute("height", (player_height-19)+"px");
		document.getElementById("panel_top").appendChild(ifrm);
	}
}
