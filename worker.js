if (navigator.serviceWorker) {
	navigator.serviceWorker.register('worker.js', {scope: '/'})
	.then(reg => {
		if(reg.installing) {
			console.log("tamo instalando");
		}

		if(reg.waiting) {
			console.log("tamo esperando");
		}

		if(reg.active) {
			console.log("tamo ativando");
		}

	})
	.catch(err => console.log(err));
}

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