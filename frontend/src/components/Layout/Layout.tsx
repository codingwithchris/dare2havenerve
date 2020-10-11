import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

import styles from './Layout.module.css';

export const Layout: React.FC = ({ children }) => {
    return (
        <>
            <div className={styles.colorBar} />
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};
