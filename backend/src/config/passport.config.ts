import passport from 'passport';
import {Strategy as JwtStrategy, ExtractJwt} from 'passport-jwt';
import type { StrategyOptions } from 'passport-jwt';
import { Env } from './env.config.js';
import { findByIdUserService } from '../services/user.service.js';

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
    try{
        if(!payload.userId){
            return done(null, false, {message: 'Invalid token payload'});
        }
        const user = await findByIdUserService(payload.userId);
        if(!user){
            return done(null, false, {message: 'User not found'});
        }

        return done(null,user);

    }catch(err){
        return done(err, false);
    }
    done(null, payload);
}));

passport.serializeUser((user: any, done) => {
    done(null, user);
});

passport.deserializeUser((user: any, done) => {
    done(null, user);
});

export const passportAuthenticateJwt = passport.authenticate('jwt', {session: false});