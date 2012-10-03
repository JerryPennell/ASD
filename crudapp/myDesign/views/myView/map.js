function(doc) {
    if (doc.name && doc.issue)
    {
    	emit(doc._id, doc);
    }
}