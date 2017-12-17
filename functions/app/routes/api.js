var Superadmin  = require('../models/superadmin');
var Alumni      = require('../models/alumni/alumni');
var jwt         = require('jsonwebtoken');
var secret      = 'MgAlmIF01';
var nodemailer  = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
var smtpTransport = require('nodemailer-smtp-transport');
var xoauth2     = require('xoauth2');


module.exports = function(router) {

//SEND MAIL WITH MY ACCOUNT SUPERADMIN
var client = nodemailer.createTransport(smtpTransport({
   host: 'smtp.gmail.com',
   port: 465,
  secure: true,
  auth: {
          // xoauth2: {
            user: 'legrondhibebzky@gmail.com', // Your email address
            pass: 'legron26801' // Your password
            // clientId:'482185607492-umakr6ei4umfl3o4ccbe647jtfhs908f.apps.googleusercontent.com',
            // clientSecret:'3tLpA0CEgPs9OkNTYl_aqvHs',
            // refreshToken:'1/McxRTQveCa624eQUJIKlTFgzysfPPYoMGqqJX_84lkc'
            // accesToken:'ya29.GlynBOuOX6mryQ50jJexRVAMunsLL3Kye-h-CthYUTrvvITZGhan-2_sc5FV2t4yxjEMuKoZbXO9A4r8eWK7P3e8MR3wKdw2wG_zZv88ZM7h1G0NA5-e6wFkbN0inw'
            // }            hgv
        },
          tls: { rejectUnauthorized: false }
  }));

// THIS FOR ALUMNI
router.post('/almcreate', function(req, res){
  var alumni = new Alumni();
  alumni.nama = req.body.nama;            
  alumni.username = req.body.username;
  alumni.email = req.body.email;          
  alumni.password = req.body.password;
  alumni.nim = req.body.nim;              
  alumni.gender = req.body.gender;
  alumni.hp = req.body.hp;                
  alumni.company = req.body.company;
  alumni.emlrweb = req.body.emlrweb;      
  alumni.cprofile = req.body.cprofile;
  alumni.address = req.body.address;      
  alumni.lat = req.body.lat;
  alumni.lng = req.body.lng;  
  alumni.temporarytoken = jwt.sign({username: alumni.username, email:  alumni.email, level: alumni.level}, secret);
  if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' ||
      req.body.email == null || req.body.email == '' || req.body.nama == null || req.body.nama == '' || req.body.nim == null || req.body.nim == '' || req.body.gender == null || req.body.gender == '' || req.body.hp == null || req.body.hp == '')
  {
    res.json({success: false, message: 'Ensure Username, Email, And Password Weree Provided'});
}else{
  alumni.save(function(err){
    if (!err) {

    // Create e-mail object to send to alumni
    var email = {
      from: 'OML Superadmin, legrondhibebzky@gmail.com',
      to: alumni.email,
      subject: 'Your Activation Link',
      text: 'Hello ' + alumni.nama + ', thank you for registering at https://hommey01-cury.herokuapp.com/# Please click on the following link to complete your activation: https://hommey01-cury.herokuapp.com/#/activate/' + alumni.temporarytoken,
      html: 'Hello<strong> ' + alumni.nama + '</strong>,<br><br>Thank you for registering at https://hommey01-cury.herokuapp.com/. Please click on the link below to complete your activation:<br><br><a href="https://hommey01-cury.herokuapp.com/#/activate/' + alumni.temporarytoken + '">https://hommey01-cury.herokuapp.com/#/activate/</a>'
    };
    // Function to send e-mail to the superadmin
    client.sendMail(email, function(err, info) {
      if (err) {
          console.log(err); // If error with sending e-mail, log to console/terminal
        } else {
          console.log('message sent', info.response); // Log success message to console if sent
          console.log(alumni.email); // Display e-mail that it was sent to
        }
      })
    res.json({success: true, message:'Alumni Succesed Created, PLEASE CHECK YOUR EMAIL FOR ACTIVATION LINK'});
  }else{
      // res.json({success: false, message:'Username & Email Already Exists!!! ;P'});    
      if (err.errors != null){
        if (err.errors.nama){
          res.json({success: false, message: err.errors.nama.message});    
        }else if (err.errors.username){
          res.json({success: false, message: err.errors.username.message});  
        }else if (err.errors.email){
          res.json({success: false, message: err.errors.email.message});    
        }else if (err.errors.password){
          res.json({success: false, message: err.errors.password.message});    
        }else{
          res.json({success: false, message: err});                
        }
      }else if (err){
        if (err.code == 11000){
          if (err.errmsg[63] == "u"){
            res.json({success: false, message: 'Username Its Already Try Again' });                
          }else if (err.errmsg[63] == "e"){
            res.json({success: false, message:'E-mail Is Already Taken'});                
          }
        }else{
          res.json({success: false, message: err});                
        }
      }
    }
  });
}
});

