//------------------------
// print stream data for a channel from the given array of  streams
//------------------------
function printStream(currentStream){
     // get stream data
     $.getJSON('https://api.twitch.tv/kraken/streams/'+currentStream + '?callback=?',function(data){
    if (Object.keys(data)[0]==="error"){
      //  output string will hold code to print stream data
      // create container to hold data for deleted and non-existent streams
      var output='<div class="closedContainer">';
      // add X in place of a logo
      output+='<i class="fa fa-times fa-3x"></i>';
      output+="<hr>";
      // extract stream name from data and shorten it if it's longer than 20 characters
      var name=data.message.substring(9);
      name=name.substring(0,name.indexOf("'"));
      if (name.length>20) name=name.substr(0,17)+"...";
      // add stream name
      output+='<p class="closedName"><b>'+name+'</b></p>';
      // determine if stream was deleted or it never existed and add to output
      if(data.status===404){
        output +='Never Existed';
      } 
      else {output+='Deleted';}
    // end creation of output string
    output+='</div>';
    // print stream data 
    $("#closed").append(output);
  }//end of if error
    // start creating code to print an offline channel data  
    else if (data.stream===null){
      // get channel details
      $.getJSON(data._links.channel+"?callback=?",function(channelData){
      // make the whole stream info box a link
      output='<a href="'+channelData.url+'" target="_blank">',
      output+='<div class="offlineContainer">';
      //add stream logo (replace it with general twitch logo if it's not available)
      output+='<div class="streamLogo">';
      if (channelData.logo===null) {
       output+='<i class="fa fa-twitch fa-5x"></i>';
      }//end of if logo is null
        else {
          output+='<img src="'+channelData.logo+'" class="img-responsive img-thumbnail">';
          }//end logo
      // add stream name
      output+='</div><hr><p class="offlineName">'+channelData.display_name+'</p>';
      output+='<span class="offlineStatus">Offline</span></div></a>';
      // print stream data
      $("#offline").append(output);
      })//end of getJSON to get channelData
    }// end of stream is null
       else {
         // print online stream data
         // initiate string that will hold stream data code
         // make the stream data container a link
         output='<a href="'+data.stream.channel.url+'" target="_blank">';
         output+='<div class="onlineContainer">';
         // add stream logo (replace with twitch logo if not available)
         output+='<div class="streamLogo">';
         if (data.stream.channel.logo===null) {
       output+='<i class="fa fa-twitch fa-5x"></i>';
      }//end of if logo is null
        else {
          output+='<img src="'+data.stream.channel.logo+'" class="img-responsive img-thumbnail">';
          }//end logo
         // add online status and no of viewers
         output+='</div><span class="onlineStatus">Online: '+data.stream.viewers+'<i class="fa fa-eye"></i></span>';
         // add stream name
         output+='<hr><p class="onlineName">';
         output+=data.stream.channel.display_name+'</p>';
         // add current game and status provided by the streamer
         output+='<p class="onlineInfo"><b>'+data.stream.game+'</b>: '+data.stream.channel.status+'</p>';
         // add a pveview screen shot
         output+='<div class="onlinePreview"><img src="'+data.stream.preview.medium+'" class="img-responsive img-thumbnail"></div>';
         output+='</div></a>';
       // print stream data
      $("#online").append(output);
       }// end of streim is online
 });// end of getJSON 

};
//---------------------------------------------
//------------------------------------------------
// print results for an entered search string
//---------------------------------------
function printSearch(searchString){
     $("#search").show();
     // get stream data
     $.getJSON('https://api.twitch.tv/kraken/streams/'+searchString + '?callback=?',function(dataSearch){
    if (Object.keys(dataSearch)[0]==="error"){
      // create container to hold data for deleted and non-existent streams
      var output='<div class="closedSearchContainer">';
      // add X in place of a logo
      output+='<i class="fa fa-times fa-3x"></i>';
      output+="<hr>";
      // extract stream name from data and shorten it if it's longer than 20 characters
      var name=dataSearch.message.substring(9);
      name=name.substring(0,name.indexOf("'"));
      if (name.length>20) name=name.substr(0,17)+"...";
      // add stream name
      output+='<p class="closedSearchName"><b>'+name+'</b></p>';
      // determine if stream was deleted or it never existed
      if(dataSearch.status===404){
        output +='Never Existed';
      } 
      else {output+='Deleted';}
    // end creation of output string
    output+='</div>';
    // print stream data 
    $("#search").prepend(output);
  }//end of if error
    // start printing an offline channel data  
    else if (dataSearch.stream===null){
      // get channel details
      $.getJSON(dataSearch._links.channel+"?callback=?",function(channelSearchData){
      // start creating output string
      // make the whole stream info box a link
      output='<a href="'+channelSearchData.url+'" target="_blank">',
      output+='<div class="offlineSearchContainer">';
      //add stream logo (replace it with general twitch logo if it's not available)
      output+='<div class="streamLogo">';
      if (channelSearchData.logo===null) {
       output+='<i class="fa fa-twitch fa-5x"></i>';
      }//end of if logo is null
        else {
          output+='<img src="'+channelSearchData.logo+'" class="img-responsive img-thumbnail">';
          }//end logo
      // add stream name
      output+='</div><hr><p class="offlineSearchName">'+channelSearchData.display_name+'</p>';
      output+='<span class="offlineSearchStatus">Offline</span></div></a>';
      // print stream data
      $("#search").prepend(output);
      })//end of getJSON to get channelData
    }// end of stream is null
       else {
         // print online stream data
         // initiate string that will hold stream data code
         // make the stream data container a link
         output='<a href="'+dataSearch.stream.channel.url+'" target="_blank">';
         output+='<div class="onlineSearchContainer">';
         // add stream logo (replace with twitch logo if not available)
         output+='<div class="streamLogo">';
         if (dataSearch.stream.channel.logo===null) {
       output+='<i class="fa fa-twitch fa-5x"></i>';
      }//end of if logo is null
        else {
          output+='<img src="'+dataSearch.stream.channel.logo+'" class="img-responsive img-thumbnail">';
          }//end logo
         // add online status and no of viewers
         output+='</div><span class="onlineSearchStatus">Online: '+dataSearch.stream.viewers+'<i class="fa fa-eye"></i></span>';
         // add stream name
         output+='<hr><p class="onlineSearchName">';
         output+=dataSearch.stream.channel.display_name+'</p>';
         // add current game and status provided by the streamer
         output+='<p class="onlineSearchInfo"><b>'+dataSearch.stream.game+'</b>: '+dataSearch.stream.channel.status+'</p>';
         // add a pveview screen shot
         output+='<div class="onlinePreview"><img src="'+dataSearch.stream.preview.medium+'" class="img-responsive img-thumbnail"></div>';
         output+='</div></a>';
       // print stream data
      $("#search").prepend(output);
       }// end of streim is online
 });// end of getJSON 

};
//---------------------------------------
//  set active button functions
function activeButtonAll(backgrounds,backgroundsHover){
  $("#headerSecond button").css("color","#eee");
  $("#headerSecond button").css("box-shadow","0 0 11px 0 #333 inset");
  $("#headerAll").css("background",backgroundsHover[3]);
  $("#headerAll").css("color","#555");
  $("#headerAll").css("box-shadow","0 0 11px 3px white inset"); 
  $("#headerSearch").css("background",backgrounds[0]);
  $("#headerOnline").css("background",backgrounds[1]);
  $("#headerOffline").css("background",backgrounds[2]);
 };
