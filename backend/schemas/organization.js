export default {
    name: 'organization',
    Title: 'Organizations',
    type: 'document',
    icon: () => `✨`,
    fields: [
        {
            name: 'name',
            title: 'Name',
            type: 'string',
            description: 'Name of the organization',
        },
        {
            name: 'logo',
            title: 'Logo',
            type: 'image',
            description: 'Organization logo',
        },
        {
            name: 'thumbnail',
            title: 'Thumbnail',
            type: 'image',
            description: 'Organization thumbnail',
        },
        {
            name: 'primaryColor',
            title: 'Primary Brand Color',
            type: 'string',
            description: 'The primary color for the organization',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
            description: 'Description of the organization',
        },
        {
            name: 'website',
            title: 'Website',
            type: 'url',
            description: 'A link to the org website',
        },
        {
            name: 'ein',
            title: 'EIN',
            type: 'string',
            description: 'The EIN of the organization',
        },
    ],
};
