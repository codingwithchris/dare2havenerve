export default {
    name: 'actor',
    Title: 'Actors',
    type: 'document',
    icon: () => `🎭`,
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Name of the actor',
        },
    ],
};
