// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
const stateInput = document.querySelector('#state-input')
const errorMessage = document.querySelector('#error-message')
const alertDisplay = document.querySelector('#alerts-display')
const fetchButton = document.querySelector('#fetch-alerts')


//Display data
function displayData(data) {
    debugger;
    
    //clear any previous alert
    alertDisplay.innerHTML = ""

    const alertTitle = document.createElement('h3')
    debugger;
    alertTitle.textContent = `Current watches, warnings, and advisories for ${data.title}: ${data.features.length}`

    alertDisplay.appendChild(alertTitle)

    //create a list for the alerts
    const alertList = document.createElement('ul')
    data.features.forEach(alert => {
        const listItem = document.createElement('li')
        debugger;
        listItem.textContent =alert.properties.headline

        alertList.appendChild(listItem)
    })
    alertDisplay.appendChild(alertList)
}

function displayErrorMessage(message) {
    errorMessage.textContent = message
    errorMessage.classList.remove("hidden")
}


function fetchWeatherAlerts(state) {
    //fetch the data
    fetch(`https://api.weather.gov/alerts/active?area=${state}`)
    .then(function(response) {
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }
        return response.json()
    })
    .then(function(data) {
        displayData(data)
        //To clear the input
        stateInput.value = ""

        errorMessage.classList.add('hidden')
    })
    .catch (errorObject => displayErrorMessage(errorObject.message))
    
}

//button event listener
fetchButton.addEventListener("click", () => {
    const state = stateInput.value.trim().toUpperCase();

    // Validate empty input
    if (state === "") {
        displayError("Please enter a state abbreviation.");
        return;
    }

    // Validate two-letter state abbreviation
    if (!/^[A-Z]{2}$/.test(state)) {
        displayError(
            "Please enter a valid two-letter state abbreviation."
        );
        return;
    }

    // Hide and clear old error before a new request
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    fetchWeatherAlerts(state);
});