//auth username ALUMNI
// router.post('/checkusername', function(req, res){
//   Alumni.findOne({ username: req.body.username }).select('username').exec(function(err, alumni){
//     if (err) throw err;

//     if (alumni){
//       res.json({ success: false, message: 'Username Already '});
//     }else{
//       res.json({ success: true, message: 'Successful username'});        
//     }
//   });
// });

//auth username ALUMNI
// router.post('/checkemail', function(req, res){
//   Alumni.findOne({ email: req.body.email }).select('email').exec(function(err, alumni){
//     if (err) throw err;

//     if (alumni){
//       res.json({ success: false, message: 'Email Is Already'});
//     }else{
//       res.json({ success: true, message: 'Successful email'});        
//     }
//   });
// });
// THIS END FOR ALUMNI



// THIS FOR ADMIN OR SUPERADMIN

//regist SUPERADMIN
router.post('/superadmins', function(req, res){
  var superadmin = new Superadmin();
  superadmin.username = req.body.username;
  superadmin.password = req.body.password;
  superadmin.email = req.body.email;
  superadmin.nama = req.body.nama;
  superadmin.hp = req.body.hp;
  superadmin.temporarytoken = jwt.sign({username: superadmin.username, email:  superadmin.email, level: superadmin.level}, secret);
  if (req.body.username == null || req.body.username == '' || req.body.password == null || req.body.password == '' ||
   req.body.email == null || req.body.email == '' || req.body.nama == null || req.body.nama == ''){
    res.json({success: false, message: 'Ensure Username, Email, And Password Weree Provided'});
}else{
  superadmin.save(function(err){
    if (!err) {

    // Create e-mail object to send to superadmin
    var email = {
      from: 'OML Superadmin, legrondhibebzky@gmail.com',
      to: superadmin.email,
      subject: 'Your Activation Link',
      text: 'Hello ' + superadmin.nama + ', thank you for registering at https://hommey01-cury.herokuapp.com/# Please click on the following link to complete your activation: https://hommey01-cury.herokuapp.com/#/activate/' + superadmin.temporarytoken,
      html: 'Hello<strong> ' + superadmin.nama + '</strong>,<br><br>Thank you for registering at https://hommey01-cury.herokuapp.com/. Please click on the link below to complete your activation:<br><br><a href="https://hommey01-cury.herokuapp.com/#/activate/' + superadmin.temporarytoken + '">https://hommey01-cury.herokuapp.com/#/activate/</a>'
    };
    // Function to send e-mail to the superadmin
    client.sendMail(email, function(err, info) {
      if (err) {
          console.log(err); // If error with sending e-mail, log to console/terminal
        } else {
          console.log('message sent', info.response); // Log success message to console if sent
          console.log(superadmin.email); // Display e-mail that it was sent to
        }
      })
    res.json({success: true, message:'Superadmin Succesed Created, PLEASE CHECK YOUR EMAIL FOR ACTIVATION LINK'});
  }else{
      // res.json({success: false, message:'Username & Email Already Exists!!! ;P'});    
      if (err.errors != null){
        if (err.errors.nama){
          res.json({success: false, message: err.errors.nama.message});    
        }else if (err.errors.username){
          res.json({success: false, message: err.errors.username.message});  
        }else if (err.errors.email){
          res.json({success: false, message: err.errors.email.message});    
        }else if (err.errors.password){
          res.json({success: false, message: err.errors.password.message});    
        }else{
          res.json({success: false, message: err});                
        }
      }else if (err){
        if (err.code == 11000){
          if (err.errmsg[63] == "u"){
            res.json({success: false, message: 'Username Its Already Try Again' });                
          }else if (err.errmsg[63] == "e"){
            res.json({success: false, message:'E-mail Is Already Taken'});                
          }
        }else{
          res.json({success: false, message: err});                
        }
      }
    }
  });
}
});

