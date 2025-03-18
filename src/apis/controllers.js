const APIService = require('./services');

class APIController {

  static async getAllUsers(req, res, next) {
    try {
      res.json(await APIService.getAllUsers());
    } catch (e) {
      next(e);
    }
  }

  static async login(req, res, next) {
    try {
      const { username, password } = req.body;
      if (!username || !password) {
        res.status(400).json({
          success: false,
          message: 'Invalid username or password',
        });
        return;
      }
      res.json(await APIService.login(username, password));
    } catch (e) {
      next(e);
    }
  }

  static async register(req, res, next) {
    try {
      const { 
        username, 
        password,
        name,
        email,
        gender,
        address,
        city,
        province
      } = req.body;
      if (!username || !password || !name || !email || !gender || !address || !city || !province) {
        res.status(400).json({
          success: false,
          message: 'Invalid user data',
          data: ""
        });
        return;
      }

      res.status(400).json(await APIService.addUser({
        username,
        password,
        name,
        email,
        gender,
        address,
        city,
        province
      }));
    } catch (e) {
      next(e);
    }
  }

  static async update(req, res, next) {
    try {
      const {
        id,
        username, 
        password,
        name,
        email,
        gender,
        address,
        city,
        province
      } = req.body;
      if (!id || !username || !password || !name || !email || !gender || !address || !city || !province) {
        res.status(400).json({
          success: false,
          message: 'Invalid user data',
          data: ""
        });
        return;
      }

      res.status(400).json(await APIService.updateUser({
        id,
        username,
        password,
        name,
        email,
        gender,
        address,
        city,
        province
      }));
    } catch (e) {
      next(e);
    }
  }

  static async matchingByCity(req, res, next) {
    try {
      const { city } = req.body;
      if (!city) {
        res.status(400).json({
          success: false,
          message: 'Query condition not found',
        });
        return;
      }
      res.json(await APIService.queryUsersByCity(city));
    } catch (e) {
      next(e);
    }
  }

  static async matchingByGender(req, res, next) {
    try {
      const { gender } = req.body;
      if (!gender) {
        res.status(400).json({
          success: false,
          message: 'Query condition not found',
        });
        return;
      }
      res.json(await APIService.queryUsersByGender(gender));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = APIController;
