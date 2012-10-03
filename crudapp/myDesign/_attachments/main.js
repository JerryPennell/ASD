var db = $.couch.db(getCurrentDBName());

function getCurrentDBName() {
    return window.location.pathname.split("/")[1];
}

$(document).ready(function() {
    
    //init stuff
    refreshItems();
    $('#sourceDBId').val(db.name);
    $('#targetDBId').val(db.name + "-copy");
    
//Create Function
    
    //event handler crud stuff
    $('input#createId').click(function(e) {
         
       if ($('#nameId').val().length == 0) {
           return;
       }
       
       var aTask = { issue: $('#issueId').val(), name: $('#nameId').val() }
       
       db.saveDoc(aTask, { success: function(resp) {
           refreshItems();
       }});

      clearForm();
    });

//Delete Function
    
    $('input#deleteId').click(function(e) {
         
       if ($('#idId').val().length == 0) {
           return;
       }
       
       var aTask = {
           _id: $('#idId').val(),
           _rev: $('#revId').val()
       }
       db.removeDoc(aTask, { success: function(resp) {
          refreshItems();
       }});
       
       clearForm();
    });

//Update Function
    
    $('input#updateId').click(function(e) {
    	
       if ($('#idId').val().length == 0) {
           return;
       }
       
       var aTask = {
           _id: $('#idId').val(),
           _rev: $('#revId').val(),
           issue: $('#issueId').val(),
           name:$('#nameId').val()
       }
       db.saveDoc(aTask, { success: function(resp) {
           refreshItems();
       }});
    });



   
$('#replicateId').click(function() {
	  var sourceDB = $('#sourceDBId').val();
    var targetDB = $('#targetDBId').val();
    $.couch.replicate(sourceDB, targetDB, {
        success: function(data){alert('Replication was performed');},
        error: function(req, textStatus, errorThrown){alert('Error '+ textStatus);}
    });
});
});

function refreshItems() {
    $("ul#itemData").empty();
      
    db.view("myDesign/myView", {
        success: function(data){
            data.rows.map(function(row) {
            $('ul#itemData').append('<li id="'+row.value._id+'">'
                +" #"
                +row.value.issue
                +" - "
                +row.value.name
                +'</li>');
                     
            $('#'+row.value._id).click(function() {
                $('#idId').val(row.value._id);
                $('#revId').val(row.value._rev);
                $('#issueId').val(row.value.issue);
                $('#nameId').val(row.value.name);
                return false;
            });
            });
        },
        error: function(req, textStatus, errorThrown){alert('Error '+ textStatus);}
    });
}

function clearForm() {
    $('#idId').val('');
    $('#revId').val('');
    $('#issueId').val('');
    $('#nameId').val('');
};