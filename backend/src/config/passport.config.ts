import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import type { StrategyOptions } from 'passport-jwt';
import { Env } from './env.config.js';

interface JwtPayload {
    userId: string;
}

const options: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: Env.JWT_SECRET,
    audience: 'user',
    algorithms: ['HS256']
};
passport.use(new JwtStrategy(options,async (payload: JwtPayload, done) => {
    // Here you can add your user validation logic
    done(null, payload);
}));