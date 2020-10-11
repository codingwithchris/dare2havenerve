import Head from 'next/head';
import { isSSR } from '@/lib/ssr';
import styles from './DonateForm.module.css';

export const DonateForm: React.FC = () => {
    return (
        <>
            <Head>
                {!isSSR && (
                    <script
                        src="https://donorbox.org/widget.js"
                        paypalExpress="true"
                    />
                )}
            </Head>
            <div className={styles.donateForm}>
                <iframe
                    title="donate"
                    allowpaymentrequest=""
                    frameBorder="0"
                    height="900px"
                    name="donorbox"
                    scrolling="no"
                    seamless="seamless"
                    src="https://donorbox.org/embed/dare2havenerve-fundraiser?donation_meter_color=%2341a2d8"
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
