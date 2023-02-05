const defaultJson = {"store":{"book":[{"category":"reference","author":"Nigel Rees","title":"Sayings of the Century","price":8.95},{"category":"fiction","author":"Evelyn Waugh","title":"Sword of Honour","price":12.99},{"category":"fiction","author":"Herman Melville","title":"Moby Dick","isbn":"0-553-21311-3","price":8.99},{"category":"fiction","author":"J. R. R. Tolkien","title":"The Lord of the Rings","isbn":"0-395-19395-8","price":22.99}],"bicycle":{"color":"red","price":19.95}},"expensive":10};
const defaultExpression = "$..book[?(@.price <= $['expensive'])]";

function reset() {
    document.getElementById('jsonToEvaluate').value = JSON.stringify(defaultJson, null, '\t');
    document.getElementById('pathExpression').value = defaultExpression;
}

function evaluateExpression(pathExpression) {
    document.getElementById('jsonToEvaluate').value = JSON.stringify(defaultJson, null, '\t');
    document.getElementById('pathExpression').value = pathExpression;
    evaluateJson();
}

function beautify() {
    const jsonToEvaluate = document.getElementById('jsonToEvaluate').value;
    document.getElementById('jsonToEvaluate').value = getPrettyPrintString(jsonToEvaluate);
}

function getPrettyPrintString(unformattedString) {
    const parsedJson = JSON.parse(unformattedString);
    return JSON.stringify(parsedJson, null, '\t');
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
        jsonToEvaluate: document.getElementById('jsonToEvaluate').value.trim(),
        pathExpression: document.getElementById('pathExpression').value.trim(),
        jsonPathOptions: jOptions
    };

    const jsonRequest = JSON.stringify(request, null, 0);

    // Yes, I know the API Key is public. No, do not use this for your your own backend.
    // You _can_ build a similar setup, as I have shown here: https://sumiya.page/json-path-evaluator-under-the-hood.html
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
            const displayResult = JSON.stringify(data, null, '\t');
            resultContainer.innerHTML = displayResult;
        })
        .catch(error => {
            
            setDisplay('result', 'block');
            setDisplay('loading', 'none');

            console.error('There was an error!', error);
            resultContainer.innerHTML = `Error: ${error}`;
        });

}