import NProgress from 'nprogress';
import Router from 'next/router';

let timeout: any;

const start = () => {
    timeout = setTimeout(NProgress.start, 100);
};

const done = () => {
    clearTimeout(timeout);
    NProgress.done();
};

Router.events.on('routeChangeStart', start);
Router.events.on('routeChangeComplete', done);
Router.events.on('routeChangeError', done);

export const Progress: React.FC = () => {
    return (
        <style jsx global>
            {`
                /* Make clicks pass-through */
                #nprogress {
                    pointer-events: none;
                }
                #nprogress .bar {
                    background: #ffffff;
                    position: fixed;
                    z-index: 1031;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 2px;
                }
                /* Fancy blur effect */
                #nprogress .peg {
                    display: block;
                    position: absolute;
                    right: 0px;
                    width: 100px;
                    height: 100%;
                    box-shadow: 0 0 10px #ffffff, 0 0 5px #ffffff;
                    opacity: 1;
                    -webkit-transform: rotate(3deg) translate(0px, -4px);
                    -ms-transform: rotate(3deg) translate(0px, -4px);
                    transform: rotate(3deg) translate(0px, -4px);
                }
            `}
        </style>
    );
};
