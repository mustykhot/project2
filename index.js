const key = "QDNBJNIZRYOQ";
const gkey = "0dbb0bd1e6ac4be09b4b2b65a221bcc8";

document.getElementById('sub').onclick = () => {
	const loc = encodeURIComponent(document.getElementById('search').value);

	document.getElementById('loader').style.display = "block";

	getTimeZone(loc);
}

async function getTimeZone(loc){
	const r = await fetch(`https://api.opencagedata.com/geocode/v1/json?key=${gkey}&q=${loc}`);

	const res = await r.json();

	lat = res.results[0].geometry.lat;
	lng = res.results[0].geometry.lng;

	mapboxgl.accessToken = 'pk.eyJ1IjoiYXlvcm95IiwiYSI6ImNrMzk3bDNmMzBleWczaG5jYTMya2JrMDUifQ.Kqmo1lWYwAHdfb8koCzgTw';
	var map = new mapboxgl.Map({
		container:'map',
		style: 'mapbox://styles/mapbox/streets-v11',
		center : [lat,lng],
		zoom : 5,
	});

	
	getLocation(lat,lng).then(res => {
		document.getElementById('loader').style.display = "none";
		document.getElementById('time').innerHTML = res;
	});
	
	
}

async function getLocation(lat,lng){
	const res = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=${key}&format=json&by=position&lat=${lat}&lng=${lng}`);

	const result = await res.json();

	return result.formatted;
}