class AdelBot {

    constructor() {
        this.chooseNewSentence();
    }

    params = {
        /* Prod params : */
        channelId: '720298334522179700',
        roleId: '720298334522179698',
        /* Test params : */
        // channelId: '724964399051309138',
        // roleId: '725981703222460457',
        morningTime: { hour: 8, minute: 50 },
        afternoonTime: { hour: 13, minute: 20 },
        reminderTime: 10, // in minutes
        url: 'https://adel.adrar-formation.eu/course/view.php?id=464',
        sentences: [
            { text: 'Bazinga', from: 'The Big bang Theory' },
            { text: 'Friends don\'t lie', from: 'Stranger Things' },
            { text: 'I am the one who knocks', from: 'Breaking Bad' },
            { text: 'You have failed this city', from: 'Arrow' },
            { text: 'It\'s bigger on the inside', from: 'Doctor Who' },
            { text: 'That\'s what I do : I drink and I know things', from: 'Game of Thrones' },
            { text: 'Joey doesn\'t share food', from: 'Friends' },
            { text: 'Valar Morghulis', from: 'Game of Thrones' },
            { text: 'Winter is coming', from: 'Game of Thrones' },
            { text: 'Easy peasy, lemon squeezy', from: 'The Walking Dead' },
            { text: 'May we meet again', from: 'The 100' },
            { text: 'F*** Society', from: 'Mr Robot' },
            { text: 'The purpose of war is peace', from: 'Narcos' },
            { text: 'Bring yourself back online', from: 'Westworld' },
            { text: 'It doesn\'t look like anything to me', from: 'Westworld' },
            { text: 'Everything in this world is magic, except to the magician', from: 'Westworld' },
            { text: 'I’m not a psychopath, Anderson. I’m a high-functioning sociopath. Do your research', from: 'Sherlock' },
            { text: 'Death created time to grow the things it could kill', from: 'True Detective' },
            { text: 'Lizard poisons Spock. Spock smashes scissors. Scissors decapitates lizard. Lizard eats paper. Paper disproves Spock. Spock vaporizes rock. And, as it always has, rock crushes scissors', from: 'The Big Bang Theory' },
            { text: 'I\'m not crazy. My mother had me tested', from: 'The Big Bang Theory' },
            { text: 'We\'re all living in each other\'s paranoia', from: 'Mr Robot' },
            { text: 'ARTHOUUUR ! ...Couhillère', from: 'Kaamelott' },
            { text: 'Thanks to the technological revolution, we have the power to rage and accuse, spout bile without consequence', from: 'Black Mirror' },
            { text: 'You are a top bird. I don\'t know what that means, but I heard someone say it once and you\'re it', from: 'Black Mirror' },
            { text: 'Uploaded to the cloud, sounds like heaven', from: 'Black Mirror' },
            { text: 'Power is only given to those who are prepared to lower themselves to pick it up', from: 'Vikings' },
            { text: 'Force is only necessary against one’s enemies', from: 'Vikings' },
            { text: 'You don’t need a title to be a leader', from: 'Vikings' },
            { text: 'If I have to choose between one evil and another, then I prefer not to choose at all', from: 'The Witcher' },
            { text: 'Perfection is the enemy of perfectly adequate', from: 'Better Call Saul' },
            { text: 'Do not self destruct. We\'re shooting our way out', from: 'The Mandalorian' },
            { text: 'This is the way', from: 'The Mandalorian' },
            { text: 'It\'s a trap !', from: 'Star Wars' },
            { text: 'Your focus determines your reality', from: 'Star Wars' },
            { text: 'Do. Or do not. There is no try', from: 'Star Wars' },
            { text: 'It\'s time to kick ass and chew bubble gum... And I\'m all outta gum', from: 'Duke Nukem' },
            { text: 'Would you kindly...', from: 'Bioshock' },
            { text: 'War... War never changes', from: 'Fallout' },
            { text: 'It\'s dangerous to go alone, take this!', from: 'The Legend of Zelda' },
            { text: 'Praise the Sun!', from: 'Dark Souls' },
            { text: 'I used to be an adventurer like you until I took an arrow to the knee.', from: 'The Elder Scrolls V : Skyrim' },
            { text: 'Spartans never die, they\'re just missing in action', from: 'Halo' },
            { text: 'Science isn\'t about "why", it\'s about "why not"', from: 'Portal' },
            { text: 'The cake is a lie!', from: 'Portal' },
            { text: 'Stand in the ashes of a trillion dead souls and ask the ghosts if honor matters. Their silence is your answer', from: 'Mass Effect' },
            { text: 'Did I ever tell you the definition of insanity?', from: 'Far Cry 3' },
            { text: 'Waka Waka Waka', from: 'Pacman' },
            { text: 'Vous savez, moi je ne crois pas qu\'il y ait de bonne ou de mauvaise situation. Moi, si je devais résumer ma vie aujourd’hui avec vous, je dirais que c’est d\'abord des rencontres. Des gens qui m\'ont tendu la main, peut-être à un moment où je ne pouvais pas, où j\'étais seul chez moi. Et c\'est assez curieux de se dire que les hasards, les rencontres forgent une destinée... Parce que quand on a le goût de la chose, quand on a le goût de la chose bien faite, le beau geste, parfois on ne trouve pas l\'interlocuteur en face je dirais, le miroir qui vous aide à avancer. Alors ça n\'est pas mon cas, comme je disais là, puisque moi au contraire, j\'ai pu : et je dis merci à la vie, je lui dis merci, je chante la vie, je danse la vie... Je ne suis qu\'amour ! Et finalement, quand beaucoup de gens aujourd\'hui me disent « Mais comment fais-tu pour avoir cette humanité ? », et bien je leur réponds très simplement, je leur dis que c\'est ce goût de l\'amour ce goût donc qui m\'a poussé aujourd\'hui à entreprendre une construction mécanique, mais demain qui sait ? Peut-être simplement à me mettre au service de la communauté, à faire le don, le don de soi...', from: 'Astérix et Obélix : Mission Cléopâtre' },
            { text: 'Prenez un chewing-gum Emile', from: 'La cité de la peur' },
            { text: 'Il ne peut plus rien nous arriver d\'affreux maintenant!', from: 'La cité de la peur' }
        ]
    };

