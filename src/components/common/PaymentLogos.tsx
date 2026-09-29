import React from 'react';

/**
 * High-Definition Official Brand Vector Logos for Indian & Global Payment Networks:
 * - Razorpay (Official lightning bolt + navy wordmark)
 * - UPI (Unified Payments Interface - NPCI official vector letterforms & dual chevrons)
 * - Visa (Official Visa 2021 wordmark vector)
 * - Mastercard (Official interlocking dual circles with geometric optical lens)
 * - RuPay (Official NPCI RuPay wordmark with dual chevron directional arrows)
 */

const BADGE_BASE_CLASS =
  'h-7 px-2.5 rounded-md bg-white border border-slate-200/90 shadow-sm flex items-center justify-center hover:border-amber-400/60 hover:shadow-md transition-all select-none';

export const RazorpayLogo: React.FC<{ className?: string; containerClassName?: string }> = ({
  className = 'h-3.5',
  containerClassName = BADGE_BASE_CLASS,
}) => (
  <div className={containerClassName} title="Secured by Razorpay India">
    <div className="flex items-center gap-1.5">
      <svg className={`${className} w-auto`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M22.436 0l-11.91 7.773-1.174 4.276 6.625-4.297L11.65 24h4.391l6.395-24zM14.26 10.098L3.389 17.166 1.564 24h9.008l3.688-13.902Z"
          fill="#0C83FD"
        />
      </svg>
      <span className="text-[12px] font-black text-[#072654] font-sans tracking-tight leading-none">
        Razorpay
      </span>
    </div>
  </div>
);

export const UpiLogo: React.FC<{ className?: string; containerClassName?: string }> = ({
  className = 'h-4',
  containerClassName = BADGE_BASE_CLASS,
}) => (
  <div className={containerClassName} title="UPI (Unified Payments Interface - NPCI)">
    <svg className={`${className} w-auto`} viewBox="0 0 131 35" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="matrix(0.35277777,0,0,-0.35277777,-10.926321,61.158633)">
        {/* UPI 'I' */}
        <g transform="translate(316.4629,76.4951)">
          <path d="M 0,0 H -19.283 L 7.535,96.855 h 19.284 z" fill="#092f62" />
        </g>
        {/* UPI 'P' */}
        <g transform="translate(306.4521,170.2881)">
          <path
            d="m 0,0 c -1.337,1.843 -3.399,2.773 -6.2,2.773 h -106.036 l -5.252,-18.97 h 19.294 v 0.011 h 77.169 l -5.614,-20.272 h -77.171 l 0.007,0.042 h -19.286 l -16.007,-57.787 h 19.296 l 10.742,38.786 h 86.746 c 2.709,0 5.259,0.924 7.657,2.772 2.393,1.85 3.968,4.131 4.723,6.855 L 0.809,-6.996 C 1.593,-4.181 1.322,-1.845 0,0"
            fill="#092f62"
          />
        </g>
        {/* UPI 'U' */}
        <g transform="translate(156.1196,82.541)">
          <path
            d="m 0,0 c -1.065,-3.835 -4.557,-6.488 -8.538,-6.488 h -99.491 c -2.711,0 -4.726,0.924 -6.051,2.77 -1.324,1.848 -1.608,4.134 -0.851,6.857 l 24.276,87.387 h 19.301 l -21.683,-78.05 h 77.206 l 21.683,78.05 h 19.297 z"
            fill="#092f62"
          />
        </g>
        {/* Green forward chevron */}
        <g transform="translate(376.5859,173.1689)">
          <path d="m 0,0 24.414,-48.553 -51.322,-48.54 z" fill="#00823c" />
        </g>
        {/* Orange forward chevron */}
        <g transform="translate(359.4717,173.1689)">
          <path d="m 0,0 24.396,-48.553 -51.343,-48.54 z" fill="#ed7524" />
        </g>
      </g>
    </svg>
  </div>
);

export const VisaLogo: React.FC<{ className?: string; containerClassName?: string }> = ({
  className = 'h-4',
  containerClassName = BADGE_BASE_CLASS,
}) => (
  <div className={containerClassName} title="Visa">
    <svg className={`${className} w-auto`} viewBox="0 7.8 24 8.2" fill="#1434CB" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.112 8.262L5.97 15.758H3.92L2.374 9.775c-.094-.368-.175-.503-.461-.658C1.447 8.864.677 8.627 0 8.479l.046-.217h3.3a.904.904 0 01.894.764l.817 4.338 2.018-5.102zm8.033 5.049c.008-1.979-2.736-2.088-2.717-2.972.006-.269.262-.555.822-.628a3.66 3.66 0 011.913.336l.34-1.59a5.207 5.207 0 00-1.814-.333c-1.917 0-3.266 1.02-3.278 2.479-.012 1.079.963 1.68 1.698 2.04.756.367 1.01.603 1.006.931-.005.504-.602.725-1.16.734-.975.015-1.54-.263-1.992-.473l-.351 1.642c.453.208 1.289.39 2.156.398 2.037 0 3.37-1.006 3.377-2.564m5.061 2.447H24l-1.565-7.496h-1.656a.883.883 0 00-.826.55l-2.909 6.946h2.036l.405-1.12h2.488zm-2.163-2.656l1.02-2.815.588 2.815zm-8.16-4.84l-1.603 7.496H8.34l1.605-7.496z" />
    </svg>
  </div>
);

export const MastercardLogo: React.FC<{ className?: string; containerClassName?: string }> = ({
  className = 'h-4.5',
  containerClassName = BADGE_BASE_CLASS,
}) => (
  <div className={containerClassName} title="Mastercard">
    <svg className={`${className} w-auto`} viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Red circle */}
      <circle cx="13" cy="12" r="9.5" fill="#EB001B" />
      {/* Yellow/Amber circle */}
      <circle cx="25" cy="12" r="9.5" fill="#F79E1B" />
      {/* Overlapping intersection */}
      <path d="M 19,4.6 A 9.5,9.5 0 0,0 19,19.4 A 9.5,9.5 0 0,0 19,4.6 Z" fill="#FF5F00" />
    </svg>
  </div>
);

