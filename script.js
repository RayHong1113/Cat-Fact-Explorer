/*
	Cat Fact Explorer
	November 12, 2026
	Ray Hong
 */

/*
 * Fetches cat breed data from the Cat Fact API and logs it to the console.
 *
 * return   The parsed JSON data containing cat breeds
 */
async function fetchCatBreeds() {
    const response = await fetch('https://catfact.ninja/breeds');
    if (!response.ok) {
        throw new Error(`HTTP Error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    return data;
}

/*
 * Retrieves the selected number of facts from the dropdown menu.
 *
 * return   The selected value from the factCount dropdown
 */
function getSelectedValue() {
    const selectElement = document.getElementById('factCount');
    const selectedValue = selectElement.value;
    return selectedValue;
}

/*
 * Fetches and displays the selected number of cat facts on the page.
 *
 * return   The parsed JSON data containing the fetched cat facts
 */
async function displayCatFacts() {
    const factCount = getSelectedValue();
    const factsContainer = document.getElementById('factsContainer');

    try {
        // Fetch cat facts using the selected limit parameter
        const response = await fetch(`https://catfact.ninja/facts?limit=${factCount}`);
        if (!response.ok) {
            throw new Error(`HTTP Error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log(factCount);
        console.log(data);

        // Clear previous facts and render the new list
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

// Add the event listener for the document load
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const catBreeds = await fetchCatBreeds();
    } catch (error) {
        console.error('Error fetching cat breeds:', error);
    }   
})