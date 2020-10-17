import { useState, useEffect, useRef } from 'react';
import Skeleton from '@material-ui/lab/Skeleton';

export const Image: React.FC<ImageProps> = ({ src, alt, aspectRatio }) => {
    const [loaded, setLoaded] = useState(false);
    const ref = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const currentImage = ref.current;
        if (currentImage && currentImage.complete) {
            setLoaded(true);
        }
    }, [ref]);

    return (
        <>
            {loaded ? null : (
                <Skeleton variant="rect" width="100%" animation="wave">
                    <div style={{ paddingTop: `calc( 100%/${aspectRatio})` }} />
                </Skeleton>
            )}
            <img
                ref={ref}
                style={loaded ? { width: '100%', objectFit: 'cover' } : { display: 'none' }}
                onLoad={() => setLoaded(true)}
                src={src}
                alt={alt}
            />
        </>
    );
};

interface ImageProps {
    src: string;
    alt: string;
    aspectRatio: number;
}
