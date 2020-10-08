// post.js
import { NextPage } from 'next';
import sanityClient from '@/lib/client';

import { isPast } from 'date-fns';

import { Box, Container, Typography } from '@material-ui/core';

import { Page, DonateForm, Video } from '@/components';

const Performance: NextPage<PerformanceProps> = (props) => {
    const {
        name,
        vimeoID,
        releaseDate,
        organizations,
        actors,
        sponsors,
    } = props;

    const isReleased = isPast(new Date(releaseDate));

    // logic for 404
    // logic for un-released video date

    return (
        <Page
            metaTitle="Dare2Have Nerve Fundraiser"
            metaDescription="Say something cool here"
        >
            <Box className="app-content" py={20}>
                {name}
                <Video vimeoID={vimeoID} />
                <DonateForm />
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
    },
    sponsors[]->{
        name,
        bio,
        "logo": logo.asset._ref,
        website,
        match
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

type Sponsor = {
    name: string;
    logo: string;
    bio: string;
    website: string;
    match: string;
};

interface PerformanceProps {
    name: string;
    vimeoID: string;
    releaseDate: string;
    logo: string;
    organizations: Organization[];
    actors: Actor[];
    sponsors: Sponsor[];
}

export default Performance;
