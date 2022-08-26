const jwt = require('jsonwebtoken')
const Users = require("../model/users")
const auth = async (req, res, next) => {
   try {
      console.log(req.body)
      const token = req.header('Authorization').replace('Bearer ', '')
      console.log(token)
      const decode = await jwt.verify(token, 'supersecret')
      console.log(decode.id)
      const user = await Users.findOne({ _id: decode.id })
      console.log(user);
      if (!user)
         throw new Error()
      req.token = token
      req.user = user;
      next();
   } catch (e) {
      res.status(400).send({error:"authentication X"})
      // res.status(200).send({ auth: true, token: token });

   }
}

module.exports = auth