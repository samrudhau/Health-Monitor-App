$.getJSON('/data', function(user) {
  var serverUserdata = user.userData;
  var activities = serverUserdata.activity;
  var minutes = serverUserdata.minutes;
  var i;
  let activitiesAndMinutes = [];
  for (i = 0; i<activities.length; i++)
  {
   
    activitiesAndMinutes[i] = [activities[i], minutes[i]];

  };
  var j; 
  var k = 0;
  let reducedActivites = [];
  let reducedMinutes = [];


  for (var j = 0; j < activitiesAndMinutes.length; j++){
    if (reducedActivites.includes(activitiesAndMinutes[j][0])){
      var int1 =  Number(reducedMinutes[reducedActivites.indexOf(activitiesAndMinutes[j][0])]);
      var int2 = Number( activitiesAndMinutes[j][1]);
      var int3 = int1 + int2; 
      reducedMinutes[reducedActivites.indexOf(activitiesAndMinutes[j][0])] = int3.toString();

    }
    else{
      reducedActivites[k] = activitiesAndMinutes[j][0];
      reducedMinutes[k] = activitiesAndMinutes[j][1];
      k++
    }

  }
  var pc;
  let activityAndMinutesPieArray = [];
  activityAndMinutesPieArray.push(['Activity', 'Time Spent']);
  for (pc = 0; pc < reducedActivites.length; pc++){
    activityAndMinutesPieArray.push([reducedActivites[pc], parseInt(reducedMinutes[pc]) ]);
  }
  console.log(activityAndMinutesPieArray);

  renderpie(activityAndMinutesPieArray);

  
  
});
function renderpie(activityAndMinutesPieArray){
  google.charts.load("current", {packages:["corechart"]});
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable(activityAndMinutesPieArray);

    var options = {
      title: 'Time Spent by Activity',
      pieHole: 0.4,
    };

    var chart = new google.visualization.PieChart(document.getElementById('myPieChart'));
    chart.draw(data, options);
  }
  

  };
