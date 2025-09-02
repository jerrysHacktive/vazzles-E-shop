const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/users");

// Serialize user to store in session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

// Configure Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with googleId or email
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          user = await User.findOne({ email: profile.emails[0].value });

          if (user) {
            // If email exists but no googleId, link the Google account
            user.googleId = profile.id;
            user.provider = "google";
            user.isEmailVerified = true; // Google verifies emails
            await user.save();
          } else {
            // Create new user
            user = new User({
              googleId: profile.id,
              provider: "google",
              firstName: profile.name.firstName,
              lastName: profile.name.lastName,
              email: profile.emails[0].value,
              isEmailVerified: true,
            });
            await user.save();
          }
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);
