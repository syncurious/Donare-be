import admin from "firebase-admin";

let firebaseApp: admin.app.App | null = null;

export const getFirebaseApp = (): admin.app.App | null => {
  if (firebaseApp) return firebaseApp;

  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } =
    process.env;

  if (
    !FIREBASE_PROJECT_ID ||
    !FIREBASE_CLIENT_EMAIL ||
    !FIREBASE_PRIVATE_KEY
  ) {
    console.warn(
      "[Firebase] Missing credentials. Push notifications will be disabled."
    );
    return null;
  }

  try {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey: FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
      }),
    });
  } catch (error: any) {
    if (error?.code === "app/duplicate-app") {
      firebaseApp = admin.app();
    } else {
      console.error("[Firebase] initialization error", error);
      return null;
    }
  }

  return firebaseApp;
};

export const getFirebaseMessaging = (): admin.messaging.Messaging | null => {
  const app = getFirebaseApp();
  if (!app) return null;
  return app.messaging();
};


