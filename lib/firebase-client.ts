import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, initializeFirestore, memoryLocalCache } from "firebase/firestore";
import { getDatabase } from "firebase/database";
import { getMessaging, isSupported } from "firebase/messaging";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase only if API key is present
let app: any;
let auth: any;
let db: any;
let rtdb: any;
let storage: any;

declare global {
    var __FIREBASE_APP__: any;
    var __FIREBASE_AUTH__: any;
    var __FIREBASE_DB__: any;
    var __FIREBASE_RTDB__: any;
    var __FIREBASE_STORAGE__: any;
}

if (typeof window !== "undefined" && !process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    console.warn("Firebase API Key is missing. Firebase features will be disabled.");
}

try {
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        console.log("[Firebase] Initializing client... Apps length:", getApps().length);

        if (globalThis.__FIREBASE_APP__) {
            console.log("[Firebase] Using global app singleton");
            app = globalThis.__FIREBASE_APP__;
        } else if (getApps().length > 0) {
            console.log("[Firebase] Using existing app instance");
            app = getApp();
            globalThis.__FIREBASE_APP__ = app;
        } else {
            console.log("[Firebase] Initializing new app instance");
            app = initializeApp(firebaseConfig);
            globalThis.__FIREBASE_APP__ = app;
        }

        // Initialize services with singleton protection
        auth = globalThis.__FIREBASE_AUTH__ || getAuth(app);
        globalThis.__FIREBASE_AUTH__ = auth;

        rtdb = globalThis.__FIREBASE_RTDB__ || getDatabase(app);
        globalThis.__FIREBASE_RTDB__ = rtdb;

        storage = globalThis.__FIREBASE_STORAGE__ || getStorage(app);
        globalThis.__FIREBASE_STORAGE__ = storage;

        // Optimized Firestore initialization to prevent assertion failures (ID: b815, ca9)
        if (globalThis.__FIREBASE_DB__) {
            console.log("[Firebase] Using global db singleton");
            db = globalThis.__FIREBASE_DB__;
        } else {
            try {
                console.log("[Firebase] Initializing Firestore with memory cache for stability");
                db = initializeFirestore(app, {
                    localCache: memoryLocalCache(), // Force memory cache to bypass persistent storage issues
                    experimentalForceLongPolling: true,
                    experimentalAutoDetectLongPolling: true,
                });
                globalThis.__FIREBASE_DB__ = db;
            } catch (e) {
                console.warn("[Firebase] Firestore initialization failed or already exists, retrieving existing instance");
                db = getFirestore(app);
                globalThis.__FIREBASE_DB__ = db;
            }
        }
        console.log("[Firebase] Firestore ready state:", !!db);
        if (db) {
            console.log("[Firebase] Active Project ID:", firebaseConfig.projectId);
            console.log("[Firebase] Using Database: (default)");
            console.log("[Firebase] Auth State:", auth?.currentUser ? "LoggedIn" : "LoggedOut");
            if (auth?.currentUser) {
                console.log("[Firebase] Current User UID:", auth.currentUser.uid);
            }
        }
    } else {
        // Provide dummy or null values to prevent crashing
        app = null;
        auth = null;
        db = null;
        rtdb = null;
        storage = null;
    }
} catch (error) {
    console.error("Firebase initialization failed:", error);
}

// Messaging is only supported in browser environments
const messaging = async () => {
    if (typeof window === "undefined" || !app) return null;
    const supported = await isSupported();
    return supported ? getMessaging(app) : null;
};

export { app, auth, db, rtdb, storage, messaging };
