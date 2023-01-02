function formatDateUpAPI(date) {
  const newDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;

  return newDate;
}

export default formatDateUpAPI;
