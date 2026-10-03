import React from 'react';

interface PieceProps {
  type: 'p' | 'n' | 'b' | 'r' | 'q' | 'k';
  color: 'w' | 'b';
  className?: string;
}

/**
 * Tournament-grade Staunton Vector Chess Pieces
 * Designed with precision curves, authentic proportions, and 3D tactile elevation
 * matching top-tier competitive chess websites (Chess.com / Lichess standards).
 */
export const ChessPiece: React.FC<PieceProps> = ({ type, color, className = "w-full h-full" }) => {
  const isWhite = color === 'w';

  // Realistic tournament styling tokens
  const shadowFilter = isWhite
    ? "drop-shadow(0 2px 2.5px rgba(0, 0, 0, 0.42))"
    : "drop-shadow(0 2px 2.5px rgba(0, 0, 0, 0.65))";

  const whiteFill = "#FFFFFF";
  const whiteStroke = "#1E232F";
  const blackFill = "#212631";
  const blackStroke = "#11141C";
  const blackHighlight = "#E2E8F0";

  switch (type.toLowerCase()) {
    case 'p': // PAWN
      return isWhite ? (
        <svg
          viewBox="0 0 45 45"
          className={className}
          style={{ filter: shadowFilter }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 l 23,0 c 0,-7.92 -4.41,-12.41 -7.41,-13.47 C 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z"
            fill={whiteFill}
            stroke={whiteStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ) : (
        <svg
          viewBox="0 0 45 45"
          className={className}
          style={{ filter: shadowFilter }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="m 22.5,9 c -2.21,0 -4,1.79 -4,4 0,0.89 0.29,1.71 0.78,2.38 C 17.33,16.5 16,18.59 16,21 c 0,2.03 0.94,3.84 2.41,5.03 C 15.41,27.09 11,31.58 11,39.5 l 23,0 c 0,-7.92 -4.41,-12.41 -7.41,-13.47 C 28.06,24.84 29,23.03 29,21 29,18.59 27.67,16.5 25.72,15.38 26.21,14.71 26.5,13.89 26.5,13 c 0,-2.21 -1.79,-4 -4,-4 z"
            fill={blackFill}
            stroke={blackStroke}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Black Pawn Ivory Specular Highlight */}
          <path
            d="m 22.5,10 c -1.65,0 -3,1.35 -3,3 0,0.5 0.15,1 0.45,1.4 C 18.5,15.3 17.5,17.2 17.5,19.5"
            fill="none"
            stroke={blackHighlight}
            strokeWidth="1.2"
            strokeLinecap="round"
            opacity="0.45"
          />
        </svg>
      );

    case 'n': // KNIGHT
      return isWhite ? (
        <svg
          viewBox="0 0 45 45"
          className={className}
          style={{ filter: shadowFilter }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd" stroke={whiteStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="m 22,10 c 10.5,1 16.5,8 16,29 l -23,0 c 0,-9 10,-6.5 8,-21"
              fill={whiteFill}
            />
            <path
              d="m 24,18 c 0.38,2.91 -5.55,7.37 -8,9 -3,2 -2.82,4.34 -5,4 -1.042,-0.94 1.41,-4.04 3,-6 2.05,-2.53 3.13,-5.74 3,-9 0.69,0.36 1.94,0.36 2.5,-0.5 0.56,-0.86 0.19,-1.86 -0.5,-2.5 -0.69,-0.64 -1.5,-0.64 -2.5,-0.5 -1.03,0.14 -1.97,0.78 -2.5,1.5 -1.25,1.72 -1.25,4.72 -1,6.5 -0.83,0.33 -1.67,0.67 -2.5,1 -0.5,0.2 -1,0.4 -1.5,0.6 C 4,23 3.5,21.5 4,19 4.5,16.5 7,14 10,12 c 3,-2 7,-3 12,-2 z"
              fill={whiteFill}
            />
            {/* Eye */}
            <circle cx="9.5" cy="25.5" r="1" fill={whiteStroke} />
            {/* Mane & Jaw accents */}
            <path d="M 15 15.5 A 0.5 1.5 0 1 1 14 15.5 A 0.5 1.5 0 1 1 15 15.5 z" transform="matrix(0.866,0.5,-0.5,0.866,9.693,-5.173)" fill={whiteStroke} />
          </g>
        </svg>
      ) : (
        <svg
          viewBox="0 0 45 45"
          className={className}
          style={{ filter: shadowFilter }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd" stroke={blackStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path
              d="m 22,10 c 10.5,1 16.5,8 16,29 l -23,0 c 0,-9 10,-6.5 8,-21"
              fill={blackFill}
            />
            <path
              d="m 24,18 c 0.38,2.91 -5.55,7.37 -8,9 -3,2 -2.82,4.34 -5,4 -1.042,-0.94 1.41,-4.04 3,-6 2.05,-2.53 3.13,-5.74 3,-9 0.69,0.36 1.94,0.36 2.5,-0.5 0.56,-0.86 0.19,-1.86 -0.5,-2.5 -0.69,-0.64 -1.5,-0.64 -2.5,-0.5 -1.03,0.14 -1.97,0.78 -2.5,1.5 -1.25,1.72 -1.25,4.72 -1,6.5 -0.83,0.33 -1.67,0.67 -2.5,1 -0.5,0.2 -1,0.4 -1.5,0.6 C 4,23 3.5,21.5 4,19 4.5,16.5 7,14 10,12 c 3,-2 7,-3 12,-2 z"
              fill={blackFill}
            />
            {/* Piercing white eye & mane details */}
            <circle cx="9.5" cy="25.5" r="1" fill={blackHighlight} />
            <path
              d="m 14.5,15.5 c 1.5,1.5 3,3.5 3,6.5"
              stroke={blackHighlight}
              strokeWidth="1.2"
              opacity="0.6"
            />
            <path
              d="m 24.5,23 c 1.5,3 3,7 2,12"
              stroke={blackHighlight}
              strokeWidth="1.2"
              opacity="0.4"
            />
          </g>
        </svg>
      );

    case 'b': // BISHOP
      return isWhite ? (
        <svg
          viewBox="0 0 45 45"
          className={className}
          style={{ filter: shadowFilter }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd" stroke={whiteStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <g fill={whiteFill} strokeLinecap="butt">
              <path d="m 9,36 c 3.39,-0.97 10.11,0.43 13.5,-2 3.39,2.43 10.11,1.03 13.5,2 0,0 1.65,0.54 3,2 -0.68,0.97 -1.65,0.99 -3,1 -3.39,-0.21 -10.11,0.35 -13.5,-0.5 -3.39,0.85 -10.11,0.29 -13.5,0.5 -1.35,-0.01 -2.32,-0.03 -3,-1 1.35,-1.46 3,-2 3,-2 z" />
              <path d="m 15,32 c 2.5,2.5 12.5,2.5 15,0 0.5,-1.5 0,-2 0,-2 0,-2.5 -2.5,-4 -2.5,-4 5.5,-1.5 6,-11.5 -5,-15.5 -11,4 -10.5,14 -5,15.5 0,0 -2.5,1.5 -2.5,4 0,0 -0.5,0.5 0,2 z" />
              <path d="m 25,8 a 2.5,2.5 0 1 1 -5,0 2.5,2.5 0 1 1 5,0 z" />
            </g>
            <path d="m 17.5,26 c 0,0 2.5,2 5,2 2.5,0 5,-2 5,-2" />
            <path d="m 20,17 5,0" />
            <path d="m 22.5,14.5 0,5" />
          </g>
        </svg>
      ) : (
        <svg
          viewBox="0 0 45 45"
          className={className}
          style={{ filter: shadowFilter }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd" stroke={blackStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <g fill={blackFill} strokeLinecap="butt">
              <path d="m 9,36 c 3.39,-0.97 10.11,0.43 13.5,-2 3.39,2.43 10.11,1.03 13.5,2 0,0 1.65,0.54 3,2 -0.68,0.97 -1.65,0.99 -3,1 -3.39,-0.21 -10.11,0.35 -13.5,-0.5 -3.39,0.85 -10.11,0.29 -13.5,0.5 -1.35,-0.01 -2.32,-0.03 -3,-1 1.35,-1.46 3,-2 3,-2 z" />
              <path d="m 15,32 c 2.5,2.5 12.5,2.5 15,0 0.5,-1.5 0,-2 0,-2 0,-2.5 -2.5,-4 -2.5,-4 5.5,-1.5 6,-11.5 -5,-15.5 -11,4 -10.5,14 -5,15.5 0,0 -2.5,1.5 -2.5,4 0,0 -0.5,0.5 0,2 z" />
              <path d="m 25,8 a 2.5,2.5 0 1 1 -5,0 2.5,2.5 0 1 1 5,0 z" />
            </g>
            {/* White cross & collar detail */}
            <path d="m 17.5,26 c 0,0 2.5,2 5,2 2.5,0 5,-2 5,-2" stroke={blackHighlight} />
            <path d="m 20,17 5,0" stroke={blackHighlight} />
            <path d="m 22.5,14.5 0,5" stroke={blackHighlight} />
          </g>
        </svg>
      );

    case 'r': // ROOK
      return isWhite ? (
        <svg
          viewBox="0 0 45 45"
          className={className}
          style={{ filter: shadowFilter }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill={whiteFill} stroke={whiteStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m 9,39 27,0 c 0,-3 -3,-3 -3,-3 l -21,0 c 0,0 -3,0 -3,3 z" />
            <path d="m 12,36 1.5,-21 18,0 1.5,21 z" />
            <path d="m 11,14 23,0 0,-5 -4,0 0,2 -3.5,0 0,-2 -4,0 0,2 -3.5,0 0,-2 -4,0 z" />
            <path d="m 12,35.5 21,0" fill="none" strokeWidth="1" />
            <path d="m 13,31.5 19,0" fill="none" strokeWidth="1" />
            <path d="m 14,27.5 17,0" fill="none" strokeWidth="1" />
          </g>
        </svg>
      ) : (
        <svg
          viewBox="0 0 45 45"
          className={className}
          style={{ filter: shadowFilter }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill={blackFill} stroke={blackStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m 9,39 27,0 c 0,-3 -3,-3 -3,-3 l -21,0 c 0,0 -3,0 -3,3 z" />
            <path d="m 12,36 1.5,-21 18,0 1.5,21 z" />
            <path d="m 11,14 23,0 0,-5 -4,0 0,2 -3.5,0 0,-2 -4,0 0,2 -3.5,0 0,-2 -4,0 z" />
            {/* Crenellation and masonry accent lines */}
            <path d="m 12,35.5 21,0" fill="none" stroke={blackHighlight} strokeWidth="1" opacity="0.6" />
            <path d="m 13,31.5 19,0" fill="none" stroke={blackHighlight} strokeWidth="1" opacity="0.6" />
            <path d="m 14,27.5 17,0" fill="none" stroke={blackHighlight} strokeWidth="1" opacity="0.4" />
          </g>
        </svg>
      );

    case 'q': // QUEEN
      return isWhite ? (
        <svg
          viewBox="0 0 45 45"
          className={className}
          style={{ filter: shadowFilter }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill={whiteFill} stroke={whiteStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m 9,26 c 8.5,-1.5 21,-1.5 27,0 l 2,-12 -7,11 -4,-15 -4.5,15 -4.5,-15 -4,15 -7,-11 2,12 z" />
            <path d="m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1.5,2.5 -1.5,2.5 -1.5,1.5 0.5,2.5 0.5,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0.5,-2.5 0,0 0,-1.5 -1.5,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z" />
            <circle cx="6" cy="12" r="2" />
            <circle cx="14" cy="9" r="2" />
            <circle cx="22.5" cy="8" r="2" />
            <circle cx="31" cy="9" r="2" />
            <circle cx="39" cy="12" r="2" />
            <path d="m 11.5,30 c 3.5,-1 18.5,-1 22,0" fill="none" />
            <path d="m 12,33.5 c 6,-1 15,-1 21,0" fill="none" />
          </g>
        </svg>
      ) : (
        <svg
          viewBox="0 0 45 45"
          className={className}
          style={{ filter: shadowFilter }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill={blackFill} stroke={blackStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m 9,26 c 8.5,-1.5 21,-1.5 27,0 l 2,-12 -7,11 -4,-15 -4.5,15 -4.5,-15 -4,15 -7,-11 2,12 z" />
            <path d="m 9,26 c 0,2 1.5,2 2.5,4 1,1.5 1,1 0.5,3.5 -1.5,1 -1.5,2.5 -1.5,2.5 -1.5,1.5 0.5,2.5 0.5,2.5 6.5,1 16.5,1 23,0 0,0 1.5,-1 0.5,-2.5 0,0 0,-1.5 -1.5,-2.5 -0.5,-2.5 -0.5,-2 0.5,-3.5 1,-2 2.5,-2 2.5,-4 -8.5,-1.5 -18.5,-1.5 -27,0 z" />
            <circle cx="6" cy="12" r="2" />
            <circle cx="14" cy="9" r="2" />
            <circle cx="22.5" cy="8" r="2" />
            <circle cx="31" cy="9" r="2" />
            <circle cx="39" cy="12" r="2" />
            {/* Crown jewel accents */}
            <path d="m 11.5,30 c 3.5,-1 18.5,-1 22,0" fill="none" stroke={blackHighlight} opacity="0.6" />
            <path d="m 12,33.5 c 6,-1 15,-1 21,0" fill="none" stroke={blackHighlight} opacity="0.6" />
          </g>
        </svg>
      );

    case 'k': // KING
      return isWhite ? (
        <svg
          viewBox="0 0 45 45"
          className={className}
          style={{ filter: shadowFilter }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd" stroke={whiteStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m 22.5,11.63 0,-4.63" />
            <path d="m 20,9 5,0" />
            <path
              d="m 22.5,25 c 0,0 4.5,-7.5 3,-10.5 -1.5,-3 -6.5,-3 -8,0 -1.5,3 3,10.5 3,10.5"
              fill={whiteFill}
            />
            <path
              d="m 11.5,37 c 5.5,3.5 16.5,3.5 22,0 0,-4 -3.5,-5.5 -3.5,-5.5 0,0 -1.5,-1 -2.5,-2 -1,-1 -1,-1.5 0,-2.5 1,-1 2.5,-2 2.5,-2 0,0 -4.5,-2.5 -7.5,-2.5 -3,0 -7.5,2.5 -7.5,2.5 0,0 1.5,1 2.5,2 1,1 1,1.5 0,2.5 -1,1 -2.5,2 -2.5,2 0,0 -3.5,1.5 -3.5,5.5 z"
              fill={whiteFill}
            />
            <path d="m 12,38 21,0" />
            <path d="m 11,35.5 23,0" />
          </g>
        </svg>
      ) : (
        <svg
          viewBox="0 0 45 45"
          className={className}
          style={{ filter: shadowFilter }}
          xmlns="http://www.w3.org/2000/svg"
        >
          <g fill="none" fillRule="evenodd" stroke={blackStroke} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="m 22.5,11.63 0,-4.63" stroke={blackHighlight} />
            <path d="m 20,9 5,0" stroke={blackHighlight} />
            <path
              d="m 22.5,25 c 0,0 4.5,-7.5 3,-10.5 -1.5,-3 -6.5,-3 -8,0 -1.5,3 3,10.5 3,10.5"
              fill={blackFill}
            />
            <path
              d="m 11.5,37 c 5.5,3.5 16.5,3.5 22,0 0,-4 -3.5,-5.5 -3.5,-5.5 0,0 -1.5,-1 -2.5,-2 -1,-1 -1,-1.5 0,-2.5 1,-1 2.5,-2 2.5,-2 0,0 -4.5,-2.5 -7.5,-2.5 -3,0 -7.5,2.5 -7.5,2.5 0,0 1.5,1 2.5,2 1,1 1,1.5 0,2.5 -1,1 -2.5,2 -2.5,2 0,0 -3.5,1.5 -3.5,5.5 z"
              fill={blackFill}
            />
            <path d="m 12,38 21,0" stroke={blackHighlight} opacity="0.6" />
            <path d="m 11,35.5 23,0" stroke={blackHighlight} opacity="0.6" />
          </g>
        </svg>
      );

    default:
      return null;
  }
};
