import jwt from 'jsonwebtoken'

import { JWT_SECRET } from '../config/env.js'
import User from '../models/user.model.js'

const authorize = async (req, res, next) => {
  try {
    let token;

    // check if the token is in the header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // if the token is not in the header, return an error
    if(!token) return res.status(401).json({ message: 'Unauthorized' });

    // verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if(!user) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user;

    next();

  } 
  catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
}

const isAdmin = async (req, res, next) => {
  try {
    let token;

    // check if the token is in the header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // if the token is not in the header, return an error
    if(!token) return res.status(401).json({ message: 'Unauthorized' });

    // verify the token
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await User.findById(decoded.userId);

    if(!user || !user.isAdmin) return res.status(401).json({ message: 'Unauthorized' });

    req.user = user;

    next();

  } 
  catch (error) {
    res.status(401).json({ message: 'Unauthorized', error: error.message });
  }
}


export { authorize, isAdmin };