const User = require('../../models/user.js')
const bcrypt = require('bcrypt')
const passport = require('passport')

function authController() {
    return {
        login(req,res) {
            res.render('auth/login')
        },

        postlogin(req,res,next){
            passport.authenticate('local',(err,user,info)=>{
                if(err) {
                    req.flash('error',info.message)
                    return next(err)
                }

                if(!user) {
                    req.flash('error',info.message)
                    res.redirect('/login')
                }

                req.logIn(user,(err)=>{
                    if(err) {
                        req.flash('error',info.message)
                        return next(err)
                    }
                    res.redirect('/')
                })
            })(req,res,next)
        },

        register(req,res) {
            res.render('auth/register')
        },
        async create(req,res) {
            const {name,email,password} = req.body
            // validate request
            if(!name || !email || !password) {
                req.flash('error',"All fields are required")
                req.flash('name',name)
                req.flash('email',email)
                res.redirect('/register')
            }

            // check if email exists 
            User.exists({email: email},(err,result)=> {
                if(result) {
                    req.flash('error',"Email already exists")
                    req.flash('name',name)
                    req.flash('email',email)
                    res.redirect('/register')
                }
            })

            // hash password
            const hashPassword = await bcrypt.hash(password,10)

            // create a user 
            const user = new User({
                name:name,
                email:email,
                password:hashPassword
            })

            user.save().then((user)=>{
                // LOGIN 
                res.redirect('/')
            }).catch(err=> {
                req.flash('error',"Somthing went wrong")   
                res.redirect('/register')
            })
        },
        logout(req,res){
            req.logout(function(err) {
                if (err) { return next(err); }
                res.redirect('/');
              });
        }
    }
}

module.exports = authController;