function activeButtonSearch(backgrounds,backgroundsHover){
  $("#headerSecond button").css("color","#eee");
  $("#headerSecond button").css("box-shadow","0 0 11px 0 #333 inset");
  $("#headerAll").css("background",backgrounds[3]);
  $("#headerSearch").css("background",backgroundsHover[0]);
  $("#headerSearch").css("color","#555");
  $("#headerSearch").css("box-shadow","0 0 11px 3px white inset"); 
  $("#headerOnline").css("background",backgrounds[1]);
  $("#headerOffline").css("background",backgrounds[2]);
};
function activeButtonOnline(backgrounds,backgroundsHover){
  $("#headerSecond button").css("color","#eee");
  $("#headerSecond button").css("box-shadow","0 0 11px 0 #333 inset");
  $("#headerAll").css("background",backgrounds[3]);
  $("#headerSearch").css("background",backgrounds[0]);
  $("#headerOnline").css("background",backgroundsHover[1]);
  $("#headerOnline").css("color","#555");
  $("#headerOnline").css("box-shadow","0 0 11px 3px white inset"); 
  $("#headerOffline").css("background",backgrounds[2]);
};
function activeButtonOffline(backgrounds,backgroundsHover){
  $("#headerSecond button").css("color","#eee");
  $("#headerSecond button").css("box-shadow","0 0 11px 0 #333 inset");
  $("#headerAll").css("background",backgrounds[3]);
  $("#headerSearch").css("background",backgrounds[0]);
  $("#headerOnline").css("background",backgrounds[1]);
  $("#headerOffline").css("background",backgroundsHover[2]);
  $("#headerOffline").css("color","#555");
  $("#headerOffline").css("box-shadow","0 0 11px 3px white inset"); 
};
//----------------------------------
 function showAllStreams(){
   $("#search").show();
   $("#online").show();
   $("#offline").show();
   $("#closed").show();
 }
