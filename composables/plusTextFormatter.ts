export default function (value: any) {
    var text = '';
    if (value === 0) {
        text = ' плюсов и ';
    } else if (value === 1) {
        text = ' плюс и ';
    } else if (value > 1) {
        text = ' плюса и ';
    }
    return {value: value, text: text};
}