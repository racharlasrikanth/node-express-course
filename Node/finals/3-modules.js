// CommonJS, every file is module (by default)
// Modules - Encapsulated Code (only share minimum)

const names = require('./4-names');
const sayHi = require("./5-utils");
const data = require('./6-alternative-flavour');
console.log(data);
require("./7-mind-grenade")

sayHi('emma watson')
sayHi(names.srikanth)
sayHi(names.emma)