const url = "http://localhost:4000/graphql";
const inputFile = document.getElementById("photo-to-post");
const results = document.getElementById("results");

async function sendFile() {
  // Capture the file from input
  const [theFile] = inputFile.files;

  // Use the submitAFile mutation
  const query = `
    mutation upload($file: Upload!) {
        submitAFile(file: $file) {
            filename
            mimetype
            filesize
        }
    }
  `;

  // Setup a mutation operation with null file in variables
  const operation = {
    query,
    variables: {
      file: null
    }
  };

  // Setup a map that maps other items in the body
  // to operation variables
  const map = {
    "0": ["variables.file"]
  };

  // Build the body of the http request
  const body = new FormData();
  body.append("operations", JSON.stringify(operation));
  body.append("map", JSON.stringify(map));
  body.append(0, theFile);

  // Create the fetch options
  const opts = {
    method: "POST",
    body
  };

  // Send the request and collect the data
  const { data } = await fetch(url, opts).then(res => res.json());

  // display the data on the screen
  showStats(data.submitAFile);
}

function reset() {
  inputFile.style = " display: block; ";
  results.innerHTML = "";
}

function showStats({ filename, mimetype, filesize }) {
  inputFile.style = " display: none; ";
  results.innerHTML = `
    <p>
      <b>name</b>: ${filename}
    </p>
    <p>
      <b>type</b>: ${mimetype}
    </p>
    <p>
      <b>size</b>: ${filesize} bytes
    </p>
    <button onclick="reset()">upload another file</button>
  `;
}
