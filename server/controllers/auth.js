export const register = (req, res) => {

const {name, email, password}= req.body

  res.json({ sucess: true, name, email})
}
