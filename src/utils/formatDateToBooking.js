function formatDateToBooking(date) {
  const newDate = `${new Date(date).getDate()}/${
    new Date(date).getMonth() + 1
  }/${new Date(date).getFullYear()}`;

  return newDate;
}

export default formatDateToBooking;
