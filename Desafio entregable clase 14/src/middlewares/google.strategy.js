import passport from "passport";

import { Strategy as GoogleStrategy } from "passport-google-oauth2";

import userService from "../services/User.service.js";

import uploadImageMiddleware from "./uploadImages.middleware";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/sessions/google/callback",
      passReqToCallback: true,
    },
    /**
     * Passport google authentication strategy callback. Searches with the information given
     * by the authentication a user stored in database, if it is found, executes done function, if it is not
     * creates one and then executes done.
     * @param {Object} request - Request's object from the http request
     * @param {string} accessToken - Access token from google authentication
     * @param {string} refreshToken - Refresh token from google authentication
     * @param {Object} profile - User's google profile
     * @param {Function} done - Callback function that finish the authentication
     * @returns {Promise<void>} - Promise resolved when authentication is complete
     * @throws {CustomError} - If something goes wrong with the authentication or with the database
     */
    async function (request, accessToken, refreshToken, profile, done) {
      try {
        const foundUser = await userService.getByFilter({
          email: profile.email,
        });

        if (!foundUser) {
          const profilePhoto =
            await uploadImageMiddleware.uploadImageToCloudinary(
              profile.picture
            );

          const newUser = {
            email: profile.email,
            name: profile.displayName,
            urlProfilePhoto: profilePhoto.url,
            publicId: profilePhoto.publicId,
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
