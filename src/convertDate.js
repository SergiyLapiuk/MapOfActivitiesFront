var locale = new Date().getTimezoneOffset() / -60;
//locale = 2;

export function convertDateToJSON(dateT) {
  // із фронтенда конвертація для бекенда
  if (dateT == null || dateT == "") return null;
  const [date, time] = dateT.split(" ");
  const [year, month, day] = date.split("-");
  const [hours, minutes] = time.split(":");
  const dateObject = new Date(
    Date.UTC(year, month - 1, day, hours - 2, minutes)
  );

  const converted = dateObject.toISOString();
  return converted;
}

export function convertJSONToDate(dateT) {
  // Из бекенда конвертация для фронтенда
  if (dateT == null || dateT == "") return null;

  const dateObject = new Date(dateT);

  dateObject.setUTCHours(dateObject.getUTCHours() + locale);

  const year = dateObject.getUTCFullYear();
  const month = ("0" + (dateObject.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + dateObject.getUTCDate()).slice(-2);
  const hours = ("0" + dateObject.getUTCHours()).slice(-2);
  const minutes = ("0" + dateObject.getUTCMinutes()).slice(-2);

  const converted = `${year}-${month}-${day} ${hours}:${minutes}`;

  return converted;
}

//converts backend date to year/month/day
export function convertJSONToMinimumDate(dateT) {
  const dateObject = new Date(dateT);
  const year = dateObject.getUTCFullYear();
  const month = ("0" + (dateObject.getUTCMonth() + 1)).slice(-2);
  const day = ("0" + (dateObject.getUTCDate() - 1)).slice(-2);
  const hours = ("0" + dateObject.getUTCHours()).slice(-2);
  const minutes = ("0" + dateObject.getUTCMinutes()).slice(-2);
  const converted = `${year}/${month}/${day}`;
  return converted;
}

export function getTimePlusFifteenMinutes(dateTimeString) {
  let date = dateAdd(new Date(dateTimeString), "minute", 15);
  return date.toISOString();
}

function dateAdd(date, interval, units) {
  if (!(date instanceof Date)) return undefined;
  var ret = new Date(date); //don't change original date
  var checkRollover = function () {
    if (ret.getDate() != date.getDate()) ret.setDate(0);
  };
  switch (String(interval).toLowerCase()) {
    case "year":
      ret.setFullYear(ret.getFullYear() + units);
      checkRollover();
      break;
    case "quarter":
      ret.setMonth(ret.getMonth() + 3 * units);
      checkRollover();
      break;
    case "month":
      ret.setMonth(ret.getMonth() + units);
      checkRollover();
      break;
    case "week":
      ret.setDate(ret.getDate() + 7 * units);
      break;
    case "day":
      ret.setDate(ret.getDate() + units);
      break;
    case "hour":
      ret.setTime(ret.getTime() + units * 3600000);
      break;
    case "minute":
      ret.setTime(ret.getTime() + units * 60000);
      break;
    case "second":
      ret.setTime(ret.getTime() + units * 1000);
      break;
    default:
      ret = undefined;
      break;
  }
  return ret;
}

export function setCurrentTime(dateISOString) {
  let date = new Date(dateISOString);
  date.setTime(new Date().getTime());
  return date.toISOString();
}
