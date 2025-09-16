/**
 * Checks if the file input is a valid (predefined) JSON format.
 * @param {*} file - input file
 * @returns {Promise<boolean>} - true if valid, false otherwise
 */
export function checkUploadFormat(file) {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const fileAsText = e.target.result;
      try {
        const jsonFile = JSON.parse(fileAsText);
        //console.log("Reading file...", jsonFile);
        if (typeof jsonFile.text === "string"
              && (!jsonFile.labels || Array.isArray(jsonFile.labels))
              && (!jsonFile.groundTruth || typeof jsonFile.groundTruth === "string")) {
          resolve(true);
        }
        resolve(false);
      } catch (err) {
        console.warn("ERROR: ", err);
        resolve(false);
      }
    };
    reader.readAsText(file);
  });
}
