export default function (createdAt: string) {
    const date = new Date(createdAt);
    const dateNow = new Date(Date.now());
    const yearsCount = dateNow.getFullYear() - date.getFullYear();
    const monthsCount = dateNow.getMonth() - date.getMonth();
    const daysCount = dateNow.getDate() - date.getDate();
    const yearsString = (yearsCount ? yearsCount + (yearsCount <= 4 ? (yearsCount === 1 ? " год " : " года ") : " лет ") : "");
    const monthsString = (monthsCount ? monthsCount + (monthsCount <= 4 ? (daysCount === 1 ? " месяц " : " месяца ") : " месяцев ") : "");
    const daysString = (daysCount ? daysCount + (daysCount <= 4 ? (daysCount === 1 ? " день" : " дня") : " дней") : "");
    const result = yearsString || monthsString || daysString ? "На сайте уже " + yearsString + monthsString + daysString : 'На сайте менее дня' /*+ hoursString*/;
    return result;
}