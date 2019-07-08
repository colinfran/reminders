
import "firebase/messaging";
import {app} from './api';

const messaging = app.messaging();
messaging.usePublicVapidKey(
// Project Settings => Cloud Messaging => Web Push certificates
  "BJSoyvhVBo0IbbWUNT54HKLH8X7HnQ4OGZU5hUY7UbgetTzlWLSAQtyvTJWsMTU6GER_S32pGL3v58m3iYlBHRg"
);
export { messaging };
