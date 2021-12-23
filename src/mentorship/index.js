// TODO:FIXME - webpack5 errors still with yargs import.
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
const fs = require('fs');
const csv = require('csv-parser');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const shuffle = require('shuffle-array');

import {
  SAMPLES_DIR_MENTORSHIP,
  OUTPUT_HEADERS_MENTORSHIP,
  TYPE_MENTOR,
  TYPE_MENTEE,
  TYPE_BOTH,
  PMO_PERSON_PREFIX,
} from '@constants';

const PATH_TO_ROOT = '../';
const SAMPLES_DIR = `${PATH_TO_ROOT}${SAMPLES_DIR_MENTORSHIP}`;

const Mentorship = {
  init: () => {
    if (argv.addPeopleData === true) {
      return Mentorship.addPeopleData();
    }

    return Mentorship.generate(null);
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
          pmoLink: data['Slug'] ? `${PMO_PERSON_PREFIX}${data['Slug']}` : '',
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

  processInputData: (data, peopleData) => {
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
        ] || '',
      specialRequests:
        data['Do you have any request or needs that you want to mention?'] ||
        '',
      canMentorMultiple:
        data[
          'If you volunteered as a mentor, are you open to mentoring multiple people?'
        ] || '',
      mentor: 'unassigned',
      mentee: 'unassigned',
      ...extraData,
    };
  },

  updateByEmailAddress: (email, values = {}, peopleArray) => {
    const index = peopleArray.findIndex((person) => {
      return person.email === email;
    });
    if (index === -1) {
      console.log(`Unable to find by email: ${email}`);
      return peopleArray;
    }
    peopleArray[index] = {
      ...peopleArray[index],
      ...values,
    };
    return peopleArray;
  },

  generate: (peopleData = null) => {
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
        const matchedResults = Mentorship.createMatches(results);
        const csvWriter = createCsvWriter({
          path: outputFile,
          header: OUTPUT_HEADERS_MENTORSHIP,
        });
        csvWriter
          .writeRecords(matchedResults)
          .then(() =>
            console.info(
              `Matches created! Open ${outputFile} to see the results.`
            )
          );
      });
  },

  assignMatches: (
    srcPeopleArray,
    peopleArrayToMatchWith,
    allPeople,
    matchKey
  ) => {
    srcPeopleArray.forEach((person, index) => {
      const match = peopleArrayToMatchWith[index];
      if (match && match.email !== person.email) {
        //First, update the person who is being matched:
        allPeople = Mentorship.updateByEmailAddress(
          person.email,
          {
            [matchKey]: match.email,
            [`${matchKey}Location`]: match.location || '',
          },
          allPeople
        );

        // Then, update the person who they have been matched with:
        const altMatchKey = matchKey === 'mentor' ? 'mentee' : 'mentor';
        allPeople = Mentorship.updateByEmailAddress(
          match.email,
          {
            [altMatchKey]: person.email,
            [`${altMatchKey}Location`]: person.location || '',
          },
          allPeople
        );
      }
    });
    return allPeople;
  },

  /**
   * Will match by shuffling mentors, mentees, and then making as many matches as possible.
   *
   * @param {Array} people
   * @returns {Array} people with match data added
   */
  createMatches: (people) => {
    var mentors = [];
    var mentees = [];
    people.forEach((person) => {
      if ([TYPE_BOTH, TYPE_MENTOR].indexOf(person.type) !== -1) {
        mentors.push(person);
      }
      if ([TYPE_BOTH, TYPE_MENTEE].indexOf(person.type) !== -1) {
        mentees.push(person);
      }
    });

    mentors = shuffle(mentors);
    mentees = shuffle(mentees);
    if (mentees.length > mentors.length) {
      people = Mentorship.assignMatches(mentees, mentors, people, 'mentor');
    } else {
      people = Mentorship.assignMatches(mentors, mentees, people, 'mentee');
    }
    return people;
  },
};

export default Mentorship;
