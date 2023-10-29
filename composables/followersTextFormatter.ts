export default function (followers: number) {
    var text = '';
    if (followers === 1) {
        text = ' Подписчик';
    } else if (followers === 0) {
        text = ' Подписчиков';
    } else {
        text = ' Подписчика';
    }
    return {value: followers, text: text};
}