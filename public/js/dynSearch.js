const input = document.getElementById("searchInput");
const campContainers = document.getElementById("camplists");

input.addEventListener("input", async () => {
    const q = input.value.trim();

    try {
        const url = q ? `/campgrounds/search/?q=${encodeURIComponent(q)}` : "/campgrounds/search/";
        const res = await fetch(url);
        const html = await res.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        const newCampground = doc.getElementById("camplists");
        if (!newCampground) throw new Error("Missing #camplists in response");
        campContainers.innerHTML = newCampground.innerHTML;

        // Extract campgrounds data for map update
        const scriptTags = doc.querySelectorAll('script');
        let newCampgroundsData = null;

        scriptTags.forEach(script => {
            const content = script.textContent || script.innerText;
            // capture the entire JSON object literal, now that it's valid JSON
            // Note the \"features\" in the regex now!
            const match = content.match(/const campgrounds = (\{"features":[\s\S]*?\}\s*);/); 

            if (match && match[1]) {
                const jsonString = match[1]; // make sure a valid JSON string: {"features": [...]}
                try {
                    newCampgroundsData = JSON.parse(jsonString);
                } catch (e) {
                    console.error("Error parsing campgrounds data:", e);
                    console.error("String attempted to parse:", jsonString);
                }
            }
        });

        // Update map data if we found new campgrounds data and map is loaded
        if (newCampgroundsData && map && map.getSource('campgrounds')) {
            map.getSource('campgrounds').setData(newCampgroundsData);
        }

    } catch (err) {
        console.error("Search err: ", err);
    }
});