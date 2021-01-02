# Health Monitor App
![GitHub contributors](https://img.shields.io/github/contributors/farzinadil/Health-Monitor-App?color=green&style=plastic) ![GitHub forks](https://img.shields.io/github/forks/farzinadil/Health-Monitor-App?color=green&label=Forks&style=plastic) ![GitHub commit activity](https://img.shields.io/github/commit-activity/y/farzinadil/Health-Monitor-App?style=plastic) ![GitHub language count](https://img.shields.io/github/languages/count/farzinadil/Health-Monitor-App?style=plastic) ![GitHub watchers](https://img.shields.io/github/watchers/farzinadil/Health-Monitor-App?style=plastic) ![GitHub package.json version](https://img.shields.io/github/package-json/v/farzinadil/Health-Monitor-App?style=plastic)

## About
Cross-Platform Electron Desktop Application that allows users to monitor health and fitness data.

Allows users to enter calories in, calories out, weight, and exercise name and time. Displays net calories on a scatter lot and activities on a donut chart. Allows users to register, reset their password, or log in with username and password on startup.

Uses MongoDB Atlas to store user data.

## Getting Started

### To run:
1. Clone the repository
2. <code>npm install</code>
3. <code>npm start</code>

### Package and distribute the application:
1. <code>npx @electron-forge/cli import</code>
2. <code>npm run make</code>


For more information, see https://www.electronjs.org/docs/tutorial/quick-start#package-and-distribute-the-application. 

### Use your own cloud database:
1. Create your own cluster with MongoDB Atlas
2. On your cluster, click connect. Then click connect your application. Copy your connection string.
3. Replace the connection string on line 1 of the main.js file with your connection string.
4. It should look like: 
```javascript
const mongourl = 'mongodb+srv://Nmae:password@cluster0.wdcoc.mongodb.net/dbname?retryWrites=true&w=majority';
```


## Walkthrough 

### Create Account 
<img src="public/images/create-account.png"  width="600">
If you are using the application for the first time, create an account.


### Login 
<img src="public/images/login.png"  width="600">
If you have already created an account, you can login with your username and password.


### Dashboard
<img src="public/images/dashboard1.png" width="600">
Here you can see your see your recently entered health data in the cards on top. The net calories scatterplot shows the net calories for each entered date. The activity donut chart shows the time spent by activity.


<img src="public/images/dashboard2.png"  width="600">
Scrolling down, you can see a form to enter health data for a specific day. The table contains all previous entries. 


<img src="public/images/dashboard3.png"  width="600">
Data entred previously can be modified in the table. The date can be modified by clicking on the date that needs to be modified and selecting a new one from the drop-down date selector. Other metrics can also be modified by tying in a new value. Once the table is modified, the database will be updated and the charts and cards will be updated.


<img src="public/images/dashboard4.png"  width="600">
If an invalid value in entered in the table, the cell will be highlited in red. The databbase and charts will not be udated.


<img src="public/images/dashboard5.png"  width="600">
To remove a row, right click over the row and select Remove this Entry.


### Forgot Password
<img src="public/images/forgot-password.png" width="600">
To reset password, select forgot password from the login screen and follow the instructions.
