import { useWallet } from 'use-wallet';
import './FastDepositForm.scss';
import { useState, useMemo } from 'react';
import { ToastContainer, Toast } from 'react-bootstrap';
import { Input } from './Input/Input';
import { Preloader } from '../Preloader/Preloader';
import { useUserBalances } from '../../hooks/useUserBalances';
import { WalletStatus } from '../WalletStatus/WalletStatus';
import { DirectAction } from '../Form/DirectAction/DirectAction';
import { useAllowanceStables } from '../../hooks/useAllowance';
import useApprove from '../../hooks/useApprove';
import useStake from '../../hooks/useStake';
import { getActiveWalletName, getActiveWalletAddress } from '../WalletsModal/WalletsModal';
import { daiAddress, usdcAddress, usdtAddress } from '../../utils/formatbalance';
import { getFullDisplayBalance } from '../../utils/formatbalance';
import { Link } from 'react-router-dom';

function coinNameToAddress(coinName: string): string {
    let address = daiAddress;

    switch (coinName) {
        case 'USDC':
            address = usdcAddress;
            break;
        case 'USDT':
            address = usdtAddress;
            break;
    }

    return address;
}

export const FastDepositForm = (): JSX.Element => {
    const userBalanceList = useUserBalances();
    const { account } = useWallet();

    const [optimized, setOptimized] = useState(true);
    const [pendingApproval, setPendingApproval] = useState(false);
    const [coin, setCoin] = useState('USDC');
    const [depositSum, setDepositSum] = useState('0');
    const [transactionId, setTransactionId] = useState(undefined);
    const [pendingTx, setPendingTx] = useState(false);
    const [transactionError, setTransactionError] = useState(false);

    const coins = ['DAI', 'USDC', 'USDT'];
    const coinIndex = coins.indexOf(coin);

    const approveList = useAllowanceStables();
    const approvedTokens = [
        approveList ? approveList[0].toNumber() > 0 : false,
        approveList ? approveList[1].toNumber() > 0 : false,
        approveList ? approveList[2].toNumber() > 0 : false,
    ];

    const { onApprove } = useApprove();
    const { onStake } = useStake(
        coin === 'DAI' ? depositSum : '0',
        coin === 'USDC' ? depositSum : '0',
        coin === 'USDT' ? depositSum : '0',
        !optimized
    );

    const fullBalance = useMemo(() => {
        return getFullDisplayBalance(userBalanceList[coinIndex], coin === 'DAI' ? 18 : 6);
    }, [userBalanceList, coin, coinIndex]);

    const depositEnabled =
        approvedTokens[coinIndex] &&
        Number(depositSum) > 0 &&
        !pendingApproval &&
        Number(depositSum) <= Number(fullBalance);

    return (
        <div className="FastDepositForm">
            <ToastContainer position={'top-end'} className={'toasts mt-3 me-3'}>
                {transactionError && (
                    <Toast onClose={() => setTransactionError(false)} delay={5000} autohide>
                        <Toast.Body>Sorry, we couldn't complete the transaction</Toast.Body>
                    </Toast>
                )}
                {transactionId && (
                    <Toast onClose={() => setTransactionId(undefined)} delay={15000} autohide>
                        <Toast.Body>
                            Success! Check out the{' '}
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href={`https://etherscan.io/tx/${transactionId}`}
                            >
                                transaction
                            </a>
                        </Toast.Body>
                    </Toast>
                )}
            </ToastContainer>
            <div className="d-flex justify-content-between align-items-center">
                <span className="FastDepositForm__Title">Fast deposit</span>
                <Link className="FastDepositForm__Description" to="/deposit">
                    Tap to Deposit & Withdraw Page
                </Link>
            </div>
            <div className="FastDepositForm__MobileToggle">
                <div className="FastDepositForm__MobileToggle__Title">Fast Deposit</div>
                <svg
                    width="35"
                    height="25"
                    viewBox="0 0 35 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="FastDepositForm__MobileToggle__Icon"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M33.6296 3.86025e-06C33.7985 -0.000379277 33.9698 0.0277528 34.1352 0.0866819C34.7085 0.294158 35.0634 0.833595 34.9906 1.38963C33.9329 9.25391 28.1559 15.6637 20.4448 18.3758C20.0928 18.4996 19.7438 18.5743 19.4019 18.6046C18.1198 18.9916 16.7896 19.279 15.4234 19.457C14.3485 19.597 13.4981 20.4826 13.4981 21.5665C13.4981 23.3923 12.3575 24.2102 11.226 24.2102C10.4869 24.2102 9.74777 23.888 9.03602 23.2436L1.27978 16.2212C-0.426593 14.6763 -0.426593 12.173 1.27978 10.6281L9.03602 3.60574C9.74777 2.9696 10.4869 2.63913 11.226 2.63913C12.3575 2.63913 13.4981 3.45703 13.4981 5.28285C13.4981 6.50844 14.3835 7.57119 15.6067 7.64689C16.0411 7.67377 16.476 7.68698 16.9109 7.68698C23.052 7.68698 28.892 5.00195 32.5237 0.507633C32.7865 0.180574 33.2005 -0.000958612 33.6296 3.86025e-06Z"
                        fill="white"
                    />
                </svg>
                <svg
                    width="18"
                    height="6"
                    viewBox="0 0 18 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="FastDepositForm__MobileToggle__ToggleIcon"
                >
                    <path
                        d="M1 1L9 5L17 1"
                        stroke="white"
                        strokeWidth="1.3"
                        strokeLinecap="round"
                    />
                </svg>
            </div>
            <Input
                action="deposit"
                name={coin}
                value={depositSum}
                handler={(sum) => {
                    setDepositSum(sum);
                }}
                max={userBalanceList[coinIndex]}
                onCoinChange={(coin: string) => {
                    setCoin(coin);
                }}
            />
            <div>
                {!account && (
                    <div className="d-flex align-items-center FastDepositForm__Actions">
                        <WalletStatus />
                        <span className="FastDepositForm__Slogan">Make your first Deposit!</span>
                    </div>
                )}
                {account && (
                    <div className="d-flex align-items-center FastDepositForm__Actions">
                        {!approvedTokens[coinIndex] && (
                            <button
                                className="zun-button"
                                onClick={() => {
                                    setPendingApproval(true);

                                    try {
                                        onApprove(coinNameToAddress(coin));
                                    } catch (e) {
                                        setPendingApproval(false);
                                    }

                                    setPendingApproval(false);
                                }}
                            >
                                Approve
                            </button>
                        )}
                        {approvedTokens[coinIndex] && (
                            <button
                                className={`zun-button ${depositEnabled ? '' : 'disabled'}`}
                                onClick={async () => {
                                    setPendingTx(true);

                                    try {
                                        const tx = await onStake();
                                        setTransactionId(tx.transactionHash);
                                        setDepositSum('0');

                                        // @ts-ignore
                                        window.dataLayer.push({
                                            event: 'deposit',
                                            userID: getActiveWalletAddress(),
                                            type: getActiveWalletName(),
                                            value: depositSum,
                                        });
                                    } catch (error: any) {
                                        setTransactionError(true);
                                    }

                                    setPendingTx(false);
                                }}
                            >
                                Deposit
                            </button>
                        )}
                        {!pendingTx && (
                            <DirectAction
                                actionName="deposit"
                                checked={optimized}
                                disabled={false}
                                hint="When using optimized deposit funds will be deposited within 24 hours and many times cheaper"
                                onChange={(state: boolean) => {
                                    setOptimized(state);
                                }}
                            />
                        )}
                        {pendingTx && <Preloader className="ms-2" />}
                    </div>
                )}
            </div>
        </div>
    );
};
