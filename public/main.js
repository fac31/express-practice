document.getElementById("pokemon").addEventListener("submit", async (event) => {
  event.preventDefault();

  const pokeName = document.getElementById("poke-name").value.trim();

  try {
    const response = await fetch("http://localhost:3000/api-blend", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pokeName }),
    });

    if (response.ok) {
      const data = await response.json();

      console.log(data);

      document.getElementById("image-box").innerHTML =
        `<img src="${data.image}" alt="${pokeName}" class="h-full w-full object-cover rounded-lg"/>`;

      document.getElementById("story-box").textContent = data.story;
      document.getElementById("pokemon").reset();
    } else {
      console.error("Failed to fetch data from the API");
    }
  } catch (error) {
    console.error("Error:", error);
  }
});
