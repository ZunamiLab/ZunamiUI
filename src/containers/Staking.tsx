import {useState,useEffect} from 'react';
import {Header} from '../components/Header/Header';
import {SideBar} from '../components/SideBar/SideBar';
import './Staking.scss';
import {Container, Row, Col} from 'react-bootstrap';
import {TestnetPlaceholder} from '../components/TestnetPlaceholder/TestnetPlaceholder';
import {getTestnetStatusUrl} from '../api/api';
import {useWallet} from 'use-wallet';

export const Staking = (): JSX.Element => {
    const {account} = useWallet();
    const [testnetStatus, setTestnetStatus] = useState(false);

    useEffect(() => {
        async function getStatus() {
            if (!account) {
                return false;
            }
    
            const response = await fetch(getTestnetStatusUrl(account));
            const data = await response.json();
            setTestnetStatus(data.active);
        };

        getStatus();
    }, [account]);

    return (
        <Container className={'h-100 d-flex justify-content-between flex-column'}>
            <Header/>
            <Row className={'h-100 mb-4 main-row'}>
                <SideBar isMainPage={true}/>
                <Col className={'content-col'}>
                    <Row className={'h-100 operation-col'}>
                    <Col className={'ps-0 pe-0'}>
                        {
                            !testnetStatus &&
                                <TestnetPlaceholder
                                    headerTitle="Staking"
                                    title="Staking ZUN are available only for Testnet users for now"
                                />
                        }
                        {
                            testnetStatus &&
                                <div className="Staking">
                                    <div className="Staking__Title">Staking ZUN</div>
                                    <div className="d-flex">
                                        <div className="Staking__Locked">
                                            <div className="Staking__Locked__Title">Locked</div>
                                            <div className="Staking__Locked__Range">
                                                <input type="range" min="1" max="16" value="8" />
                                            </div>
                                            <div className="Staking__Locked__Period">
                                                <span>Lock for </span>
                                                <span className="active">8 weeks</span>
                                            </div>
                                            <div className="Staking__Locked__Token">
                                                <img src="/zun-token2.svg" alt="" className="icon" />
                                                <span className="token">ZUN</span>
                                                <div className="divider"></div>
                                                <div className="max">max</div>
                                                <div className="divider"></div>
                                                <input
                                                    inputMode={'decimal'}
                                                    autoComplete={'off'}
                                                    autoCorrect={'off'}
                                                    type={'text'}
                                                    pattern={'^[0-9]*[.,]?[0-9]*$'}
                                                    placeholder={'0.00'}
                                                    min={0}
                                                    minLength={1}
                                                    maxLength={79}
                                                />
                                            </div>
                                            <button>Lock</button>
                                        </div>
                                        <div className="Staking__Unclaimed">
                                            <div className="Staking__Unclaimed__Title">Unclaimed Staking Rewards</div>
                                            <div className="stake-item d-flex flex-row align-items-center justify-content-between">
                                                <div className="">
                                                    <div className="Staking__Unclaimed__ZUN">ZUN 1.300,54</div>
                                                    <div className="Staking__Unclaimed__USD">$4.504,60</div>
                                                </div>
                                                <div>
                                                    <button>Claim</button>
                                                </div>
                                            </div>
                                            <div className="stake-item d-flex flex-row align-items-center justify-content-between">
                                                <div className="">
                                                    <div className="Staking__Unclaimed__ZUN">USDT 4.504,60</div>
                                                    <div className="Staking__Unclaimed__USD">$4.504,60</div>
                                                </div>
                                                <div>
                                                    <button>Claim</button>
                                                </div>
                                            </div>
                                            <svg className="Staking__Unclaimed__ICON" width="56" height="58" viewBox="0 0 56 58" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path fill="#F5ECD6" d="M26.0627 45.2157C26.0627 49.0434 26.0627 52.8711 26.0627 56.6988C26.0627 56.88 26.0627 57.0838 26.0627 57.265C26.0176 57.7406 25.7922 57.9671 25.2961 57.9898C25.2285 57.9898 25.1383 57.9898 25.0706 57.9898C18.8476 57.9898 12.6245 57.9898 6.37884 57.9898C5.026 57.9898 3.98882 57.1744 3.67316 55.8834C3.60551 55.6343 3.60551 55.3625 3.60551 55.0907C3.60551 48.4092 3.60551 41.7051 3.60551 35.0236C3.60551 33.3023 4.75543 32.1472 6.46903 32.1245C12.5794 32.1245 18.6897 32.1245 24.8226 32.1245C25.7696 32.1245 26.0853 32.4416 26.0853 33.4382C26.0627 37.3791 26.0627 41.2974 26.0627 45.2157Z" />
                                                <path fill="#F5ECD6" d="M30.482 45.1254C30.482 41.3203 30.482 37.5153 30.482 33.7102C30.482 33.5291 30.482 33.3252 30.482 33.144C30.5271 32.5098 30.8428 32.1928 31.4966 32.1475C31.6094 32.1475 31.7221 32.1475 31.8348 32.1475C37.8775 32.1475 43.9202 32.1475 49.9629 32.1475C50.9325 32.1475 51.7667 32.4419 52.3755 33.2346C52.7363 33.7102 52.9617 34.2538 52.9617 34.8427C52.9617 41.6601 52.9617 48.4774 52.9617 55.3175C52.9617 56.7896 51.7667 57.99 50.3012 57.99C43.9879 58.0127 37.6972 57.99 31.3839 57.99C30.7075 57.99 30.482 57.7409 30.482 56.9935C30.482 53.0526 30.482 49.089 30.482 45.1254Z" />
                                                <path fill="#F5ECD6" d="M42.4096 29.2707C38.9598 29.2707 35.5101 29.2707 32.0603 29.2707C31.8123 29.2707 31.5643 29.2707 31.3388 29.2254C30.7526 29.1122 30.5045 28.863 30.5045 28.2741C30.5045 24.2653 30.5045 20.2564 30.5045 16.2248C30.5045 15.636 30.7977 15.3189 31.3839 15.2509C31.5868 15.2283 31.7897 15.2283 31.9927 15.2283C38.8922 15.2283 45.7917 15.2283 52.6912 15.2283C53.1647 15.2283 53.6382 15.2736 54.0666 15.4095C55.1714 15.7266 55.9606 16.7231 55.9831 17.8556C56.0056 20.7773 56.0056 23.699 55.9831 26.6208C55.9606 28.1382 54.7204 29.248 53.0294 29.2707C51.0452 29.2933 49.0611 29.2707 47.0543 29.2707C45.5211 29.2707 43.9653 29.2707 42.4096 29.2707Z" />
                                                <path fill="#F5ECD6" d="M14.1351 29.2709C10.6854 29.2709 7.23564 29.2709 3.78589 29.2709C3.42513 29.2709 3.06437 29.2482 2.72616 29.1803C1.44096 28.9085 0.56161 27.8666 0.539062 26.5303C0.539062 23.6539 0.539062 20.8228 0.56161 17.969C0.56161 16.3836 1.71153 15.3191 3.44768 15.2058C3.62806 15.2058 3.83098 15.2058 4.01136 15.2058C10.7756 15.2058 17.5398 15.2058 24.3266 15.2058C24.3942 15.2058 24.4844 15.2058 24.552 15.2058C25.7921 15.2058 26.0627 15.5002 26.0627 16.7459C26.0627 20.5057 26.0627 24.2428 26.0627 28.0025C26.0627 28.9991 25.7921 29.2709 24.7775 29.2709C21.2376 29.2709 17.6976 29.2709 14.1351 29.2709Z" />
                                                <path fill="#F5ECD6" d="M40.448 13.3486C37.0884 13.3259 34.5631 13.0089 32.128 12.0576C31.2937 11.7179 30.5045 11.2875 29.9183 10.5628C28.9939 9.40765 28.8586 8.11665 29.7379 6.91625C30.3242 6.12353 31.0006 5.35346 31.7672 4.74194C34.4954 2.56763 37.4942 0.891595 40.9665 0.212123C42.2968 -0.0596663 43.6497 -0.0823153 44.98 0.257421C46.7161 0.710402 47.9788 1.75226 48.7228 3.40564C49.3316 4.74194 49.6247 6.12353 49.4218 7.57307C49.1062 9.88328 47.7308 11.3781 45.6789 12.2841C43.7624 13.1221 41.7332 13.3712 40.448 13.3486ZM34.6984 8.07135C34.6984 8.11665 34.7209 8.16195 34.7209 8.20725C34.8337 8.25255 34.9238 8.27519 35.0366 8.29784C36.908 8.79612 38.802 8.95467 40.7185 8.84142C41.5979 8.77347 42.4998 8.63758 43.3566 8.38844C45.0025 7.89016 45.3407 7.16539 44.7996 5.53466C44.5741 4.85518 44.2134 4.56075 43.4693 4.51545C43.2664 4.4928 43.0634 4.4928 42.8605 4.4928C39.6813 4.67399 37.156 6.30472 34.6984 8.07135Z" />
                                                <path fill="#F5ECD6" d="M16.8634 13.3712C14.6537 13.3486 12.4892 13.0768 10.4825 12.0576C8.38556 10.9931 7.2131 9.24909 7.168 6.87094C7.12291 5.08166 7.61895 3.38298 8.79141 2.00139C9.87369 0.710392 11.3167 0.166814 12.9401 0.0309197C15.2625 -0.150273 17.4271 0.483901 19.524 1.43516C21.666 2.43172 23.6952 3.60947 25.4314 5.19491C25.9049 5.62524 26.3558 6.10087 26.7166 6.59915C27.9116 8.25253 27.5959 10.0418 25.95 11.2196C25.003 11.899 23.9207 12.3067 22.8159 12.5785C21.8238 12.8276 20.8092 13.0088 19.772 13.1447C18.8025 13.3033 17.8329 13.3259 16.8634 13.3712ZM21.8464 8.27518C21.8689 8.20724 21.914 8.11664 21.9365 8.04869C21.8464 8.00339 21.7562 7.98074 21.6885 7.93545C20.3357 6.89359 18.8701 6.03292 17.2918 5.35345C15.9615 4.78723 14.6086 4.40219 13.1431 4.53809C12.7823 4.58338 12.3539 4.74193 12.1284 5.01372C11.1814 6.07822 11.5647 7.70896 12.8725 8.25253C13.1431 8.36578 13.4362 8.45638 13.7293 8.52432C15.7135 9.0226 17.6976 8.93201 19.7044 8.68287C20.4033 8.59227 21.1248 8.41108 21.8464 8.27518Z" />
                                            </svg>

                                        </div>
                                    </div>
                                    <div className="DepositStory">
                                        <div className="DepositStory__Title">Staking history</div>
                                        <table className="DepositStory__Table">
                                            <thead>
                                                <tr>
                                                    <td>Amount staked</td>
                                                    <td>Lock date</td>
                                                    <td>Unlock date</td>
                                                    <td>Actions</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>1,200 ZUN</td>
                                                    <td>Jan 21, 2022, 1:40 PM</td>
                                                    <td>Jan 21, 2022, 1:40 PM</td>
                                                    <td>
                                                        <button className="unlock disabled">Unlock</button>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>1,200 ZUN</td>
                                                    <td>Jan 21, 2022, 1:40 PM</td>
                                                    <td>Jan 21, 2022, 1:40 PM</td>
                                                    <td>
                                                        <button className="unlock">Unlock</button>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                        }
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};