    message;
    alertMessage;
    programStarted = true;
    targetDateStart;
    targetDateEnd;

    /**
     * Set the date of the next alert for the morning, the afternoon, or the next morning day.
     */
    setTargetDate() {
        return new Promise(resolve => {
            let actualDate = new Date();
            /* Tests : */
            // let actualDate = new Date('2020-07-23 10:00:00'); // Set a custom date

            this.targetDateStart = new Date(actualDate);

            // Morning time this day
            this.targetDateStart.setHours(this.params.morningTime.hour);
            this.targetDateStart.setMinutes(this.params.morningTime.minute);
            this.targetDateStart.setSeconds(0);

            this.setTargetDateEnd();

            // If the actual time is > morning time
            if (actualDate >= this.targetDateEnd || [6, 0].includes(actualDate.getDay())) {

                // Afternoon time this day
                this.targetDateStart.setHours(this.params.afternoonTime.hour);
                this.targetDateStart.setMinutes(this.params.afternoonTime.minute);

                this.setTargetDateEnd();

                // If the actual time is > afternoon time this day, or if it is saturday or sunday
                if (actualDate >= this.targetDateEnd || [6, 0].includes(actualDate.getDay())) {
                    this.targetDateStart.setHours(this.params.morningTime.hour);
                    this.targetDateStart.setMinutes(this.params.morningTime.minute);

                    if (actualDate.getDay() === 5) { // Friday
                        this.targetDateStart.setHours(this.targetDateStart.getHours() + 72);
                    } else if (actualDate.getDay() > 0 && actualDate.getDay() < 5) { // Monday to thursday
                        this.targetDateStart.setHours(this.targetDateStart.getHours() + 24);
                    }

                    this.setTargetDateEnd();
                }
            }

            // Checking if target date is on public holiday
            this.getPublicHolidays('https://calendrier.api.gouv.fr/jours-feries/metropole.json').then((response) => {
                let targetDateString = this.targetDateStart.toISOString().substr(0,10);
                let publicHolidaysDates = JSON.parse(response);

                for (let publicHolidaysDate in publicHolidaysDates) {
                    if (publicHolidaysDates.hasOwnProperty(publicHolidaysDate)) {
                        if (publicHolidaysDate === targetDateString) {
                            this.targetDateStart.setHours(this.targetDateStart.getHours() + 24);
                            this.setTargetDateEnd();
                            break;
                        }
                    }
                }

                // If it is saturday : + 2 days | If it is sunday : + 1 day
                switch (this.targetDateStart.getDay()) {
                    case 6: // Saturday
                        this.targetDateStart.setHours(this.targetDateStart.getHours() + 48);
                        break;
                    case 0: // Sunday
                        this.targetDateStart.setHours(this.targetDateStart.getHours() + 24);
                }

                this.setTargetDateEnd();

                resolve();
            });
        });
    }

    /**
     * Sets the target date end depending on the target date start and the reminder time.
     */
    setTargetDateEnd() {
        this.targetDateEnd = new Date(this.targetDateStart.getTime());
        this.targetDateEnd.setMinutes(this.targetDateEnd.getMinutes() + this.params.reminderTime);
    }

    /**
     * Chooses a random sentence and makes a message to display on the Discord channel.
     */
    chooseNewSentence() {
        let sentence = this.params.sentences[Math.floor(Math.random() * this.params.sentences.length)];
        this.message = `<@&${this.params.roleId}> ${sentence.text} - *${sentence.from}* | <${this.params.url}>`;
    }

    /**
     * Logs an array of string events with date and time value, and adds a separator after that.
     * @param events
     */
    logEvents(events) {
        events.forEach(event => {
            console.log(event);
        });
        console.log('-----');
    }

    /**
     * Gets a list of public holidays dates.
     * @param url
     * @returns {Promise<unknown>}
     */
    getPublicHolidays(url) {
        const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.send();
        });
    }
}

module.exports = AdelBot;