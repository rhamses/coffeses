/*
	SERVICE WORKER 
 */

self.addEventListener('install', function(event){
	event.waitUntil(
		caches.open('v1').then(cache => {
			return cache.addAll([
				'/css/main.css',
				'/js/main.js',
				'/index.html',
				'/images/icons/icon-192x192.png',
				'https://cdn.jsdelivr.net/npm/bulma@0.9.0/css/bulma.min.css',
				'https://fonts.googleapis.com/css2?family=Hind+Siliguri&display=swap'
			])
		})
	)
});

self.addEventListener('fetch', function(event){
	event.respondWith(caches.match(event.request).then(response => {
		if (response != undefined) {
			return response;
		} else {
			return fetch(event.request).then(response => {
				let clone = response.clone();

				caches.open('v1').then(cache => {
					cache.put(event.request, clone);
				});

				return response;
			})
		}
	}).catch(err => {
		console.log("ruim", err);
		// return caches.match('/images/icons/icon-192x192.png')
	}));
});

self.addEventListener('notificationclose', function(e){
	const notification = e.notification;
	const id = e.notification.data.id;
});

self.addEventListener('notificationclick', function(e){
	const notification = e.notification;
	const action = e.action;

	if (action == 'close'){
		notification.close();
	} else {
		clients.openWindow('http://localhost:8080');
		notification.close();
	}
});

self.addEventListener('push', function(e){
	console.log();
	let title = 'Não perca o almoço de hoje';
	const options = {
		body: e.data.text(),
		vibrate: [100, 50, 100],
		icon: '../images/icons/icon-72x72.png',
		data: {
			dateOfArrival: Date.now(),
			id: 1
		}
	};

	e.waitUntil(
		self.registration.showNotification(title, options)
	);
});