const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
    (accessToken,refreshToken,profile,done) => {
        try {
            
        } catch (err) {
            console.log(err);
        }
        done(null,profile);
    },
    ))
    passport.serializeUser( (user,done) => {
        done(null,user.id);
    })
}