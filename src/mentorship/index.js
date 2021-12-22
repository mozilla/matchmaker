// TODO:FIXME - webpack5 errors still with yargs import.
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
import {
  SAMPLES_DIR_MENTORSHIP,
  OUTPUT_HEADERS_MENTORSHIP
} from '@constants';

const PATH_TO_ROOT = '../';
const SAMPLES_DIR = `${PATH_TO_ROOT}${SAMPLES_DIR_MENTORSHIP}`;

const Mentorship = {
  init: () => {


    const outputFile = argv.output || `${PATH_TO_ROOT}mentorship-output-local.csv`;

    const inputData = Mentorship.processInput();
    console.log(inputData);

  },

  processInput: () => {
    const inputFile = argv.input || `${SAMPLES_DIR}input.csv`;
    const addPeopleData = argv.addPeopleData === true;
    if (addPeopleData) {
      const inputPeopleFile = argv.inputPeople || `${SAMPLES_DIR}input-people-data.csv`;
      console.log('now add people data');
    }
    return { todo: 'finishMe' };
  },

  generate: () => {

  },
};

export default Mentorship;
