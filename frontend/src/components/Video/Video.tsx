import React from 'react';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Box, CircularProgress, Typography } from '@material-ui/core';
import { Lock } from '@material-ui/icons';

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

export const Video: React.FC<VideoProps> = ({ vimeoID, isLocked }) => {
    const progressClasses = progressStyles();

    return (
        <div className={styles.video}>
            <Box className={progressClasses.root} textAlign="center">
                {!isLocked ? (
                    <>
                        <CircularProgress color="primary" size={50} />
                        <Box mt={5} color="text.disabled">
                            <Typography variant="body1">Awesomeness loading...</Typography>
                        </Box>
                    </>
                ) : (
                    <>
                        <Lock color="primary" />
                        <Box mt={5} color="text.disabled">
                            <Typography variant="body1">This video is currently locked</Typography>
                        </Box>
                    </>
                )}
            </Box>

            {!isLocked && (
                <iframe
                    title="performance"
                    src={`https://player.vimeo.com/video/${vimeoID}`}
                    width="640"
                    height="360"
                    frameBorder="0"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                />
            )}
        </div>
    );
};

export interface VideoProps {
    vimeoID: string;
    isLocked: boolean;
}
