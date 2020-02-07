/*!
 * Function handler
 */

"use strict";

let RoyalRumble = require('./royalRumble').royalRumble;
let royalRumble = new RoyalRumble(process.argv);
royalRumble.sortData();