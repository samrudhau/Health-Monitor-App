/*
This file simly gets userdata and updates the cards on the dahboard page with DOM.
*/
$.getJSON('/data', function(user) {
    renderCards(user);
});  
function renderCards(user) {
    if (user.userData.date.length > 0)
    {
        var prediction = user.userData.Prediction
        if (prediction == "abnormal") {
            document.getElementById('prediction-card').innerHTML = user.userData.Prediction + " ,there are chances of having arrhythmia";
          } else {
            document.getElementById('prediction-card').innerHTML = user.userData.Prediction;
          }
        document.getElementById('prediction-card').innerHTML = user.userData.Prediction;
        document.getElementById('bodytemp-card').innerHTML = user.userData.BodyTemp[user.userData.BodyTemp.length -1 ];
        document.getElementById('heart-card').innerHTML = user.userData.HeartRate[user.userData.HeartRate.length -1] +" BPM";
        document.getElementById('gender-card').innerHTML = user.userData.gender[user.userData.gender.length -1];
        document.getElementById('age-card').innerHTML = user.userData.age[user.userData.date.length -1];

    }

};