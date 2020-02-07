/*!
 * The base class
 */

"use strict";
let fs = require('fs');

class core {
    /**
     * Constructor the class
     * @param argsIn the prefix from the command line argument list.
     */
    constructor(argsIn) {
        var args = argsIn.slice(2);
        if (args.length != 1) {
            console.log('wrong arg count');
            var scriptName = argsIn[1].match(/([^\/]*)\/*$/)[1];
            console.log('Usage: ' + scriptName + ' fileInputPath');
            console.log('For example :');
            var name = __dirname.match(/([^\/]*)\/*$/)[1];
            console.log('\t' + scriptName + ' /path/input.txt');
            return '';
        }
        if (!args[0])
            return;
        
        console.log("Initialising data")
        this.buffer = fs.readFileSync(args[0], "utf8");
    }
}

module.exports = {
    core
}