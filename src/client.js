const publicVapidKey = "BGVE4HInrOd3_J9837n4wLPexqzEd5S-s8tvA-7QcqaI3rwexbrDU41aNmt-RMZxB6nOkSNOeWm5bIawUyqSPBM";

function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

// register SW, register push, send webPush
async function send(){
  // register service worker
  console.log('Registering service worker...');
  const register = await navigator.serviceWorker.register('worker.js', {
    scope: '/reminders'
  });
  console.log('Service worker registered');
  // register push
  console.log('Registering push...');
  const subscription = await register.serviceWorker.subscribe({
    userVisibleOnly: true,
    applicationServiceKey: urlBase64ToUint8Array(publicVapidKey)
  });
  console.log('Push registered.');
  // send push notification
  console.log('Sending push...');
  await fetch('/subscribe',{
    method: 'POST',
    body: JSON.stringify(subscription),
    headers: {
      'content-type': 'application/json'
    }
  })
  console.log('Push sent.');
}

// check for service worker
if ('serviceWorker' in navigator){
  send().catch(err => console.error(err));
}
