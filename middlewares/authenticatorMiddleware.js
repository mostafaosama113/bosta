const jwt = require("jsonwebtoken");
function authenticator(req, res, next) {
  try {
    if (req.url.includes("/login") ||
        req.url.includes("/register") ||
        req.url.includes("/api/docs") || 
        req.url.includes("/overDueLastMonth") || 
        req.url.includes("/processesLastMonth") 
      ) {
      next();
    } else {

      var token = req.headers.authorization.split(" ");
      if (token.length !== 2 || !token[0] === 'Bearer' || !token[1]) 
        return res.status(401).json({ error: "Access denied" });

      token = token[1]
  
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      req.id = decoded.id;
      next();
    }
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = {authenticator};