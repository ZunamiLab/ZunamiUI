import './Header.scss';
import { Navbar } from 'react-bootstrap';
import { Disclaimer } from '../Disclaimer/Disclaimer';

export const Header = (): JSX.Element => {
    const logoVariant = document.body.classList.contains('dark') ? 'logo-dark.svg' : 'logo.svg';

    return (
        <Navbar expand="lg" className={'header'}>
            <Navbar.Brand href="https://zunami.io">
                <img className={'Logo'} src={logoVariant} alt="Logo of the Zunami Protocol" />
            </Navbar.Brand>
            <Disclaimer
                text={
                    <div>
                        Please note. The contract has been{' '}
                        <a target="_blank" rel="noreferrer" href="http://ya.ru">
                            audited
                        </a>
                        , but it steel a beta version. Use it at your own risk
                    </div>
                }
            />
        </Navbar>
    );
};
