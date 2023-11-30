// const express = require('express');
// const User = require('../models/User');
// const bycrypt = require('bcrypt');
// const fileHandler = require('../helper/fileHandler');
// const dbConnection = require('../helper/dbConnection');
// const validators = require('../helper/requestValidator');
// const jwt = require('jsonwebtoken');
// const register = (req,res,next) =>{
//     if(validators.registorPostRequestValidator(req.body)){
//         const user = new User({
//             fullName:req.body.fullName,
//             email:req.body.email,
//             role:req.body.role,
//             password:bycrypt.hashSync(req.body.password,8),
//             preference:req.body.preference
//         });
//         dbConnection.connectToDb();
//         User.findOne({
//             email: req.body.email
//         }).then(user => {
//             user.save().then(data => {
//                 return res.status(200).json({message: "user saved successfully"});
//             }).catch(err => {
//                 return res.status(500).json({message: `User saving failed ${err}`});
//             });
//             fileHandler.writeIntoFile(user);
//         }).catch(err => {
//             return res.status(200).json({message: "User already exists."})
//         })
        
//     }else{
//         return res.status(400).json({message:"There is some issue with the request."});
//     }   
// }

// const login = (req,res,next) =>{
//     let email = req.body.email;
//     let pass = req.body.password
//     if(validators.emailValidator(email) && validators.passwordValidator(pass)){
//         dbConnection.connectToDb();
//         User.findOne({
//             email: email
//         }).then(user => {
//             if(user != null){
//                 var passwordIsValid = bycrypt.compareSync(pass,user.password);
//                 if (!passwordIsValid) {
//                     return res.status(401).json({message: "Invalid Passowrd!"});
//                 }
//                 var token = jwt.sign({
//                     id: user.id
//                  }, "THIS IS SECRET", {
//                      expiresIn: 86400
//                  });
//                  return res.status(200).json({
//                      user: {
//                          id: user.fullName
//                      },
//                      message: "Login successful",
//                      accessToken: token
//                  });
//             }else{
//                 return res.status(401).json({message: "User not found"});
//             }
            
//         })
//     }else{
//         return res.status(400).json({message:"There is some issue with the request."});
//     }
// }

// module.exports ={
//     register,
//     login
// }
const Ajv = require("ajv").default;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { nanoid } = require("nanoid");

const { readUsers, writeUsers } = require("../utils/usersFile.util");
const usersSchema = require("../schemas/users.schema");
const preferencesSchema = require("../schemas/preferences.schema");
const { JWT_SECRET } = require("../configs/env.config");

const {ERR_USER_EXISTS,ERR_VALIDATION,ERR_USER_NOT_FOUND,ERR_INVALID_PASSWORD,
    STATUS_ERROR,MSG_SUCCESSFUL_REGISTRATION,MSG_SUCCESSFUL_LOGIN,} = require("../constants/app.constants");

const ajv = new Ajv({ useDefaults: true, allErrors: true });
require("ajv-errors")(ajv);

ajv.compile(preferencesSchema);
const validateUsers = ajv.compile(usersSchema);


const register = (req, res) => {
    const validBody = validateUsers(req.body);
    const { username, password, preferences } = req.body;
    const id = nanoid(5);
    if (validBody) {
        const users = readUsers();
        const passHash = bcrypt.hashSync(password, 8);
        const existingUser = users.find((user) => user.username === username);
        if (existingUser) {
        res.status(400).json({ error: ERR_USER_EXISTS });
        } else {
        const newUser = {
            id,
            username,
            password: passHash,
            preferences,
        };
        users.push(newUser);
        writeUsers(users);
        return res.status(201).json({ message: MSG_SUCCESSFUL_REGISTRATION });
        }
    } else {
        const errors = validateUsers.errors.map((error) => {
        const { message } = error;
        return { message };
        });
        return res
        .status(400)
        .json({ status: STATUS_ERROR, message: ERR_VALIDATION, errors });
    }
};

const login = (req, res) => {
    const { username, password } = req.body;
    const users = readUsers();
    const existingUser = users.find((user) => user.username === username);
    if (!existingUser) {
      return res.status(404).json({ error: ERR_USER_NOT_FOUND });
    } else {
      const comparePass = bcrypt.compareSync(password, existingUser.password);
      if (!comparePass) {
        return res.status(401).json({ error: ERR_INVALID_PASSWORD });
      }
      const accessToken = generateAccessToken(username);
      return res.status(200).json({ message: MSG_SUCCESSFUL_LOGIN, accessToken });
    }
  };
  


//Function to generate access tokens
function generateAccessToken(username) {
    return jwt.sign({ username }, JWT_SECRET, { expiresIn: 86400 });
}

module.exports = { login, register };