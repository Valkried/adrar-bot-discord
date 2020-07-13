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

const PadevwanBot = require('./class/PadevwanBot');
const padevwanBot = new PadevwanBot();

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
    const channel = client.channels.cache.get(padevwanBot.params.channelId);

    console.log('****************');
    console.log('Starting program');
    console.log('****************');

    padevwanBot.setTargetDate().then(() => {
        padevwanBot.logEvents([
            'The next alert will start at : ' + padevwanBot.targetDateStart.toLocaleString(),
            'The next alert will end at : ' + padevwanBot.targetDateEnd.toLocaleString()
        ]);

        if (channel !== undefined && ![6, 0].includes(padevwanBot.targetDateStart.getDay())) {
            // If the program was rebooted between date start and date end
            if ((Date.now() >= padevwanBot.targetDateStart && Date.now() < padevwanBot.targetDateEnd) && padevwanBot.programStarted) {
                // Go to database to check if a message was already sent
                firebase.database().ref('alert-message').on('value', (data) => {
                    if (padevwanBot.programStarted) {
                        padevwanBot.programStarted = false;
                        padevwanBot.logEvents(['The program has been rebooted.']);
                        padevwanBot.alertMessage = data.val();

                        // If the message was already sent :
                        if (padevwanBot.alertMessage.messageSent === true) {
                            padevwanBot.logEvents([
                                'A message seems to be there.',
                                'It will be deleted in ' + Math.round((padevwanBot.targetDateEnd.getTime() - Date.now()) / 1000) + ' seconds.'
                            ]);
                            // The message will be deleted at date end
                            setTimeout(() => {
                                channel.messages.fetch(padevwanBot.alertMessage.messageId).then(msg => {
                                    deleteMessage(msg);
                                }).catch(() => {
                                    padevwanBot.logEvents(['Nope, the message was already deleted on Discord.']);
                                }).finally(() => {
                                    sendMessageEachDay();
                                });
                            }, padevwanBot.targetDateEnd - Date.now());
                        } else {
                            // If the message wasn't sent
                            padevwanBot.logEvents(['No message has been found.']);
                            // Immediately send the message, and then delete it at date end
                            channel.send(padevwanBot.message).then(msg => {
                                addMessageToDatabase(msg).then(() => {
                                    padevwanBot.logEvents(['The message will be deleted in ' + Math.round((padevwanBot.targetDateEnd.getTime() - Date.now()) / 1000) + ' seconds.']);

                                    padevwanBot.setTargetDate();

                                    setTimeout(() => {
                                        deleteMessage(msg).then(() => {
                                            sendMessageEachDay();
                                        });
                                    }, padevwanBot.targetDateEnd - Date.now());
                                });
                            });
                        }
                    }
                });
            } else {
                padevwanBot.programStarted = false;

                // Waiting until date start to send the message, and then delete it at date end
                setTimeout(() => {
                    channel.send(padevwanBot.message).then(msg => {
                        addMessageToDatabase(msg).then(() => {
                            padevwanBot.logEvents(['The message will be deleted in ' + Math.round((padevwanBot.targetDateEnd.getTime() - Date.now()) / 1000) + ' seconds.']);

                            setTimeout(() => {
                                deleteMessage(msg).then(() => {
                                    sendMessageEachDay();
                                });
                            }, padevwanBot.targetDateEnd - Date.now());
                        });
                    });
                }, padevwanBot.targetDateStart - Date.now());
            }
        }
    });
}

/**
 * Adds a message to Firebase
 * @param msg
 */
function addMessageToDatabase(msg) {
    return new Promise(resolve => {
        firebase.database().ref('alert-message').set({
            messageSent: true,
            messageId: msg.id
        }).then(() => {
            padevwanBot.logEvents(['Message posted.']);
            resolve();
        });
    });
}

/**
 * Deletes a message from Discord and then, notifies Firebase
 * @param msg
 */
function deleteMessage(msg) {
    return new Promise(resolve => {
        msg.delete().then(() => {
            firebase.database().ref('alert-message').set({
                messageSent: false,
                messageId: ''
            }).then(() => {
                padevwanBot.logEvents(['Message deleted.']);
                resolve();
            });
        });

    });
}

client.login(process.env.BOT_TOKEN);
