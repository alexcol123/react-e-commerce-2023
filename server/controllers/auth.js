import User from '../models/user.js'

export const login = async (req, res) => {
  // Destructure
  const { email, password } = req.body
  try {
    // Validate

    if (!email.trim()) return res.json({ error: 'Email is required' })
    if (!password || password.lenght < 6)
      return res.json({
        error: 'Password is required and should be 6 characters or more',
      })

    // Find user

    const user = await User.findOne({ email })

    if (!user) {
      return res.json({ error: 'No user found with that email.' })
    }

    // Compare Password
    const passwordMatch = await user.comparePassword(password)

    if (!passwordMatch) {
      return res.json({ error: 'Wrong Password.' })
    }

    // Create JWT
    const token = await user.createJWT()

    res.status(201).json({
      user: {
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
      token,
    })
  } catch (err) {
    // Check if email is taken
    if (err.code == 11000)
      res.json({
        error:
          'That email already exists try to login using your email ' + email,
      })
    console.log(err.code)
  }
}

export const register = async (req, res) => {
  // Destructure
  let { name, email, password, address } = req.body

  email = email.toLowerCase()

  try {
    // Validate

    if (!name.trim()) return res.json({ error: 'Name is required' })
    if (!email.trim()) return res.json({ error: 'Email is required' })
    if (!password || password.lenght < 6)
      return res.json({
        error: 'Password is required and should be 6 characters or more',
      })

    // Check if user with that email exists
    const userExist = await User.findOne({ email })
    if (userExist) {
      res.json({
        error: 'User alredy register with that email , try to login',
      })
    }

    // Save user to DB
    const user = await User.create({ name, email, password, address })

    // Create JWT
    const token = await user.createJWT()
    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        address: user.address,
        role: user.role,
      },
      token,
    })
  } catch (err) {
    // Check if email is taken
    if (err.code == 11000)
      res.json({
        error:
          'That email already exists try to login using your email ' + email,
      })
    console.log(err.code)
  }
}

// Secret
export const secret = async (req, res) => {
  res.json({ currentUser: req.user })
}
