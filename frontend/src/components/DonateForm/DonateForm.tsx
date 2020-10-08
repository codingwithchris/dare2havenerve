import Head from 'next/head';
import styles from './DonateForm.module.css';

export const DonateForm: React.FC = () => {
    return (
        <>
            <Head>
                <script
                    src="https://donorbox.org/widget.js"
                    paypalExpress="true"
                />
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
                    src="https://donorbox.org/embed/dare2havenerve-fundraiser"
                    style={{
                        maxWidth: '500px',
                        minWidth: '250px',
                        maxHeight: 'none !important',
                    }}
                    width="100%"
                />
            </div>
        </>
    );
};
