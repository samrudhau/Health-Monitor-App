$.getJSON('/data', function(user) {
  const entries = user.userData;
  var userDataArray = [];

  
  for (var i=0; i<entries.date.length; i++){
    var userdataobject = {date:"", activity:"", minutes:0, weight:0, caloriesIn: 0, caloriesOut: 0};
    userDataArray.push(userdataobject);
    userDataArray[i].date = entries.date[i];
    userDataArray[i].activity = entries.activity[i];
    userDataArray[i].minutes = entries.minutes[i];
    userDataArray[i].weight = entries.weight[i];
    userDataArray[i].caloriesIn = entries.caloriesIn[i];
    userDataArray[i].caloriesOut = entries.caloriesOut[i];
  };

  get(userDataArray, user);
});

function get(data, user){

  var container = document.getElementById('table');
  var hot = new Handsontable(container, {
    data: data,
    rowHeaders: false,
    colHeaders: true,
    filters: true,
    dropdownMenu: false,
    colHeaders: ['Date', 'Activity', 'Minutes', 'Weight', 'Calorie In', 'Calorie Out'],
    licenseKey: 'non-commercial-and-evaluation',
    afterChange: function (change, source) { 
      if (source === 'loadData') {
        return; 
      };
      var changeArray = change[0];
      var changeAttribute = changeArray[1];
      var changeAttributeValue = changeArray[0]
      user.userData[changeAttribute][changeAttributeValue] = changeArray[3];

      $.ajax({
        url: '/tables/Update',
        type: 'post',
        data: JSON.stringify(user),
        contentType: "application/json",
        dataType:'json',
      });
      let dates = [];
      dates = user.userData.date;
     
      if (dates.length > 0)
      {
        let combinedDatesAndCals = [];
        combinedDatesAndCals.push(['dates', 'weight']);
        for (var i=0; i < dates.length; i++){
          var net = user.userData.caloriesIn[i] - user.userData.caloriesOut[i];
          var dateString = dates[i].split('-');
          var date = new Date(dateString[0], dateString[1]- 1, dateString[2]);
          combinedDatesAndCals.push([ date, net ]);
        };
        render(combinedDatesAndCals);
      }
  var serverUserdata = user.userData;
  var activities = serverUserdata.activity;
  var minutes = serverUserdata.minutes;
  let activitiesAndMinutes = [];
  for (var i = 0; i<activities.length; i++)
  {
    activitiesAndMinutes[i] = [activities[i], minutes[i]];
  };

  var uniqueActivityCount = 0;
  let reducedActivites = [];
  let reducedMinutes = [];


  for (var j = 0; j < activitiesAndMinutes.length; j++){
    if (reducedActivites.includes(activitiesAndMinutes[j][0])){
      var combinedMinutes = Number(reducedMinutes[reducedActivites.indexOf(activitiesAndMinutes[j][0])]) + Number( activitiesAndMinutes[j][1]);
      reducedMinutes[reducedActivites.indexOf(activitiesAndMinutes[j][0])] = combinedMinutes.toString();

    }
    else{
      reducedActivites[uniqueActivityCount] = activitiesAndMinutes[j][0];
      reducedMinutes[uniqueActivityCount] = activitiesAndMinutes[j][1];
      uniqueActivityCount++;
    }

  }
  
  let activityAndMinutesPieArray = [];
  activityAndMinutesPieArray.push(['Activity', 'Time Spent']);
  for (var i = 0; i < reducedActivites.length; i++){
    activityAndMinutesPieArray.push([reducedActivites[i], parseInt(reducedMinutes[i]) ]);
  }

  renderpie(activityAndMinutesPieArray);
  renderCards(user);
      
    }

  });
  
  };