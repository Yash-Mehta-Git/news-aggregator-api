const fs = require("fs");
const path = require("path");

const usersFile = path.join(__dirname, "..", "users.json");

function readUsers() {
  const data = fs.readFileSync(usersFile);
  return JSON.parse(data);
}

function writeUsers(user) {
  const data = JSON.stringify(user);
  return fs.writeFileSync(usersFile, data,{encoding: 'utf8',flag: 'w'});
}

module.exports = { readUsers, writeUsers };
