const APIDAO = require('./dao');

class APIService {

  static async getAllUsers() {
    const users = await APIDAO.getUsers();
    if (users) {
      return { success: true, message: 'Found users', data: users };
    }
    return { success: false, message: 'Failed to get users', data: '' };
  }

  static async login(username, password) {
    const users = await APIDAO.getUsers();
    const foundUser = users.find((user) => user.username === username && user.password === password);
    if (foundUser) {
      return { success: true, message: 'Login successful', data: foundUser };
    }
    return { success: false, message: 'Failed to get users', data: '' };
  }

  static async queryUsersByCity(city) {
    const users = await APIDAO.getUsers();
    if (users) {
      const foundUsers = users.filter((user) => user.city === city);
      return { success: true, message: 'Found users', data: foundUsers };
    }
    return { success: false, message: 'Failed to get users', data: '' };
  }

  static async queryUsersByGender(gender) {
    const users = await APIDAO.getUsers();
    if (users) {
      const foundUsers = users.filter((user) => user.gender === gender);
      return { success: true, message: 'Found users', data: foundUsers };
    }
    return { success: false, message: 'Failed to get users', data: '' };
  }

  static async addUser(user) {
    const users = await APIDAO.getUsers();
    if (users) {
      const newUser = {
        id: users.length + 1,
        ...user,
      };
      users.push(newUser);
      const result = await APIDAO.saveUsers(users);
      if (result) {
        return { success: true, message: 'User added!', data: newUser };
      } else {
        return { success: false, message: 'Failed to add user', data: '' };
      }
    }
  }

  static async updateUser(updatedUser) {
    const users = await APIDAO.getUsers();
    if (users) {
      const userIdx = users.findIndex((user) => user.id === updatedUser.id);
      if (userIdx === -1) {
        return { success: false, message: 'User not found', data: '' };
      }
      users[userIdx] = updatedUser;
      const result = await APIDAO.saveUsers(users);
      if(result) {
        return { success: true, message: 'User updated successfully', data: updatedUser };
      } else {
        return { success: false, message: 'Failed to update user', data: '' };
      }
    }
  }
  
}
module.exports = APIService;
