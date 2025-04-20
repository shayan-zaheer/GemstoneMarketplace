const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");
const session = require("express-session");
const User = require("../models/User");

const sessionMiddleware = session({
    secret: "secret",
    saveUninitialized: false,
    resave: false,
    // cookie: {
    //     maxAge: 7 * 24 * 60 * 60 * 1000,
    //     httpOnly: true
    // }
});

const configurePassport = app => {
    app.use(sessionMiddleware);
    app.use(passport.initialize());
    app.use(passport.session());

    passport.use(
        new LocalStrategy(
            { usernameField: "email" },
            async (email, password, done) => {
                try {
                    const user = await User.findOne({ where: { email } });

                    if (!user) {
                        return done(null, false, { message: "User not found" });
                    }

                    const isMatch = await bcrypt.compare(password, user.password);
                    if (!isMatch) return done(null, false, { message: "Incorrect password" });

                    return done(null, user);
                } catch (err) {
                    return done(err, null);
                }
            }
        )
    );

    passport.serializeUser((user, done) => done(null, user.userId));

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findByPk(id);
            return done(null, user);
        } catch (err) {
            return done(err, null);
        }
    });
};

module.exports = { configurePassport, sessionMiddleware };