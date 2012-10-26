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
});

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

chrome.webNavigation.onCommitted.addListener(function(details) {
	if(isBack(details.transitionQualifiers) )
	{
	 	if(isGoogleSearchUrl(details.url)){
	 	var searchString = getSearchString(details.url);
	 	chrome.tabs.executeScript(details.tabId,
                           {code:"document.body.innerHTML='Searching in YAHOO for : "+decodeURIComponent(searchString)+"';"});
	 	chrome.tabs.get(details.tabId, function (tab) {
  		
  				var tabTitle = encodeURIComponent(tab.title);
  				chrome.tabs.update(tab.id, {url: "http://search.yahoo.com/search?p="+ searchString});
		});
	 }
	}
});	

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


function isBack(transitionQualifiers)
{
	for( qualifier in transitionQualifiers ){
		if(transitionQualifiers[qualifier] == "forward_back")
			return true;
	}
	return false;
}

function isGoogleSearchUrl(url)
{
	var googleSearch = /\.google\./;
	isSearchUrl = url.indexOf("&q=") != -1 || url.indexOf("&oq=") != -1 || url.indexOf("/search?q=") != -1;
	return googleSearch.test(url) && isSearchUrl;
}

function getSearchString(searchUrl)
{
	var ampersandQIndex = searchUrl.indexOf("&q");
	var ampersandOQIndex = searchUrl.indexOf("&oq");
	var ampersandSearchQIndex = searchUrl.indexOf("/search?q=");
	var qSearch = null;
	var oqSearch = null;
	var searchqSearch = null;
	if(ampersandQIndex != -1)
		qSearch = searchUrl.substring(ampersandQIndex).split("&q=")[1].split("&")[0];
	if(ampersandOQIndex != -1)
		oqSearch = searchUrl.substring(ampersandOQIndex).split("&oq=")[1].split("&")[0];
	if(ampersandSearchQIndex != -1)
		searchqSearch = searchUrl.substring(ampersandSearchQIndex).split("/search?q=")[1].split("&")[0];
	return qSearch ? qSearch : (oqSearch ? oqSearch : searchqSearch);
}