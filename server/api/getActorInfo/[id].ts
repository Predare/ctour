export default defineEventHandler((event) => {
    var actors = [
        {
            id: 1,
            name: 'Джон Роббинсон',
        },
        {
            id: 2,
            name: 'Билли Боб Мл.',
        },
        {
            id: 3,
            name: 'Линдски Сквинси',
        },
    ];
    var id = event.context.params?.id ? Number(event.context.params?.id) : 1;
    return actors.find(actors => actors.id == id);
})