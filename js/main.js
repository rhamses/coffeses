(function(){
	fetch('https://my-json-server.typicode.com/rhamses/coffeses/meals')
	.then(response => response.json())
	.then(meals => {
		const cardapios = document.querySelector('.cardapios');
		const date = new Date();
		const month = date.getMonth() + 1;
		const year = date.getFullYear();
		let html = '';
		meals.forEach(meal => {
			html += `<div class="column is-half"><b class="pr-3">${meal.id}/${month}/${year}</b>${meal.meal}</div>`;
		});

		cardapios.innerHTML = html;
	});
})()