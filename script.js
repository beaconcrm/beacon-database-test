const fs = require('fs');
const db = require('./setup');
const query = fs.readFileSync(`${__dirname}/query.sql`).toString();

db.serialize(() => {

  db.each(query, (err, row) => {
    console.log(row);
    if (err) {
      console.error(err);
    }
  });
});

db.close();