//auth username SUPERADMIN
router.post('/checkusername', function(req, res){
  Superadmin.findOne({ username: req.body.username }).select('username').exec(function(err, superadmin){
    if (err) throw err;

    if (superadmin){
      res.json({ success: false, message: 'That Username Is Already Try Again'});
    }else{
      res.json({ success: true, message: 'A successful username no one have'});        
    }
  });
});

//auth username SUPERADMIN
router.post('/checkemail', function(req, res){
  Superadmin.findOne({ email: req.body.email }).select('email').exec(function(err, superadmin){
    if (err) throw err;

    if (superadmin){
      res.json({ success: false, message: 'That email Is Already Try Again'});
    }else{
      res.json({ success: true, message: 'A successful email no one have email'});        
    }
  });
});

//auth login SUPERADMIN
router.post('/authenticate', function(req, res){
  Superadmin.findOne({ username: req.body.username }).select('email username password active level').exec(function(err, superadmin){
    if(err) throw err;

    if (!superadmin){
      res.json({ success: false, message:'Could Not Authenticate Superadmin'});
    }else if(superadmin){
      if (req.body.password) {
        var validPassword = superadmin.comparePassword(req.body.password);  
      }else{
        res.json({ success: false, message:'No Password Provided'});
      }

      if(!validPassword){
        res.json({success: false, message: 'Could Not Authenticate Password'});
      }else if (!superadmin.active) {
        res.json({ success: false, message: 'Account Is Not Activated, Please Check Email For Activation Link'});
      }else{
        var token = jwt.sign({username: superadmin.username, email:  superadmin.email, level: superadmin.level}, secret);
        res.json({success: true, message: 'Superadmin Authenticate', token: token});
      }
    }
  });
});

// Auth Activate Token Account Sadmin 
router.put('/activate/:token', function(req, res){
  Superadmin.findOne({ temporarytoken: req.params.token }, function(err, superadmin){
    if (err) throw err;
    var token = req.params.token;  

    jwt.verify(token, secret, function(err, decoded){
      if(err){
        res.json({ success: false, message: 'Activate Link Expaired'});
      }else if (!superadmin){
        res.json({ success: false, message: 'Activate Link Expaired'});
      }else{
        superadmin.temporarytoken = superadmin.temporarytoken;
        superadmin.active         = true;
        superadmin.save(function(err){
          if (err){
            console.log('err',err);
          }else{
              // Create e-mail object to send to superadmin
              var email = {
                from: 'OML Superadmin, legrondhibebzky@gmail.com',
                to: superadmin.email,
                subject: 'Your Account Activated',
                text: 'Hello ' + superadmin.nama + ', Your Account Has Activated',
                html: 'Hello<strong> ' + superadmin.nama + '</strong>,<br><br>Your Account Has Activated'
              };
              // Function to send e-mail to the superadmin
              client.sendMail(email, function(err, info) {
                if (err) {
                    console.log(err); // If error with sending e-mail, log to console/terminal
                  } else {
                    console.log('message sent', info.response); // Log success message to console if sent
                    // console.log(superadmin.email); // Display e-mail that it was sent to
                  }
                });
              res.json({ success: true, message: 'Account Activated'});
            }
          });
}
});
});
});

  router.use(function(req, res, next){
    var token = req.param('token') ||req.body.token || req.body.query || req.headers['x-access-token'];
    if (token) {
      jwt.verify(token, secret, function(err, decoded){
        if(err){
          res.json({ success: false, message: 'Invalid Token'});
        }else{
          req.decoded = decoded;
          next();
        }
      });
    }else{
      res.json({success: false, message:'No Token Provided'});
    }
  });

  router.post('/me', function(req, res){
    res.send(req.decoded);
  });

// SHOW ALL SUPERADMIN
router.get('/getallsuper', function(req, res){
  Superadmin.findOne({username:req.decoded.username}, function(err, mainSuperadmin){
    if (err) throw err;
    if (!mainSuperadmin){
      res.json({success: false, message:'No Superadmin Found'});
    } else{

      Superadmin.find({}, function(err, superadmins){
        if (err) throw err;
      // Superadmin.findOne({ username: req.decoded.username}, function(err, mainSuperadmin){
      //   if (err) throw err;
      if (err){
        res.json({ success: false, message: 'No Superadmin Found'});
      }else{
        res.json({ success:true, superadmins:superadmins});
      }
      // });
    });
    }
  });  
});

