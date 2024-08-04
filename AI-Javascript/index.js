const API_URL = "https://api.jigsawstack.com/v1/prompt_engine";
const API_KEY = "sk_418975ff619a660239f59c891cba27852c83ec4cae64137e19fef310986997c8ff3e460132e8c84c68695b771c5d8a8bc98f9001d7f5c1078238189121be27a9024Yp6SeEXpM4XHRkBhAd";

const promptInput = document.getElementById("promptInput");
const generateBtn = document.getElementById("generateBtn");
const stopBtn = document.getElementById("stopBtn");
const resultText = document.getElementById("resultText");

let controller = null; // Store the AbortController instance

const generate = async () => {
  // Alert the user if no prompt value
  if (!promptInput.value) {
    alert("Please enter a prompt.");
    return;
  }

  // Disable the generate button and enable the stop button
  generateBtn.disabled = true;
  stopBtn.disabled = false;
  resultText.innerText = "Generating...";

  // Create a new AbortController instance
  controller = new AbortController();
  const signal = controller.signal;
   
  const headers = {
    "x-api-key": API_KEY,
  };

  try {
    // Fetch the response from the OpenAI API with the signal from AbortController
    // const data = await fetch(API_URL, {
    //     headers,
    // });

    const endpoint = "https://api.jigsawstack.com/v1/prompt_engine";
    const options = {
    method: "POST",
    headers: {
        "Content-Type": "application/json",
        "x-api-key": API_KEY, // Replace with your actual API key.
    },
    body: JSON.stringify({
        prompt: "Tell me a story about {about}",
        inputs: [
        {
            key: "about",
            optional: false,
            initial_value: "Leaning Tower of Pisa",
        },
        ],
        return_prompt: "Return the result in a markdown format",
    }),
    };
    const data = await fetch(endpoint, options);
    //const data = await result.json();
    console.log(data);
    resultText.innerText = data.message.content;
  } catch (error) {
    // Handle fetch request errors
    if (signal.aborted) {
      resultText.innerText = "Request aborted.";
    } else {
      console.error("Error:", error);
      resultText.innerText = "Error occurred while generating.";
    }
  } finally {
    // Enable the generate button and disable the stop button
    generateBtn.disabled = false;
    stopBtn.disabled = true;
    controller = null; // Reset the AbortController instance
  }
};

const stop = () => {
  // Abort the fetch request by calling abort() on the AbortController instance
  if (controller) {
    controller.abort();
    controller = null;
  }
};

promptInput.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    generate();
  }
});
generateBtn.addEventListener("click", generate);
stopBtn.addEventListener("click", stop);