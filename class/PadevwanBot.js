class PadevwanBot {
    params = {
        /* Prod params : */
        // channelId: '720298334522179700',
        // roleId: '720298334522179698',
        /* Test params : */
        channelId: '724964399051309138',
        roleId: '725981703222460457',
        morningTime: { hour: 8, minute: 50 },
        afternoonTime: { hour: 13, minute: 20 },
        reminderTime: 10, // in minutes
        holidaysAndInternship: {
            summer: {
                start: new Date('2020-07-03 00:00:00'),
                end: new Date('2020-08-14 23:59:59')
            },
            winter: {
                start: new Date('2020-11-09 00:00:00'),
                end: new Date('2021-01-22 23:59:59')
            }
        },
        url: 'https://adel.adrar-formation.eu/course/view.php?id=464',
        publicHolidaysApi: 'https://calendrier.api.gouv.fr/jours-feries/metropole.json',
    };

    sentences = [
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
    ];
    programStarted = true;
    maxBuffer = 2147483647;
    message;
    alertMessage;
    targetDateStart;
    targetDateEnd;


    /**
     * Set the date of the next alert for the morning, the afternoon, or the next morning day.
     */
    setTargetDate() {
        return new Promise((resolve, reject) => {
            this.getPublicHolidays().then((publicHolidaysJson) => {
                let actualDate = new Date();

                let morningDate = this.createMorningAndAfternoonDate(actualDate, this.params.morningTime);
                let afternoonDate = this.createMorningAndAfternoonDate(actualDate, this.params.afternoonTime);

                let publicHolidaysDates = JSON.parse(publicHolidaysJson);
                let isPublicHolidays = this.checkPublicHolidays(actualDate, publicHolidaysDates);
                let isHolidaysOrInternship = this.checkHolidaysOrInternship(actualDate);

                // Check if the alert must be set on the morning or on the afternoon
                if (actualDate < morningDate.end || actualDate >= afternoonDate.end || [6, 0].includes(actualDate.getDay()) || isPublicHolidays || isHolidaysOrInternship) {
                    this.targetDateStart = morningDate.start;
                } else {
                    this.targetDateStart = afternoonDate.start;
                }

                do {
                    // Summer holidays
                    if (isHolidaysOrInternship === 'summer') {
                        this.setTargetDateAfterHolidays(this.params.holidaysAndInternship.summer.end);
                    // Winter holidays
                    } else if (isHolidaysOrInternship === 'winter') {
                        this.setTargetDateAfterHolidays(this.params.holidaysAndInternship.winter.end);
                    } else {
                        let isSameDay = actualDate.getDate() === this.targetDateStart.getDate() && actualDate.getMonth() === this.targetDateStart.getMonth();

                        // If it is friday afternoon, go to monday
                        if (isSameDay && actualDate >= afternoonDate.end && actualDate.getDay() === 5 || !isSameDay && this.targetDateStart.getDay() === 5) {
                            this.targetDateStart.setHours(this.targetDateStart.getHours() + 72);

                        // If it is the afternoon, sunday or on public holidays, go to next day
                        } else if (isSameDay && actualDate >= afternoonDate.end && [1, 2, 3, 4].includes(this.targetDateStart.getDay()) || this.targetDateStart.getDay() === 0 || isPublicHolidays) {
                            this.targetDateStart.setHours(this.targetDateStart.getHours() + 24);

                        // If it is saturday, go to monday
                        } else if (this.targetDateStart.getDay() === 6) {
                            this.targetDateStart.setHours(this.targetDateStart.getHours() + 48);
                        }
                    }

                    isPublicHolidays = this.checkPublicHolidays(this.targetDateStart, publicHolidaysDates);
                    isHolidaysOrInternship = this.checkHolidaysOrInternship(this.targetDateStart);

                } while ([6, 0].includes(this.targetDateStart.getDay()) || isPublicHolidays || isHolidaysOrInternship);

                if (this.targetDateStart.getTime() - actualDate.getTime() >= this.maxBuffer) {
                    this.logEvents([
                        'Oops ! The buffer size seems to be exceeded ! You will have to wait ' + Math.floor(this.maxBuffer / 1000 / 60 / 60) + ' hours, then the program will start again.',
                        'The next alert will start at : ' + this.targetDateStart.toLocaleString()
                    ]);
                    setTimeout(() => {
                        reject();
                    }, this.maxBuffer);
                } else {
                    this.targetDateEnd = new Date(this.targetDateStart.getTime());
                    this.targetDateEnd.setMinutes(this.targetDateEnd.getMinutes() + this.params.reminderTime);
                    resolve();
                }
            });
        });
    }

    /**
     * Chooses a random sentence and makes a message to display on the Discord channel.
     */
    chooseNewSentence() {
        let sentence = this.sentences[Math.floor(Math.random() * this.sentences.length)];
        this.message = `RAPPEL ADEL <@&${this.params.roleId}> ! “${sentence.text}” - *${sentence.from}* | <${this.params.url}>`;
    }

    /**
     * Logs an array of string events, and adds a separator after that.
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
     * @returns {Promise<String>}
     */
    getPublicHolidays() {
        const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', this.params.publicHolidaysApi);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.send();
        });
    }

    /**
     * Checks if the target date is on public holidays
     * @param targetDate
     * @param publicHolidaysDates
     * @returns {boolean}
     */
    checkPublicHolidays(targetDate, publicHolidaysDates) {
        let isPublicHolidays;

        targetDate = targetDate.toISOString().substr(0,10);

        for (let publicHolidaysDate in publicHolidaysDates) {
            if (publicHolidaysDates.hasOwnProperty(publicHolidaysDate)) {
                if (publicHolidaysDate === targetDate) {
                    isPublicHolidays = true;
                    break;
                } else {
                    isPublicHolidays = false;
                }
            }
        }

        return isPublicHolidays;
    }

    /**
     * Checks if target date is on holidays or internship
     * @param targetDate
     * @returns {string|boolean}
     */
    checkHolidaysOrInternship(targetDate) {
        if (targetDate >= this.params.holidaysAndInternship.summer.start && targetDate < this.params.holidaysAndInternship.summer.end) {
            return 'summer';
        } else if (targetDate >= this.params.holidaysAndInternship.winter.start && targetDate < this.params.holidaysAndInternship.winter.end) {
            return 'winter';
        } else {
            return false;
        }
    }

    /**
     * Sets the target date start at the end of the holidays
     * @param holidaysDateEnd
     * @returns {boolean}
     */
    setTargetDateAfterHolidays(holidaysDateEnd) {
        let nextDays = Math.ceil((holidaysDateEnd.getTime() - this.targetDateStart.getTime()) / 1000 / 60 / 60 / 24);
        this.targetDateStart.setHours(this.targetDateStart.getHours() + nextDays * 24);
    }

    /**
     * Creates a date for the morning and afternoon alert, based on the actual date
     * @param actualDate
     * @param time
     * @returns {{start: Date}}
     */
    createMorningAndAfternoonDate(actualDate, time) {
        let alertDate = { start: new Date(actualDate) };
        alertDate.start.setHours(time.hour);
        alertDate.start.setMinutes(time.minute);
        alertDate.start.setSeconds(0);
        alertDate.end = new Date(alertDate.start);
        alertDate.end.setMinutes(alertDate.start.getMinutes() + this.params.reminderTime);

        return alertDate;
    }
}

module.exports = PadevwanBot;