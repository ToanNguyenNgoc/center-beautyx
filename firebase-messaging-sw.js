/* eslint-disable no-undef */
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.0/firebase-messaging.js');

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('../firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    }).catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}
firebase.initializeApp({
  apiKey: "AIzaSyC0lNEJAh95Dp4JpYDv7L8kXUZ8502dmSk",
  authDomain: "beautyx-spa.firebaseapp.com",
  projectId: "beautyx-spa",
  storageBucket: "beautyx-spa.appspot.com",
  messagingSenderId: "1018381055842",
  appId: "1:1018381055842:web:bad18434f365fb4afe9e3b"
})

const initMessaging = firebase.messaging()