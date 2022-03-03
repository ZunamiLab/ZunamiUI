import { Header } from '../components/Header/Header';
import { SideBar } from '../components/SideBar/SideBar';
import { Form } from '../components/Form/Form';
import './FinanceOperations.scss';
import { Container, Row, Col } from 'react-bootstrap';
import { useWallet } from 'use-wallet';
import useEagerConnect from '../hooks/useEagerConnect';
import { WelcomeCarousel } from '../components/WelcomeCarousel/WelcomeCarousel';
import { WithdrawOptions } from '../components/Form/WithdrawOptions/WithdrawOptions';

interface FinanceOperationsProps {
    operationName: string;
}

export const FinanceOperations = (props: FinanceOperationsProps): JSX.Element => {
    const { account, connect, ethereum } = useWallet();
    useEagerConnect(account ? account : '', connect, ethereum);

    return (
        <Container className={'h-100 d-flex justify-content-between flex-column'}>
            <Header />
            <Row className={'h-100 mb-4 main-row'}>
                <SideBar isMainPage={true} />
                {!account && (
                    <Col className={'content-col'}>
                        <WelcomeCarousel />
                    </Col>
                )}
                {account && (
                    <Col className={'content-col'}>
                        <Row className={'zun-rounded zun-shadow h-100 operation-col'}>
                            <Col className={'ps-0 pe-0'}>
                                <div className={'DepositBlock'}>
                                    <div className={'DepositContent'}>
                                        <h3 className="DepositContent__Title">
                                            Deposit & Withdraw
                                        </h3>
                                        <div className="d-flex justify-content-start">
                                            <Form operationName={props.operationName} />
                                            {props.operationName === 'Withdraw' && (
                                                <WithdrawOptions />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Col>
                )}
            </Row>
        </Container>
    );
};
