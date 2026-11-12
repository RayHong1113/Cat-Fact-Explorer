async function fetchCatBreeds() {
    const response = await fetch('https://catfact.ninja/breeds');
    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}

function getSelectedValue() {
    const selectElement = document.getElementById('factCount');
    const selectedValue = selectElement.value;
    return selectedValue;
}

async function displayCatFacts() {
    const factCount = getSelectedValue();
    const factsContainer = document.getElementById('factsContainer');

    try {
        const response = await fetch(`https://catfact.ninja/facts?limit=${factCount}`);
        if (!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(factCount);
        console.log(data);

        factsContainer.innerHTML = '';
        data.data.forEach(({ fact }) => {
            const p = document.createElement('p');
            p.textContent = fact;
            factsContainer.appendChild(p);
        });

        return data;
    } catch (error) {
        console.error('Error fetching cat facts:', error);
        factsContainer.textContent = 'Failed to load cat facts.';
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const catBreeds = await fetchCatBreeds();
    } catch (error) {
        console.error('Error fetching cat breeds:', error);
    }   
})