//-------------------------------

$(document).ready(function(){
// spin refresh button on hover  
  $("#refreshButton").hover(function(){$("#refreshButton").addClass("fa-spin")},function(){$("#refreshButton").removeClass("fa-spin")});
//-------------------------------------------  
// swing magnifying glass on hover
  $("#searchBar button").hover(function(){$("#searchBar button").addClass("animated swing")},function(){$("#searchBar button").removeClass("animated swing")});
//-----------------------------------------
// header button background colors arrays 
  // [search,online,offline,all]  
var backgrounds=["goldenrod","mediumseagreen","indianred","cadetblue"];  
var backgroundsHover=["gold","palegreen","lightpink","lightskyblue"];
//--------------------------------------------
// set all to be the active button
activeButtonAll(backgrounds,backgroundsHover);
// array of stream names
var allStreams= ["freecodecamp", "lirik","ESL_SC2", "OgamingSC2", "cretetion", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas","itshafu","legendarylea","retrogaijin","burkeblack","glhrmzz","omgitsfirefoxx","syndicate","monstercat","brunofin","comster404","AFakeChannel"];
// print all streams
for(var i=0; i<allStreams.length; i++) {
printStream(allStreams[i]);
  }
//----------------------
// detect a search bar input
  $("form").on("submit",function(e){
    e.preventDefault();
    var searchString=document.getElementById("inputString").value;
    // print search result for the given search term
    printSearch(searchString);
    // check if search term is already in the allStreams array
    var j=0;
    var doesntExist=true;
     while (doesntExist && j<allStreams.length) {
       if  (allStreams[j].toLowerCase()===searchString.toLowerCase()) doesntExist=false;
      j++;                                                               
   }
    // if it isn't in add it to the list of streams
    if (doesntExist) allStreams.unshift(searchString);
    // clear the contents of the search bar
    $("input").val("");
  }) //end of form submit
 // detect a refresh button click 
 $("#refresh").on("click",function(){
   // clear existing stream data
   $("#search").html("");
   $("#online").html("");
   $("#offline").html("");
   $("#closed").html("");
   showAllStreams();
   activeButtonAll(backgrounds,backgroundsHover);
   // print data for all streams in the array of streams
   for(var i=0; i<allStreams.length; i++) 
                    printStream(allStreams[i]);
  }) //end of refresh
 //---------------------------------------------------
 // animate header buttons
 $("#headerSecond button").hover(function(){
   $(this).addClass("animated swing");
 },function(){$(this).removeClass("animated swing");})
  //-----------------------------------------------
 // detect a click on search button
 // show search section hide the other sections
  $("#headerSearch").on("click",function(){
   $("#search").show();
   $("#online").hide();
   $("#offline").hide();
   $("#closed").hide();
 // switch the active button to search
    activeButtonSearch(backgrounds,backgroundsHover);
 })//end of click on search
  
   // detect a click on online button
 // show online section hide the other sections
   $("#headerOnline").on("click",function(){
   $("#search").hide();
   $("#online").show();
   $("#offline").hide();
   $("#closed").hide();
    //switch the active button to online
   activeButtonOnline(backgrounds,backgroundsHover);
 })//end of click on online
   
    // detect a click on offline button
 // show offline section hide the other sections
 $("#headerOffline").on("click",function(){
   $("#search").hide();
   $("#online").hide();
   $("#offline").show();
   $("#closed").hide();
   //switch the active button to offline
   activeButtonOffline(backgrounds,backgroundsHover);
 })//end of click on offline
 
  // detect a click on all button
 // show all sections
   $("#headerAll").on("click",function(){
   showAllStreams();
     // switch the active button to all
   activeButtonAll(backgrounds,backgroundsHover);
 })//end of click on search 
//----------------------------
 
 
}); //end of $(document)