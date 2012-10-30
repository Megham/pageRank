$(function(){
	
	$('.play').click(function(){
		chrome.runtime.getBackgroundPage(function(bgPage){
			audio = bgPage.document.getElementById('radio_player');
			audio.play();
		});
		$('.play').css('display','none');
		$('.pause').css('display','block');
	});
	
	$('.pause').click(function(){
		chrome.runtime.getBackgroundPage(function(bgPage){
			audio = bgPage.document.getElementById('radio_player');
			audio.pause();
		});
		$('.pause').css('display','none');
		$('.play').css('display','block');
	});
	
	chrome.runtime.getBackgroundPage(function(bgPage){
		audio = bgPage.document.getElementById('radio_player');
		if (audio.paused) {
			$('.play').css('display','block');
			$('.pause').css('display','none');
		}
		else{
			$('.pause').css('display','block');
			$('.play').css('display','none');
		};
	});
})