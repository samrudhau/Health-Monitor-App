/*
This file contains the fucntion to render the donut chart using goodgle charts. First, the user data is fetched with
jQuery. Then the age and gender per age are sorted by age. For example, if the user data contains 30
gender of running on 11/15 and 20 gender of running on 11/16, the total gender will be 50 gender and it will be displayed
in the donut chart.
*/
$.getJSON('/data', function(user) {
  var serverUserdata = user.userData;
  var activities = serverUserdata.age;
  var gender = serverUserdata.gender;
  
  /*
  The user data is im the form of 2 arrays, one containing each age enttry and one containing eacb age minuttes entry.
  The format is as such: activites = ['Running', 'Biking', 'Running'] and gender = [30, 45, 30]. The renderie function needs the data to
  be in the form of ageAndgenderPieArray = [['age', 'Time Spent'], [Running, 60], [Biking, 45]]

  
  First an array is creted containing the all activiies and age gender in the user data.
  */
  let activitiesAndgender = [];
  for ( var i = 0; i<activities.length; i++)
  {
    activitiesAndgender[i] = [activities[i], gender[i]];
  }

  // Then recently created array activitiesAndgender is split into 2 seperate arrays that are reduced to unique activities and combined gender. 
  var uniqueageCount = 0;
  let reducedActivites = [];
  let reducedgender = [];

  for (var j = 0; j < activitiesAndgender.length; j++){
    if (reducedActivites.includes(activitiesAndgender[j][0])){
      var combinedgender = Number(reducedgender[reducedActivites.indexOf(activitiesAndgender[j][0])]) + Number( activitiesAndgender[j][1]);
      reducedgender[reducedActivites.indexOf(activitiesAndgender[j][0])] = combinedgender.toString();
    }
    else{
      reducedActivites[uniqueageCount] = activitiesAndgender[j][0];
      reducedgender[uniqueageCount] = activitiesAndgender[j][1];
      uniqueageCount++
    }

  }
  
  /*
  Then a new array of arrays is created called ageAndgenderPieArray. ageAndgenderPieArray has an initial subarray 
  with the labels for the donut chart "age" and "Time Spent". Next ageAndgenderPieArray will contain subarrays
  containing the activty name and time spent. 
  */

  let ageAndgenderPieArray = [];
  ageAndgenderPieArray.push(['age', 'Time Spent']);
  for (var m = 0; m < reducedActivites.length; m++){
    ageAndgenderPieArray.push([reducedActivites[m], parseInt(reducedgender[m]) ]);
  }

  //finally, ageAndgenderPieArray can be passes to renderpie to render the donut chart.
  renderpie(ageAndgenderPieArray);

  
  
});
function renderpie(ageAndgenderPieArray){
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable(ageAndgenderPieArray);

    var options = {
      title: 'Time Spent by age',
      pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
    chart.draw(data, options);
  }
  

  };
