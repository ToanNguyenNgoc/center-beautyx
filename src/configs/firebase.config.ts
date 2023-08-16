// import { initializeApp } from 'firebase/app'
// import { getAnalytics, logEvent } from "firebase/analytics"
// import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"
// import { getMessaging, getToken, onMessage } from 'firebase/messaging';

export const firebaseConfig = {};
// const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);
// const authentication = getAuth(app)

// // Notification
// const messaging = getMessaging();

// const KEY = `BCiJId9vY59SYY9Yv2VgHCUUgNlJQv7SocwcIbDBV1u1QLAtDIHdZ5-jHupgpeP6Z7hk_vOd7Zb3FgbRjWemuUo`
// export const requestForToken = async () => {
//     try {
//         const token = await getToken(messaging, { vapidKey: KEY })
//         console.log(token)
//         return token
//     } catch (error) {
//         console.log('An error occurred while retrieving token. ', error);
//     }
// };
// export const onMessageListener = () =>
//     new Promise((resolve) => {
//         onMessage(messaging, (payload) => {
//             resolve(payload);
//         });
//     });

// export { analytics, authentication, logEvent, RecaptchaVerifier, signInWithPhoneNumber }