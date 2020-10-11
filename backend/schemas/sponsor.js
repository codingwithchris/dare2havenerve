export default {
    name: 'sponsor',
    Title: 'Sponsors',
    type: 'document',
    icon: () => `❤️`,
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Name of the sponsor',
        },
        {
            name: 'bio',
            title: 'Bio',
            type: 'text',
            description: 'Sponsor bio',
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            description: 'Sponsor logo',
        },
        {
            name: 'website',
            title: 'Website',
            type: 'url',
            description: 'A link to the sponsor website',
        },
        {
            name: 'match',
            title: 'Match Amount (whole number)',
            type: 'number',
            description: 'How much is their donor match?',
        },
    ],
};
