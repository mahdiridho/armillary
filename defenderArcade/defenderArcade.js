/*!
 * Getting amount of defender arcade machine needed
 */

"use strict";
let Core = require('../core').core;

class defenderArcade extends Core {
    /**
     * Constructor the class
     * @param argsIn the prefix from the command line argument list.
     */
    constructor(argsIn) {
        super(argsIn)
        this.arrPeriod = this.buffer.split("\n");
    }

    /**
     * Starting to calculate the arcade machine needed
     */
    machineNeeded() {
        console.log("Calculating process")
        this.periodToMinutes();
        // starting amount is 1
        let machine = 1;
        // starting the period concatination
        let arrMerger = this.arrPeriod[0];
        // Array of machine amount of each overlapping
        let arrMachine = [];
        for (let p=1; p<this.arrPeriod.length; p++) {
            // Overlapping between current period item to the period concatination
            let overlap = this.arrPeriod[p].filter(value => arrMerger.includes(value))
            if (overlap.length) {
                machine++;
            } else {
                arrMachine.push(machine);
                machine = 1;
            }

            // Join the current period to the period concatination
            arrMerger.push(...this.arrPeriod[p])
            // Remove the duplicate items of the period concatination
            arrMerger.splice(0, arrMerger.length, ...(new Set(arrMerger)))
        }
        arrMachine.push(machine);
        console.log("Amount of arcade machine needed :", Math.max(...arrMachine))
        console.log("done")
    }

    /**
     * Spreading the minutes between the range of period item
     * e.g "900 904" will be spread to [900, 901, 902, 903, 904]
     */
    periodToMinutes() {
        for (let p=0; p<this.arrPeriod.length; p++) {
            let item = this.arrPeriod[p].split(" ");
            let minuteItems = [];
            for (let m=Number(item[0]); m<Number(item[1]); m++) {
                // Max time is 24:00
                if (m < 2400) {
                    let minute = m;
                    // at 59 seconds, equal to 99 (count of 100)
                    if (Number(m.toString().substr(-2,2)) == 59) {
                        m += 40;
                    }
                    minuteItems.push(minute);
                }
            }
            this.arrPeriod[p] = minuteItems;
        }
    }
}

module.exports = {
    defenderArcade
}