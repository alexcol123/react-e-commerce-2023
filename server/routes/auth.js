import express from 'express';

const router = express.Router()

router.get('/users', (req, res) =>{
  console.log('ran')
  res.json({
    data: 'Alexopolis  Phersepolis ',
  })
})

export default router