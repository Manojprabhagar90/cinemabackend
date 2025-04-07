const user = require("../models/userModel")
const Theater = require("../models/theaterModel")
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const mongoose = require("mongoose");
require('dotenv').config();
const userControllers = {
    getuserbyId : async(request,response)=>{
        try {
            
            const { id } = request.params;
           
            const users = await user.findById(id);
            if(!users){
                response.status(404).json({message:'User Not found'})
            }


            response.status(200).json(users);
        } catch (error) {
            
        }
    },
    addUser : async(request,response)=>{
        try {
            const { username,email,password,role } = request.body;
            const userExists = await user.findOne({ email : email});
 
            if (userExists) {
                return response.status(400).json({ message: 'Email already exists' });
            }
            const encrypted_password = await bcrypt.hash(password,10);
            const newUser = new user({
                name:username,email,password:encrypted_password,role
            });

            await newUser.save();
            
            response.status(201).json(newUser);
        } catch (error) {
            response.status(500).json(error)
        }
    },
    login : async(request,response)=>{
        try{
            const {  email , password } = request.body;

            const login_user = await user.findOne({ email:email});

            if(!login_user){
                return response.status(400).json({message:"Invalid Username..."})
            }


            const check_password = await bcrypt.compare(password,login_user.password);

            if(!check_password){
                return response.status(400).json({message:"Invalid Password..."})
            }

            const token = jwt.sign({id:login_user._id},process.env.JWT_SECRET);
            const role = login_user.role;
            let theater_id = '';
            if(role == 'theater_admin'){
                 const theater_data = await Theater.findOne({ userid:new mongoose.Types.ObjectId(login_user._id) },{_id:1});
                 theater_id = theater_data._id
            }
            
            return response.status(200).json({message:`Login successfull...`,token,role,theater_id,login_user});
        }catch(error){
            return response.status(500).json({ message : error.message })
        }
    },
    logout : async(request,response)=>{
        try {
            response.clearCookie('token');
            return response.status(200).json({ message: 'Logout successful' });
        } catch (error) {
            return response.status(500).json({ message: error.message });
        }
    }
}

module.exports = userControllers;