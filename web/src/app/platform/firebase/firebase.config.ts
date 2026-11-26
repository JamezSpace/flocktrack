import { FirebaseOptions } from "firebase/app";
import { environment as env } from "../../../environments/environment";

const flocktrackFirebaseConfig: FirebaseOptions = {
     apiKey: env.firebaseApiKey,
     authDomain: env.firebaseAuthDomain,
     projectId: env.firebaseProjectId,
     storageBucket: env.firebaseStorageBucket,
     messagingSenderId: env.firebaseMessagingSenderId,
     appId: env.firebaseAppId,
     measurementId: env.firebaseMeasurementId
};

export { flocktrackFirebaseConfig };