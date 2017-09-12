// https://wind-bow.glitch.me/twitch-api

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  var amPm = h >= 12 ? "PM" : "AM";
  if (h === 0) {
    h = 12;
  } else if (h > 12) {
    h = h % 12;
  }
  document.getElementById('txt').innerHTML = displayDate() + " -- " + h + ":" + m + ":" + s + " " + amPm + " PT";
  var t = setTimeout(startTime, 500);
}

function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
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
