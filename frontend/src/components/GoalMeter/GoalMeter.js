import Head from 'next/head';
import { isSSR } from '../../__lib__/ssr';

export const GoalMeter = () => {
    <Head>{!isSSR && <script src="https://donorbox.org/widget.js" paypalExpress="true" />}</Head>;

    return (
        <div className="">
            <iframe
                title="goalMeter"
                frameBorder="0"
                height="93px"
                name="donorbox"
                scrolling="no"
                seamless="seamless"
                src="https://donorbox.org/embed/dare2havenerve-fundraiser?donation_meter_color=%23FF5349&amp;only_donation_meter=true" // eslint-disable-line
                style={{
                    width: '100%',
                    minWidth: '250px',
                    maxHeight: 'none! important',
                }}
                width="100%"
            />
        </div>
    );
};
