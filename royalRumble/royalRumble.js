/*!
 * Sorting the array item contains royal numeral
 */

"use strict";
let fs = require('fs');
let Core = require('../core').core;

class royalRumble extends Core {
    /**
     * Constructor the class
     * @param argsIn the prefix from the command line argument list.
     */
    constructor(argsIn) {
        super(argsIn)
        this.arrMaster = this.buffer.split("\n");
        this.arrMaster.sort();
    }

    /**
     * Starting to sort array data
     */
    sortData() {
        console.log("Sorting the data")
        let newArr = [], startIndex = 0;
        for (let i = 0; i < this.arrMaster.length;) {
            if (this.rmLastWord(this.arrMaster[i]) != this.rmLastWord(this.arrMaster[i + 1])) {
                let arrTemp = this.arrMaster.slice(startIndex, i + 1);
                newArr = newArr.concat(this.sortRomanNum(arrTemp));
                i = newArr.length;
                startIndex = i;
            } else {
                i++;
            }
        }
        console.log("Storing the final data to file output.txt")
        fs.writeFileSync("output.txt", newArr.join("\n"));
        console.log("done")
    }

    /**
     * Converting roman numeral string to integer
     * @param str The roman numeral string
     */
    roman_to_Int(str) {
        if (str == null) return -1;

        // Getting the number of first roman char
        var num = this.char_to_int(str.charAt(0));
        var pre, curr;

        // Getting the number of next roman char
        for (var i = 1; i < str.length; i++) {
            curr = this.char_to_int(str.charAt(i));
            pre = this.char_to_int(str.charAt(i - 1));

            if (curr <= pre) { // e.g VII -> 5 += 1 -> 6 += 1
                num += curr;
            } else { // e.g IV -> 1 - 1 * 2 + 5 
                num = num - pre * 2 + curr;
            }
        }

        return num;
    }

    /**
     * Converting the basic roman char to integer
     * @param c The roman char
     */
    char_to_int(c) {
        switch (c) {
            case 'I': return 1;
            case 'V': return 5;
            case 'X': return 10;
            case 'L': return 50;
            default: return -1;
        }
    }

    /**
     * Removing roman numeral from the string given
     * e.g LOUIS VI will be LOUIS
     * @param str The string will be filtered
     */
    rmLastWord(str) {
        if (!str)
            return null;
        let lastIndex = str.lastIndexOf(" ");
        return str.substring(0, lastIndex);
    }

    /**
     * Sorting array by roman numeral part
     * @param arr
     */
    sortRomanNum(arr) {
        if (arr.length == 1)
            return arr;

        let numArr = [];
        arr.forEach((a, i) => {
            numArr.push(this.roman_to_Int(a.split(" ")[a.split(" ").length - 1]));
        })
        numArr.sort(function (a, b) { return a - b });
        return this.fixSortRoman(numArr, arr);
    }

    /**
     * Comparing the index position between integer based array and roman based array
     * Sorting by recursion method to get the final array
     * @param numArr The integer based array
     * @param arr The roman based array
     */
    fixSortRoman(numArr, arr) {
        let finalArr = [];
        numArr.forEach((n) => {
            for (let r = 0; r < arr.length; r++) {
                if (n == this.roman_to_Int(arr[r].split(" ")[arr[r].split(" ").length - 1])) {
                    finalArr.push(arr[r]);
                    r = arr.length;
                }
            }
        })
        return finalArr;
    }
}

module.exports = {
    royalRumble
}