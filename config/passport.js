const SamlStrategy = require("passport-saml").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const fs = require('fs');

module.exports = function(passport, config) {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  passport.use(
    new SamlStrategy(
      {
        path: config.passport.saml.path,
        entryPoint: config.passport.saml.entryPoint,
        issuer: config.passport.saml.issuer,
        // cert: config.passport.saml.cert.replaceAll() //#TODO: Speciify a certificate
        cert: fs.readFileSync('idp-public-cert.pem', 'utf8'), // read from .env file, error occured "error:0909006C:PEM routines:get_name:no start line" 
      },
      function(profile, done) {
        console.log("This is what is returned by Saml", profile);
        return done(null, {
          id: profile.uid,
          email: profile.mail,
          displayName: profile.givenname,
          firstName: profile.givenname
        });
      }
    )
  );

  // passport.use(
  //   new FacebookStrategy(
  //     {
  //       clientID: config.passport.facebook.clientID,
  //       clientSecret: config.passport.facebook.clientSecret,
  //       callbackURL: config.passport.facebook.callbackURL
  //     },
  //     function(accessToken, refreshToken, profile, done) {
  //       return done(null, profile);
  //     }
  //   )
  // );

  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       clientID: config.passport.google.clientID,
  //       clientSecret: config.passport.google.clientSecret,
  //       callbackURL: config.passport.google.callbackURL
  //     },
  //     function(accessToken, refreshToken, profile, done) {
  //       return done(null, profile);
  //     }
  //   )
  // );
};
