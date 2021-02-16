/** 
 * This function will log in the console the
 * inputted message
 * @param {string} msg - msg to be logged
*/
function hello (msg) {
    console.log(msg);
}

/**
 * This function adds the two inputs
 * @param {number} a 
 * @param {number} b 
 */
function sum (a, b) {
    return a + b;
}

module.exports = {hello, sum};