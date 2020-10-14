import { NextPage } from 'next';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import sanityClient from '@/lib/client';
import { isPast } from 'date-fns';
import { NERVE_WEBSITE, D2D_WEBSITE } from '@/lib/constants';

import {
    Avatar,
    Box,
    Badge,
    Button,
    Card,
    CardContent,
    CardMedia,
    Container,
    Divider,
    Grid,
    Paper,
    Tooltip,
    Typography,
} from '@material-ui/core';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

import { ArrowForwardRounded, ArrowBackRounded } from '@material-ui/icons';
import { AccentTitle, CollabIcon, Page, DonateForm, Video } from '@/components';
import { getCurrentRootURL } from '@/lib/url';

const navStyles = makeStyles((theme: Theme) =>
    createStyles({
        icon: {
            [theme.breakpoints.down('sm')]: {
                height: '36px',
                width: '36px',
            },
        },
    })
);

const heroStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.down('sm')]: {
                paddingTop: theme.spacing(7),
                paddingBottom: theme.spacing(7),
            },
        },
    })
);

const videoStyles = makeStyles((theme: Theme) =>
    createStyles({
        credits: {},
        creditsItem: {
            display: 'flex',
            alignItems: 'center',
            padding: theme.spacing(3),
        },
        creditsItemAvatar: {
            marginRight: theme.spacing(2),
        },
        creditsItemContent: {},
        creditsContainer: {
            marginTop: theme.spacing(6),
        },
        orgsTitle: {
            textAlign: 'center',
            marginBottom: theme.spacing(3),
        },
        orgsAvatarGroup: {
            justifyContent: 'center',
        },
        orgsAvatar: {
            borderRadius: '50%',
        },
    })
);

const donateStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            [theme.breakpoints.down('sm')]: {
                paddingTop: theme.spacing(8),
                paddingBottom: theme.spacing(8),
            },
        },
        instructions: {
            [theme.breakpoints.up('md')]: {
                flex: '1',
            },
            [theme.breakpoints.down('sm')]: {
                marginBottom: theme.spacing(3),
            },
        },
        form: {
            [theme.breakpoints.up('md')]: {
                flex: '1',
            },
        },
    })
);

const sponsorStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            display: 'flex',
            alignItems: 'stretch',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
            },
        },
        cardMediaWrapper: {
            background: theme.palette.common.white,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 0,
            marginLeft: 'auto',
        },
        cardMedia: {
            padding: theme.spacing(3),
            width: '300px',
            [theme.breakpoints.down('sm')]: {
                margin: '0 auto',
                maxWidth: '250px',
                marginTop: theme.spacing(3),
                marginBottom: theme.spacing(3),

                width: '100%',
            },
        },
        cardContent: {
            padding: theme.spacing(2),
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
        },
        dividerVertical: {
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block',
            },
        },
        dividerHorizontal: {
            dispaly: 'none',
            [theme.breakpoints.down('sm')]: {
                display: 'block',
            },
        },
        cardTitle: {},
        cardDescription: {},
    })
);

const PresentingOrgs: React.FC<{ organizations: Organization[] }> = ({ organizations }) => {
    const videoClasses = videoStyles();
    return (
        <Box>
            <Box color="text.disabled" className={videoClasses.orgsTitle}>
                <Typography variant="h6">
                    {organizations?.length > 1 ? 'Featured Theatres' : 'Featured Theatre'}
                </Typography>
            </Box>
            <AvatarGroup max={2} className={videoClasses.orgsAvatarGroup}>
                {organizations.map((org) => (
                    <Box key={org.name} className={videoClasses.orgsAvatar}>
                        <Box clone style={{ width: '100px', height: '100px' }} border={`2px solid ${org.primaryColor}`}>
                            <Tooltip title={org.name}>
                                <Avatar src={`${org.logo.url}?h=100`} alt={org.logo.alt} />
                            </Tooltip>
                        </Box>
                    </Box>
                ))}
            </AvatarGroup>
        </Box>
    );
};

