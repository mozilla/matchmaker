// const {
//   argv
// } = require('yargs');

// import { argv } from 'yargs';

// const fs = require('fs');
// const csv = require('csv-parser');
// const shuffle = require('shuffle-array');
// const createCsvWriter = require('csv-writer').createObjectCsvWriter;

// const outputHeaders = [{
//     id: 'group',
//     title: 'Group Number'
//   }, {
//     id: 'firstName',
//     title: 'First Name'
//   },
//   {
//     id: 'lastName',
//     title: 'Last Name'
//   },
//   {
//     id: 'email',
//     title: 'Email'
//   },
//   {
//     id: 'timezone',
//     title: 'Timezone'
//   },
//   {
//     id: 'timezoneAlt',
//     title: 'Timezone (Write-in)'
//   }, {
//     id: 'signupTimestamp',
//     title: 'Signup Timestamp'
//   }
// ];

// class Groups {
//   constructor() {
//     this.groupSize = parseInt(argv.size, 10) || 3;
//     this.filePath = argv.file || 'people.csv';
//     this.outputFile = argv.output || 'groups.csv';
//     console.info(`Splitting into groups of ${this.groupSize}...`);
//   }

//   generate() {
//     const results = [];
//     fs.createReadStream(this.filePath)
//       .pipe(csv())
//       .on('data', (data) => {
//         results.push({
//           email: data['Email Address'],
//           firstName: data['First Name'],
//           lastName: data['Last Name'],
//           timezone: data['Time Zone'],
//           timezoneAlt: data['If other, please list'],
//           signupTimestamp: data.Timestamp,
//         });
//       })
//       .on('end', () => {
//         const groups = this.createGroups(results);
//         const csvWriter = createCsvWriter({
//           path: this.outputFile,
//           header: outputHeaders
//         });
//         csvWriter
//           .writeRecords(groups)
//           .then(() => console.info(`Groups created! Open ${this.outputFile} to see the results`));
//       });
//   }

//   createGroups(results) {
//     const shuffled = shuffle(results);
//     let groupNumber = 1;
//     let counter = 0;
//     const groups = [];
//     shuffled.forEach((personData) => {
//       if (counter !== 0 && counter % this.groupSize === 0) {
//         groupNumber += 1;
//       }
//       groups.push({
//         group: groupNumber,
//         ...personData
//       });
//       counter += 1;
//     });
//     return groups;
//   }
// }

const Donut = {
  init: () => {
    console.log('TODO: refactor existing to work within webpack');
  },
};

export default Donut;
