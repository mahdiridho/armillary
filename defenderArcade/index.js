/*!
 * Function handler
 */

"use strict";

let DefenderArcade = require('./defenderArcade').defenderArcade;
let defenderArcade = new DefenderArcade(process.argv);
defenderArcade.machineNeeded();