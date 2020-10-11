import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, CircularProgress, Typography } from '@material-ui/core';

import styles from './Video.module.css';

const progressStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,

            [theme.breakpoints.down('sm')]: {},
        },
    })
);

export const Video: React.FC<VideoProps> = ({ vimeoID }) => {
    const progressClasses = progressStyles();

    return (
        <div className={styles.video}>
            <Box className={progressClasses.root} textAlign="center">
                <CircularProgress color="primary" size={50} />
                <Box mt={5} color="text.disabled">
                    <Typography variant="body1">Collaborative awesomeness loading...</Typography>
                </Box>
            </Box>

            <iframe
                title="performance"
                src={`https://player.vimeo.com/video/${vimeoID}`}
                width="640"
                height="360"
                frameBorder="0"
                allow="autoplay; fullscreen"
                allowFullScreen
            />
        </div>
    );
};

export interface VideoProps {
    vimeoID: string;
}
