const APIDAO = require('./dao');
const getLatLngFromAddress = require('../components/getLatLngFromAddress');

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

  static async addUser(user) {
    const users = await APIDAO.getUsers();
    if (users) {
      const userAddress = user.address+', ' + user.city + ', ' + user.province;
      const { lat, lng } = await getLatLngFromAddress(userAddress);
      const newUser = {
        id: users.length + 1,
        ...user,
        lat: lat,
        lng: lng,
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

      const userAddress = updatedUser.address+', ' + updatedUser.city + ', ' + updatedUser.province;
      const { lat, lng } = await getLatLngFromAddress(userAddress);
      users[userIdx] = {
        ...updatedUser,
        lat: lat,
        lng: lng,
      };
      const result = await APIDAO.saveUsers(users);

      if(result) {
        return { success: true, message: 'User updated successfully', data: updatedUser };
      } else {
        return { success: false, message: 'Failed to update user', data: '' };
      }
    }
  }

  static async queryUsersByCity(city) {
    const users = await APIDAO.getUsers();
    if (users) {
      const foundUsers = users.filter((user) => user.city.toLowerCase() === city.toLowerCase());
      return { success: true, message: 'Found users', data: foundUsers };
    }
    return { success: false, message: 'Failed to get users', data: '' };
  }

  static async queryUsersByGender(gender) {
    const users = await APIDAO.getUsers();
    if (users) {
      const foundUsers = users.filter((user) => user.gender.toLowerCase() === gender.toLowerCase());
      return { success: true, message: 'Found users', data: foundUsers };
    }
    return { success: false, message: 'Failed to get users', data: '' };
  }

  static async getAllPosts() {
    const posts = await APIDAO.getPosts();
    if (posts) {
      return { success: true, message: 'Found posts', data: posts };
    }
    return { success: false, message: 'Failed to get posts', data: '' };
  }

  static async newPost(post) {
    const posts = await APIDAO.getPosts();
    if (posts) {
      const newPost = {
        id: posts.length + 1,
        ...post,
      };
      posts.push(newPost);
      const result = await APIDAO.savePosts(posts);
      if (result) {
        return { success: true, message: 'Post added!', data: posts };
      } else {
        return { success: false, message: 'Failed to add post', data: '' };
      }
    }
  }

  static async getPersonalMessage(user_id) {
    const messages = await APIDAO.getMessages();
    if (messages) {
      const foundMessages = messages.filter((message) => message.send_to == user_id);
      return { success: true, message: 'Found messages', data: foundMessages };
    }
    return { success: false, message: 'Failed to get messages', data: '' };
  }

  static async setPersonalMessageRead(message_id){
    const messages = await APIDAO.getMessages();
    if (messages) {
      const messageIdx = messages.findIndex((message) => message.id === message_id);
      if (messageIdx === -1) {
        return { success: false, message: 'Message not found', data: '' };
      }
      messages[messageIdx].read = true;
      const result = await APIDAO.saveMessages(messages);
      if(result) {
        return { success: true, message: 'Message read status updated', data: messages };
      } else {
        return { success: false, message: 'Failed to update message read status', data: '' };
      }
    }
  }
  
  static async newMessage(message) {
    const messages = await APIDAO.getMessages();
    if (messages) {
      const newMessage = {
        id: messages.length + 1,
        ...message,
      };
      messages.push(newMessage);
      const result = await APIDAO.saveMessages(messages);
      if (result) {
        return { success: true, message: 'Message sent!', data: '' };
      } else {
        return { success: false, message: 'Failed to send message', data: '' };
      }
    }
  }

  static async getLatLng(address) {
    const { lat, lng } = await getLatLngFromAddress(address);
    if (lat && lng) {
      return { success: true, message: 'Found lat/lng', data: { lat, lng } };
    }
    return { success: false, message: 'Failed to get lat/lng', data: '' };
  }
}
module.exports = APIService;
