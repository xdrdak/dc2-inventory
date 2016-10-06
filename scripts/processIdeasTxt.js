function processIdeasTxt(inputFile) {
    const fs = require('fs');
    const readline = require('readline');
    const instream = fs.createReadStream(inputFile);
    const outstream = new (require('stream'))();
    const writeStream = fs.createWriteStream('./ideas_raw.json');
    const rl = readline.createInterface(instream, outstream);
    let lineNumber = 0;
    let title = '';
    let chapterNumber;
    let usedIn = '';
    let foundAt = '';
    let buffer = '';
    let usedInArray = [];

    function stringificationMagic () {
      return JSON.stringify({
        title: title,
        chapter: chapterNumber,
        usedIn: usedInArray,
        foundAt: foundAt,
        checked: false,
        hide: false,
        missable: (title.indexOf('missable') >= 0)
      });
    }

    writeStream.once('open', function() {
      writeStream.write('[\n');
    });

    rl.on('line', function (line) {
      if (lineNumber === 0) {
        let s = line.replace(']', '').split('[')
        title = s[0].trim();
        chapterNumber = s[1].split(' ')[1];
      }

      if (line.indexOf('Used in:') >= 0) {
        buffer = line;
      } else if (line.indexOf('Found at:') >= 0 || line.indexOf('Scoop Memo:') >= 0) {
        usedIn = buffer;
        buffer = line;
      }  else {
        buffer += line;
      }

      if (line === '') {
        foundAt = buffer;
        lineNumber = 0;
        buffer = '';
        usedInArray = [];
        if (usedIn.indexOf('(') >= 0) {
          usedInArray = usedIn.replace(')', '').split('(')[1].split(',');
          usedInArray = usedInArray.map((s)=> {return s.trim()});
        }

        writeStream.write(stringificationMagic());
        writeStream.write(',\n');
      } else {
        lineNumber += 1;
      }


      //console.log(line);
    });

    rl.on('close', function (line) {
        foundAt = buffer;
        lineNumber = 0;
        buffer = '';
        let usedInArray = [];
        if (usedIn.indexOf('(') >= 0) {
          usedInArray = usedIn.replace(')', '').split('(')[1].split(',');
          usedInArray = usedInArray.map((s)=> {return s.trim()});
        }
        writeStream.write(']\n');
        writeStream.end();


        console.log('done reading file.');
    });
};

processIdeasTxt('./ideas.txt');
