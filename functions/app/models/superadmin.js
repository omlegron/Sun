var mongoose  = require('mongoose');
var Schema    = mongoose.Schema; 
var bcrypt    = require('bcrypt-nodejs');
var titlize   = require('mongoose-title-case');
var validate  = require('mongoose-validator');

// var passportLocalMongoose = require('passport-local-mongoose');
// Superadmin Schema

var namaValidator = [
    validate({
      validator: 'matches',
     arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
        message: 'Name must be at least 3 characters, max 30, no special characters or numbers, must have space in between name.'
    }),
    validate({
        validator: 'isLength',
        arguments: [1, 20],
        message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

// User E-mail Validator
var emailValidator = [
    validate({
        validator: 'isEmail',
        arguments: /^[a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,4}$/,
        message: 'Its Not Valide EMAIL'
    }),
    validate({
        validator: 'isLength',
        arguments: [3, 40],
        message: 'Email should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

// Username Validator
var usernameValidator = [
    validate({
        validator: 'isLength',
        arguments: [3, 25],
        message: 'Username should be between {ARGS[0]} and {ARGS[1]} characters'
    }),
    validate({
        validator: 'isAlphanumeric',
        message: 'Username must contain letters and numbers only'
    })
];

// Password Validator
var passwordValidator = [
    validate({
        validator: 'matches',
        arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[\d])(?=.*?[\W]).{8,35}$/,
        message: 'Password needs to have at least one lower case, one uppercase, one number, one special character, and must be at least 8 characters but no more than 35.'
    }),
    validate({
        validator: 'isLength',
        arguments: [8, 35],
        message: 'Password should be between {ARGS[0]} and {ARGS[1]} characters'
    })
];

var SuperadminSchema = new Schema({
  nama: { type:String, required: true, validate: namaValidator },
  username: { type:String, unique:true, lowercase: true, validate: usernameValidator },
  password: { type:String, required: true, validate: passwordValidator, select:false},
  email: { type:String, unique:true,  lowercase: true, validate: emailValidator },
  level: { type:String, required:true},
  hp: {type:String},
  created_at:{type:Date,default:Date.now},
  active: { type: Boolean, required: true, default: false},
  temporarytoken : {type:String, required: true}
});


SuperadminSchema.pre('save', function(next){
  var superadmin = this;
  if (!superadmin.isModified('password')) return next();
  bcrypt.hash(superadmin.password, null, null, function(err, hash){
    if(err) return next(err);
    superadmin.password = hash;
    next();
  });
});

SuperadminSchema.plugin(titlize,{
    paths: ['nama']
});

SuperadminSchema.methods.comparePassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('Superadmin', SuperadminSchema);