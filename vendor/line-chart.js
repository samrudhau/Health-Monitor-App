
$.getJSON('/data', function(user) {
  let netCals = [];
  let dates = [];
  let dates2 = [];

  var objSentFromSrv = user.userData;
  dates = objSentFromSrv.date;
  dates2 = objSentFromSrv.date;
 
  if (dates.length > 0)
  {
    var i;
  var j;
  for (i=0; i < objSentFromSrv.date.length; i++){
    j = objSentFromSrv.caloriesIn[i] - objSentFromSrv.caloriesOut[i];
    netCals.push(j);
    dates[i] = dates[i].slice(5, 10);
  };

  
  
  var m; 
  let combinedDatesAndCals = [];
  combinedDatesAndCals.push(['dates', 'weight']);
  for (m=0; m<dates.length; m++){
    
    combinedDatesAndCals.push([dates[m], netCals[m]]);

  };
  var g;
  let objectArrayDates = [];
  for(g=0; g<dates2.length; g++){
    
    objectArrayDates.push({date: dates2[g], netCals: netCals[g]});
  };
  objectArrayDates.sort(function(a, b) {
    // convert date object into number to resolve issue in typescript
    return  +new Date(a.date) - +new Date(b.date);
  })

  var ed;
  let sortedDatesadnNetCals = [];
  sortedDatesadnNetCals.push(['date', 'net calories']);
  for(ed = 0; ed < dates2.length; ed++){
    sortedDatesadnNetCals.push([objectArrayDates[ed].date, objectArrayDates[ed].netCals]);

  };
  

  render(sortedDatesadnNetCals);

  }
  else{
    render( [ ['date', 'net calories'], ['No Data', 0] ] );

  };

  
  
});
function render(combinedDatesAndCals){
  google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);

      function drawChart() {
        var data = google.visualization.arrayToDataTable(combinedDatesAndCals);

        var options = {
          title: '',
          hAxis: {title: 'Dates', minValue: 0, maxValue: 15},
          vAxis: {title: 'Net Calories', minValue: 0, maxValue: 15},
          legend: 'none'
        };

        var chart = new google.visualization.ScatterChart(document.getElementById('scatter-plot'));

        chart.draw(data, options);
      }


};
