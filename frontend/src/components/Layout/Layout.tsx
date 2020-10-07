import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';

export const Layout: React.FC = ({ children }) => {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
};
