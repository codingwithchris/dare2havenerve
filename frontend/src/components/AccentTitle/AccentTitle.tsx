import { Box, Typography, TypographyProps } from '@material-ui/core';
import classnames from 'classnames';
import styles from './AccentTitle.module.css';

export const AccentTitle: React.FC<AccentTitleProps> = (props) => {
    const { brandRep, className, ...others } = props;

    const classNames = classnames(
        styles.title,
        { [styles.titleNerve]: brandRep === 'nerve' },
        { [styles.titleD2D]: brandRep === 'd2d' },
        { [styles.titleBoth]: brandRep === 'both' },
        className
    );

    return (
        <Box className={classNames} clone>
            <Typography {...others} />
        </Box>
    );
};

export interface AccentTitleProps extends TypographyProps {
    brandRep: 'nerve' | 'd2d' | 'both';
}
