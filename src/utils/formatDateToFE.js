function formatDateToFE(date) {
  if (!date) {
    return;
  }
  const newDate = `${date.slice(3, 5)}/${date.slice(0, 2)}/${date.slice(
    6,
    10
  )}`;

  return newDate;
}

export default formatDateToFE;
