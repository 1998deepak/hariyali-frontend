export function convertDateFormat(dateString, outputFormat = "dd-MM-yyyy") {
    if (dateString === null || dateString === undefined || dateString === "") {
      return null;
    }
    const inputDate = new Date(dateString);
    const year = inputDate.getFullYear();
    const month = inputDate.getMonth() + 1;
    const day = inputDate.getDate();

    // Reformat the date using the output format
    const outputDate = outputFormat
      .replace("dd", day.toString().padStart(2, "0"))
      .replace("MM", month.toString().padStart(2, "0"))
      .replace("yyyy", year.toString());

    return outputDate;
  }