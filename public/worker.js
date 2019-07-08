console.log('Service worker loaded');

self.addEventListener('push', e => {
  const data = e.data.json();
  console.log('Push recieved...');
  self.registration.showNotification(data.title, {
    body: "Notified by Traversy Media!",
    icon: "http://image.ibb.co/frYOFd/tmlogo.png"
  });
})