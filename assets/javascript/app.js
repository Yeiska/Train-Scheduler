
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCxc7j7CoFGTdJR3qaOJCSxg9h4ztbMR9I",
    authDomain: "train-schedule-29380.firebaseapp.com",
    databaseURL: "https://train-schedule-29380.firebaseio.com",
    projectId: "train-schedule-29380",
    storageBucket: "",
    messagingSenderId: "318233659738"
};
firebase.initializeApp(config);
// Create a variable to reference the database
var database = firebase.database();
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency;
var currentTime = moment();
var dateTime = null;
date = null;

// var update = function () {
//     date = moment(new Date());
//     dateTime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
// };

// $(document).ready(function(){
//     datetime = $('#current-status')
//     update();
//     setInterval(update, 1000);
//   });
// Capture Button Click
$(document).on("click", "#add-train", function () {
    event.preventDefault();
    

    trainName = $("#trainName-term").val().trim();
    console.log(trainName);
    destination = $("#destination-term").val().trim();
    console.log(destination);
    var convert = $("#frequencyInput").val().trim();
    var frequency = parseInt(convert);
    console.log(frequency);
    firstTrainTime = $("#firstTrainTime").val().trim();
    console.log(firstTrainTime);

    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(firstTimeConverted);
    var tremainder = diffTime % frequency;
    console.log(tremainder);
    var minutesAway = frequency - tremainder;
    console.log(minutesAway);
    var nextTrain = moment().add(minutesAway, "minutes");
    console.log(nextTrain);

    var nextArrival = moment(nextTrain).format("hh:mm a");
    console.log(nextArrival);
    var nextArrivalUpdate = function () {
        date = moment(new Date())
        dateTime.html(date.format("hh:mm a"));
    }

    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrainTime: firstTrainTime,
        minutesAway: minutesAway,
        nextArrival: nextArrival,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

});

database.ref().on("child_added", function (childSnapshot) {
    
    $("#trainName").append("<tr><td><span> " + childSnapshot.val().trainName) + "</td>" + "</tr>";
    $("#destination").append("<tr><td><span> " + childSnapshot.val().destination) + "</td>" + "</tr>";
    $("#nextArrival").append("<tr><td><span> " + childSnapshot.val().nextArrival)+ "</td>" + "</tr>";
    $("#frequency").append("<tr><td><span> " + childSnapshot.val().frequency) + "</td>" + "</tr>";
    $("#minutesAway").append("<tr><td><span> " + childSnapshot.val().minutesAway)+ "</td>" + "</tr>";

}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
// database.ref().once('value', function(dataSnapshot){ 
//     var trainIndex = 0;

//       dataSnapshot.forEach(
//           function(childSnapshot) {
//               trainIDs[trainIndex++] = childSnapshot.key();
//           }
//       );
//   });