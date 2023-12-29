// import environmental variables from our variables.env file
require('dotenv').config();



// Start our app!
const app = require('./app');


// Start Server
app.set('port', process.env.PORT || 8081);
const server = app.listen(app.get('port'), () => {
  console.log('##########################################################');
  console.log('#####            App SERVER STARTING                 #####');
  console.log('##########################################################\n');
  console.log(`Express running → PORT ${server.address().port}`);
});