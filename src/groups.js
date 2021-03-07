const {
  argv
} = require('yargs');

class Groups {
  constructor() {
    this.groupSize = parseInt(argv.size, 10) || 3;
    console.info(`Splitting into groups of ${this.groupSize}...`);
  }

  generate() {
    return 'placeholder-groups-go-here';
  }
}

module.exports = Groups;
