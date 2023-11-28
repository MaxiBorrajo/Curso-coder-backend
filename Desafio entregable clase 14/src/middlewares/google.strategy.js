import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth2";

import userService from "../services/User.service.js";

import { uploadImageToCloudinary } from "./uploadImages.middleware.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const foundUser = await userService.getByFilter({
          email: profile.email,
        });

        if (!foundUser) {
          const profilePhoto = await uploadImageToCloudinary(profile.picture);

          const newUser = {
            email: profile.email,
            first_name: profile.displayName,
            urlProfilePhoto: profilePhoto.url,
            publicId: profilePhoto.public_id,
            oauthUser: true,
          };

          const createdUser = await userService.create(newUser);

          return done(null, createdUser);
        }
        
        return done(null, foundUser);
      } catch (error) {
        return done(error);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  const user = await userService.getById(id);

  done(null, user);
});
