/*
This file simly gets userdata and updates the cards on the dahboard page with DOM.
*/
$.getJSON('/data', function(user) {
    renderCards(user);
});  
function renderCards(user) {
    if (user.userData.date.length > 0)
    {
        var curresntUserCalories = user.userData.BodyTemp[user.userData.HeartRate.length -1 ] - user.userData.HeartRate[user.userData.HeartRate.length -1];
        document.getElementById('calorie-card').innerHTML = curresntUserCalories;
        var curresntUserWeigth = user.userData.weight[user.userData.weight.length -1];
        curresntUserWeigth = curresntUserWeigth + " lbs";
        document.getElementById('weight-card').innerHTML = curresntUserWeigth;
        var currentUsergender = user.userData.gender[user.userData.gender.length -1];
        currentUsergender = currentUsergender + " gender"
        document.getElementById('age-card').innerHTML = currentUsergender;
        var latestEntry = user.userData.date[user.userData.date.length -1];
        var latestEntryReorganized = latestEntry.substring(5, 7) + "-" + latestEntry.substring(8, 10) + "-" + latestEntry.substring(0,4);
        document.getElementById('date-card').innerHTML = latestEntryReorganized;

    }

};