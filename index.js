/*

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', msg => {
    sendMessageEachDay();
});

/!**
 * From monday to friday, morning and afternoon, a message will be sent each day to all users on a specific channel, to reminds them to log in ADEL.
 * The message will be automatically deleted after 15 minutes.
 * You can change the parameters to match your configuration, and specify the channel, the hours, the url to log in and some sentences as funny reminders.
 * To find the channel's ID, just mention it in Discord with a backslash in front of the mention.
 *!/
function sendMessageEachDay() {
    const params = {
        channelId: '720298334522179700', // test : 724964399051309138 | adrar : 720298334522179700
        roleId: '720298334522179698', // test : 725981703222460457 | adrar : 720298334522179698
        morningTime: { hour: 8, minute: 55 },
        afternoonTime: { hour: 13, minute: 25 },
        url: 'https://adel.adrar-formation.eu/login/index.php',
        sentences: [
            'Hey ! Il est l\'heure de se connecter sur ADEL =)',
            'Debout là-dedans ! On se connecte à ADEL',
            'ADEL needs YOU',
            'Hello... It\'s me...',
            'Venez vite, j\'ai des cookies !'
        ]
    };

    const channel = client.channels.cache.get(params.channelId);

    if (channel !== undefined) {
        setInterval(() => {
            const sentence = params.sentences[Math.floor(Math.random() * params.sentences.length)];
            const date = new Date();
            const day = date.getDay(),
                  hour = date.getHours(),
                  minute = date.getMinutes();

            if (day >= 1 && day <= 5) {
                if ((hour === params.morningTime.hour && minute === params.morningTime.minute) || (hour === params.afternoonTime.hour && minute === params.afternoonTime.minute)) {
                    channel.send(`<@&${params.roleId}> ${sentence} <${params.url}>`).then(msg => {
                        msg.delete({timeout: 300000});
                    });
                }
            }
        }, 60000);
    }
}

*/






/**
 * Tests
 */
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
    const channel = client.channels.cache.get(adelBot.params.channelId);
    channel.send('test').then(msg => {
        console.log('OK');
    });
    // sendMessageEachDay();
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

    adelBot.setTargetDate();

    adelBot.logEvents([
        'The next alert will start at : ' + adelBot.targetDateStart.toLocaleString(),
        'The next alert will end at : ' + adelBot.targetDateEnd.toLocaleString()
    ]);

    if (channel !== undefined && ![6, 0].includes(adelBot.targetDateStart.getDay())) {
            // Si le programme a été redémarré pendant la date de début et la date de fin
        if ((Date.now() >= adelBot.targetDateStart && Date.now() < adelBot.targetDateEnd) && adelBot.programStarted) {
            firebase.database().ref('alert-message').on('value', (data) => {
                if (adelBot.programStarted) {
                    adelBot.programStarted = false;
                    adelBot.logEvents(['The program has been rebooted.']);
                    adelBot.alertMessage = data.val();

                    if (adelBot.alertMessage.messageSent === true) { // Si le message a été envoyé
                        adelBot.logEvents(['A message is still there.']);
                        setTimeout(() => {
                            channel.messages.fetch(adelBot.alertMessage.messageId).then(msg => {
                                msg.delete().catch(reason => {
                                    console.log(reason);
                                });
                            });
                            deleteMessage();
                        }, adelBot.targetDateEnd - Date.now());
                    } else { // Si le message n'a pas été envoyé
                        adelBot.logEvents(['No message has been found.'])
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

            adelBot.logEvents([
                'The next alert will be sent in ' + Math.round((new Date(adelBot.targetDateStart - Date.now()).getTime() / 1000)) + ' seconds.'
            ]);

            setTimeout(() => {
                channel.send(adelBot.message).then(msg => {
                    addMessageToDatabase(msg);

                    adelBot.logEvents([
                        'The message will be deleted in ' + Math.round((new Date(adelBot.targetDateEnd - Date.now()).getTime() / 1000)) + ' seconds.'
                    ]);

                    setTimeout(() => {
                        deleteMessage(msg);
                    }, adelBot.targetDateEnd - Date.now());
                });
            }, adelBot.targetDateStart - Date.now());
        }
    }
}

/**
 * Add a message to Firebase
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

// url API jours fériés : https://calendrier.api.gouv.fr/jours-feries/metropole.json

