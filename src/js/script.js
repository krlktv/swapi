'use strict';

const results = document.querySelector('.results');
const form = document.querySelector('.search__form');
const searchInput = document.querySelector('.search__input');
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
const resoursesBtns = document.querySelector('.nav__list');
const resoursesBtnsItems = resoursesBtns.querySelectorAll('.nav__item');
const filmsBtn = document.querySelector('.nav__item-films');
const pagination = document.querySelector('.pagination__list');

resoursesBtns.addEventListener('click', e => {
	toggleActiveResousesBtn(e.target);
	const resourseBtnValue = getTargetText(e);
	isActiveSearch = false;
	valueBtn = formatText(resourseBtnValue);
	const url = getTemplateUrl(valueBtn);
	fetchData(url, valueBtn);
	form.reset();
});

form.addEventListener('submit', e => {
	e.preventDefault();
	isActiveSearch = true;
	const activeTab = getActiveTabValue();
	const searchInputValue = formatText(searchInput.value);
	const url = getSearchUrl(activeTab, searchInputValue);
	fetchData(url, activeTab);
});

filmsBtn.click();

pagination.addEventListener('click', e => {
	if (e.target.classList.contains('pagination__item')) {
		const targetText = getTargetText(e);
		if (isActiveSearch) {
			const activeTab = getActiveTabValue();
			const searchInputValue = formatText(searchInput.value);
			const page = `&page=${targetText}`;
			const url = getSearchUrl(activeTab, searchInputValue, page);
			fetchData(url, activeTab);
		} else {
			const url = getTemplateUrl(valueBtn, targetText);
			fetchData(url, valueBtn);
		}
	}
});

results.addEventListener('click', e => {
	const card = getCard(e);
	cardViewToggle(card);
});

async function fetchData(fetchTemplate, value) {
	const res = await fetch(fetchTemplate);
	const data = await res.json();
	showPagination(data.count);
	displayResults(data, value);
}

function getTemplateUrl(value, page = 1) {
	return `https://swapi.dev/api/${value}/?page=${page}`;
}

function getSearchUrl(value, text, page = '') {
	return `https://swapi.dev/api/${value}/?search=${text}${page}`;
}

function showPagination(count) {
	let output = '';
	const itemsPerPage = 10;
	const countOfPages = count > 10 ? Math.ceil(count / itemsPerPage) : 0;
	if (countOfPages > 1) {
		for (let i = 1; i <= countOfPages; i++) {
			output += paginationBtnTemplate(i);
		}
	}
	pagination.innerHTML = output;
}

function displayResults(data, value) {
	let output = '';

	if (value === RESOURCES.films) {
		data.results.forEach(item => {
			output += `
				<div class="card">
					<h3 class="card__title card__title_close">${item.title}</h3>
					<div class="card__content">
						<div><span>Producer:</span> ${item.producer}</div>
						<div><span>Director:</span> ${item.director}</div>
						<div><span>Release date:</span> ${item.release_date}</div>
						<p>${item.opening_crawl}</p>
					</div>
				</div>
			`;
		});
	}

	if (value === RESOURCES.people) {
		data.results.forEach(item => {
			output += `
				<div class="card">
					<h3 class="card__title card__title_close">${item.name}</h3>
					<div class="card__content">
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
				<div class="card">
					<h3 class="card__title card__title_close">${item.name}</h3>
					<div class="card__content">
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
				<div class="card">
					<h3 class="card__title card__title_close">${item.name}</h3>
					<div class="card__content">
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
				<div class="card">
					<h3 class="card__title card__title_close">${item.name}</h3>
					<div class="card__content">
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
				<div class="card">
					<h3 class="card__title card__title_close">${item.name}</h3>
					<div class="card__content">
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

function paginationBtnTemplate(number) {
	return `<li class="pagination__item">${number}</li>`;
}

function getCard(event) {
	return event.target.closest('.card');
}

function cardViewToggle(card) {
	if (card) {
		card.querySelector('.card__content').classList.toggle('card__content_active');
		card.querySelector('.card__title').classList.toggle('card__title_close');
	}
}

function formatText(text) {
	return text.trim().toLowerCase();
}

function getActiveTabValue() {
	const activeTab = document.querySelector('.nav__item_active').textContent;
	return formatText(activeTab);
}

function getTargetText(e) {
	return e.target.textContent;
}

function toggleActiveResousesBtn(elem) {
	resoursesBtnsItems.forEach(btn => {
		if (btn.classList.contains('nav__item_active')) {
			btn.classList.remove('nav__item_active');
		}
	});
	elem.classList.add('nav__item_active');
}