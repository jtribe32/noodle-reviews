import admin from "firebase-admin";
import serviceAccount from "./serviceAccountKey.json";

if (!admin.apps.length) {
  try {
    admin.initializeApp({
      credential: admin.credential.cert(
        process.env.NODE_ENV === "production"
          ? {
              projectId: process.env.FIREBASE_PROJECT_ID,
              clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
              privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(
                /\\n/g,
                "\n"
              ),
            }
          : serviceAccount
      ),
    });
  } catch (error) {
    console.log("Firebase admin initialization error", error.stack);
  }
}
export const storageRef = admin.storage();
export default admin.firestore();
