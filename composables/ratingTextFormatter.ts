export function ratingTextFormatter(rating: any) {
    var text = '';
    if (rating === 1) {
        text = ' Рейтинг';
    } else {
        text = ' Рейтинга';
    }
    return {value: rating, text: text};
}