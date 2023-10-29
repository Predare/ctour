export default function (dateString: string) {
    const date : Date = new Date(dateString);
    return `${date.getHours() < 10 ? '0' + date.getHours() :
        date.getHours()}:${date.getMinutes() < 10 ? '0' + date.getMinutes() :
            date.getMinutes()} ${date.getDate() < 10 ? '0' + date.getDate() :
                date.getDate()}:${date.getMonth() < 10 ? '0' + date.getMonth() :
                    date.getMonth()}:${date.getFullYear()}`;
}