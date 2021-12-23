// TODO:FIXME - webpack5 errors still with yargs import.
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
const fs = require('fs');
const csv = require('csv-parser');
const shuffle = require('shuffle-array');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

import { SAMPLES_DIR_DONUT, OUTPUT_HEADERS_DONUT } from '@constants';

const PATH_TO_ROOT = '../';
const Donut = {
  init: () => {
    const SAMPLES_DIR = `${PATH_TO_ROOT}${SAMPLES_DIR_DONUT}`;
    const groupSize = parseInt(argv.size, 10) || 3;
    const inputFile = argv.input || `${SAMPLES_DIR}input.csv`;
    const outputFile = argv.output || `${PATH_TO_ROOT}donut-output-local.csv`;
    console.info(`Splitting into groups of ${groupSize}...`);

    Donut.generate(inputFile, outputFile, groupSize);
  },
  generate: (inputFile, outputFile, groupSize) => {
    const results = [];
    fs.createReadStream(inputFile)
      .pipe(csv())
      .on('data', (data) => {
        results.push({
          email: data['Email Address'],
          firstName: data['First Name'],
          lastName: data['Last Name'],
          timezone: data['Time Zone'],
          timezoneAlt: data['Time Zone Details'],
          signupTimestamp: data.Timestamp,
        });
      })
      .on('end', () => {
        const groups = Donut.createGroups(results, groupSize);
        const csvWriter = createCsvWriter({
          path: outputFile,
          header: OUTPUT_HEADERS_DONUT,
        });
        csvWriter
          .writeRecords(groups)
          .then(() =>
            console.info(
              `Groups created! Open ${outputFile} to see the results.`
            )
          );
      });
  },

  createGroups: (results, groupSize) => {
    const shuffled = shuffle(results);
    let groupNumber = 1;
    let counter = 0;
    const groups = [];
    shuffled.forEach((personData) => {
      if (counter !== 0 && counter % groupSize === 0) {
        groupNumber += 1;
      }
      groups.push({
        group: groupNumber,
        ...personData,
      });
      counter += 1;
    });
    return groups;
  },
};

export default Donut;
