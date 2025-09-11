import passport from "passport";
// import local from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as JwtStrategy } from "passport-jwt";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
// import Strategy from 'passport-local'
import { User } from "../models/userModel.js";

// const local = local.Strategy;
dotenv.config();
const getCookie = (req) => {
  if (req && req.cookies && req.cookies.access_token) {
    return req.cookies.access_token;
  }
  return null;
};

const initPassport = () => {
  // local -> email y password
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
        session: true,
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({ email: email });
          if (!user || !user.password)
            return done(null, false, { message: "Credenciales inválidas." });
          const authUser = await bcrypt.compare(password, user.password);
          if (!authUser) return done(null, false, { message: "Credenciales inválidas (bycript)." });
          // nuevo usuario
          if (!user) {
            user = await User.create({
              _id: user._id,
              email: user.email,
              password: createHash(password),
            });
          }
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // github strategy
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async (accessToke, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value || `${profile.username}@github.local`;
          let user = await User.findOne({ $or: [{ githubId: profile.id }, { email }] });
          if (!user) {
            user = await User.create({
              first_name: profile.displayName || profile.username || "GitHub",
              last_name: "User",
              email,
              age: 18,
              githubId: profile.id,
            });
          }
          return done(null, {
            _id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            age: user.age,
            role: user.role,
          });
        } catch (err) {
          return done(err);
        }
      }
    )
  );
  // JWT strategy
  passport.use(
    "jwt-cookie",
    new JwtStrategy(
      {
        jwtFromRequest: getCookie,
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          const user = await User.findById(payload.sub).lean();
          if (!user) return done(null, false);
          return done(null, { _id: user._id, email: user.email, role: user.role });
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );

  // serialize / deserialize
  passport.serializeUser((user, done) => done(null, user._id));

  passport.deserializeUser(async (id, done) => {
    try {
      const u = await User.findById(id).lean();
      if (!u) return done(null, false);

      done(null, {
        _id: u._id,
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
        age: u.age,
        role: u.role,
      });
    } catch (err) {
      done(err);
    }
  });
};
export default initPassport;
