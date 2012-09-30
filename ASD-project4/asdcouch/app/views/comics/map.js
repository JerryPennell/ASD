function (doc) {
	if (doc._id.substr(0,7) === "comics:") {
		emit(doc._id.substr(7), {
			    "id":doc.id,
			    "date":doc.date,
	            "publisher": doc.publisher,
	            "title": doc.title,
	            "comments": doc.comments,
	            "issue": doc.issue
		});
	}
};