export const RupayLogo: React.FC<{ className?: string; containerClassName?: string }> = ({
  className = 'h-3.5',
  containerClassName = BADGE_BASE_CLASS,
}) => (
  <div className={containerClassName} title="RuPay India (NPCI)">
    <svg className={`${className} w-auto`} viewBox="0 0 72 19" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Green arrow */}
      <g transform="matrix(0.35278,0,0,-0.35278,67.8,1.4)">
        <path fill="#008c44" d="m 0,0 11.488,-22.811 -24.15,-22.822 z" />
      </g>
      {/* Orange arrow */}
      <g transform="matrix(0.35278,0,0,-0.35278,65,1.4)">
        <path fill="#f47920" d="M 0,0 11.471,-22.811 -12.663,-45.633 Z" />
      </g>
      {/* 'R' */}
      <g transform="matrix(0.35278,0,0,-0.35278,0.016,14.57)">
        <path
          fill="#1b3281"
          d="m 0,0 11.454,41.266 h 18.312 c 5.723,0 9.546,-0.906 11.491,-2.773 1.931,-1.852 2.303,-4.875 1.139,-9.124 -0.704,-2.503 -1.774,-4.604 -3.244,-6.264 -1.458,-1.663 -3.381,-2.978 -5.749,-3.945 2.009,-0.483 3.287,-1.442 3.86,-2.88 0.57,-1.438 0.504,-3.535 -0.188,-6.284 L 35.682,4.232 35.678,4.076 C 35.276,2.462 35.395,1.598 36.05,1.528 L 35.628,0 H 23.24 c 0.042,0.971 0.119,1.839 0.201,2.568 0.09,0.746 0.201,1.324 0.311,1.721 l 1.155,4.121 c 0.582,2.143 0.618,3.638 0.078,4.499 -0.545,0.884 -1.765,1.319 -3.691,1.319 H 16.088 L 12.118,0 Z m 18.664,23.527 h 5.576 c 1.954,0 3.396,0.279 4.285,0.856 0.893,0.582 1.556,1.565 1.945,2.987 0.403,1.446 0.304,2.454 -0.274,3.027 -0.577,0.582 -1.958,0.865 -4.129,0.865 h -5.256 z"
        />
      </g>
      {/* 'u' */}
      <g transform="matrix(0.35278,0,0,-0.35278,26.97,3.83)">
        <path
          fill="#1b3281"
          d="m 0,0 -8.444,-30.451 h -10.261 l 1.261,4.461 c -1.806,-1.774 -3.654,-3.121 -5.517,-3.982 -1.848,-0.876 -3.798,-1.307 -5.851,-1.307 -1.697,0 -3.154,0.308 -4.327,0.919 -1.187,0.609 -2.071,1.535 -2.666,2.756 -0.528,1.069 -0.758,2.389 -0.668,3.966 0.095,1.552 0.643,4.17 1.659,7.836 L -30.438,0 h 11.224 l -4.367,-15.728 c -0.638,-2.302 -0.79,-3.92 -0.479,-4.801 0.324,-0.889 1.189,-1.348 2.593,-1.348 1.414,0 2.603,0.512 3.585,1.557 0.996,1.036 1.765,2.581 2.343,4.637 L -11.208,0 Z"
        />
      </g>
      {/* 'P' */}
      <g transform="matrix(0.35278,0,0,-0.35278,25.53,14.57)">
        <path
          fill="#1b3281"
          d="m 0,0 11.442,41.266 h 15.74 c 3.473,0 6.161,-0.205 8.078,-0.655 1.913,-0.431 3.413,-1.131 4.528,-2.118 1.397,-1.291 2.253,-2.889 2.605,-4.806 0.331,-1.917 0.135,-4.15 -0.59,-6.772 C 40.521,22.302 38.274,18.767 35.072,16.297 31.86,13.859 27.886,12.634 H 15.777 L 12.278,0 Z m 18.566,22.712 h 3.958 c 2.559,0 4.358,0.316 5.412,0.926 1.02,0.618 1.745,1.716 2.187,3.277 0.442,1.582 0.328,2.688 -0.34,3.306 -0.643,0.615 -2.286,0.926 -4.915,0.926 h -3.95 z"
        />
      </g>
      {/* 'a' */}
      <g transform="matrix(0.35278,0,0,-0.35278,44.93,14.57)">
        <path
          fill="#1b3281"
          d="m 0,0 0.114,2.892 c -1.81,-1.355 -3.643,-2.379 -5.486,-3.019 -1.835,-0.652 -3.789,-0.983 -5.882,-0.983 -3.179,0 -5.396,0.864 -6.678,2.536 -1.266,1.675 -1.474,4.08 -0.61,7.148 0.827,3.028 2.298,5.257 4.42,6.682 2.11,1.442 5.634,2.474 10.578,3.134 0.627,0.102 1.467,0.184 2.519,0.311 3.655,0.423 5.707,1.397 6.149,2.986 0.23,0.87 0.09,1.512 -0.45,1.906 -0.521,0.409 -1.495,0.61 -2.901,0.61 -1.167,0 -2.106,-0.242 -2.876,-0.745 -0.769,-0.508 -1.343,-1.25 -1.732,-2.294 h -10.943 c 0.988,3.428 3.007,6.018 6.038,7.75 3.02,1.762 7.002,2.61 11.934,2.61 2.319,0 4.396,-0.217 6.232,-0.688 1.839,-0.451 3.183,-1.094 4.055,-1.872 1.073,-0.971 1.708,-2.078 1.889,-3.302 0.209,-1.221 -0.02,-2.971 -0.66,-5.261 L 11.003,3.424 C 10.852,2.868 10.823,2.372 10.905,1.921 11.003,1.491 11.191,1.123 11.523,0.86 L 11.27,0 Z M 2.728,13.597 C 1.536,13.118 -0.013,12.659 -1.938,12.155 -4.961,11.344 -6.662,10.262 -7.03,8.923 -7.285,8.062 -7.182,7.399 -6.761,6.895 c 0.415,-0.479 1.136,-0.721 2.152,-0.721 1.863,0 3.359,0.471 4.474,1.401 1.118,0.942 1.954,2.421 2.539,4.461 0.102,0.434 0.192,0.746 0.25,0.979 z"
        />
      </g>
      {/* 'y' */}
      <g transform="matrix(0.35278,0,0,-0.35278,48.94,18.81)">
        <path
          fill="#1b3281"
          d="m 0,0 2.491,9.013 h 3.212 c 1.073,0 1.917,0.212 2.515,0.598 0.607,0.401 1.02,1.077 1.258,1.987 0.119,0.401 0.192,0.823 0.242,1.302 0.032,0.508 0.032,1.045 0,1.667 L 8.004,42.45 H 19.365 L 19.189,23.974 29.107,42.45 H 39.672 L 22.138,12.146 C 20.148,8.759 18.702,6.432 17.784,5.162 16.878,3.908 16.018,2.933 15.183,2.273 14.101,1.36 12.893,0.713 11.589,0.336 10.282,-0.049 8.292,-0.241 5.617,-0.241 c -0.77,0 -1.656,0.015 -2.614,0.065 C 2.052,-0.139 1.037,-0.082 0,0"
        />
      </g>
    </svg>
  </div>
);

export const PaymentSecurityBadges: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
    <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
      <svg className="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
      <span>Secured with</span>
    </div>
    <div className="flex items-center gap-1.5 flex-wrap">
      <RazorpayLogo />
      <UpiLogo />
      <VisaLogo />
      <MastercardLogo />
      <RupayLogo />
    </div>
  </div>
);
