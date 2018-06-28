var twitchStreamers = ["ESL_SC2", "freecodecamp", "OgamingSC2"];

twitchStreamers.forEach(function(username, index) {
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

/**
 * Prepends 0 to minutes and seconds if the number is less than 10
 * @param  {Number} number
 * @return {Number}
 */
function checkTime(number) {
  if (number < 10) {
    number = "0" + number;
  }
  return number;
}

/**
 * Determines current date
 * @return {String}
 */
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

$("#online").click(function() {
  twitchStreamers.forEach(function(username, index) {
    if ($("#status" + index).text() === "Offline") {
       $("#streamer" + index).hide();
    } else {
      $("#streamer" + index).show();
    }
  })
})

$("#offline").click(function() {
  twitchStreamers.forEach(function(username, index) {
    if ($("#status" + index).text() !== "Offline") {
       $("#streamer" + index).hide();
    } else {
      $("#streamer" + index).show();
    }
  })
})

$("#all").click(function() {
  twitchStreamers.forEach(function(username, index) {
    $("#streamer" + index).show();
  })
})
