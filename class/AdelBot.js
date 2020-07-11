class AdelBot {

    constructor() {
        this.chooseNewSentence();
    }

    params = {
        /* Prod params : */
        // channelId: '720298334522179700',
        // roleId: '720298334522179698',
        /* Test params : */
        channelId: '724964399051309138',
        roleId: '725981703222460457',
        morningTime: { hour: 8, minute: 55 },
        afternoonTime: { hour: 13, minute: 25 },
        reminderTime: 5, // in minutes
        url: 'https://adel.adrar-formation.eu/course/view.php?id=464',
        sentences: [
            'Hey ! Il est l\'heure de se connecter sur ADEL =)',
            'Debout là-dedans ! On se connecte à ADEL',
            'ADEL needs YOU',
            'Hello... It\'s me...',
            'Venez vite, j\'ai des cookies !'
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
        let actualDate = new Date();
        /* Tests : */
        // let actualDate = new Date('2020-07-06 14:00:00'); // Monday
        // let actualDate = new Date('2020-07-07 08:00:00'); // Tuesday
        // let actualDate = new Date('2020-07-08 08:00:00'); // Wednesday
        // let actualDate = new Date('2020-07-09 08:00:00'); // Thursday
        // let actualDate = new Date('2020-07-10 08:00:00'); // Friday
        // let actualDate = new Date('2020-07-11 08:00:00'); // Saturday
        // let actualDate = new Date('2020-07-12 08:00:00'); // Sunday
        this.targetDateStart = new Date(actualDate);

        // Morning time this day
        this.targetDateStart.setHours(this.params.morningTime.hour);
        this.targetDateStart.setMinutes(this.params.morningTime.minute);
        this.targetDateStart.setSeconds(0);

        this.setTargetDateEnd();

        // If the actual time is > morning time OR if it is saturday or sunday
        if (actualDate >= this.targetDateEnd || [6, 0].includes(actualDate.getDay())) {

            // Afternoon time this day
            this.targetDateStart.setHours(this.params.afternoonTime.hour);
            this.targetDateStart.setMinutes(this.params.afternoonTime.minute);

            // If it is saturday : + 2 days | If it is sunday : + 1 day
            switch (this.targetDateStart.getDay()) {
                case 6: // Saturday
                    this.targetDateStart.setHours(this.targetDateStart.getHours() + 48);
                    break;
                case 0: // Sunday
                    this.targetDateStart.setHours(this.targetDateStart.getHours() + 24);
            }

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
        this.message = `<@&${this.params.roleId}> ${sentence} <${this.params.url}>`;
    }

    /**
     * Logs an array of string events with date and time value, and adds a separator after that.
     * @param events
     */
    logEvents(events) {
        events.forEach(event => {
            console.log(new Date().toLocaleString() + ' - ' + event);
        });
        console.log('-----');
    }
}

module.exports = AdelBot;