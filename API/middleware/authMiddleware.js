// import jwt from 'jsonwebtoken';
// import { JWT_SECRET } from '../secret.js';
// import { user } from '../models/userModel.js';



// //Next invokes the next middleware such as createTeam, deleteteam (Get,Post,Put,Delete)
// //1st Layer Authenticate users
// const authenticateUser = (req,res,next) => {
//     //Grab token from request header
//     const token = req.headers.authorization;

//     //Check if token is not provided
//     if (!token) {
//         return res.status(401).json({error: 'Unauthorized: No token provided'});
//     }
//     try {
//         // Verify and Decode JWT token
//         const decoded = jwt.verify(token,JWT_SECRET);
//         //Attach decoded user information to request object -> extracting the token payload
//         req.user = decoded.user
//         // Move to the next middleware
//         next();
//     } catch (error) {
//         //Handle invalid token
//         return res.status(401).json({error: 'Unauthorized: Invalid token'});
//     }
// };

// // 2nd layer authorize user based on roles
// const authorizeUser = (requiredRoles) => (req, res, next) => {
//     // Check if user is authenticated and has a role
//     if (!req.user || !req.user.role) {
//         return res.status(401).json({ error: 'Unauthorized: User role not found' });
//     }

//     // Check if user has one of the required roles
//     if (!requiredRoles.includes(req.user.role)) {
//         return res.status(403).json({ error: 'Unauthorized Permissions' });
//     }

//     // If user has permission, move to next middleware
//     next();
// };

// //Error Handling
// const errorHandler = (err,req,res,next) => {
//     //Error handling
//     console.error(err.stack);
//     res.status(500).json({error: 'Internal error Error'});
// };


// export {authenticateUser,authorizeUser,errorHandler}


// authMiddleware.js

import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../secret.js';

// Middleware to protect routes based on user role
export const authorizeRole = (allowedRoles) => {
    return (req, res, next) => {
        const { accountType } = req.user;
        if (allowedRoles.includes(accountType)) {
            next(); // User has required role, proceed to the next middleware
        } else {
            res.status(403).json({ error: 'Forbidden' }); // User does not have required role
        }
    };
};

// Middleware to validate token
export const validateToken = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
    jwt.verify(token, JWT_SECRET, {}, (err, userData) => {
        if (err) {
            console.error('Error verifying token:', err);
            return res.status(401).json({ error: 'Unauthorized' });
        }
        console.log('User data:', userData);
        req.user = userData;
        next();
    });
};




