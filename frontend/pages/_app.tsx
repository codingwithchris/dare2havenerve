import React from 'react';
import Head from 'next/head';
import type { AppProps } from 'next/app';
import { AppStateProvider } from '@/context';

import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { theme } from '@/theme';
import 'fontsource-roboto/400-normal.css';
import 'fontsource-roboto/500-normal.css';
import 'fontsource-roboto/700-normal.css';

import { Layout } from '@/components';

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
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                <CssBaseline />
                <AppStateProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </AppStateProvider>
            </ThemeProvider>
        </>
    );
}
