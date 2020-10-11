import Head from 'next/head';

export const Page: React.FC<PageProps> = ({ url, metaTitle, metaDescription, imageURL, imageAlt, children }) => {
    return (
        <>
            <Head>
                {/* Standard meta data for search engines */}
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
                <meta name="image" content={imageURL} />
                <link rel="canonical" href={url} />

                {/* Opengraph meta tags for Facebook & LinkedIn */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content={url} />
                <meta property="og:title" content={`${metaTitle}`} />
                <meta property="og:description" content={metaDescription} />

                <meta property="og:image" content={imageURL} />
                <meta property="og:image:secure_url" content={imageURL} />

                {imageAlt && <meta property="og:image:alt" content={imageAlt} />}
            </Head>
            {children}
        </>
    );
};

interface PageProps {
    url?: string;
    metaTitle: string;
    metaDescription: string;
    imageURL?: string;
    imageAlt?: string;
}