// Delete SUPERADMIN
router.delete('/sadmindel/:username', function(req, res){
  var deleteSuperadmin = req.params.username;
  Superadmin.findOne({ username: req.decoded.username }, function(err, mainSuperadmin){
    if (err) throw err;
    if (!mainSuperadmin){
      res.json({ success: false, message: 'No Superadmin Found'});
    }else{
      if (mainSuperadmin){
        Superadmin.findOneAndRemove({ username:deleteSuperadmin }, function(err, superadmin){
          if (err) throw err;
          res.json({ success:true });
        });  
      }else{
        res.json({success:false, message: 'Insufficient permission'});
      }
    }
  });
});

// SHOW ONE EDIT SUPERADMIN
router.get('/sadminedit/:id', function(req,res){
  var editSuperadmin = req.params.id;
  Superadmin.findOne({username:req.decoded.username}, function(err, mainSuperadmin){
    if (err) throw err;
    if (!mainSuperadmin){
      res.json({success: false, message:'No Superadmin Found'});
    } else{
      if (mainSuperadmin){
        Superadmin.findOne({ _id: editSuperadmin}, function(err, superadmin){
          if (err) throw err;
          if (!superadmin){
            res.json({ success: false, message:'No Superadmin Found'});
          }else{
            res.json({ success:true, superadmin:superadmin });     
          }
        });
      }else{
        res.json({success:false, message: 'Insufficient permission'});            
      }
    }
  });
});

// EDIT SUPERADMIN //
router.put('/sadminedit', function(req, res){
  var editSuperadmin = req.body._id;
  if (req.body.username) var newUsername = req.body.username;
  if (req.body.email)    var newEmail    = req.body.email;
  if (req.body.nama)     var newNama     = req.body.nama;
  Superadmin.findOne({username: req.decoded.username}, function(err, mainSuperadmin){
    if (err) throw err;
    if (!mainSuperadmin){
      res.json({success:false, message:'No Superadmin Found'});
    } else{
      if ((newUsername) && (newEmail) && (newNama)){
        if (mainSuperadmin){
          Superadmin.findOne({_id: editSuperadmin}, function(err, superadmin){
            if (err) throw err;
            if (!superadmin){
              res.json({success:false, message:'No Superadmin Found'});           
            }else{
              superadmin.username = newUsername;
              superadmin.email    = newEmail;
              superadmin.nama     = newNama;
              superadmin.save(function(err){
                if (!err){
                  res.json({success:true, message:'Success Update!'});
                }else{
                  if (err.errors != null){
                    if (err.errors.username){
                      res.json({success: false, message: err.errors.username.message});    
                    }else if (err.errors.email){
                      res.json({success: false, message: err.errors.email.message});  
                    }else if (err.errors.nama){
                      res.json({success: false, message: err.errors.nama.message});    
                    }else{
                      res.json({success: false, message: err});                
                    }
                  }else if (err){
                    if (err.code == 11000){
                      if (err.errmsg[63] == "u"){
                        res.json({success: false, message: 'Username Its Already Try Again' });                
                      }else if (err.errmsg[63] == "e"){
                        res.json({success: false, message:'E-mail Is Already Taken'});                
                      }
                    }else{
                      res.json({success: false, message: err});                
                    }
                  }
                }
              });
}
});
}else{
  res.json({success:false, message: 'Insufficient permission'});              
}
} 
}
});
});

// RESET PASSWORD
router.put('/sadminreset', function(req, res){
  var editSuperadmin = req.body._id;
  if (req.body.password) var firstPassword = req.body.password;
  Superadmin.findOne({username: req.decoded.username}, function(err, mainSuperadmin){
    if (err) throw err;
    if (!mainSuperadmin){
      res.json({success:false, message:'No Superadmin Found'});
    } else{
      if (firstPassword){
        if (mainSuperadmin){
          Superadmin.findOne({_id: editSuperadmin}, function(err, superadmin){
            if (err) throw err;
            if (!superadmin){
              res.json({success:false, message:'No Superadmin Found'});           
            }else{
              superadmin.password = firstPassword;
              superadmin.save(function(err){
                if (!err){
                  res.json({success:true, message:'Success Update!'});
                }else{
                  if (err.errors != null){
                    if (err.errors.password){
                      res.json({success: false, message: err.errors.password.message});    
                    }else{
                      res.json({success: false, message: err});                
                    }
                  }
                }
              });
            }
          });
        }else{
          res.json({success:false, message: 'Insufficient permission'});              
        }
      } 
    }
  });
});
// END FOR ADMIN OR SUPERADMIN 




return router;
}