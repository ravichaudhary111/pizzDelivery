const User = require('../models/user')
const LocalStragety = require('passport-local').Strategy
const bcrypt = require('bcrypt')

function init(passport) {
    passport.use(new LocalStragety({
        usernameField:'email'},
        async (email,password,done)=> {
            // check email exists
             const user =await User.findOne({email:email})
             if(!user) {
                return done(null,false,{message:'NO USER WITH THIS EMAIL'})
             }

             bcrypt.compare(password,user.password).then((match)=>{
                if(match) {
                    return done(null,user,{message:'Login Successfully'})
                }

                return done(null,false,{message:'Incorrect username or password'})
             }).catch((err)=>{
                return done(null,false,{message:'Somthing went worng'})
             })


        }
    ))

    passport.serializeUser((user,done)=>{
        done(null,user._id)
    })

    passport.deserializeUser((id,done)=>{
        User.findById(id,(err,user)=>{
            done(err,user)
        })
    })
}

module.exports = init