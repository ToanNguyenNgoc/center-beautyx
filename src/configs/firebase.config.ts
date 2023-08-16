import { initializeApp } from 'firebase/app'
import { getAnalytics, logEvent } from "firebase/analytics"
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
    // apiKey: process.env.REACT_APP_API_KEY,
    // authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    // projectId: process.env.REACT_APP_PROJECT_ID,
    // storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    // messagingSenderId: process.env.REACT_APP_SEND_ID,
    // appId: process.env.REACT_APP_APP_ID,
    // measurementId: process.env.REACT_APP_MEASUREMENTID
    apiKey: "AIzaSyC0lNEJAh95Dp4JpYDv7L8kXUZ8502dmSk",
    authDomain: "beautyx-spa.firebaseapp.com",
    projectId: "beautyx-spa",
    storageBucket: "beautyx-spa.appspot.com",
    messagingSenderId: "1018381055842",
    appId: "1:1018381055842:web:bad18434f365fb4afe9e3b"
};
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app);
const authentication = getAuth(app)

// Notification
const messaging = getMessaging();

const KEY = `BCiJId9vY59SYY9Yv2VgHCUUgNlJQv7SocwcIbDBV1u1QLAtDIHdZ5-jHupgpeP6Z7hk_vOd7Zb3FgbRjWemuUo`
export const requestForToken = async () => {
    try {
        const token = await getToken(messaging, { vapidKey: KEY })
        console.log(token)
        return token
    } catch (error) {
        console.log('An error occurred while retrieving token. ', error);
    }
};
export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });

export { analytics, authentication, logEvent, RecaptchaVerifier, signInWithPhoneNumber }