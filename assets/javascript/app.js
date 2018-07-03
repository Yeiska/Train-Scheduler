
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
var frequency = 0;
var currentTime = moment();
var dateTime = null;
date = null;

var update = function () {
    date = moment(new Date())
    dateTime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

// $(document).ready(function(){
//     dateTime = $()
// })
// Capture Button Click
$(document).on("click", "#add-train", function () {
    event.preventDefault();
    

    trainName = $("#trainName-term").val().trim();
    console.log(trainName);
    destination = $("#destination-term").val().trim();
    console.log(destination);
    frequency = $("#frequency").val().trim();
    console.log(frequency);
    firstTrainTime = $("#firstTrainTime").val().trim();
    console.log(firstTrainTime);

    var firstTimeConverted = moment(firstTrainTime, "hh:mm").subtract(1, "years");

    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");

    var tremainder = diffTime % frequency;

    var minutesAway = frequency - tremainder;

    var nextTrain = moment().add(minutesAway, "minutes");

    var nextArrival = moment(nextTrain).format("hh:mm a");

    // var nextArrivalUpdate = function () {
    //     date = moment(new Date())
    //     dateTime.html(date.format("hh:mm a"));
    // }

    database.ref().push({
        trainName: trainName,
        destination: destination,
        frequency: frequency,
        firstTrainTime: firstTrainTime,
        //minutesAway: minutesAway,
        nextArrival: nextArrival,
        dateAdded: firebase.database.ServerValue.TIMESTAMP

    });

});

database.ref().on("child_added", function (childSnapshot) {
    //console.log(childSnapshot.val().trainName);
    //console.log(childSnapshot.val().destination);
    //console.log(childSnapshot.val().frequency);
    //console.log(childSnapshot.val().monthly);

    var newtr = $("<tr>");
    var trainNametd = $("<td>").text(childSnapshot.val().trainName);
    var destinationtd = $("<td>").text(childSnapshot.val().destination);
    var datetd = $("<td>").text(moment(childSnapshot.val().date).format("MMM Do YYYY"));
    var workedtd = $("<td>").text(moment(childSnapshot.val().date).diff(moment(), "months") * -1);
    var frequencytd = $("<td>").text(childSnapshot.val().frequency);

    newtr.append(trainNametd);
    newtr.append(destinationtd);
    newtr.append(frequencytd);
    newtr.append(workedtd);
    newtr.append(datetd);

    $(".card-body").append(newtr);


}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
// database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
//     // Change the HTML to reflect
//     $("#trainName").text(snapshot.val().trainNametd);
//     $("#destination").text(snapshot.val().destinationtd);
//     $("#frequency").text(snapshot.val().frequencytd);
//     //$("#nextArrival").text(snapshot.val().comment);
//   });