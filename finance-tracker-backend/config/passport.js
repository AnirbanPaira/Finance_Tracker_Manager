import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { Strategy as LocalStrategy } from "passport-local";
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

if (!jwtOptions.secretOrKey) {
    throw new Error('JWT_SECRET environment variable is not set');
}

const configurePassport = () => {
    // JWT Strategy
    passport.use(new JwtStrategy(jwtOptions, async (jwt_payload, done) => {
        try {
            const user = await User.findById(jwt_payload.id);
            if (user) {
                return done(null, user);
            }
            return done(null, false);
        } catch (error) {
            return done(error, false);
        }
    }));

    // Local Strategy for username/password auth
    passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            
            if (!user) {
                return done(null, false, { message: 'Invalid email or password' });
            }

            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return done(null, false, { message: 'Invalid email or password' });
            }

            return done(null, user);
        } catch (error) {
            return done(error);
        }
    }));
};

export default configurePassport;