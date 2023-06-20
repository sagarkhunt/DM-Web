import moment from "moment";

export const formateDate = (date) => {
  return moment(date).format("MMM DD, YYYY");
};

export const formateDateYear = (date) => {
  return moment(date).format("MMM, YYYY");
};

export const weekDayFormate = (data) => {
  // console.log("🚀 ~ file: dateMixin.js:12 ~ weekDayFormate ~ data:", data)
  // console.log("🚀 ~ file: dateMixin.js:12 ~ weekDayFormate ~ data:", moment(data).format(''))
  // console.log("🚀 ~ file: dateMixin.js:12 ~ weekDayFormate ~ data:", moment(data).fromNow())
  // let date = moment(data),
  //   now = moment(),
  //   days = now.diff(date, "days"),
  //   weeks = now.diff(date, "weeks"),
  //   result = "";

  // if (weeks) {
  //   result += weeks + (weeks === 1 ? " week " : " weeks ");
  //   days = days % 7;
  // } else if (days || weeks === 0) {
  //   result += days + (days === 1 ? " day" : " days");
  // }

  return moment(data).fromNow();
};
