/*
This file simly gets userdata and updates the cards on the dahboard page with DOM.
*/

$.getJSON('/data', function(user) {
    renderCards(user);
});  
function renderCards(user) {
    if (user.userData.Date.length > 0)
    {

        if (user.userData.Prediction[user.userData.Prediction.length -1 ] == "Normal") {
          document.getElementById('prediction-card').innerHTML = user.userData.Prediction[user.userData.Prediction.length -1 ];
          } else {
            
            document.getElementById('prediction-card').innerHTML = user.userData.Prediction[user.userData.Prediction.length -1 ] + " ,there are chances of having arrhythmia";
          }
        document.getElementById('bodytemp-card').innerHTML = user.userData.BodyTemp[user.userData.BodyTemp.length -1 ];
        document.getElementById('heart-card').innerHTML = user.userData.HeartRate[user.userData.HeartRate.length -1] +" BPM";
        document.getElementById('gender-card').innerHTML = user.gender;
        document.getElementById('age-card').innerHTML = user.age;

    }

};