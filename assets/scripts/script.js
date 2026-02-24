// Events
document.querySelector('.busca').addEventListener('submit', async (event) => {
    event.preventDefault();

    const input = document.querySelector('#searchInput').value;

    if (!input) {
        showWarning('Digite uma cidade.');
        return;
    }
    if (input !== '') {
        showWarning('Carregando...')
    }

    let url = `https://api.weatherapi.com/v1/current.json?q=${encodeURI(input)}&key=421228d4561b4e9e9d0115849262901&lang=pt`;

    try {
        let response = await fetch(url);
        let json = await response.json();

        if (json.error) {
            clearInfo();
            showWarning('Local não encontrado.');
        } else {
            showInfo({
                name: json.location.name,
                country: json.location.country,
                temp: json.current.temp_c,
                tempIcon: json.current.condition.icon,
                windSpeed: json.current.wind_kph,
                windDegree: json.current.wind_degree
            });
        }
    } catch (error) {
        clearInfo();
        showWarning('Erro na conexão.');
    }
});

// Functions
function showInfo(json) {
    showWarning('');

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp.toFixed(0)}<sup>ºC</sup>`;
    document.querySelector('.info .temp img').setAttribute('src', `https:${json.tempIcon}`);
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windDegree - 90}deg)`;

    document.querySelector('.resultado').style.display = 'block';
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg) {
    document.querySelector('.aviso').innerHTML = msg;
}