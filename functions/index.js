const { onRequest } = require("firebase-functions/v2/https");
const { onCall } = require("firebase-functions/v2/https");
const admin = require("firebase-admin");
const { defineSecret } = require("firebase-functions/params");
admin.initializeApp();

// Define the secret for authorized UIDs
const authorizedUidsSecret = defineSecret("AUTHORIZED_UIDS");

exports.checkAuthorization = onCall(
  { secrets: [authorizedUidsSecret] },
  async (request) => {
    // Check if the user is authenticated
    if (!request.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "The function must be called while authenticated."
      );
    }

    const uid = request.auth.uid;
    const AUTHORIZED_UIDS = authorizedUidsSecret.value().split(',');

    // Check if the authenticated user's UID is in the authorized list
    if (!AUTHORIZED_UIDS.includes(uid)) {
      throw new functions.https.HttpsError(
        "permission-denied",
        "The authenticated user is not authorized to perform this action."
      );
    }

    // If authorized, return success
    return { status: "authorized" };
  }
);
