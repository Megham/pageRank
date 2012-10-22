var tabToUrl = {};
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	var l = document.createElement("a");
	l.href = tab.url;
	var hostname = l.hostname;
	tabToUrl[tabId] = hostname;
	updatePageRank(hostname);
});	
chrome.tabs.onHighlighted.addListener(function(highlightInfo) {
	updatePageRank(tabToUrl[highlightInfo.tabIds[0]]);
})

function checkPageRankBlackListedUrl(Url){
	var blackListedUrls = ["newtab","chrome://"];
	for(x in blackListedUrls){
		var patt = new RegExp(blackListedUrls[x]);
		if(patt.test(Url)){
			return true;
		}
	}
	return false;
}

function updatePageRank(tabUrl)
{
	chrome.browserAction.setBadgeText({text: ""});
	if(tabUrl != undefined && !checkPageRankBlackListedUrl(tabUrl))
	{
		var pageRankXhr= new XMLHttpRequest();
		var pageRankService='http://josh-fowler.com/prapi/?url='+ tabUrl;
		pageRankXhr.open("GET",pageRankService,true);
		pageRankXhr.onreadystatechange= function()
		{
			if(pageRankXhr.readyState==4)
				chrome.browserAction.setBadgeText({text: pageRankXhr.response});

		};
		pageRankXhr.send();
	}
}