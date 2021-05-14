const apiKey = "&appid=c05cc07a122ee08d86c10559a61569f6";
//get weather data from weather app map
let systemS = '';
const getWeather = (baseUrl = "https://api.openweathermap.org/data/2.5/weather?", zipCode = 0, cityName = '', system = '') => {
    let url = ''
        // console.log('cityName', cityName);
    if (cityName.length !== 0) {
        // url = baseUrl + "q=" + cityName + apiKey;
        url = `${baseUrl}q=${cityName}${apiKey}&units=${system}`
            // url = "https://api.openweathermap.org/data/2.5/weather?q=alexandria&appid=c05cc07a122ee08d86c10559a61569f6"
            // console.log(url)
    } else if (zipCode !== 0) {
        url = baseUrl + "zip=" + zipCode + ",us" + apiKey + "&units=" + system;
    }
    return fetch(url)

}

//post data to server
const postData = async(url = '', data = {}) => {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        try {
            const newData = await response.json()
            return newData
        } catch (error) {
            console.log('error', error)
        }

    }
    //post data to server (another version)
const postDataV2 = (url = '', data = {}) => {
        fetch(url, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })
            .then(res => res.json())
            .then(data => data)
            .catch(error => console.log('error', error))
    }
    //get all data from server
const getAllData = () => {
    fetch(`http://localhost/all`).then(res = res.json())
}

const getResult = () => {
        getWeather('').then(data => {
            const fav = document.getElementById("feeling-id").value
            const newData = {...data, fav: fav }
            postData('/add', data = newDate).then(data => {
                updateUi(data)
            })

        })
    }
    //update ui when you add a record
function updateUi(data) {
    if (document.getElementById('no-entry') !== null) {
        document.getElementById('no-entry').remove();
    }

    const innerSec = document.createDocumentFragment();

    let element = data;
    const city = document.createElement('div');
    city.innerText = 'City name: ' + element.name;
    innerSec.appendChild(city);
    const date = document.createElement('div');
    date.innerText = 'Date: ' + element.dt;
    innerSec.appendChild(date);

    const temp = document.createElement('div');
    temp.innerHTML = 'Temp: ' + element.main.temp + ' &#8451';
    innerSec.appendChild(temp);

    const content = document.createElement('div');
    content.innerText = 'Content: ' + element.fav;
    innerSec.appendChild(content);
    const outerSec = document.createElement('section');
    outerSec.className = 'holder entry'
    outerSec.appendChild(innerSec);
    document.getElementById('data-container').appendChild(outerSec);


}

//initialize your ui with previous records
function initialUi() {
    fetch('/all').then(data => data.json()).then((data => {
        const fra = document.createDocumentFragment()
        const sec = document.createElement('section');
        if (data.length === 0) {
            sec.innerHTML = "<div>there is no records yet</div>"
            sec.id = 'no-entry';
            sec.className = "holder noentry";
            document.getElementById('data-container').appendChild(sec)


            return
        }
        // console.log(data[0].name)
        const outerfra = document.createDocumentFragment()

        for (let i = 0; i < data.length; i++) {
            // const sec = document.createElement('section');
            const innerSec = document.createDocumentFragment()
            const ssec = document.createElement('section');
            let element = data[i];
            const city = document.createElement('div')
            city.innerText = 'City Name: ' + element.name
            innerSec.appendChild(city);
            const date = document.createElement('div')
            date.innerText = 'Date: ' + new Date(element.dt * 1000).toLocaleDateString("en-us");

            innerSec.appendChild(date);

            const temp = document.createElement('div')
            temp.innerHTML = 'Temp: ' + element.main.temp + ' &#8451';
            innerSec.appendChild(temp);

            const content = document.createElement('div')
            content.innerText = 'Content: ' + element.fav;
            innerSec.appendChild(content);
            ssec.className = "holder entry";

            ssec.appendChild(innerSec)
                // fra.appendChild(sec);
            outerfra.appendChild(ssec)




        }
        document.getElementById('data-container').appendChild(outerfra)
    })).catch(error => console.log('error', error))
}


//function to be called when dow is loaded
function getInputFromDom() {
    initialUi()
    const cityInput = document.getElementById("city-name");
    const zipInput = document.getElementById("zip-code");
    // alert(zipInput.value)
    const favInput = document.getElementById("feeling-id");
    const selectS = document.getElementById("type-s")
    systemS = selectS.value;
    let cityValue, zipValue;
    //check on keydown if backspace is clicked for city input
    //disable zipcode input when you write in city input
    cityInput.addEventListener('keydown', function(event) {
            // console.log(event.keyCode)
            // console.log(event)
            zipInput.disabled = true;

            let key = event.keyCode || event.charCode;
            // if ((key == 8 || key == 46)) {
            //     if (event.target.value === '')
            //         zipInput.disabled = false;
            // }
        })
        //check on keyup the value of city input
    cityInput.addEventListener('keyup', function(event) {
            if (event.target.value === '')
                zipInput.disabled = false;

            else {
                cityValue = event.target.value;
                zipValue = 0;
            }
        })
        //check on keydown if backspace is clicked for zipcode input

    zipInput.addEventListener('keydown', function(event) {

            cityInput.disabled = true;
            // let key = event.keyCode || event.charCode;
            // if ((key == 8 || key == 46) && event.target.value.length === 0) {
            //     cityInput.disabled = false;
            // }
        })
        //check on keyup the value of zip input
    zipInput.addEventListener('keyup', function(event) {
        if (event.target.value == 0)
            cityInput.disabled = false;
        else {
            zipValue = event.target.value;
            cityValue = ''
                // console.log(zipValue)
        }
    })
    selectS.addEventListener('change', (elem, event) => {
            systemS = this.value;
        })
        //listner when you click on generate button
    const btn = document.getElementById("generate")
        //listner when we click on generate button
    btn.addEventListener('click', function() {
        if (cityValue.length !== 0) {
            console.log('cityValue', cityValue);
            // cityInput.value = '';
            // zipInput.value = "";
            getWeather("https://api.openweathermap.org/data/2.5/weather?", 0, cityValue, systemS)
                .then(data => data.json()).then(data => {
                    data['fav'] = favInput.value
                    favInput.value = '';
                    cityInput.value = '';

                    // console.log(data.main.temp)
                    postData('/add', data)
                    return data
                        // updateUi()
                }).then(data => updateUi(data))
        } else if (zipValue.length !== 0) {
            // console.log('zipValue', zipValue);
            // cityInput.value = '';

            getWeather("https://api.openweathermap.org/data/2.5/weather?", zipValue, '', systemS)
                .then(data => data.json()).then(data => {
                    data['fav'] = favInput.value
                    favInput.value = '';
                    zipInput.value = "";

                    // console.log(data.main.temp)
                    postData('/add', data)
                    return data
                        // updateUi()
                }).then(data => updateUi(data))
        } // } else {
        //     this.disabled = true;
        // }
    })
}
document.addEventListener("DOMContentLoaded", getInputFromDom)