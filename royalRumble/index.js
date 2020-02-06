/*!
 * Function handler
 */

"use strict";

/** Get the prefix from the command line argument list.
The prefix is the file path will be parsed. For example :
nodejs yourScript.js filePath
\param argsIn The argument list composed of the following : ['nodejs', 'scriptName.js', 'arg1']; Where arg1 is your prefix.
\return '' on error or the specified prefix.
*/
function getPrefix(argsIn) {
    var args = argsIn.slice(2);
    if (args.length != 1) {
        console.log('wrong arg count');
        var scriptName = argsIn[1].match(/([^\/]*)\/*$/)[1];
        console.log('Usage: ' + scriptName + ' projectPrefix');
        console.log('For example :');
        var name = __dirname.match(/([^\/]*)\/*$/)[1];
        console.log('\t' + scriptName + ' ' + name.toLowerCase());
        return '';
    }
    return args[0];
}

// get the prefix or exit
let file = getPrefix(process.argv);
if (!file)
    return;

let RoyalRumble = require('./royalRumble').royalRumble;
let royalRumble = new RoyalRumble(file);
royalRumble.sortData();