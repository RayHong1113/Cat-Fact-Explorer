async function fetchCatBreeds() {
    const response = await fetch('https://catfact.ninja/breeds');
    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}

function getSelectElement() {
    const selectElement = document.getElementById('factCount');
    return selectElement;
}

function getSelectedValue() {
    const selectElement = getSelectElement();
    const selectedValue = selectElement.value;
    return selectedValue;
}

async function displayCatFacts() {
    const selectElement = getSelectElement();
    const optionCount = selectElement.length;

    const response = await fetch(`https://catfact.ninja/facts?limit=${optionCount}`);
    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    }
    const factCount = getSelectedValue();
    const data = await response.json();
    result = data.data[factCount-1].fact;
    console.log(factCount)
    console.log(result);

    const factsContainer = document.getElementById('factsContainer');
    factsContainer.textContent = result;
    return data;
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const catBreeds = await fetchCatBreeds();
    } catch (error) {
        console.error('Error fetching cat breeds:', error);
    }   
})