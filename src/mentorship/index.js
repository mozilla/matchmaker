// TODO:FIXME - webpack5 errors still with yargs import.
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;

import {
  SAMPLES_DIR_MENTORSHIP,
  OUTPUT_HEADERS_MENTORSHIP,
  TYPE_MENTOR,
  TYPE_MENTEE,
  TYPE_BOTH,
} from '@constants';

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

  formatType: (responseStr) => {
    if (responseStr === 'Mentor (I want to provide coaching and support)') {
      return TYPE_MENTOR;
    } else if (
      responseStr === 'Mentee (I want to receive coaching and support)'
    ) {
      return TYPE_MENTEE;
    }
    return TYPE_BOTH;
  },

  processInputData: (data, peopleData = {}) => {
    const formattedEmail = Mentorship.formatEmail(data['Email Address']);
    if (!formattedEmail) {
      return false;
    }
    var extraData = {};
    if (peopleData !== null) {
      if (!peopleData[formattedEmail]) {
        console.log(`No people data found for: ${formattedEmail}`);
      }
      extraData = peopleData[formattedEmail];
    }
    const type = Mentorship.formatType(data['I want to be a...']);
    return {
      email: formattedEmail,
      type,
      submissionTimestamp: data['Timestamp'],
      mentorSkills:
        type === TYPE_BOTH
          ? data['As a mentor, I want to give coaching in...']
          : data['I can mentor someone in these areas...'],
      menteeRequests:
        type === TYPE_BOTH
          ? data['As a mentee, I want to receive coaching in...']
          : data['I want mentorship in...'],
      timezoneDetails:
        data[
          'We will use your timezone to help make matches. Please let us know if you work atypical hours for your timezone.'
        ],
      specialRequests:
        data['Do you have any request or needs that you want to mention?'],
      ...extraData,
    };
  },

  generate: (peopleData = {}) => {
    const outputFile =
      argv.output || `${PATH_TO_ROOT}mentorship-output-local.csv`;
    const inputFile = argv.input || `${SAMPLES_DIR}input.csv`;
    const results = [];
    fs.createReadStream(inputFile)
      .pipe(csv())
      .on('data', (data) => {
        const processed = Mentorship.processInputData(data, peopleData);
        if (processed) {
          results.push(processed);
        }
      })
      .on('end', () => {
        console.log('finished generating. results: ', results);
      });
  },
};

export default Mentorship;
