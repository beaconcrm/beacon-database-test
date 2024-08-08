const db = require('./setup');

/* 
* INSERT YOUR QUERY HERE ********************
*/
const query = `
SELECT * FROM users;
`

db.serialize(() => {

  db.each(query, (err, row) => {
    console.log(row);
    if (err) {
      console.error(err);
    }
  });
});

db.close();