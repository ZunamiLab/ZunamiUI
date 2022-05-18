import { useState, useCallback } from 'react';
import './WalletStatus.scss';
import { useWallet } from 'use-wallet';
import { WalletsModal } from '../WalletsModal/WalletsModal';

export const LS_ACCOUNT_KEY = 'METAMASK_ACCOUNT';
export const LS_WALLET_TYPE_KEY = 'WALLET_TYPE';

export const WalletStatus = (): JSX.Element => {
    const { account, reset } = useWallet();

    const handleSignOutClick = useCallback(() => {
        reset();
        window.localStorage.clear();
    }, [reset]);

    const [show, setShow] = useState(false);

    if (account) {
        const shortAddress = `${account.substring(0, 6)}...${account.substring(
            account.length - 4
        )}`;

        return (
            <div className={'WalletStatus WalletStatus__connected'}>
                <div>
                    <div className="state">Connected wallet</div>
                    <svg
                        width="16"
                        height="15"
                        viewBox="0 0 16 15"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mobile-icon"
                    >
                        <path
                            d="M1.14403 4.85829L9.63153 1.66357L9.63173 1.66349C9.81346 1.59501 10.0081 1.56754 10.2017 1.58306C10.3952 1.59857 10.583 1.65668 10.7515 1.75323L11.0237 1.27821L10.7515 1.75323C10.92 1.84978 11.0651 1.98238 11.1763 2.14155L11.6271 1.82642L11.1763 2.14155C11.2876 2.30071 11.3623 2.4825 11.3951 2.67391L12.4153 8.65638L5.82999 12.235L1.14403 4.85829Z"
                            fill="#FFF5E4"
                            stroke="#F64A00"
                            strokeWidth="1.1"
                        />
                        <mask id="path-2-inside-1_135_934" fill="white">
                            <path d="M1.95163 3.74902H14.0508C14.5679 3.74965 15.0637 3.95555 15.4292 4.32148C15.7947 4.68742 16 5.18346 16 5.70065V12.726C15.9994 13.2429 15.7938 13.7384 15.4284 14.1039C15.063 14.4694 14.5676 14.6751 14.0508 14.6759H1.95163C1.43438 14.6757 0.938339 14.4703 0.572423 14.1047C0.206508 13.7391 0.000630956 13.2433 0 12.726L0 5.70065C0 5.18305 0.205617 4.68664 0.571618 4.32064C0.937619 3.95464 1.43402 3.74902 1.95163 3.74902Z" />
                        </mask>
                        <path
                            d="M1.95163 3.74902H14.0508C14.5679 3.74965 15.0637 3.95555 15.4292 4.32148C15.7947 4.68742 16 5.18346 16 5.70065V12.726C15.9994 13.2429 15.7938 13.7384 15.4284 14.1039C15.063 14.4694 14.5676 14.6751 14.0508 14.6759H1.95163C1.43438 14.6757 0.938339 14.4703 0.572423 14.1047C0.206508 13.7391 0.000630956 13.2433 0 12.726L0 5.70065C0 5.18305 0.205617 4.68664 0.571618 4.32064C0.937619 3.95464 1.43402 3.74902 1.95163 3.74902Z"
                            fill="#FFF5E4"
                        />
                        <path
                            d="M14.0508 3.74902L14.0521 2.64902H14.0508V3.74902ZM16 5.70065L14.9 5.70065V5.70065H16ZM16 12.726L17.1 12.7274V12.726H16ZM14.0508 14.6759V15.7759L14.0524 15.7759L14.0508 14.6759ZM1.95163 14.6759L1.95129 15.7759H1.95163V14.6759ZM0 12.726H-1.1L-1.1 12.7274L0 12.726ZM1.95163 4.84902H14.0508V2.64902H1.95163V4.84902ZM14.0494 4.84902C14.2751 4.8493 14.4914 4.93914 14.6509 5.09883L16.2075 3.54414C15.636 2.97196 14.8608 2.65001 14.0521 2.64902L14.0494 4.84902ZM14.6509 5.09883C14.8104 5.25851 14.9 5.47496 14.9 5.70065L17.1 5.70065C17.1 4.89195 16.779 4.11632 16.2075 3.54414L14.6509 5.09883ZM14.9 5.70065V12.726H17.1V5.70065H14.9ZM14.9 12.7247C14.8997 12.9503 14.81 13.1666 14.6505 13.3262L16.2064 14.8816C16.7776 14.3101 17.099 13.5354 17.1 12.7274L14.9 12.7247ZM14.6505 13.3262C14.491 13.4857 14.2747 13.5755 14.0491 13.5759L14.0524 15.7759C14.8605 15.7746 15.6351 15.453 16.2064 14.8816L14.6505 13.3262ZM14.0508 13.5759H1.95163V15.7759H14.0508V13.5759ZM1.95196 13.5759C1.72616 13.5758 1.50962 13.4861 1.34988 13.3265L-0.205038 14.8829C0.367056 15.4544 1.1426 15.7756 1.95129 15.7759L1.95196 13.5759ZM1.34988 13.3265C1.19015 13.1669 1.10027 12.9505 1.1 12.7247L-1.1 12.7274C-1.09901 13.5361 -0.777132 14.3113 -0.205038 14.8829L1.34988 13.3265ZM1.1 12.726V5.70065H-1.1V12.726H1.1ZM1.1 5.70065C1.1 5.47478 1.18972 5.25817 1.34944 5.09846L-0.206199 3.54282C-0.77849 4.11511 -1.1 4.89131 -1.1 5.70065H1.1ZM1.34944 5.09846C1.50915 4.93875 1.72576 4.84902 1.95163 4.84902V2.64902C1.14228 2.64902 0.366092 2.97053 -0.206199 3.54282L1.34944 5.09846Z"
                            fill="#F64A00"
                            mask="url(#path-2-inside-1_135_934)"
                        />
                    </svg>

                    <span className="address" onClick={handleSignOutClick}>
                        {shortAddress}
                    </span>
                </div>
                <svg
                    width="14"
                    height="5"
                    viewBox="0 0 14 5"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="selector"
                >
                    <path
                        d="M1 1L7 4L13 1"
                        stroke="#767676"
                        strokeWidth="1.1"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
        );
    }

    return (
        <div className={'WalletStatus'}>
            <WalletsModal
                show={show}
                onHide={() => {
                    setShow(false);
                }}
                onWalletConnected={(wallet: any) => {
                    window.localStorage.setItem(LS_ACCOUNT_KEY, wallet.address);
                }}
            />
            <input
                type="button"
                className="WalletStatus__Connect"
                value="Connect wallet"
                onClick={() => setShow(true)}
            />
        </div>
    );
};