const PerformancePage: NextPage<PerformanceProps> = ({
    name,
    tldr,
    image,
    vimeoID,
    releaseDate,
    organizations,
    actors,
    sponsors,
    queuePosition,
    totalPerformances,
    sponsorMatch,
    excludeFromCount,
}) => {
    const isReleased = isPast(new Date(releaseDate));

    // logic for 404
    // logic for un-released video date

    const shouldDisplayCount = !excludeFromCount && queuePosition;
    const url = getCurrentRootURL();
    const navClasses = navStyles();
    const heroClasses = heroStyles();
    const videoClasses = videoStyles();
    const donateClasses = donateStyles();
    const sponsorClasses = sponsorStyles();

    return (
        <Page
            metaTitle={`${name} » Dare 2 Have Nerve`}
            metaDescription={`${tldr} Part of the Dare 2 Have Nerve Collaborative Fundraiser between D2D and The Nerve.`} //eslint-disable-line
            url={url}
            imageURL={`${image.url}?h=900`}
            imageAlt={image.alt}
            hideSEO={!isReleased}
        >
            <Box className="content">
                {/* Nav Bar */}
                <Box className="navBar" py={1}>
                    <Container>
                        <Grid container alignItems="center" justify="space-between">
                            <Grid item>
                                <Link href="/" passHref>
                                    <Button
                                        variant="text"
                                        color="default"
                                        startIcon={<ArrowBackRounded />}
                                        size="small"
                                    >
                                        All Videos
                                    </Button>
                                </Link>
                            </Grid>
                            <Grid item style={{ lineHeight: 0 }}>
                                <CollabIcon className={navClasses.icon} size={48} />
                            </Grid>

                            {shouldDisplayCount && (
                                <Grid item>
                                    <Box textAlign="right" color="text.disabled" className="count">
                                        <Typography component="p" variant="body1">
                                            Video{' '}
                                            <Box component="span" color="text.primary">
                                                {queuePosition}
                                            </Box>{' '}
                                            / <span className="total">{totalPerformances}</span>
                                        </Typography>
                                    </Box>
                                </Grid>
                            )}
                        </Grid>
                    </Container>
                </Box>
                <Divider />

                {/* Hero */}
                <Container className="hero">
                    <Box py={10} maxWidth="800px" className={heroClasses.root}>
                        <AccentTitle variant="h2" component="h1" brandRep="both">
                            {name}
                        </AccentTitle>

                        <Box mt={3}>
                            <Typography variant="h6" component="p" color="textSecondary">
                                {tldr}
                            </Typography>
                        </Box>
                    </Box>
                </Container>

                {/* Video */}
                <Box>
                    <Container disableGutters>
                        <Video vimeoID={vimeoID} />
                    </Container>
                    <Box mt={10}>
                        <PresentingOrgs organizations={organizations} />
                    </Box>
                </Box>

                {/* Donate Section */}
                <Box pb={15} pt={15} id="dontate" clone className={donateClasses.root}>
                    <Container>
                        {/* Tee Up */}
                        <Box textAlign="center" className="text-gradient" mb={2}>
                            <Typography variant="h5" component="h2">
                                Keep Theatre Alive In Dayton
                            </Typography>
                        </Box>

                        <Box textAlign="center" mb={10} color="text.secondary">
                            <Typography variant="h3" component="h3">
                                Donate To Our Joint Fundraiser
                            </Typography>
                        </Box>

                        <Grid container spacing={3} alignContent="center" alignItems="center">
                            {/* Instructions */}
                            <Grid item xs={12} className={donateClasses.instructions}>
                                <Paper variant="outlined">
                                    <Box p={3} color="text.secondary">
                                        <Box mb={2}>
                                            <Typography>
                                                Theatre may be on pause, but creativity cannot be stopped.
                                            </Typography>
                                        </Box>
                                        <Box mb={2}>
                                            <Typography>
                                                For the very first time,{' '}
                                                <a
                                                    href={D2D_WEBSITE}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="content-link"
                                                >
                                                    D2D
                                                </a>{' '}
                                                and{' '}
                                                <a
                                                    href={NERVE_WEBSITE}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="content-link"
                                                >
                                                    The Nerve
                                                </a>
                                                have built an alliance through creative collaboration.
                                            </Typography>
                                        </Box>
                                        <Box mb={2}>
                                            <Typography>
                                                We've filmed a total of 12 kick-ass videos, but here's the deal:{' '}
                                                <Box component="strong" color="text.primary">
                                                    We need your help
                                                </Box>{' '}
                                                to make the videos available to everyone.
                                            </Typography>
                                        </Box>
                                        <Box mb={2} color="text.primary">
                                            <Typography>
                                                <strong>
                                                    It'll take $150 in donations to unlock each video in the series and
                                                    hit our goal of $1,800
                                                </strong>
                                                .
                                            </Typography>
                                        </Box>

                                        <Box mb={2}>
                                            <Typography>
                                                One donation will help two professional Dayton theatre companies! How
                                                does it get any better than that?
                                            </Typography>
                                        </Box>
                                    </Box>
                                    {sponsorMatch ? (
                                        <>
                                            <Divider />
                                            <Box p={3}>
                                                <Box color="#FF5349" mb={1}>
                                                    <Typography variant="h6">Your support goes further</Typography>
                                                </Box>
                                                <Box color="text.secondary" clone>
                                                    <Typography variant="body1">
                                                        Our sponsors are matching up to{' '}
                                                        <Box component="strong" color="text.primary">
                                                            ${sponsorMatch}
                                                        </Box>{' '}
                                                        in donations for this performance!
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </>
                                    ) : (
                                        ''
                                    )}
                                </Paper>
                            </Grid>

                            {/* Form */}
                            <Grid item xs={12} className={donateClasses.form}>
                                <Box textAlign="center" className="donate">
                                    <DonateForm />
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>

                {/* Sponsors Section */}
                {sponsors?.length > 0 && (
                    <>
                        <Divider />
                        <Box py={15}>
                            <Container maxWidth="md">
                                {/* Tee Up */}
                                <Box textAlign="center" mb={7}>
                                    <Typography variant="h4" component="h2" color="textSecondary">
                                        Donor Match
                                    </Typography>
                                    <Box maxWidth="500px" margin="0 auto" mt={2}>
                                        <Typography variant="subtitle1" component="p" color="textSecondary">
                                            A big thank you to our incredible sponsors for matching donations for this
                                            video.
                                        </Typography>
                                    </Box>
                                </Box>

                                <Grid direction="column" container spacing={3}>
                                    {sponsors.map((sponsor) => (
                                        <Grid key={sponsor.name} item>
                                            <Paper variant="outlined" key={sponsor.name}>
                                                <Card className={sponsorClasses.card}>
                                                    <CardContent className={sponsorClasses.cardContent}>
                                                        <Typography
                                                            component="h6"
                                                            variant="h6"
                                                            className={sponsorClasses.cardTitle}
                                                        >
                                                            {sponsor.name}
                                                        </Typography>
                                                        <Box color="text.disabled" mb={2}>
                                                            <Typography variant="body2" component="p">
                                                                Match: ${sponsor.match}
                                                            </Typography>
                                                        </Box>
                                                        <Typography
                                                            variant="body2"
                                                            color="textSecondary"
                                                            className={sponsorClasses.cardDescription}
                                                        >
                                                            {sponsor.bio}
                                                        </Typography>
                                                        {sponsor.website && (
                                                            <Box mt={2}>
                                                                <Button
                                                                    href={sponsor.website}
                                                                    size="small"
                                                                    variant="text"
                                                                    color="default"
                                                                    target="_blank"
                                                                    rel="noopener noreferrer"
                                                                    endIcon={<ArrowForwardRounded color="action" />}
                                                                >
                                                                    Sponsor Website
                                                                </Button>
                                                            </Box>
                                                        )}
                                                    </CardContent>

                                                    {sponsor.logo && (
                                                        <Box className={sponsorClasses.cardMediaWrapper}>
                                                            <CardMedia
                                                                className={sponsorClasses.cardMedia}
                                                                component="img"
                                                                image={`${sponsor.logo}?h=250`}
                                                            />
                                                        </Box>
                                                    )}
                                                </Card>
                                            </Paper>
                                        </Grid>
                                    ))}
                                </Grid>
                            </Container>
                        </Box>
                    </>
                )}

                <Divider />
                <Box className={videoClasses.creditsContainer} pt={10} pb={14}>
                    <Container maxWidth="md">
                        <Box textAlign="center" mb={7}>
                            <Typography variant="h5" component="h2" color="textSecondary">
                                Production Crew
                            </Typography>
                            <Box maxWidth="500px" margin="0 auto" mt={2} mb={4}>
                                <Typography variant="body1" component="p" color="textSecondary">
                                    We could never have done this on our own. We had an awesome group of people help us
                                    out.
                                </Typography>
                            </Box>
                        </Box>

                        <Grid container spacing={2} className={videoClasses.credits}>
                            <Grid item md={6} sm={12} className={videoClasses.creditsItem}>
                                <Box className={videoClasses.creditsItem}>
                                    <Box className={videoClasses.creditsItemAvatar}>
                                        <AvatarGroup max={2}>
                                            <Avatar
                                                src="/indigo.jpg"
                                                alt="Indigo Life Logo"
                                                style={{ width: '75px', height: '75px' }}
                                            />

                                            <Avatar
                                                src="/andrew.jpg"
                                                alt="Andrew White from Indigo Life"
                                                style={{ width: '75px', height: '75px', marginLeft: '-30px' }}
                                            />
                                        </AvatarGroup>
                                    </Box>
                                    <Box className={videoClasses.creditsItemContent}>
                                        <Typography variant="body2" color="textSecondary">
                                            Andrew White // Indigo Life
                                        </Typography>
                                        <Box color="text.disabled">
                                            <Typography variant="caption">Director of Photography</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item md={6} sm={12} className={videoClasses.creditsItem}>
                                <Box className={videoClasses.creditsItem}>
                                    <Box className={videoClasses.creditsItemAvatar}>
                                        <Avatar
                                            src="/sam.jpg"
                                            alt="Samuel Thompson"
                                            style={{ width: '75px', height: '75px' }}
                                        />
                                    </Box>
                                    <Box className={videoClasses.creditsItemContent}>
                                        <Typography variant="body2" color="textSecondary">
                                            Samuel Thompson
                                        </Typography>
                                        <Box color="text.disabled">
                                            <Typography variant="caption">Sound Technician</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item md={6} sm={12} className={videoClasses.creditsItem}>
                                <Box className={videoClasses.creditsItem}>
                                    <Box className={videoClasses.creditsItemAvatar}>
                                        <Avatar
                                            src="/joe.jpg"
                                            alt="Joseph Swann"
                                            style={{ width: '75px', height: '75px' }}
                                        />
                                    </Box>
                                    <Box className={videoClasses.creditsItemContent}>
                                        <Typography variant="body2" color="textSecondary">
                                            Joseph Swann
                                        </Typography>
                                        <Box color="text.disabled">
                                            <Typography variant="caption">2nd Camera Op & PA</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                            <Grid item md={6} sm={12} className={videoClasses.creditsItem}>
                                <Box className={videoClasses.creditsItem}>
                                    <Box className={videoClasses.creditsItemAvatar}>
                                        <Avatar
                                            style={{ width: '75px', height: '75px' }}
                                            src="/josh.jpg"
                                            alt="Josh Burnette"
                                        />
                                    </Box>
                                    <Box className={videoClasses.creditsItemContent}>
                                        <Typography variant="body2" color="textSecondary">
                                            Josh Burnette
                                        </Typography>
                                        <Box color="text.disabled">
                                            <Typography variant="caption">Post Production Sound Engineer</Typography>
                                        </Box>
                                    </Box>
                                </Box>
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            </Box>
        </Page>
    );
};

