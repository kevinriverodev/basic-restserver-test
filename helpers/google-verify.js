const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client();


async function verifyGoogle(token) {
  const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID
  });
  const { name, email, picture } = ticket.getPayload();
  
  return {
    name,
    email,
    picture
  }
}

module.exports = {
    verifyGoogle
}