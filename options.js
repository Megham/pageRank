function saveOption()
{
	var select = document.getElementById("ad-limit");
  	localStorage["pr_ad_limit"] =  select.children[select.selectedIndex].value;
}

function loadOptions()
{
	var limit = localStorage["pr_ad_limit"];
	var select = document.getElementById("ad-limit");
	for (var i = 0; i < select.children.length; i++)
	{
			var child = select.children[i];
			if (child.value == limit) {
			child.selected = "true";
			break;
		}
	}
	populateBlacklist()
}

function populateBlacklist()
{
	if(localStorage["black_website"])
	{
	$("#blacklist").html("");
	$(localStorage["black_website"].split(",")).each(function(index, val){
		val = val.trim();
		if(val != "" && val !=undefined)
		$("#blacklist").append("<li><a target='blank'>"+val+"</a></li>")
	});
	}

}

function initializeOptions()
{
	loadOptions()
	document.getElementById("ad-limit").onclick = saveOption;
	$('#submit_black').click(function(){
		localStorage["black_website"] = localStorage["black_website"] + " ,"+ $("#black_web").val();
		populateBlacklist();
	});
}

document.addEventListener("DOMContentLoaded", initializeOptions, false);