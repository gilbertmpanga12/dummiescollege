const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();


const algoliasearch = require("algoliasearch");
const ALGOLIA_ID = functions.config().appid;
const ALGOLIA_ADMIN_KEY = functions.config().algolia.adminkey;
const ALGOLIA_SEARCH_KEY = functions.config().algolia.searchkey;
const ALGOLIA_INDEX_NAME  = 'prod_DummiesCollege';
const client = algoliasearch(ALGOLIA_ID, ALGOLIA_ADMIN_KEY);


const app = require('express')();
app.use(require('cors')({origin: true}));


function getFirebaseUser(req, res, next) {
    console.log("Check if request is authorized with Firebase ID token");
  
    if (
      !req.headers.authorization ||
      !req.headers.authorization.startsWith("Bearer ")
    ) {
      console.error(
        "No Firebase ID token was passed as a Bearer token in the Authorization header.",
        "Make sure you authorize your request by providing the following HTTP header:",
        "Authorization: Bearer <Firebase ID Token>"
      );
      res.status(403).send("Unauthorized");
      return;
    }
  
    let idToken;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer ")
    ) {
      console.log("Found 'Authorization' header");
      idToken = req.headers.authorization.split("Bearer ")[1];
    }
  
    admin
      .auth()
      .verifyIdToken(idToken)
      .then(decodedIdToken => {
        console.log("ID Token correctly decoded", decodedIdToken);
        req.user = decodedIdToken;
        next();
      })
      .catch(error => {
        console.error("Error while verifying Firebase ID token:", error);
        res.status(403).send("Unauthorized");
      });
  }
 
  app.get('/index-documents', (req, res) => {
    const params = {
      filters: `author:${req.user.user_id}`,
      userToken: req.user.user_id,
    };
  
    // Call the Algolia API to generate a unique key based on our search key
    const key = client.generateSecuredApiKey(ALGOLIA_SEARCH_KEY, params);
    // Then return this key as {key: '...key'}
    res.json({key});
  }, getFirebaseUser);


  






// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.getSearchKey = functions.https.onRequest(app);
