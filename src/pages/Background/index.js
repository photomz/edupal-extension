/* global chrome */
import '../../assets/icons/16.png';
import '../../assets/icons/24.png';
import '../../assets/icons/32.png';
import '../../assets/icons/48.png';
import '../../assets/icons/64.png';
import '../../assets/icons/96.png';
import '../../assets/icons/128.png';
import '../../assets/icons/256.png';

// eslint-disable-next-line no-console
chrome.runtime.onMessage.addListener(console.log);

// chrome.runtime.onUpdateAvailable.addListener(function (details) {
//   console.log('updating to version ' + details.version);
//   chrome.runtime.reload();
// });

// chrome.runtime.onMessageExternal.addListener(function (
//   request,
//   sender,
//   sendResponse
// ) {
//   if (request.reload) {
//     chrome.runtime.requestUpdateCheck(function (status) {
//       if (status == 'update_available') {
//         console.log('update pending...');
//         sendResponse({ updateAvailable: true, throttled: false });
//       } else if (status == 'no_update') {
//         console.log('no update found');
//         sendResponse({ updateAvailable: false, throttled: false });
//       } else if (status == 'throttled') {
//         console.log("Oops, I'm asking too frequently - I need to back off.");
//         sendResponse({ updateAvailable: false, throttled: true });
//       }
//     });
//   }
//   if (request.type === 'notification') {
//     chrome.permissions.request(
//       {
//         permissions: ['notifications'],
//         origins: ['*://meet.google.com/**-**-**'],
//       },
//       function (granted) {
//         if (granted) {
//           sendResponse({ permissions: true });
//         } else {
//           sendResponse({ permissions: false });
//         }
//       }
//     );
//   }

//   if (request.type === 'displayNotification') {
//     console.log(request.options);
//     chrome.notifications.create('', request.options);
//   }
// });
