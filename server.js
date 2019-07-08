const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;




app.use(bodyParser.json());

const publicVapidKey = "BGVE4HInrOd3_J9837n4wLPexqzEd5S-s8tvA-7QcqaI3rwexbrDU41aNmt-RMZxB6nOkSNOeWm5bIawUyqSPBM";
const privateVapidKey = "hxtZw4N1w2nnBMv3pglgGCtk9wRp_M0_hyg9gCneTq0";

webPush.setVapidDetails('mailto:colin.franceschini@gmail.com', publicVapidKey, privateVapidKey);

// Subscribe route
app.post('/subscribe', (req, res) => {
  // get push subscription object
  const subscription = req.body;
  //send 201 - resource created
  res.status(201).json({});
  // create payload
  const payload = JSON.stringify({title: 'push test'});
  webpush.sendNotification(subscription, payload).catch(err => console.error(err));
});


app.listen(port, () => console.log(`Listening on port ${port}`));
