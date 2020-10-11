import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { theme } from '@/theme';

import 'fontsource-inter/400-normal.css';
import 'fontsource-inter/600-normal.css';
import 'fontsource-inter/900-normal.css';

import '../assets/global.css';

import { Layout, Progress } from '@/components';

export default function CustomApp(props: AppProps): JSX.Element {
    const { Component, pageProps } = props;

    React.useEffect(() => {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement?.removeChild(jssStyles);
        }
    }, []);

    return (
        <>
            <Head>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
                <link rel="apple-touch-icon" sizes="180x180" href="/site-icons/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/site-icons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/site-icons/favicon-16x16.png" />
                <link rel="manifest" href="/site-icons/site.webmanifest" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />

                <Layout>
                    <Progress />
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </>
    );
}
