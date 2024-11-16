const bcrypt = require("bcrypt");

const User = require("./user.model");
const response = require("../../helpers/response");

const login = async ({email, password}) => {
  console.log("PAsss::",password);
    if (!email || !password) {
        return response({status: "OK", statusCode: '200', message: 'login-credentials-required' });
    }
    const user = await User.findOne({email});
    console.log("US:::", user);
    if(!user){
        return response({ status: 'Not-found', statusCode: '404', type: 'user', message: "No user found", errors: error.message });
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if(isValidPassword){
        return user;
    }else{
      return response({ status: 'Error', statusCode: '404', type: 'user', message: "Password not matched", errors: error.message });
    }
  }

const getUserByEmail = async (email) => {
    if (!email) {
        return response({message: 'email is required' });
    }
    const user = await User.findOne({email});
    if(!user){
        return response({ status: 'Not-found', statusCode: '404', type: 'user', message: "No user found", errors: error.message });
    }
    return user;
  }


  const addUser = async (userData) => {
    const user = new User(userData);
    return await user.save();
  }

  module.exports = {
    login,
    getUserByEmail,
    addUser
  }
  