export const CollabIcon: React.FC<{ size: number; className?: string }> = ({ size, className }) => {
    return (
        <svg
            className={className}
            fill="none"
            width={size}
            height={size}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
        >
            <path
                d="M506 254c0 135.31-111.033 245-248 245-136.967 0-248-109.69-248-245S121.033 9 258 9c136.967 0 248 109.69 248 245z" // eslint-disable-line
                fill="url(#paint0_linear)"
            />
            <path
                d="M506 254c0 135.31-111.033 245-248 245-136.967 0-248-109.69-248-245S121.033 9 258 9c136.967 0 248 109.69 248 245z" // eslint-disable-line
                stroke="#F95825"
            />
            <path stroke="#000" strokeWidth="11" d="M381.07 70.889l-309 309M432.889 115.07l-315 315" />
            <circle cx="163" cy="202" r="56" fill="#000" stroke="#000" strokeWidth="8" />
            <circle cx="160" cy="198" r="51" fill="#FB5634" />
            <circle
                cx="355.853"
                cy="282.853"
                r="56"
                transform="rotate(135 355.853 282.853)"
                fill="#000"
                stroke="#000"
                strokeWidth="8"
            />
            <circle cx="360.803" cy="283.56" r="51" transform="rotate(135 360.803 283.56)" fill="#F65A19" />
            <defs>
                <linearGradient
                    id="paint0_linear"
                    x1="507.5"
                    y1="250.5"
                    x2="10.099"
                    y2="259.477"
                    gradientUnits="userSpaceOnUse"
                >
                    <stop stopColor="#F25C05" />
                    <stop offset="1" stopColor="#FF5349" />
                </linearGradient>
            </defs>
        </svg>
    );
};
