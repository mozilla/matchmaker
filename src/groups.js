const {
  argv
} = require('yargs');
const fs = require('fs');
const csv = require('csv-parser');
const shuffle = require('shuffle-array');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

const outputHeaders = [{
    id: 'group',
    title: 'GROUP'
  }, {
    id: 'name',
    title: 'NAME'
  },
  {
    id: 'email',
    title: 'EMAIL'
  }
];

class Groups {
  constructor() {
    this.groupSize = parseInt(argv.size, 10) || 3;
    this.filePath = argv.file || 'people.csv';
    this.outputFile = argv.output || 'groups.csv';
    console.info(`Splitting into groups of ${this.groupSize}...`);
  }

  generate() {
    const results = [];
    fs.createReadStream(this.filePath)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          email: data['Email Address'],
          name: data.Name
        });
      })
      .on('end', () => {
        const groups = this.createGroups(results);
        const csvWriter = createCsvWriter({
          path: this.outputFile,
          header: outputHeaders
        });
        csvWriter
          .writeRecords(groups)
          .then(() => console.info(`Groups created! Open ${this.outputFile} to see the results`));
      });
  }

  createGroups(results) {
    const shuffled = shuffle(results);
    let groupNumber = 1;
    let counter = 0;
    const groups = [];
    shuffled.forEach((personData) => {
      if (counter !== 0 && counter % this.groupSize === 0) {
        groupNumber += 1;
      }
      groups.push({
        group: groupNumber,
        name: personData.name,
        email: personData.email
      });
      counter += 1;
    });
    return groups;
  }
}

module.exports = Groups;
