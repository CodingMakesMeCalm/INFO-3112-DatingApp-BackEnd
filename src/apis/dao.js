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

  static async getPosts() {
    const filePath = path.join(path.resolve('./data/posts.json'));
    if(!filePath) {
      return false;
    }
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      return false;
    }
  }

  static async savePosts(posts) {
    const filePath = path.join(path.resolve('./data/posts.json'));
    if(!filePath) {
      return false;
    }
    try {
      fs.writeFileSync(filePath, JSON.stringify(posts, null, 2), 'utf8');
      return true;
    } catch (e) {
      return false;
    }
  }

  static async getMessages() {
    const filePath = path.join(path.resolve('./data/messages.json'));
    if(!filePath) {
      return false;
    }
    try {
      return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (e) {
      return false;
    }
  }

  static async saveMessages(messages) {
    const filePath = path.join(path.resolve('./data/messages.json'));
    if(!filePath) {
      return false;
    }
    try {
      fs.writeFileSync(filePath, JSON.stringify(messages, null, 2), 'utf8');
      return true;
    } catch (e) {
      return false;
    }
  }
  
}
module.exports = APIDAO;
