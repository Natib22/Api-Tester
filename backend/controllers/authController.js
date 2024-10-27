const User = require("../models/user");


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


module.exports.signup = async (req, res) => {
  const { fullname, email, password } = req.body;

  // Create a new user
  try {

    
    const user = await User.create({ fullname, email,
      password,
    });
    res.status(201).json({ user });
  } catch (error) {
    const err = handleErrors(error);
    res.status(400).json({ err });
  }
};

module.exports.login = (req, res) => {
  res.send("Login page");
};
