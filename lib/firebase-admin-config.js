import * as admin from "firebase-admin";
import { initializeApp, getApps, cert, applicationDefault } from 'firebase-admin/app';
import { getFirestore } from "firebase-admin/firestore";

const tmpJson = process.env.FIREBASE_CREDENTIAL_JSON;
const decodedFile = Buffer.from(tmpJson, 'base64')
const decodedJson = JSON.parse(decodedFile.toString());

const serviceAccount = decodedJson;

export const firebaseAdmin =
    getApps()[0] ??
    initializeApp({
        credential: cert(serviceAccount),
    });

export const db = getFirestore();