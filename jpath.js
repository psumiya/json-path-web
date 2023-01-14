function beautify() {
    const jsonToEvaluate = document.getElementById('jsonToEvaluate').value;
    document.getElementById('jsonToEvaluate').value = getPrettyPrintString(jsonToEvaluate);
}

function getPrettyPrintString(unformattedString) {
    const parsedJson = JSON.parse(unformattedString);
    return JSON.stringify(parsedJson, undefined, 4);
}

function setDisplay(id, value) {
    const loading = document.getElementById(id);
    if (loading) {
        loading.style.display = value;
    }
}

function evaluateJson() {

    const resultContainer = document.getElementById('result')
    resultContainer.innerHTML = "";

    setDisplay('loading', 'inline');
    setDisplay('result', 'none');

    const jOptionsList = document.getElementsByName('jsonPathOptions');
    const jOptions = [];
    for (const checkbox of jOptionsList) {
        if (checkbox.checked) {
            jOptions.push(checkbox.value);
        }
    }

    const request = {
        jsonToEvaluate: document.getElementById('jsonToEvaluate').value,
        pathExpression: document.getElementById('pathExpression').value,
        jsonPathOptions: jOptions
    };

    const jsonRequest = JSON.stringify(request);

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'HWVldoK4AI1jWKTwbUHWQ32k9LSePmCq2qcPlhVh'
        },
        body: jsonRequest
    };

    fetch('https://jsonpath.sumiya.page/jsonpath', requestOptions)
        .then(async response => {
            
            setDisplay('result', 'block');
            setDisplay('loading', 'none');

            if (!response.ok) {
                const error = response.status;
                return Promise.reject(error);
            }

            return response.json();
        })
        .then(data => {
            const displayResult = JSON.stringify(data, undefined, 4);
            resultContainer.innerHTML = displayResult;
        })
        .catch(error => {
            
            setDisplay('result', 'block');
            setDisplay('loading', 'none');

            console.error('There was an error!', error);
            resultContainer.innerHTML = `Error: ${error}`;
        });

}