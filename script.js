'use sctrict';

const results = document.querySelector('#results');
const form = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
let valueBtn = '';
let isActiveSearch = false;
const RESOURCES = {
	films: 'films',
	people: 'people',
	starships: 'starships',
	vehicles: 'vehicles',
	species: 'species',
	planets: 'planets',
};

document.querySelector('#buttons').addEventListener('click', e => {
	isActiveSearch = false;
	valueBtn = e.target.textContent.trim().toLowerCase();
	asyncFetch(valueBtn);
	form.reset();
});

form.addEventListener('submit', e => {
	e.preventDefault();
	isActiveSearch = true;
	asyncFetchSearch(document.querySelector('label.btn-lg.active').textContent.trim().toLowerCase(), searchInput.value.trim().toLowerCase());
});

document.querySelector('#filmsLabel').click();

document.querySelector('#pagination').addEventListener('click', e => {
	if (e.target.classList.contains('page-link')) {
		if (isActiveSearch) {
			asyncFetchSearch(document.querySelector('label.btn-lg.active').textContent.trim().toLowerCase(), searchInput.value.trim().toLowerCase(), `&page=${e.target.textContent}`);
		} else {
			asyncFetch(valueBtn, e.target.textContent);
		}
	}
});

results.addEventListener('click', e => {
	e.target.closest('.card').querySelector('.card-content').classList.toggle('collapse');
});

async function asyncFetch(value, page = 1) {
	const res = await fetch(`https://swapi.dev/api/${value}/?page=${page}`);
	const data = await res.json();
	showPagination(data.count);
	displayResults(data, value);
}

async function asyncFetchSearch(value, text, page = '') {
	const res = await fetch(`https://swapi.dev/api/${value}/?search=${text}${page}`);
	const data = await res.json();
	showPagination(data.count);
	displayResults(data, value);
}

function showPagination(count) {
	let output = '';
	const itemsPerPage = 10;
	const countOfPages = Math.ceil(count / itemsPerPage);
	if (countOfPages > 1) {
		for (let i = 1; i <= countOfPages; i++) {
			output += `
				<li class="page-item"><button class="page-link text-dark" href="#">${i}</button></li>
			`;
		}
	}
	document.querySelector('#pagination').innerHTML = output;
}

function displayResults(data, value) {
	let output = '';

	if (value === RESOURCES.films) {
		data.results.forEach(item => {
			output += `
				<div class="card p-3 m-3">
					<h4 class="card-title text-center">${item.title}</h4>
					<div class="card-content collapse">
						<div><span>Producer:</span> ${item.producer}</div>
						<div><span>Director:</span> ${item.director}</div>
						<div><span>Release date:</span> ${item.release_date}</div>
						<p class="text-center">${item.opening_crawl}</p>
					</div>
				</div>
			`;
		});
	}

	if (value === RESOURCES.people) {
		data.results.forEach(item => {
			output += `
				<div class="card p-3 m-3">
					<h4 class="card-title text-center">${item.name}</h4>
					<div class="card-content collapse">
						<div><span>Birth year:</span> ${item.birth_year}</div>
						<div><span>Height:</span> ${item.height}</div>
						<div><span>Skin color:</span> ${item.skin_color}</div>
						<div><span>Eye color:</span> ${item.eye_color}</div>
						<div><span>Gender:</span> ${item.gender}</div>
						<div><span>Hair color:</span> ${item.hair_color}</div>
						<div><span>Mass:</span> ${item.mass}</div>
					</div>
				</div>
			`;
		});
	}

	if (value === RESOURCES.starships) {
		data.results.forEach(item => {
			output += `
				<div class="card p-3 m-3">
					<h4 class="card-title text-center">${item.name}</h4>
					<div class="card-content collapse">
						<div><span>Capacity:</span> ${item.cargo_capacity}</div>
						<div><span>Length:</span> ${item.length}</div>
						<div><span>Manufacturer:</span> ${item.manufacturer}</div>
						<div><span>Consumables:</span> ${item.consumables}</div>
						<div><span>Cost:</span> ${item.cost_in_credits}</div>
						<div><span>Crew:</span> ${item.crew}</div>
						<div><span>Hyperdrive rating:</span> ${item.hyperdrive_rating}</div>
						<div><span>Max speed:</span> ${item.max_atmosphering_speed}</div>
						<div><span>Passengers:</span> ${item.passengers}</div>
						<div><span>Starship class:</span> ${item.starship_class}</div>
					</div>
				</div>
			`;
		});
	}

	if (value === RESOURCES.vehicles) {
		data.results.forEach(item => {
			output += `
				<div class="card p-3 m-3">
					<h4 class="card-title text-center">${item.name}</h4>
					<div class="card-content collapse">
						<div><span>Capacity:</span> ${item.cargo_capacity}</div>
						<div><span>Length:</span> ${item.length}</div>
						<div><span>Manufacturer:</span> ${item.manufacturer}</div>
						<div><span>Consumables:</span> ${item.consumables}</div>
						<div><span>Cost:</span> ${item.cost_in_credits}</div>
						<div><span>Crew:</span> ${item.crew}</div>
						<div><span>Max speed:</span> ${item.max_atmosphering_speed}</div>
						<div><span>Model:</span> ${item.model}</div>
						<div><span>Passengers:</span> ${item.passengers}</div>
						<div><span>Vehicle class:</span> ${item.vehicle_class}</div>
					</div>
				</div>
			`;
		});
	}

	if (value === RESOURCES.species) {
		data.results.forEach(item => {
			output += `
				<div class="card p-3 m-3">
					<h4 class="card-title text-center">${item.name}</h4>
					<div class="card-content collapse">
						<div><span>Hight:</span> ${item.average_height}</div>
						<div><span>Language:</span> ${item.language}</div>
						<div><span>Lifespan:</span> ${item.average_lifespan}</div>
						<div><span>Designation:</span> ${item.designation}</div>
						<div><span>Classification:</span> ${item.classification}</div>
						<div><span>Eye colors:</span> ${item.eye_colors}</div>
						<div><span>Hair colors:</span> ${item.hair_colors}</div>
						<div><span>Skin colors:</span> ${item.skin_colors}</div>
					</div>
				</div>
			`;
		});
	}

	if (value === RESOURCES.planets) {
		data.results.forEach(item => {
			output += `
				<div class="card p-3 m-3">
					<h4 class="card-title text-center">${item.name}</h4>
					<div class="card-content collapse">
						<div><span>Climate:</span> ${item.climate}</div>
						<div><span>Gravity:</span> ${item.gravity}</div>
						<div><span>Rotation period:</span> ${item.rotation_period}</div>
						<div><span>Orbital period:</span> ${item.orbital_period}</div>
						<div><span>Diameter:</span> ${item.diameter}</div>
						<div><span>Population:</span> ${item.population}</div>
						<div><span>Surface water:</span> ${item.surface_water}</div>
						<div><span>Terrain:</span> ${item.terrain}</div>
					</div>
				</div>
			`;
		});
	}

	results.innerHTML = output;
}