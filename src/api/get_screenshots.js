async function fetchScreenshots(repoUrl) {
  const match = repoUrl.match(/github\.com\/([^\/]+)\/([^\/]+)/);

  if (match && match.length >= 3) {
    console.log("url matched");
    const repoOwner = match[1];
    const repoName = match[2];
    const folderPath = "screenshots"; // Set the folder path to 'screenshots'
    const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${folderPath}`;
    const response = await fetch(apiUrl);

    if (!response.ok) {
      console.error("Failed to fetch repository contents");
      return [];
    }

    const data = await response.json();
    const images = data.filter(
      (file) => file.type === "file" && /\.(png|jpe?g|gif)$/.test(file.name)
    );
    console.log("fetch sucess");
    return images;

    // const imagesContainer = document.getElementById("images-container");
    // imagesContainer.innerHTML = ""; // Clear previous images
    // images.forEach((image) => {
    //   const imgElement = document.createElement("img");
    //   imgElement.src = image.download_url;
    //   imgElement.alt = image.name;

    //   const imageItem = document.createElement("div");
    //   imageItem.className = "image-item";
    //   imageItem.appendChild(imgElement);

    //   imagesContainer.appendChild(imageItem);
    // });
  } else {
    console.error("Invalid GitHub repository URL");
    return [];
  }
}

export default fetchScreenshots;
