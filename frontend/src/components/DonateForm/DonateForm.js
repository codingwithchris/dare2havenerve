import Head from 'next/head';
import { isSSR } from '../../__lib__/ssr';
import styles from './DonateForm.module.css';

// In JS to avoid typechecking
export const DonateForm = () => {
    return (
        <>
            <Head>{!isSSR && <script src="https://donorbox.org/widget.js" paypalExpress="true" />}</Head>
            <div className={styles.donateForm}>
                <iframe
                    title="donate"
                    allowpaymentrequest=""
                    frameBorder="0"
                    height="900px"
                    name="donorbox"
                    seamless="seamless"
                    scrolling="no"
                    src="https://donorbox.org/embed/dare2havenerve-fundraiser"
                    style={{
                        maxWidth: '425px',
                        minWidth: '250px',
                        maxHeight: 'none !important',
                    }}
                    width="100%"
                />
            </div>
        </>
    );
};
