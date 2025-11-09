const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();

// List of authorized UIDs
// IMPORTANT: Replace these with your actual UIDs
const AUTHORIZED_UIDS = [
  "YOUR_UID_HERE",
  "YOUR_GIRLFRIEND_UID_HERE",
];

exports.checkAuthorization = functions.https.onCall(async (data, context) => {
  // Check if the user is authenticated
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "The function must be called while authenticated."
    );
  }

  const uid = context.auth.uid;

  // Check if the authenticated user's UID is in the authorized list
  if (!AUTHORIZED_UIDS.includes(uid)) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "The authenticated user is not authorized to perform this action."
    );
  }

  // If authorized, return success
  return { status: "authorized" };
});
