<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

- [matchmaker](#matchmaker)
  - [development](#development)
  - [usage](#usage)
    - [donut mode](#donut-mode)
      - [optional args](#optional-args)
    - [mentorship mode](#mentorship-mode)
      - [optional args](#optional-args-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

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
1. `npm i && npm run build` - install dependencies and build.
1. `cd dist` - run from dist dir. See options for running below:

### donut mode

This will split a list of users into randomly selected groups. The default group size is `3` but you can configure this.

From the dist folder, run:

- `cd dist && node app.js --type=donut`.

By default, this will use the examples/donut/input.csv file and generate a `donut-output-local.csv` file.

#### optional args

Usage example: `node app.js --type=donut --size=2 --output=foo.csv` to set group size to 2 and change the name of output file.

- `size` - control group size. defaults to 3.
- `input` - set input file. defaults to `examples/donut/input.csv`.
- `output` - set output file. defaults to `donut-output-local.csv`.

### mentorship mode

This will split a list of people who have signalled their desire to be mentors/mentees into randomized mentor/mentee pairs. By default, uses the [sample input file](examples/mentorship/input.csv) and will create a file called `mentorship-output-local.csv`.

From the dist folder, run:

- `node app.js --type=mentorship`.

#### optional args

Usage example: `node app.js --type=mentorship --addPeopleData --input=input.csv --output=matches.csv --inputPeople=people-data.csv`. Input and output paths are related to the repo root.

- `addPeopleData` - boolean - defaults to false. When enabled, this will use content from people.mozilla.org and combine timezone, and reporting chain information into final results. Up to date content to use here can be collected via an add-on. Contact [Rachel](https://github.com/tublitzed/) for access.
  - Usage - `node app.js --type=mentorship --addPeopleData`.
- `input` - set input file. Defaults to `examples/mentorship/input.csv`.
- `inputPeople` - set file to use with the `addPeopleData` flag. Defaults to `examples/mentorship/input-people-data.csv`.
- `output` - set output file. Defaults to `mentorship-output-local.csv`.
