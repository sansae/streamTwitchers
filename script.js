/*use this api url to find out if twitch user is offline or not; if offline, we should see "stream: null"; if not, we'll see all the other data*/
// https://wind-bow.glitch.me/twitch-api/streams/freecodecamp

/*this api url gives general info about twitch user regardless of their online status*/
//https://wind-bow.glitch.me/twitch-api/channels/freecodecamp

/*to account for streamers that are offline, do the following:*/
//first, make api call to "streams" api
//then, inside success, do
//if (stream value === null) {
//  $("#status").html("offline");
//} else {
//  make api call to "channels" api
//}

$("button").click(function(){
  $.ajax({
    url: 'https://wind-bow.glitch.me/twitch-api/channels/freecodecamp',
    success: function(data) {
      console.log(JSON.stringify(data, undefined, 2));
      var name = data.display_name
      var game = data.game;
      var status = data.status;
      var logo = data.logo;
      var url = data.url;
      $("#name").html("<a target='_blank' href=" + url + ">" + name + "</a>");
      $("#status").html(game + ": " + status);
      var img = new Image();
      img.src = logo;
      $("#logo").html(img);
    },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus); alert("Error: " + errorThrown);
    }
  });
})





/***********************/
/*ajax call below works*/
/***********************/
// $("button").click(function(){
//   $.ajax({
//     type: 'GET',
//     url: 'https://api.twitch.tv/kraken/channels/freecodecamp',
//     headers: {
//       'Client-ID': 'axjhfp777tflhy0yjb5sftsil'
//     },
//     success: function(data) {
//       console.log(JSON.stringify(data, undefined, 2));
//       var name = data.display_name
//       var status = data.status;
//       var logo = data.logo;
//       var url = data.url;
//       $("#name").html("<a target='_blank' href=" + url + ">" + name + "</a>");
//       $("#status").html(status);
//       var img = new Image();
//       img.src = logo;
//       $("#logo").html(img);
//     },
//     error: function(XMLHttpRequest, textStatus, errorThrown) {
//       alert("Status: " + textStatus); alert("Error: " + errorThrown);
//     }
//   });
// })






function startTime() {
  var today = new Date();
  var hour = today.getHours();
  var minute = today.getMinutes();
  var second = today.getSeconds();
  minute = checkTime(minute);
  second = checkTime(second);
  var amPm = hour >= 12 ? "PM" : "AM";
  if (hour === 0) {
    hour = 12;
  } else if (hour > 12) {
    hour = hour % 12;
  }
  document.getElementById('txt').innerHTML = displayDate() + " -- " + hour + ":" + minute + ":" + second + " " + amPm + " PT";
  var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function displayDate() {
  var currentDate = new Date();
  var months = ['December', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturda'];

  var dayOfWeek = days[currentDate.getDay()];
  var month = months[currentDate.getMonth()];
  var dayOfMonth = currentDate.getDate();
  var year = currentDate.getFullYear();

  return dayOfWeek + ", " + month + " " + dayOfMonth + ", " + year;
}
