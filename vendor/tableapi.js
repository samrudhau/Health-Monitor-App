$.getJSON('/data', function(user) {
  var objSentFromSrv = user;
  //console.log("obj from serveer");
  //console.log(objSentFromSrv);
  //console.log(objSentFromSrv.userData);
  const entries = objSentFromSrv.userData;
  //console.log(entries);
  var array = [];

  var i;
  for (i=0; i<entries.date.length; i++){
    var userdataobject = {date:"", activity:"", minutes:0, weight:0, caloriesIn: 0, caloriesOut: 0};
    array.push(userdataobject);
    array[i].date = entries.date[i];
    array[i].activity = entries.activity[i];
    array[i].minutes = entries.minutes[i];
    array[i].weight = entries.weight[i];
    array[i].caloriesIn = entries.caloriesIn[i];
    array[i].caloriesOut = entries.caloriesOut[i];
  };

  get(array, user);
});

function get(data, user){
  

  //console.log(data); 
  var container = document.getElementById('table');
  var hot = new Handsontable(container, {
    data: data,
    rowHeaders: false,
    colHeaders: true,
    filters: true,
    dropdownMenu: false,
    colHeaders: ['Date', 'Activity', 'Minutes', 'Weight', 'Calorie In', 'Calorie Out'],
    licenseKey: 'non-commercial-and-evaluation',
    afterChange: function (change, source) { //added cpde
      if (source === 'loadData') {
        return; //don't save this change
      };
      //console.log(change);
      //console.log(change[0]);
      var changeArray = change[0];
      //console.log(changeArray[1]);
      var changeAttribute = changeArray[1];
      var changeAttributeValue = changeArray[0]
      //console.log(x);
     // console.log(user.userData[x][y]);
      user.userData[changeAttribute][changeAttributeValue] = changeArray[3];
      console.log(user);
      console.log(JSON.stringify(user));
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
  //console.log(activityAndMinutesPieArray);

  renderpie(activityAndMinutesPieArray);
  renderCards(user);
      



    }


  });
  
    
  };