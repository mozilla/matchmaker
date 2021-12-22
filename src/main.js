import Donut from './donut';
import Mentorship from './mentorship';

// TODO:FIXME - webpack5 errors still with yargs import.
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;

const type = argv.type;
const validTypes = ['donut', 'mentorship'];
const validTypesMssg = `Please re-run with one of the following types: ${validTypes.join(
  ','
)}.`;

if (typeof type === undefined || typeof type === 'boolean') {
  console.log(`Missing or incorrect "type argument"! ${validTypesMssg}`);
}

if (type === 'donut') {
  Donut.init();
} else if (type === 'mentorship') {
  Mentorship.init();
} else {
  console.log(`Invalid type provided: ${type}. ${validTypesMssg}`);
}
