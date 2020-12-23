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
3. Replace the connection string in the main.js file with your connection string.
4. It should look like: <code>const mongourl = 'mongodb+srv://<yourName>:<password>@cluster0.wdcoc.mongodb.net/<dbname>?retryWrites=true&w=majority';</code>


## Walkthrough 

### Create Account 
<img src="public/images/create-account.png"  width="600">

### Login 
<img src="public/images/login.png"  width="600">

### My Health Data
<img src="public/images/dashboard1.png" width="600">
<img src="public/images/dashboard2.png"  width="600">
<img src="public/images/dashboard3.png"  width="600">
<img src="public/images/dashboard4.png"  width="600">

### Forgot Password
<img src="public/images/forgot-password.png" width="600">
