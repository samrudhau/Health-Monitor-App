/*
This file contains the code that will display the table, the functions to update the table, and removing rows (deleting an entrty).
Handsontable is used for all the table functions. To see the full Handsontable documentation, visit https://handsontable.com/docs/8.2.0/tutorial-introduction.html .
*/
$.getJSON('/data', function(user) {
  const entries = user.userData;
  const entryDates = user.userData.date;
  var newDateFormat = [];
  /*
  The table will require dates to be in the MM/DD/YYYY format. In the database and in all other files, date is used in the YYYY-MM-DD format.
  Thus, the date format has to be modified.
  */
  function formatDate(inputDate) {
    var date = new Date(inputDate);
    date.setDate(date.getDate() + 1);
    if (!isNaN(date.getTime())) {
        var day = date.getDate().toString();
        var month = (date.getMonth() + 1).toString();
        // Months use 0 index.

        return (month[1] ? month : '0' + month[0]) + '/' +
           (day[1] ? day : '0' + day[0]) + '/' + 
           date.getFullYear();
    }
  }

  for (var i = 0; i<entryDates.length; i++)
  {
    newDateFormat[i] = formatDate(entryDates[i]);
  }
  entries.date = newDateFormat;
  var userDataArray = [];

  /*
  After the date is modified, the user data has to be converted from an object of arrays into an array of objects before it can be passde
  to the Handson table function.
  */
  for (var i=0; i<entries.date.length; i++){
    var userdataobject = {date:"", age:"", gender:0, weight:0, BodyTemp: 0, HeartRate: 0};
    userDataArray.push(userdataobject);
    userDataArray[i].date = entries.date[i];
    userDataArray[i].age = entries.age[i];
    userDataArray[i].gender = entries.gender[i];
    userDataArray[i].weight = entries.weight[i];
    userDataArray[i].BodyTemp = entries.BodyTemp[i];
    userDataArray[i].HeartRate = entries.HeartRate[i];
  };

  
  renderTable(userDataArray, user);
});

