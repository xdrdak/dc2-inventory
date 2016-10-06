function processInventionsTxt(inputFile) {
    const fs = require('fs');
    const readline = require('readline');
    const instream = fs.createReadStream(inputFile);
    const outstream = new (require('stream'))();
    const writeStream = fs.createWriteStream('./inventions_raw.json');
    const rl = readline.createInterface(instream, outstream);

    writeStream.once('open', function() {
      writeStream.write('[\n');
    });

    rl.on('line', function (line) {
      let firstSplit = line.split('[');
      let secondSplit = firstSplit[1].split(']');

      let title = firstSplit[0].trim();
      let ingredients = secondSplit[0]
      .split('&amp;')
      .map((s) => {
        return s.trim();
      });
      let chapter = secondSplit[1].trim();

      const s = JSON.stringify({
        value: title,
        ingredients: ingredients,
        chapter: chapter,
        checked: false,
        hide: false
      });

      writeStream.write(s);
      writeStream.write(',\n');

    });

    rl.on('close', function (line) {
        writeStream.write(']\n');
        writeStream.end();
        console.log('done reading file.');
    });
};

processInventionsTxt('./inventions.txt');
