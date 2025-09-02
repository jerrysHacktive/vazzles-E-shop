// authJwt.js
const { expressjwt: jwt } = require("express-jwt");

function authJwt(adminOnly = true) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  return jwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: adminOnly ? isRevoked : undefined,
  })
}

async function isRevoked(req, payload) {
  // Return true to revoke the token, false to allow it
  return !payload.isAdmin; // Revoke if not admin
}

module.exports = authJwt;