const singlePerformanceQuery = `*[_type == "performance" && slug.current == $slug][0]{
    name,
    tldr,
    excludeFromCount,
    releaseDate,
    vimeoID,
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
    },
    actors[]->{
        name
    },
    sponsors[]->{
        name,
        bio,
        "logo": logo.asset->url,
        website,
        match
    }
}`;

const allPerformancesQuery = `*[_type == "performance" && excludeFromCount != true] | order(releaseDate asc)`;

PerformancePage.getInitialProps = async (context) => {
    // It's important to default the slug so that it doesn't return "undefined"
    const { slug = '' } = context.query;
    const getSinglePerformance = sanityClient.fetch(singlePerformanceQuery, {
        slug,
    });
    const getAllPerformances = sanityClient.fetch(allPerformancesQuery, {});
    const [singlePerformance, performances] = await Promise.all([getSinglePerformance, getAllPerformances]);

    // How many performances are there?
    const totalPerformances = performances.length;

    // Video X of X (where in the queue was this video released)
    const queuePosition: number | undefined = singlePerformance.excludeFromCount
        ? undefined
        : performances.findIndex((performance: any) => performance.slug.current === slug) + 1;

    let sponsorMatch = 0; //eslint-disable-line
    singlePerformance.sponsors?.forEach((sponsor: Sponsor) => (sponsorMatch += parseInt(sponsor.match)));

    return singlePerformance
        ? {
              ...singlePerformance,
              slug,
              queuePosition,
              totalPerformances,
              sponsorMatch,
          }
        : {};
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

type Performance = {
    name: string;
    tldr: string;
    vimeoID: string;
    releaseDate: string;
    excludeFromCount: boolean;
    logo: string;
    organizations: Organization[];
    actors: Actor[];
    sponsors: Sponsor[];
    image: {
        url: string;
        alt: string;
    };
};

interface PerformanceProps extends Performance {
    slug: string;
    queuePosition: number;
    totalPerformances: number;
    sponsorMatch: number;
}

export default PerformancePage;
