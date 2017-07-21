## Appointment Reminder Node Example

[![Build Status](https://travis-ci.org/BandwidthExamples/node-appointment-reminder.svg?branch=master)](https://travis-ci.org/BandwidthExamples/node-appointment-reminder)

Bandwidth Voice  API Sample App for Call Tracking, see http://ap.bandwidth.com/

## Prerequisites
- Configured Machine with Ngrok/Port Forwarding
  - [Ngrok](https://ngrok.com/)
- [Bandwidth Account](https://catapult.inetwork.com/pages/signup.jsf/?utm_medium=social&utm_source=github&utm_campaign=dtolb&utm_content=_)
- [NodeJS 8+](https://nodejs.org/en/)
- [Git](https://git-scm.com/)


## Build and Deploy

### One Click Deploy

#### Settings Required To Run
* ```Bandwidth User Id```
* ```Bandwidth Api Token```
* ```Bandwidth Api Secret```

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Run

### Directly

```bash
cd AppointmentReminder

export BANDWIDTH_USER_ID=<YOUR-USER-ID>
export BANDWIDTH_API_TOKEN=<YOUR-API-TOKEN>
export BANDWIDTH_API_SECRET=<YOUR-API-SECRET>
npm install # to install dependencies

npm start # to start web app

# in another terminal
npm run scheduler # to start scheduler

# then open external access to this app (for example via ngrok)
# ngrok http 8080

# Open in browser url shown by ngrok

```

### Via Docker

```bash
# fill .env file with right values
# vim ./.env

# then run the app (it will listen port 8080)
PORT=8080 docker-compose up -d

# open external access to this app (for example via ngrok)
# ngrok http 8080

# Open in browser url shown by ngrok

```

