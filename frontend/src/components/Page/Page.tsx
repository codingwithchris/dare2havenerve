import Head from 'next/head';

export const Page: React.FC<PageProps> = ({
    metaTitle,
    metaDescription,
    children,
}) => {
    return (
        <>
            <Head>
                {/* Standard meta data for search engines */}
                <title>{metaTitle}</title>
                <meta name="description" content={metaDescription} />
            </Head>
            {children}
        </>
    );
};

interface PageProps {
    metaTitle: string;
    metaDescription: string;
}
