import React from 'react';
import './Disclaimer.scss';

interface DisclaimerProps {
    text: JSX.Element;
}

export const Disclaimer = (props: DisclaimerProps): JSX.Element => {
    return (
        <div className={'Disclaimer'}>
            <svg
                className={'Disclaimer__icon'}
                width="29"
                height="29"
                viewBox="0 0 29 29"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M10.1699 7.5C12.0944 4.16666 16.9056 4.16667 18.8301 7.5L22.7272 14.25C24.6517 17.5833 22.2461 21.75 18.3971 21.75H10.6029C6.75388 21.75 4.34826 17.5833 6.27276 14.25L10.1699 7.5Z"
                    fill="url(#paint0_linear_196_2085)"
                />
                <path
                    d="M15.0887 15.84V9.36H13.9127V15.84H15.0887ZM15.0887 18V16.782H13.9127V18H15.0887Z"
                    fill="white"
                />
                <defs>
                    <linearGradient
                        id="paint0_linear_196_2085"
                        x1="9.01351"
                        y1="19.5946"
                        x2="20.7703"
                        y2="12.1487"
                        gradientUnits="userSpaceOnUse"
                    >
                        <stop stopColor="#F64A00" />
                        <stop offset="1" stopColor="#FAA512" />
                    </linearGradient>
                </defs>
            </svg>
            <div className={'Disclaimer__Content'}>{props.text}</div>
        </div>
    );
};
