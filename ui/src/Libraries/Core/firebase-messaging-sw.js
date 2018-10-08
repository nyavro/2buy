const firebase = require ('firebase');
const firebaseConfig = require('./fbConfig');



const CACHE_NAME = 'my-site-cache-v1';
const urlsToCache = [
    '/',
    '/styles/main.css',
    '/script/main.js'
];

function sendMessage(client, msg) {
    return new Promise(function(resolve, reject){
        const msgChan = new MessageChannel();
        client.postMessage(msg, [msgChan.port2]);
    });
}

addEventListener('install', (event) => {
    console.log('Service worker installed');
    firebase.initializeApp(firebaseConfig.firebaseConfig());
    const messaging = firebase.messaging();
    /*
    messaging.setBackgroundMessageHandler((payload) => {
      console.log('[firebase-messaging-sw.js] Received background message ', payload);
      // Customize notification here
      const notificationTitle = 'Background Message Title';
      const notificationOptions = {
        body: 'Background Message body.'
        // icon: 'firebase-logo.png'
      };
      debugger;
      return self;
          // .registration.showNotification(notificationTitle,
          // notificationOptions);
    });*/
    messaging.setBackgroundMessageHandler(
        (msg) => {
            options = {
                body: 'Backgroud'
            };
            self.clients.matchAll().then((clients) => clients.forEach((client) => sendMessage(client, msg)));
            return self.registration.showNotification("test", options).then(
                () => {}
            );
        }
    );

    // event.waitUntil(
    //     caches.open(CACHE_NAME)
    //         .then(function(cache) {
    //             console.log('Opened cache');
    //             return cache.addAll(urlsToCache);
    //         })
    // );
});