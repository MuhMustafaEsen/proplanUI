import dayjs from "dayjs";

export const getDaysInMonth = (date : dayjs.Dayjs) =>
    date.daysInMonth();

export const formatDay = (year:number,month:number,day:number) =>
    dayjs(`${year}-${month}-${day}`).format("DD.MM.YYYY");