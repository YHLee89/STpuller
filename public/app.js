// define our app and dependencies (remember to include firebase!)
var app = angular.module("viewApp", ["firebase"]);

app.controller("viewCtrl", function($scope, $firebaseArray) {
  var ref = new Firebase("https://boiling-inferno-8480.firebaseio.com/events");
  var contactRef = ref.child("contact");
  var tempRef = ref.child("temperature");
  var motionRef = ref.child("motion");
  // var output_arr = [];
  // contactRef.on("child_added", function(snapshot) {
  //   output_arr.push(snapshot.val().value);
  // }, function (errorObject) {
  //   console.log("The read failed: " + errorObject.code);
  // });
  //$scope.messages = output_arr;
  $scope.messages1 = $firebaseArray(contactRef);
  $scope.messages2 = $firebaseArray(tempRef);
  $scope.messages3 = $firebaseArray(motionRef);

  var tempArr = $firebaseArray(tempRef);
  var initialValue = 0, initialTime = '', initialIndicator = 0;
  var tempValue_prev = 0, tempTime_prev = '';
  var valueDiff = 0, timeDiff = 0;
  tempArr.$loaded().then(function(){
    angular.forEach(tempArr, function(temp){
      if(initialIndicator == 0){
        initialIndicator = 1;
        tempValue_prev = temp.value, initialValue = temp.value;
        tempTime_prev = temp.date, initialTime = temp.date;
      }
      else{
        valueDiff = temp.value - tempValue_prev;
        var prev_date_elem = tempTime_prev.split(/[T,:,.,-]/);
        var curr_date_elem = temp.date.split(/[T,:,.,-]/);
        var prev_date = new Date(prev_date_elem[0], prev_date_elem[1], prev_date_elem[2], prev_date_elem[3], prev_date_elem[4], prev_date_elem[5]);
        var curr_date = new Date(curr_date_elem[0], curr_date_elem[1], curr_date_elem[2], curr_date_elem[3], curr_date_elem[4], curr_date_elem[5]);
        timeDiff = (curr_date - prev_date)/60000;

        tempValue_prev = temp.value, tempTime_prev = temp.date;
      }
      console.log(timeDiff);

    })
  });
});
