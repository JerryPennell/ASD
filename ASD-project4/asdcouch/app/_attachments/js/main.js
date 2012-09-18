$(document).ready(function() {
	//console.log('I am ready');
	$.ajax({
		"url": 'asdproject/_alldocs?include_docstrue&start_key"comics:"&end_key="comics:zzzzz"',
		"dataType": "json",
		"success": function(data){
			console.log(data);
			$.each(data.rows, function(index, comics){
				
				var date = comics.doc.date;
				var title   = comics.doc.title;
				var publisher  = comics.doc.publisher;
				var comments  = comics.doc.comments;
				var issue  = comics.doc.issue;
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