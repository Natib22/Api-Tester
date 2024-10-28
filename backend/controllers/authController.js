const User = require("../models/user");
const jwt = require("jsonwebtoken");


const handleErrors = (err) => {
    console.log(err.message, err.code);
    let errors = { email: '', password: '' , fullname : ''};
  
    // duplicate email error
    if (err.code === 11000) {
      errors.email = 'that email is already registered';
      return errors;
    }
  
    // validation errors
    if (err.message.includes('user validation failed')) {
      console.log(err , "true");
      Object.values(err.errors).forEach(({ properties }) => {
        // console.log(val);
        // console.log(properties);
        errors[properties.path] = properties.message;
      });
    }
  
    return errors;
  }


const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
// Ensure this outputs your secret

    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: maxAge,
    });
    }


module.exports.signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  // Create a new user
  try {

    
    const user = await User.create({ fullname, email,
      password,
    });
    const token = createToken(user._id);
    console.log("Token:", token); // Ensure this outputs
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
    res.cookie("check" , "from auth")
    res.status(201).json({ user , ok: true , jwt: token });
  } catch (error) {
    const err = handleErrors(error);
    res.status(400).json({ err  , ok : false });
  }
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;
  

  try {
    const user = await User.login(email, password);
    console.group(user , "loginsuccess , from the backend");
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ email : user.email , fullname :user.fullname  , ok: true  });

  }
  catch (error) {
    const err = {
      email: '',
      password: '',
    }
    if (error.message === "incorrect email") {
      err.email = "incorrect email";
      res.status(400).json({ err, ok : false });
    }
    if (error.message === "incorrect password" ){
      err.password = "incorrect password";
      res.status(400).json({ err , ok : false });
    }
   
  
  }
};
