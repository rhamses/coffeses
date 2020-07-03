(function(){
	/*
		REGISTRA O SERVICE WORKER
		LINKANDO O ARQUIVO QUE DEVE ESTAR NA HOME
	 */
	if (navigator.serviceWorker) {
		navigator.serviceWorker.register('../worker.js', {scope: '/'})
		.then(reg => {

			reg.pushManager.getSubscription().then(sub => {
				if (sub) {
					console.log("update db", sub);
				} else {
					console.log("not assintante", sub);
				}
			});

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

		navigator.serviceWorker.ready.then(function(reg) {

			reg.pushManager.subscribe({
				userVisibleOnly: true
			}).then(function(sub) {
				console.log('Endpoint URL: ', sub.endpoint);
			}).catch(function(e) {
				if (Notification.permission === 'denied') {
					console.warn('Permission for notifications was denied');
				} else {
					console.error('Unable to subscribe to push', e);
				}
			});
		})
	}
	/*
	
		FUNCTIONS

		*/
		function displayNotification(){
			if (Notification.permission == "granted") {
				navigator.serviceWorker.getRegistration().then(reg => {
					let title = 'Titulo da Notificacao';
					const options = {
						body: "Este é o corpo da notificacao",
						vibrate: [100, 50, 100],
						icon: '../images/icons/icon-72x72.png',
						data: {
							dateOfArrival: Date.now(),
							id: 1
						}
					};

					const meal = getMeal();
					if (meal) {
						title = 'Não perca o almoço de hoje';
						options.body = meal.meal;	
					}
					reg.showNotification(title, options);
				});
			}
		}

		function getMeal() {
			if (localStorage.getItem('meals')) {
				const currentDay = new Date().getDate() - 1;
				const meals = JSON.parse(localStorage.getItem('meals'));

				return meals[currentDay];
			}
		}

		function processMeals(meals) {
			const cardapios = document.querySelector('.cardapio-lista');
			const cardapioDia = document.querySelector('.cardapio-dia');
			const date = new Date();
			// Atribui a data atual em variaveis separadas de dia,mes,ano
			const weekDays = ['Segunda-Feira', 'Terça-Feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'];
			const weekDay = date.getDay() - 1;
			const currentDay = date.getDate() - 1;
			const month = date.getMonth() + 1;
			const year = date.getFullYear();
			// Cria as variaveis com HTML para inserir na pagina. 
			let refeicaoDestaque = `<div class="column is-half"><img src="${meals[currentDay].image}" alt="Imagem da comida"></div><div class="column is-half"><div class="cardapios--content mt-5"><h3 class="pr-3 title is-5">${meals[currentDay].id}/${month}/${year} - ${weekDays[weekDay]}</h3>${meals[currentDay].meal}</div></div>`;
			let refeicaoLista = '';
			// Alimenta a varial 
			meals.forEach(meal => {
				refeicaoLista += `<div class="column is-one-third"><img src="${meal.image}" alt="Imagem da comida"><div class="cardapios--content"><b class="pr-3">${meal.id}/${month}/${year}</b>${meal.meal}</div></div>`;
			});
			// INJETA O CARDAPIO DO DIA NA AREA DE DESTAQUE DA PAGINA
			cardapioDia.innerHTML = refeicaoDestaque;
			// INJETA A LISTA DO CARDAPIO NA PAGINA
			cardapios.innerHTML = refeicaoLista;
		}

	/*
		GET JSON RESPOSTA DO db.js
		*/
	if (localStorage.getItem('meals')) {
		const meals = JSON.parse(localStorage.getItem('meals'));
		processMeals(meals);
	} else {
		fetch('https://my-json-server.typicode.com/rhamses/coffeses/meals')
		.then(response => response.json())
		.then(meals => {
			localStorage.setItem('meals', JSON.stringify(meals));
			processMeals(meals);
		});
	}
	/*
		PEDE PERMISSAO PARA MANDAR PUSH NOTIFICATION
		*/
		Notification.requestPermission(status => {
			displayNotification();
		});
	/*
		INIT
		*/
		displayNotification();
	})()