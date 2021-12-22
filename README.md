<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [matchmaker](#matchmaker)
  - [development](#development)
  - [usage](#usage)
    - [donut mode](#donut-mode)
      - [optional args](#optional-args)
    - [mentorship mode](#mentorship-mode)

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

- `node main.js --type=donut`.

By default, this will use the examples/donut/input.csv file and generate a `donut-output-local.csv` file.

#### optional args

Usage example: `node main.js --type=donut --size=2 --output=foo.csv` to set group size to 2 and change the name of output file.

- `size` - control group size. defaults to 3.
- `input` - set input file. defaults to `examples/donut/input.csv`
- `output` - set output file. defaults to `donut-output-local.csv`.

### mentorship mode

(coming soon)
