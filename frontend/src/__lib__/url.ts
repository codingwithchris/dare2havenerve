import { isSSR } from './ssr';

/**
 * Return the full current URL path without query strings.
 */
export const getCurrentRootURL = () =>
    isSSR ? `` : `${window.location.protocol}//${window.location.hostname}${window.location.pathname}`;
