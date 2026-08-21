// // auth.js middleware
// const authMiddleware = (req, res, next) => {
//     // console.log("Request session:", req.session); 
//     // console.log("User is authenticated:", req.isAuthenticated()); 
//     if (req.isAuthenticated()) {
//       return next(); 
//     } else {
//       console.log("User is not authenticated");
//       res.status(401).json({ success: false, message: "Unauthorized" }); 
//     }
//   };
  
//   export default authMiddleware;


import jwt from "jsonwebtoken"
  // auth.js middleware
  const authMiddleware=async (req,res,next)=>{
    const {token}=req.headers;
    if(!token){
      return res.json({success:false,message:"Not Authorized Login Again"})
    }
    try{
      const token_decode=jwt.verify(token,process.env.JWT_SECRET)
      req.body.userId=token_decode.id;
      next()
    }catch(error){
      console.log(error)
      return res.json({success:false,message:"Error"})
    }
  }
  export default authMiddleware