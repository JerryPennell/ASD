$(document).ready(function() {
	//console.log('I am ready');
	$.ajax({
		"url": "_view/comics",
		"dataType": "json",
		"success": function(data){
			console.log(data);
			$.each(data.rows, function(index, comics){
				
				var date = comics.value.date;
				var title   = comics.value.title;
				var publisher  = comics.value.publisher;
				var comments  = comics.value.comments;
				var issue  = comics.value.issue;
				$('#comiclist').append(
				   $('<li>').append(
						   $('<a>').attr("href","#")
						   .text(title+" - Issue # "+issue)
						   )
				);

			});
			$('#comiclist').listview('refresh');
		}
	})
});