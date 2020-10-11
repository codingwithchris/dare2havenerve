import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import sanityClient from '@/lib/client';
import classnames from 'classnames';
import LockIcon from '@material-ui/icons/Lock';

import { isPast } from 'date-fns';

import {
    Box,
    Button,
    Card,
    CardMedia,
    CardActionArea,
    CardContent,
    Container,
    Divider,
    Grid,
    Paper,
    Typography,
} from '@material-ui/core';

import { AccentTitle, Page } from '@/components';
import { NERVE_WEBSITE, D2D_WEBSITE } from '@/lib/constants';
import { getCurrentRootURL } from '@/lib/url';
import { relative } from 'path';

const gridStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {},
        item: {},
    })
);

const cardStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            alignItems: 'flex-start',
        },
        action: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            alignItems: 'flex-start',
            flex: '1',
        },
        link: {
            flex: '1',
            textDecoration: 'none',
            display: 'block',
            width: '100%',
        },
        unlocked: {},
        content: {},
        media: {},
        locked: {
            position: 'relative',
        },
        lockedIcon: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
        },
        lockedMedia: {
            filter: 'grayscale(0.5)',
        },
    })
);

const UnlockedCard: React.FC<Pick<Performance, 'name' | 'releaseDate' | 'slug' | 'image' | 'organizations'>> = ({
    name,
    releaseDate,
    slug,
    image,
    organizations,
}) => {
    const cardClasses = cardStyles();

    return (
        <Card className={cardClasses.root}>
            <CardActionArea className={cardClasses.action}>
                <Link href={`/p/${slug}`}>
                    <a className={cardClasses.link}>
                        <CardMedia className={cardClasses.media} image={`${image}?h=225`} component="img" />
                        <CardContent className={cardClasses.content}>
                            <Box color="text.secondary">
                                <Typography variant="body2">
                                    <strong>{name}</strong>
                                </Typography>
                            </Box>
                        </CardContent>
                    </a>
                </Link>
            </CardActionArea>
        </Card>
    );
};

const LockedCard: React.FC<Pick<Performance, 'name' | 'releaseDate' | 'slug' | 'image' | 'organizations'>> = ({
    name,
    releaseDate,
    slug,
    image,
    organizations,
}) => {
    const cardClasses = cardStyles();

    return (
        <Card className={cardClasses.root}>
            <Box className={cardClasses.locked}>
                <Box className={cardClasses.lockedIcon}>
                    <LockIcon color="primary" style={{ fontSize: 50 }} />
                </Box>
                <CardMedia className={cardClasses.lockedMedia} image={`${image}?h=225&blur=100`} component="img" />
            </Box>
            <CardContent className={cardClasses.content}>
                <Box color="text.disabled">
                    <Typography variant="body2">
                        This video is locked. Help unlock it by donating on one of our available videos.
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    );
};

const HomePage: NextPage<PerformanceProps> = ({ performances }) => {
    const gridClasses = gridStyles();
    const url = getCurrentRootURL();

    return (
        <Page metaTitle="Dare2Have Nerve Fundraiser" metaDescription="Say something cool here" url={url}>
            <Box className="content">
                {/* Hero */}
                <Box py={10}>
                    <Container>
                        <Box mb={3}>
                            <AccentTitle brandRep="both" variant="h1">
                                Dare 2 Have Nerve
                            </AccentTitle>
                        </Box>
                        <Box color="text.secondary" mb={7}>
                            <Typography variant="h2">A collaborative variety show fundraiser.</Typography>
                        </Box>
                        <Box color="text.disabled" maxWidth="750px">
                            <Typography variant="body1">
                                D2D and The Nerve have joined forces for the very first time to produce a variety show
                                featuring performers from each of our companies. Expect to see powerhouse musical
                                performances by the D2D ensemble and stellar scene and monologue work by The Nerve
                                actors. Watch and enjoy as our companies showcase the type of work that we ordinarily
                                bring to the stage.
                            </Typography>
                        </Box>
                        <Box mt={7}>
                            <Button className="bg-gradient" href="#performances">
                                Watch The Performances
                            </Button>
                        </Box>
                    </Container>
                </Box>

                <Divider />
                {/* Company Rep */}

                {/* Performance Grid */}
                {performances && (
                    <Box id="performances" py={20}>
                        <Container>
                            <Grid className={gridClasses.container} spacing={3} alignItems="stretch" container>
                                {performances.map((performance) => {
                                    const isReleased = isPast(new Date(performance.releaseDate));
                                    return (
                                        <Grid
                                            className={gridClasses.item}
                                            key={performance.name}
                                            lg={4}
                                            sm={6}
                                            xs={12}
                                            item
                                        >
                                            {isReleased ? (
                                                <UnlockedCard {...performance} />
                                            ) : (
                                                <LockedCard {...performance} />
                                            )}
                                        </Grid>
                                    );
                                })}
                            </Grid>
                        </Container>
                    </Box>
                )}

                <Divider />
                {/* Footer */}
            </Box>
        </Page>
    );
};

const allPerformancesQuery = `*[_type == "performance"] | order(releaseDate asc) {

    name,
    tldr,
    excludeFromCount,
    releaseDate,
    vimeoID,
    "slug": slug.current,
    "image": image.asset->url,
    organizations[]->{
        name,
        "logo": logo.asset._ref,
        primaryColor,
        website,
        ein
    }

}`;

HomePage.getInitialProps = async () => {
    // It's important to default the slug so that it doesn't return "undefined"

    const getAllPerformances = sanityClient.fetch(allPerformancesQuery, {});
    const [performances] = await Promise.all([getAllPerformances]);

    return performances
        ? {
              performances,
          }
        : {
              performances: undefined,
          };
};

type Organization = {
    name: string;
    logo: string;
    primaryColor: string;
    description: string;
    website: string;
    ein: string;
};

type Performance = {
    slug: string;
    name: string;
    tldr: string;
    vimeoID: string;
    releaseDate: string;
    excludeFromCount: boolean;
    image: string;
    organizations: Organization[];
};

interface PerformanceProps {
    performances: Performance[] | undefined;
}

export default HomePage;
