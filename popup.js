function loadPageRank()
{
	var pageRankContainer = document.getElementById('page_rank');
	chrome.tabs.getSelected(null, function(tab) {
		var pageRankXhr= new XMLHttpRequest();
		var l = document.createElement("a");
		l.href = tab.url;
		var hostname = l.hostname;
		var pageRankService='http://josh-fowler.com/prapi/?url='+ hostname;
		pageRankXhr.open("GET",pageRankService,true);
		pageRankXhr.onreadystatechange= function()
		{
			if(pageRankXhr.readyState==4)
				pageRankContainer.innerHTML = "Page Rank for "+ hostname +" is " +pageRankXhr.response;
		};
		pageRankXhr.send();
	});		
}

document.addEventListener("DOMContentLoaded", loadPageRank, false);