 
$(document).ready(function(){

 SC.initialize({
   client_id: 'f665fc458615b821cdf1a26b6d1657f6'
 });

});


var jukebox = new JukeBox();


function JukeBox(){
 this.songs =[]; 
 this.current_Song_index = 0; 
 this.song_w_methods;

 this.search=function(keyword){
   var that = this;
   keyword= $("#search").val();
   console.log("keyword is:  "+ keyword);
   SC.get("/tracks", {q: keyword }).then(function(response){
     that.songs = response;
   });
 }

 this.play=function(){
   var target=this.songs[this.current_Song_index];
   console.log("play() fires and playing " + this.songs[this.current_Song_index].title);
   $("#artist").html(target.user.username);
   $("#title").html(target.title);
   $("#description").html(target.description);
   SC.stream( '/tracks/' + this.songs[this.current_Song_index].id ).then(function(player){
     this.song_w_methods=player;
     this.song_w_methods.play();
     this.song_w_methods.on("finish",function(){
       this.next();
     });
   });
 }


 this.playNext=function(){
   if (this.current_Song_index===this.songs.length-1){
     this.current_Song_index=0;
     this.play();
   }
   else {
     this.current_Song_index+=1;
     this.play();
   }
 }
this.pause=function(){
   console.log("pause() fired");
   song_w_methods.pause();
 }

 this.random=function(){
   console.log("array length = " + this.songs.length);
   var rand_num = Math.floor((Math.random() * this.songs.length) + 1);
   console.log("random num = "+ rand_num);
   this.current_Song_index=rand_num;
   this.play();
 }

}

 console.log("connection made: ");
//  juke = new JukeBox();



