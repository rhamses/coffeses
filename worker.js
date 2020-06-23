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
				'https://fonts.googleapis.com/css2?family=Hind+Siliguri&display=swap',
				'https://s3.us-west-2.amazonaws.com/secure.notion-static.com/4b4eb83e-cd2b-414e-99d3-90f9e4004d69/0001_AMBIENTE1_ICONE_%281%29.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAT73L2G45O3KS52Y5%2F20200622%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20200622T230508Z&X-Amz-Expires=86400&X-Amz-Signature=9e0a8723ccb72c41154bacd163186729cb7d8aeef72027c4c8b5773943c4d767&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%220001_AMBIENTE1_ICONE_%281%29.png%22'
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
		return caches.match('/images/icons/icon-192x192.png')
	}));
});