const dotenv = require('dotenv').config();

module.exports = {
  development: {
    app: {
      name: "Passport SAML strategy example",
      port: process.env.PORT || 3000
    },
    passport: {
      strategy: process.env.PASSPORT_STRATEGY || "saml",
      saml: {
        path: process.env.SAML_PATH || "/login/saml/callback",
        entryPoint:
          process.env.SAML_ENTRY_POINT ||
          "https://openidp.feide.no/simplesaml/saml2/idp/SSOService.php",
        issuer: process.env.SAML_ISSUER || "passport-saml",
        cert: process.env.SAML_CERT || "fakeCertificat"
      },
      facebook: {
        clientID: process.env.FACEBOOK_APP_ID || "FAKE_FBID",
        clientSecret: process.env.FACEBOOK_APP_SECRET || "FAKE_SECRET",
        callbackURL:
          process.env.FACEBOOK_CALLBACK_URL ||
          "https://6mjfj.sse.codesandbox.io/login/facebook/callback",
        path: process.env.FACEBOOK_CALLBACK_URL || "/login/facebook/callback",
        profileFields: ["id", "displayName"]
      },
      google: {
        clientID: process.env.GOOGLE_CLIENT_ID || "FAKE_GOOGLEID",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "FAKE_SECRET",
        callbackURL:
          process.env.GOOGLE_CALLBACK_URL ||
          "https://6mjfj.sse.codesandbox.io/login/google/callback",
        path: process.env.GOOGLE_CALLBACK_URL || "/login/google/callback"
      }
    }
  }
};
