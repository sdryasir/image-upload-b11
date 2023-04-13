import jwt from "jsonwebtoken";


export const isAuthenticatedUser = (req, res, next)=>{
    
    const token = req.cookies.token

    if(!token){
        next(new Error('Please Login to access this resource'))
    }

     const decode =  jwt.verify(token, '-YJN-yYNCn1CxYPLypyCoSEUN5r1XsdFhKmeQnle0s5O0qB_StUwn-ZOBV4DXVwIBnq7X3XVfgdpuSj4PyUHZUroJWnR5ChEd4-nkLIejICV6MOCOvU-Tmie_iXu4eCcK9tdWnMvsMNnKf29UcduJNyuR7CFhKmlq-Dq10uiv6c')

    req.user = decode.user;

    next()
}

export const isAuthorizedUser = (...roles)=>{
    return (req , res, next)=>{
        if(!roles.includes(req.user.role)){
            next(new Error('You are not authorized to use this resource'))
        }
        next()
    }
}