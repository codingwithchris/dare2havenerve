// post.js
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import sanityClient from '@/lib/client';

import { Box, Container, Typography } from '@material-ui/core';

import { Page, Video } from '@/components';

const Performance: NextPage<PerformanceProps> = (props) => {
    const { name, vimeoID, releaseDate, organizations, actors } = props;

    return (
        <Page
            metaTitle="Dare2Have Nerve Fundraiser"
            metaDescription="Say something cool here"
        >
            <Box className="app-content" py={20}>
                {name}
                <Video vimeoID={vimeoID} />
            </Box>
        </Page>
    );
};

const singlePerformanceQuery = `*[_type == "performance" && slug.current == $slug][0]{

    name,
    releaseDate,
    vimeoID,
    organizations[]->{
        name,
        "logo": logo.asset._ref,
        primaryColor,
        description,
        website,
        ein
    },
    actors[]->{
        name
    }
}`;

Performance.getInitialProps = async (context) => {
    // It's important to default the slug so that it doesn't return "undefined"
    const { slug = '' } = context.query;
    const results = await sanityClient.fetch(singlePerformanceQuery, { slug });
    return results ?? { slug };
};

type Organization = {
    name: string;
    logo: string;
    primaryColor: string;
    description: string;
    website: string;
    ein: string;
};

type Actor = {
    name: string;
};

interface PerformanceProps {
    name: string;
    vimeoID: string;
    releaseDate: string;
    logo: string;
    organizations: Organization[];
    actors: Actor[];
}

export default Performance;
