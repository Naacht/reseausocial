const login = require('./login');
const register = require('./register');
const modify = require('./modify');
const logout = require('./logout');
const validate = require('./validate');
const getUser = require('./getUser');


const UserController = {
    login, register, modify, logout, validate, getUser
}

module.exports = UserController;