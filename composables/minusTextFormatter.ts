export default function (value: any) {
    var text = '';
    if (value === 0) {
        text = ' минусов ';
    } else if (value === 1) {
        text = ' минус ';
    } else if (value > 1) {
        text = ' минуса ';
    }
    return {value: value, text: text};
}