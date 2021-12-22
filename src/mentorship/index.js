// TODO:FIXME - webpack5 errors still with yargs import.
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

import { SAMPLES_DIR_MENTORSHIP, OUTPUT_HEADERS_MENTORSHIP } from '@constants';

const PATH_TO_ROOT = '../';
const SAMPLES_DIR = `${PATH_TO_ROOT}${SAMPLES_DIR_MENTORSHIP}`;

const Mentorship = {
  init: () => {
    if (argv.addPeopleData === true) {
      return Mentorship.addPeopleData();
    }

    return Mentorship.generate();
  },

  formatEmail: (srcEmail) => {
    if (srcEmail === undefined) {
      return '';
    }
    return srcEmail.trim().toLowerCase();
  },

  addPeopleData: () => {
    const results = {};
    const inputPeopleFile =
      argv.inputPeople || `${SAMPLES_DIR}input-people-data.csv`;
    fs.createReadStream(inputPeopleFile)
      .pipe(csv())
      .on('data', (data) => {
        const formattedEmail = Mentorship.formatEmail(data['Email']);
        // key this by email address for speedy lookup. ignore the fact
        // that some email addresses didn't generate. Fix that later.
        results[formattedEmail] = {
          location: data['Location'],
          manager: data['Manager'],
          name: data['Name'],
          slug: data['Slug'],
          title: data['Title'],
        };
      })
      .on('end', () => {
        return Mentorship.generate(results);
      });
  },

  generate: (peopleData = {}) => {
    const outputFile =
      argv.output || `${PATH_TO_ROOT}mentorship-output-local.csv`;
    const inputFile = argv.input || `${SAMPLES_DIR}input.csv`;
    const results = [];
    fs.createReadStream(inputFile)
      .pipe(csv())
      .on('data', (data) => {
        const formattedEmail = Mentorship.formatEmail(data['Email Address']);
        var extraData = {};
        if (peopleData !== null) {
          // if people data exists, add it first.
          extraData = peopleData[formattedEmail];
        }

        // TODO: finish.
        results.push({
          // make custom keys here to make this more readable
          type: data['I want to be a...'],
          ...extraData,
        });
      })
      .on('end', () => {
        console.log('finished generating. results: ', results);
      });
  },
};

export default Mentorship;
