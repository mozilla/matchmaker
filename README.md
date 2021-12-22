# matchmaker

Matchmaking utility serving a few purposes:

- `--mode=donut` - Can create donut style groups of varying sizes. Fun for remote teams.
- `--mode=mentorship` - Can create mentor/mentee matches. Makes for a good randomized starting point to review/make personalized adjustments as needed.

See examples/ for required input format and sample output.

## development

1. Make sure you have node installed. See 'engines' in package.json for version details.
1. `npm i` - install dependencies.

## usage

1. Make sure you have node installed.
1. `npm i` - install dependencies.
1. `node index.js` - default will generate groups (placed into `groups.csv`) and look for a `people.csv` file in the same dir as `index.js`.

## optional args

Usage example: `node index.js --size=2 --output=foo.csv` to set group size to 2 and change the name of output file.

- `size` - control group size. defaults to 3.
- `file` - set input file. defaults to `people.csv` in same dir as `index.js`
- `output` - set output file. defaults to `groups.csv`.
