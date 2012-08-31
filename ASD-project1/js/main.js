//Jerry Pennell 1206
//Project 4
//Visual Framworks (VFW)
//Mobile Development
//Full Sail University

//Wait until the DOM is ready
window.addEventListener("DOMContentLoaded", function(){


	addEventListener("load", function() {
    window.scrollTo(1, 0);
    }, false);
	
     
    var Main = {
     
     
     //Create select field element and populate with options
     makeComics : function(){
	      
	      $.each(comicGroups, function(key, value) {
		    $('#groups').append($("<option/>", {
		        value: key,
		        text: value
		    }));
          });
         
      },
     
     //Find value of selected radio button
     getSelectedRadio : function(){			
         var radios = document.forms[0].haveit;					  //initialized the form to the radios
         for(var i=0; i<radios.length; i++){					  //loops the form radio set called haveit
            if(radios[i].checked){                                //checks to see which value is checked
               haveitValue = radios[i].value;
            }
          }
     },
	 
     //Find value of the check box
     getCheckboxValue : function(){								  
       if($('#need').is(':checked')){                                     //sees if the need check box is checked
          needValue = $('#need').val();
       }else{
           needValue = "No";                                           //if the checkbox is not checked then it will set to value of No
       }
     },
     
     
     //Save data into local storage
     storeData : function (key){       
          //If there is no key, this means this is a brand new item and we need a new key.
	      if(!key){			  
              var id             = Math.floor(Math.random()*10000001);
		  }else{
			  //Set the id to the existing key we're editing so that it will save over the data
			  //The key is the same key that's been passed along from the editSubmit event handler
			  //to the validate function, and then passed here, into the storeData function			  
			  id = key;
		  }
          //Gather up all our form field values and store in an object
          //Object properties contain array with the form label and input value
          getSelectedRadio();													//Checks the selected radio button
          getCheckboxValue();													//Checks the checkbox value
          var item               = {};											//Items object created
              item.publisher     = ["Publisher:",$('#groups').val() ];			//Property for publisher created
              item.cname         = ["Comic Name:",$('#cname').val() ];			//Property for comic name created
              item.iname         = ["Issue:",$('#iname').val() ];					//Property for issue created
              item.email         = ["Email:",$('#email').val() ];                 //Property for email created
              item.haveit        = ["Have it?:",haveitValue];                   //Property for Have it created
              item.need          = ["Needs appraisal:",needValue];              //Property for needs appraisal created
              item.rating        = ["Rating:",$('#rating').val() ];               //Property for creating rating is created
              item.date          = ["Date:",$('#date').val() ];					//Property for data is created
              item.notes         = ["Notes:",$('#notes').val() ];		            //Property for notes is created
              
              
          //Save all the data into local storage Use Stringify to convert our object to a string.          
          localStorage.setItem(id, JSON.stringify(item));    					//Stores the item locally with stringfy as string
		  console.log("This is an id: " +id);               					//Showing the id creation
          alert("Comic Saved");													//Tells the Comic is saved
      },
       
      
	  
	  //Function to get the data stored local storage for JQM
      getJQData : function (){
			
         if(localStorage.length === 0){											//Checks to see if items are in local storage
		   Main.autoFillData(); 							                            //alert prompt there is no data found
         }
         //Write Data from Local Storage to the browser.
         $("body").append('<div id="items"> <ul>');									//appends div tag with its child to body tag
         $('#items').css({ display: "block" });                                 //sets style for items to display
         for(var i=0, len=localStorage.length; i<len; i++){						//itterate the local storage
             $('<li class="drop-shadow curled">');							
             $('<li>');					                                        //makes li tag for links edit-delete
             var key = localStorage.key(i); 									//key for localstorage objects
             var value = localStorage.getItem(key);								//value of the object by key
             
             //Convert the string from local storage value back to an object by using JSON.parse()
             var obj = JSON.parse(value);										//Json parsing of object
             $('<ul>');	
             $('<li>').append($('<img>').attr("src","images/"+ obj.publisher[1] + ".png"));
             for(var n in obj){													//itterates the item in the object
                $('<li>').append(obj[n][0]+" "+obj[n][1]);														//creates element li        
             }
             var param = localStorage.key(i);
             //add Edit single item link
             $('<a>').attr('href', '#additem').text('Edit').attr('rel', 'external').attr('class','sublinks').bind('tap', param, Main.editItem).append($('<br>'));
             
             //add delete single item link
             $('<a>').attr('href', 'additem.html').text('Delete').attr('rel', 'external').attr('class','sublinks force-reload').bind('tap',param, Main.editItem).append($('<br>'));
             
             $('<hr>').attr('id','genlist');							     	//adds id attribute for css to add styles
         }

      $('#jDataLoad').append($('#items'));  //Appends child to id
      
      },
      
      
      //This is for the clear Filer button on the search page
      clearFilter : function (){
         $('input[data-type="search"]').val("");
         $('input[data-type="search"]').trigger("keyup");
      },
	  

	  //Auto Populate Local Storage
	  autoFillData : function (){
		  //The actual JSON Object data required for this to work is coming from our json.js file
		  //Store the JSON Object into Local Storage
		  for(var n in json){
			  var id  = Math.floor(Math.random()*10000001);
			  localStorage.setItem(id, JSON.stringify(json[n]));
		  }
	  },
      
      	  
	  // Edits an Item from the list 
	  editItem : function (){
	         console.log("editing items");
		  //Grab the data from our item from Local Storage
		  var value = localStorage.getItem(this.key);							//gets the item the selected key item from localStorage
		  var item = JSON.parse(value);											//parses the retrieved value

		  if ($('#groups') != null){
		    
			  //populate the form fields with current localStorage values.
			  
			     //Populate the form fields with the current localStorage values.
			     
			  $('#groups').val(item.publisher[1]);								//gets the stored key value of publisher
			  $('#cname').val(item.cname[1]);								    //gets the stored key value of the comic name
			  $('#iname').val(item.iname[1]);								    //gets the stored key value element of issue
			  $('#email').val(item.email[1]);									//gets the stored key value element of email 
			  var radios = document.forms[0].haveit;								//checks the value of the radio stored button value		  		  
			  for(var i=0; i<radios.length; i++){									//itterate the radio set
				  if(radios[i].value == "Yes" && item.haveit[1] == "Yes"){			//checking which values should be set
					  radios[i].setAttribute("checked", "checked");
				  }else if(radios[i].value == "No" && item.haveit[1] == "No"){		//if not yes value set the no value in set
					  radios[i].setAttribute("checked", "checked");
				  }
			  }
			  console.log("need "+item.need[1]);
			  if(item.need[1] == "Yes"){											//reviews the checkbox to see if it should be checked
				  $('#need').setAttribute("checked", "checked");
			  }
			  $('#rating').val(item.rating[1]);							     		//calls the rating value by key
			  document.forms[0].rating.value = item.rating[1];                      //sets the visible rating 
			  $('#date').val(item.date[1]);								     		//gets the date value by key
			  $('#notes').val(item.notes[1]);								    //gets the stored notes value by key
			  
			  //Remove the intial listener from the input 'save comic' button.
			  save.removeEventListener("click", storeData);
			  
			  //change Submit Button value to Edit Button
			  $('#submit').val() = "Edit Comic";
			  var editSubmit = $('#submit');
			  //Save the key value established in this function as a property of the editSubmit event
			  //so we can use that value when we save the data we edited
			  editSubmit.addEventListener("click", validate);						//sets the validate listener to the edit submit
			  editSubmit.key = this.key;	
		  }else{
		    $('#loadarea').load('rel="additem.html" #additem');
		  }										//sets to key to the selected key edited
	  },
	  
	  //Deletes an item from the list
	  deleteItem : function (){
		  var ask = confirm("Are you sure you want to delete this comic?");	    //confirmation to delete the comic
		  if(ask){																//if yes its ok to delete
			  localStorage.removeItem(this.key);								//removed the key from local storage
			  alert("Comic was deleted!!");									    //tells us the comic was deleted
			  //window.location.reload();											//reloads the window
		  }else{
			  alert("Comic was NOT deleted.");								    //Otherwise the comic was not deleted
		  }
	  },																		    //each item in local storage
      
      //Clear all data
      clearLocal : function ()  {
           if(localStorage.length === 0){										//Checks the lenghth of the localStorage
                alert("There is no data to clear.");							//Alert no data to clear
           }else{
               localStorage.clear();											//if length is greater clear them
               alert("All comics deleted.");									//Alert all the comics were deleted
               window.location.reload();										//reload of the window
               return false;													//returns false
           }
       },
         
 
      validate : function (e){														//Validates the input fields
		 //Define the elements we want to check 
		 var getGroup = $('#groups');											//variable of the group of comic names was choosen
		 var getCname = $('#cname');											//variable a name was put in for the comic name
		 var getIname = $('#iname');											//variable to see if an issue number was put in
		 var getEmail = $('#email');											//variable set to field email
		 var getGroupErr = $('#err');
		 
		 //Reset Error Message
		 errMsg.innerHTML = "";
		 getGroupErr.style.border ="none";							         	//comic publisher border set back to orginal type
		 getCname.style.border ="1px solid black";								//comic name border field set back to orginal color
		 getIname.style.border ="1px solid black";								//comic issue name set back to orginal color
		 getEmail.style.border ="1px solid black";								//email border for field set back to orginal color
		 
		 //Get Error Messages
		 var messageAry = [];
		 //Group Validation
		 if(getGroup.value === "-- Choose A Publisher --"){					    //validates the comic publisher
			 var groupError = "Please choose a comic publisher.";				//error message choosing a publisher
			 getGroupErr.style.border ="1px solid red";							//changes the field to show an error
			 messageAry.push(groupError);										//adds the error to the array
		 }
		 
		 //Comic Name Validation
		if(getCname.value === ""){												//validates that a comic name has been added
			 var cNameError = "Please enter a comic name.";						//asking to enter a comic name
			 getCname.style.border ="1px solid red";							//sets the comic name as errored
			 messageAry.push(cNameError);										//adding the item to the error array
		 }
		 
		 //Issue Validation
		 if(getIname.value === ""){												//validates an issue has been added
			 var iNameError = "Please enter a issue number.";					//error text to enter an issue number
			 getIname.style.border ="1px solid red";							//red error for the field value
			 messageAry.push(iNameError);										//adds the error to the error array
		 }
		 
		 //Email Validation
		 var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;				//regular expression to validate the email is in correct format
		 if(!(re.exec(getEmail.value))){										//if the value does not pass the regular expression
			 var emailError = "Please enter a valid email address.";			//creates the error text for the invalid email address
			 getEmail.style.border = "1px solid red";							//sets the field to red for the email address if invalid
			 messageAry.push(emailError);										//puts the error in the error array 
		 }
		 
		 //If there were errors, display them on the screen
		 if(messageAry.length >= 1){
		   for(var i=0, j=messageAry.length; i < j; i++){						//itterate the error array to get the errors out
			   var txt = document.createElement('li');							//creates an li element for the errors text items
			   txt.style.color = "red";
			   txt.innerHTML = messageAry[i];									//puts them in the innerHTML from the array
			   errMsg.appendChild(txt);											//appends the errors list items to the html
		   }
		    e.preventDefault();													//prevents the default
		    return false;														//returns false for validation
		 }else{
			 //If all is ok, save our data. Send the  key value (which came from the editData function).
			 //Remember this key value was passed through the editSubmit event listener as a property.
			 storeData(this.key);
		 }
	 }
	};
     
     //variable defaults
     var comicGroups = ["DC","Marvel","Image","Dark Horse"],   //List of comics to be passed in for the select
         haveitValue,																	   //Holding value for if we have it
         needValue = "No"  																   //default needs appraisal value
         errMsg = $('#errors');
     ;         
     Main.makeComics();															               //calls the function for making the comics list
     
     
     //Set Link & Submit Click Events
     
    
     											
     $('#clearit').bind('click', Main.clearFilter);
     $('#dataLoader').bind('click', Main.getJQData);
     $('#browseDisplayLink').bind('click', Main.getJQData);
     $('#clear').bind('click', Main.clearLocal);
     $('#submit').bind('click', Main.validate);										     //gets the tag id called submit
    
     
     

         
});      

