$("button").click(function(){
  var twitchUsers = ["ESL_SC2", "freecodecamp", "RobotCaleb"];
  twitchUsers.forEach(function(username, index) {
    $.ajax({
      url: 'https://wind-bow.glitch.me/twitch-api/channels/' + username,
      success: function(data) {
        var logo = data.logo;
        var name = data.display_name;
        var game = data.game;
        var status = game + ": " + data.status;
        var url = data.url;
        var img = new Image();
        img.src = logo;

        var img = new Image();
        img.src = logo;
        $("#logo" + index).html(img);
        $("#name" + index).html("<a target='_blank' href=" + url + ">" + name + "</a>");

        $.ajax({
          url: "https://wind-bow.glitch.me/twitch-api/streams/" + username,
          success: function(data) {
            if (data.stream === null) {
              $("#status" + index).html("Offline");
            } else {
              $("#status" + index).html(status);
            }
          },
          error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("Status: " + textStatus);
            alert("Error:" + errorThrown);
          }
        });
      },
      error: function(XMLHttpRequest, textStatus, errorThrown) {
      alert("Status: " + textStatus); alert("Error: " + errorThrown);
      }
    });
  });
})

function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

function displayDate() {
  var currentDate = new Date();
  var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  var dayOfWeek = days[currentDate.getDay()];
  var month = months[currentDate.getMonth()];
  var dayOfMonth = currentDate.getDate();
  var year = currentDate.getFullYear();

  return dayOfWeek + ", " + month + " " + dayOfMonth + ", " + year;
}


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
  document.getElementById('dateAndTime').innerHTML = displayDate() + " -- " + hour + ":" + minute + ":" + second + " " + amPm + " PT";
  var t = setTimeout(startTime, 500);
}
