
$.getJSON('/data', function(user) {
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
          hAxis: {title: 'Dates', format: 'd MMM yyyy'},
          vAxis: {title: 'Net Calories'},
          legend: 'none'
        };
        var chart = new google.visualization.ScatterChart(document.getElementById('scatter-plot'));
        chart.draw(data, options);
      }
};
