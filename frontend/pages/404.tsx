import { Box, Container, Typography } from '@material-ui/core';

import { Page } from '@/components';

export default function NotFound() {
    return (
        <Page metaTitle="Page not found" metaDescription="Say something cool here">
            <Box className="app-content" py={20}>
                Page Not Found
            </Box>
        </Page>
    );
}
