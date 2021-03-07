# wonut

🍩 Match generator for creating internal donut style groups. 🍩

## usage

1. Make sure you have node installed.
1. `npm i` - install dependencies.
1. `node index.js` - default will generate groups (placed into `groups.csv`) and look for a `people.csv` file in the same dir as `index.js`.

## optional args

Usage example: `node index.js  --size=2 --output=foo.csv` to set group size to 2 and change the name of output file.

* `size` - control group size. defaults to 3.
* `file` - set input file. defaults to `people.csv` in same dir as `index.js`
* `output` - set output file. defaults to `groups.csv`.
