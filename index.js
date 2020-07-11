const Discord = require('discord.js');
const client = new Discord.Client();

// For tests only :
// const process = require('./ProcessEnv.js');

const firebase = require('firebase/app');
require('firebase/database');
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "adel-bot.firebaseapp.com",
    databaseURL: "https://adel-bot.firebaseio.com",
    projectId: "adel-bot",
    storageBucket: "adel-bot.appspot.com",
    messagingSenderId: "904980287998",
    appId: "1:904980287998:web:c7ca4f0e5d2e12872db0af"
};
firebase.initializeApp(firebaseConfig);

const AdelBot = require('./class/AdelBot');
const adelBot = new AdelBot();

client.on('ready', () => {
    sendMessageEachDay();
});

/**
 * From monday to friday, morning and afternoon, a message will be sent each day to all users on a specific channel, to reminds them to log in ADEL.
 * The message will be automatically deleted after 15 minutes.
 * You can change the parameters to match your configuration, and specify the channel, the hours, the url to log in and some sentences as funny reminders.
 * To find the channel's ID, just mention it in Discord with a backslash in front of the mention.
 */
function sendMessageEachDay() {
    const channel = client.channels.cache.get(adelBot.params.channelId);

    console.log('****************');
    console.log('Starting program');
    console.log('****************');

    adelBot.setTargetDate().then(() => {
        adelBot.logEvents([
            'The next alert will start at : ' + adelBot.targetDateStart.toLocaleString(),
            'The next alert will end at : ' + adelBot.targetDateEnd.toLocaleString()
        ]);

        if (channel !== undefined && ![6, 0].includes(adelBot.targetDateStart.getDay())) {
            // If the program was rebooted between date start and date end
            if ((Date.now() >= adelBot.targetDateStart && Date.now() < adelBot.targetDateEnd) && adelBot.programStarted) {
                // Go to database to check if a message was already sent
                firebase.database().ref('alert-message').on('value', (data) => {
                    if (adelBot.programStarted) {
                        adelBot.programStarted = false;
                        adelBot.logEvents(['The program has been rebooted.']);
                        adelBot.alertMessage = data.val();

                        // If the message was already sent :
                        if (adelBot.alertMessage.messageSent === true) {
                            adelBot.logEvents(['A message is still there.']);
                            // The message will be deleted at date end
                            setTimeout(() => {
                                channel.messages.fetch(adelBot.alertMessage.messageId).then(msg => {
                                    msg.delete().catch(reason => {
                                        console.log(reason);
                                    });
                                });
                                deleteMessage();
                            }, adelBot.targetDateEnd - Date.now());
                        } else {
                            // If the message wasn't sent
                            adelBot.logEvents(['No message has been found.']);
                            // Immediately send the message, and then delete it at date end
                            channel.send(adelBot.message).then(msg => {
                                addMessageToDatabase(msg);

                                adelBot.setTargetDate();

                                setTimeout(() => {
                                    deleteMessage(msg);
                                }, adelBot.targetDateEnd - Date.now());
                            });
                        }
                    }
                });
            } else {
                adelBot.programStarted = false;

                // Waiting until date start to send the message, and then delete it at date end
                setTimeout(() => {
                    channel.send(adelBot.message).then(msg => {
                        addMessageToDatabase(msg);

                        setTimeout(() => {
                            deleteMessage(msg);
                        }, adelBot.targetDateEnd - Date.now());
                    });
                }, adelBot.targetDateStart - Date.now());
            }
        }
    });
}

/**
 * Adds a message to Firebase
 * @param msg
 */
function addMessageToDatabase(msg) {
    firebase.database().ref('alert-message').set({
        messageSent: true,
        messageId: msg.id
    }).then(() => {
        adelBot.logEvents(['Message posted']);
    });
}

/**
 * Deletes a message from Firebase
 * @param msg
 */
function deleteMessage(msg = undefined) {
    if (msg !== undefined) {
        msg.delete();
    }

    firebase.database().ref('alert-message').set({
        messageSent: false,
        messageId: ''
    }).then(() => {
        adelBot.logEvents(['Message deleted']);
    });

    sendMessageEachDay();
}

client.login(process.env.BOT_TOKEN);
