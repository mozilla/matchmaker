const argv = require('yargs').argv;
const Groups = require('./src/groups');

const groupsInstance = new Groups();
const generated = groupsInstance.generate();

console.log(generated);
