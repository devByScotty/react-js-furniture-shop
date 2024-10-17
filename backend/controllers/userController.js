const bcrypt = require('bcrypt');
const supabase = require('../config'); // Adjust the path to your Supabase config
const jwt = require('jsonwebtoken');
// User Registration
const registerUser = async (req, res) => {
  const { email, password, name, phone, address } = req.body;

  try {
    // Check if the user already exists
    const { data: existingUser, error: findUserError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user details in the users table (including hashed password)
    const { error: userError } = await supabase
      .from('users')
      .insert([{ email, password: hashedPassword, name, phone, address }]);

    if (userError) {
      console.error('Error saving user data:', userError);
      return res.status(500).json({ error: userError.message });
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: err.message });
  }
};

// User Login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validate if email and password are provided
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    // Fetch user data from the database based on the email
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();  // Fetch single user with matching email

    if (error || !user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the password provided with the hashed password in the database
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // If login is successful, generate a token (optional if you're using JWT)
    const token = jwt.sign({ id: user.id, email: user.email , name: user.name}, 'your_secret_key', {
      expiresIn: '1h', // Token expiration
    });

    res.status(200).json({ message: 'Login successful', token ,userId:user.id ,email:user.email ,username: user.name});
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Fetch All Users
const getUsers = async (req, res) => {
  try {
    const { data: users, error } = await supabase.from('users').select('*');
    if (error) {
      console.error('Error fetching users:', error);
      return res.status(500).json({ error: error.message });
    }
    res.status(200).json(users);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = { registerUser, loginUser, getUsers };
