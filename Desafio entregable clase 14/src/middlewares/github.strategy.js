import passport from "passport";
import { Strategy as GitHubStrategy } from "passport-github2";
import userService from "../services/User.service";

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/api/sessions/github/callback",
    },
    async function (accessToken, refreshToken, profile, done) {
      console.log(profile._json);
      try {
        let foundUser = await userService.getByFilter({
          email: profile._json.email,
        });

        if (!foundUser) {
          let newUser = {
            email: profile._json.email,
            first_name: profile._json.name,
            oauthUser: true,
          };

          const result = await userService.create(newUser);

          return done(null, result);
        } else {
          return done(null, foundUser);
        }
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
