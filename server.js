const express = require('express');
const { google } = require('googleapis');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 5000;

app.use(bodyParser.json());

const SCOPES = ['https://www.googleapis.com/auth/calendar'];
const calendarId = 'digvijaynetscript@gmail.com';

const auth = new google.auth.GoogleAuth({
  keyFile: '/netscript1-93f0d27c74df.json',
  scopes: SCOPES,
});

app.post('/create-event', async (req, res) => {
  try {
    const { summary, description, start, end, timeZone } = req.body;

    const client = await auth.getClient();
    const calendar = google.calendar({ version: 'v3', auth: client });

    const event = {
      summary,
      description,
      start: { dateTime: start, timeZone },
      end: { dateTime: end, timeZone },
    };

    const response = await calendar.events.insert({
      calendarId,
      resource: event,
    });

    res.status(200).send(response.data);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).send('Error creating event');
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
