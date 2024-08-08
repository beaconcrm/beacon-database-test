const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

db.serialize(() => {

  // create the tables
  db.run("CREATE TABLE accounts (id INT, name TEXT, created_at TIMESTAMP)");
  db.run("CREATE TABLE users (id INT, name TEXT, email TEXT, created_at TIMESTAMP)");
  db.run("CREATE TABLE account_users (user_id INT, account_id INT)");

  // populate the accounts table with dummyAccounts
  const dummyAccounts = [
    { id: 1, name: 'testAccount', created_at: '2019-01-01T00:00:00.000Z' },
    { id: 2, name: 'testAccount2', created_at: '2019-01-01T00:00:00.000Z' },
    { id: 3, name: 'testAccount3', created_at: '2019-01-01T00:00:00.000Z' },
    { id: 4, name: 'apples', created_at: '2019-01-01T00:00:00.000Z' },
    { id: 5, name: 'oranges', created_at: '2019-01-01T00:00:00.000Z' }
  ]

  const accountsStmt = db.prepare("INSERT INTO accounts VALUES (?, ?, ?)");

  // for each account is accounts
  dummyAccounts.forEach((account) => {
    accountsStmt.run(account.id, account.name, account.created_at);
  });

  accountsStmt.finalize();

  // popluate the users table with dummyUsers
  const dummyUsers = [
    { id: 1, name: 'Sarah', email: 'sarah@email.com', created_at: '2019-01-01T00:00:00.000Z' },
    { id: 2, name: 'Brian', email: 'brian@email.com', created_at: '2019-01-01T00:00:00.000Z' },
    { id: 3, name: 'Terry', email: 'terry@email.com', created_at: '2019-01-01T00:00:00.000Z' },
  ];

  const usersStmt = db.prepare("INSERT INTO users VALUES (?, ?, ?, ?)");

  dummyUsers.forEach((user) => {
    usersStmt.run(user.id, user.name, user.email, user.created_at);
  });

  usersStmt.finalize();

  // populate the account_users table with dummyAccountUsers
  const dummyAccountUsers = [
    { user_id: 1, account_id: 1 },
    { user_id: 2, account_id: 1 },
    { user_id: 3, account_id: 1 },
    { user_id: 2, account_id: 2 },
    { user_id: 3, account_id: 2 },
    { user_id: 3, account_id: 3 },
    { user_id: 4, account_id: 4 },
  ];

  const accountUsersStmt = db.prepare("INSERT INTO account_users VALUES (?, ?)");

  dummyAccountUsers.forEach((accountUser) => {
    accountUsersStmt.run(accountUser.user_id, accountUser.account_id);
  });

  accountUsersStmt.finalize();
});

module.exports = db;