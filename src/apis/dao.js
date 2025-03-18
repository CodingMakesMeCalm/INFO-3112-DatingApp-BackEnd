const path = require('path');
const fs = require('fs');

class APIDAO {

  static async getUsers() {
    const filePath = path.join(path.resolve('./data/users.json'));
      if(!filePath) {
        return false;
      }
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      return false;
    }
  }

  static async saveUsers(users) {
    const filePath = path.join(path.resolve('./data/users.json'));
    if(!filePath) {
      return false;
    }
    try {
      fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf8');
      return true;
    } catch (e) {
      return false;
    }
  }
  
}
module.exports = APIDAO;
