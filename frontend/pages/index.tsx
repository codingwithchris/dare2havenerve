import { NextPage } from 'next';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Link from 'next/link';
import sanityClient from '@/lib/client';
import LockIcon from '@material-ui/icons/Lock';

import { format, isPast } from 'date-fns';
import {
    Avatar,
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
    Tooltip,
    Typography,
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import { AccentTitle, CollabIcon, Page } from '@/components';
import { getCurrentRootURL } from '@/lib/url';

const heroStyles = makeStyles((theme: Theme) =>
    createStyles({
        titleBox: {},
        icon: {},
    })
);

const gridStyles = makeStyles((theme: Theme) =>
    createStyles({
        section: {
            [theme.breakpoints.down('sm')]: {
                paddingTop: theme.spacing(10),
                paddingBottom: theme.spacing(10),
            },
        },
        container: {},
        item: {},
    })
);

const cardStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            border: '1px solid',
            borderColor: theme.palette.divider,
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
        avatarWrapper: {
            position: 'absolute',
            left: 10,
            top: 10,
            zIndex: 10,
        },
        avatar: {
            border: '1px solid',
            borderColor: theme.palette.text.disabled,
            borderRadius: '50%',
        },
        link: {
            flex: '1',
            textDecoration: 'none',
            display: 'block',
            width: '100%',
            position: 'relative',
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

const OrgAvatars: React.FC<{ organizations: Organization[] }> = ({ organizations }) => {
    const cardClasses = cardStyles();
    return (
        <AvatarGroup className={cardClasses.avatarWrapper} max={2}>
            {organizations.map((org) => (
                <Box className={cardClasses.avatar} key={org.name}>
                    <Tooltip title={`Featuring ${org.name}`}>
                        <Avatar src={`${org.logo.url}?h=100`} alt={org.logo.alt} />
                    </Tooltip>
                </Box>
            ))}
        </AvatarGroup>
    );
};

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
                        {organizations?.length > 0 && <OrgAvatars organizations={organizations} />}
                        <CardMedia
                            className={cardClasses.media}
                            image={`${image.url}?h=350`}
                            alt={image.alt}
                            component="img"
                        />
                        <CardContent className={cardClasses.content}>
                            <Box color="text.secondary">
                                <Typography variant="body2">
                                    <strong>{name}</strong>
                                </Typography>
                            </Box>
                            <Box color="text.disabled">
                                <Typography variant="caption">
                                    Release Date: {format(new Date(releaseDate), 'MM.d.y')}
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
                <CardMedia
                    className={cardClasses.lockedMedia}
                    image={`${image.url}?h=350&blur=100&q=50`}
                    alt={image.alt}
                    component="img"
                />
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
    const heroClasses = heroStyles();
    const url = getCurrentRootURL();

    return (
        <Page
            metaTitle="Dare 2 Have Nerve » A Collaborative Fundraiser"
            metaDescription="D2D and The Nerve have joined forces for the very first time to produce a variety show featuring performers from each of our companies." //eslint-disable-line
            url={url}
            imageURL="/dare2have-nerve--meta.jpg"
            imageAlt="Dare 2 Have Nerve Collaborative Fundraiser Graphic"
            hideSEO={false}
        >
            <Box className="content">
                {/* Hero */}
                <Box py={10}>
                    <Container>
                        <Box mb={3} className={heroClasses.titleBox}>
                            <CollabIcon size={100} className={heroClasses.icon} />
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
                                actors. Oh, and expect the fourth wall to be broken as we give you a grittier, behind
                                the scenes look at the filming process. Watch and enjoy as our companies showcase the
                                type of work that we ordinarily bring to the stage.
                            </Typography>
                        </Box>
                        <Box mt={7}>
                            <Button className="bg-gradient" href="#performances">
                                Watch Performances + Donate
                            </Button>
                        </Box>
                    </Container>
                </Box>

                <Divider />
                {/* Company Rep */}

                {/* Performance Grid */}
                {performances && (
                    <Box id="performances" py={20} className={gridClasses.section}>
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
    "image": {
        "url": image.asset->url,
        "alt": image.asset->alt,
    },
    organizations[]->{
        name,
        "logo": {
            "url": logo.asset->url,
            "alt": logo.asset->alt,
        },
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
    logo: {
        alt: string;
        url: string;
    };
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
    image: {
        alt: string;
        url: string;
    };
    organizations: Organization[];
};

interface PerformanceProps {
    performances: Performance[] | undefined;
}

export default HomePage;