function renderTable(data, user){
  
  /*
    The following functions are used for data validation when changes are made to the tabe. 
  */
  weightValidator = function (value, callback) {
    setTimeout(function(){
      if (value > 50 && value < 1000) {
        callback(true);
      }
      else {
        callback(false);
      }
    }, 200);
  };

  genderValidator = function (value, callback) {
    setTimeout(function(){
      if (value > 0 && value <= 600) {
        callback(true);
      }
      else {
        callback(false);
      }
    }, 200);
  };

  BodyTempValidator = function (value, callback) {
    setTimeout(function(){
      if (value > 0 && value <= 6000) {
        callback(true);
      }
      else {
        callback(false);
      }
    }, 200);
  };

  HeartRateValidator = function (value, callback) {
    setTimeout(function(){
      if (value > 0 && value <= 6000) {
        callback(true);
      }
      else {
        callback(false);
      }
    }, 200);
  };

  /*
  Then the options for the Handsontable are defined
  */
  var container = document.getElementById('table');
  var hot = new Handsontable(container, {
    data: data,
    rowHeaders: false,
    colHeaders: true,
    filters: true,
    dropdownMenu: false,
    contextMenu: {
      /*
        The contectMenu is a drop-down menu that is diplayed when the user right clicks on a row. The menu contains one option, remove row.
      */
      callback: function (key, selection, clickEvent) {
        /*
        If the user selects to remove a row, all the data (date, age, weight, etc. ) need to be removed from that row.
        */
       
        user.userData.date.splice(selection[0].end.row, 1);
        user.userData.age.splice(selection[0].end.row, 1);
        user.userData.weight.splice(selection[0].end.row, 1);
        user.userData.gender.splice(selection[0].end.row, 1);
        user.userData.BodyTemp.splice(selection[0].end.row, 1);
        user.userData.HeartRate.splice(selection[0].end.row, 1);
        
        /*
        Once all the data in the row is removed, the charts and cards need to be updated.
        */
        updateEverything(user);

      },
      items: {
        "remove_row": {
          name: 'Remove this Entry'
        }
      }
    },
    colHeaders: ['Date', 'age', 'gender', 'Weight', 'Body Temperature', 'Heart Rate'],
    colWidths: [125, 125, 90, 90, 150, 100],
    columns: [
      {data: 'date', type: 'date', dateFormat: 'MM/DD/YYYY', correctFormat: true},
      {data: 'age', type: 'text'},
      {data: 'gender',validator: genderValidator, allowInvalid: true},
      {data: 'weight', validator: weightValidator, allowInvalid: true},
      {data: 'BodyTemp', validator: BodyTempValidator, allowInvalid: true},
      {data: 'HeartRate', validator: HeartRateValidator, allowInvalid: true},
    ],
    licenseKey: 'non-commercial-and-evaluation',
    afterChange: function (change, source) { 
      if (source === 'loadData') {
        return; 
      };
      /* 
      The changes made to the table need to be checked for validation.
      If the table is valid after changes, the database needs to be updated and the charts and cards need to be rendered again.
      */
      hot.validateCells(function(valid) {
        if (valid) {
              var changeArray = change[0];
              var changeAttribute = changeArray[1];
              var changeAttributeValue = changeArray[0];

              // convert date from MM/DD/YYYY to YYYY-MM-DD
              if (changeAttribute == "date"){
                changeArray[3] = changeArray[3].replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
              }
              else
              {
                changeArray[3] = changeArray[3].toString();
              }
              user.userData[changeAttribute][changeAttributeValue] = changeArray[3];
              //update everything
              updateEverything(user);
        }
        else {
        console.log("invalid");
        }
      });
      
      
    }

  });
  
  };
  /*
  The updateEverything fuction calls on the will update the database with a jQuerey post function, the donut chart with the
 rederpie function from the pie-chart.js file, the scatterplot with the render function from the line-chart.js file, and the 
 stats cards with the renderCards funtion from the stats-card.js file.
  */
  function updateEverything (user)  {
    /*
    The date needs to be converted back to the YYYY-MM-DD format.
    */
    const unformatedDtaes = user.userData.date;
    var formatedDates = [];
    for (var i = 0; i < user.userData.date.length; i++){
      if(unformatedDtaes[i].includes("/") )
        {
          formatedDates[i] = unformatedDtaes[i].replace(/(\d\d)\/(\d\d)\/(\d{4})/, "$3-$1-$2");
         }
      else{
          formatedDates[i] = unformatedDtaes[i];
          }
              
    };
    user.userData.date = formatedDates;
    /*
    Once the date is roperly formated, the updated data needs to be sent to the database through the update route from table.js.
    */
    $.ajax({
      url: '/tables/Update',
      type: 'post',
      data: JSON.stringify(user),
      contentType: "application/json",
      dataType:'json',
      });
      /*
       Now, the cards and charts need to be updated. The data will be processed just as it is in the cards.js, line-chart.js, and 
       pie-chart,js files. Then the render(), renderCards(), and renderpie() functions are called to update the charts and cards.
       */
      let dates = [];
      dates = user.userData.date;
      if (dates.length > 0)
      {
        let combinedDatesAndCals = [];
        combinedDatesAndCals.push(['dates', 'weight']);
        for (var i=0; i < dates.length; i++){
        var net = user.userData.BodyTemp[i] - user.userData.HeartRate[i];
        var dateString = dates[i].split('-');
        var date = new Date(dateString[0], dateString[1]- 1, dateString[2]);
        combinedDatesAndCals.push([ date, net ]);
         };
        render(combinedDatesAndCals);
        };
        var serverUserdata = user.userData;
        var activities = serverUserdata.age;
        var gender = serverUserdata.gender;
        let activitiesAndgender = [];
        for (var i = 0; i<activities.length; i++)
        {
          activitiesAndgender[i] = [activities[i], gender[i]];
        };

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
            uniqueageCount++;
          }

        }
          
        let ageAndgenderPieArray = [];
        ageAndgenderPieArray.push(['age', 'Time Spent']);
        for (var i = 0; i < reducedActivites.length; i++){
          ageAndgenderPieArray.push([reducedActivites[i], parseInt(reducedgender[i]) ]);
        }

        renderpie(ageAndgenderPieArray);
        renderCards(user);

  };