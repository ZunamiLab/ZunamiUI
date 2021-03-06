import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { Contracts } from './lib/contracts.js';
import { Account } from './lib/accounts.js';
import { EVM } from './lib/evm.js';
import { contractAddresses } from './lib/constants';
import erc20Abi from '../actions/abi/erc20.abi.json';
import ethAbi from '../actions/abi/Zunami.json';
import bscAbi from '../actions/abi/zunami_bsc.json';
import { getZunamiAddress } from '../utils/zunami';

export class Sushi {
    constructor(provider, networkId, testing, options) {
        var realProvider;

        if (typeof provider === 'string') {
            if (provider.includes('wss')) {
                realProvider = new Web3.providers.WebsocketProvider(
                    provider,
                    options.ethereumNodeTimeout || 10000
                );
            } else {
                realProvider = new Web3.providers.HttpProvider(
                    provider,
                    options.ethereumNodeTimeout || 10000
                );
            }
        } else {
            realProvider = provider;
        }

        this.web3 = new Web3(realProvider);

        if (testing) {
            this.testing = new EVM(realProvider);
            this.snapshot = this.testing.snapshot();
        }

        const ethProvider = new Web3.providers.HttpProvider(
            'https://eth-mainnet.alchemyapi.io/v2/Yh5zNTgJkqrOIqLtfkZBGIPecNPDQ1ON',
            options.ethereumNodeTimeout || 10000
        );

        const bscProvider = new Web3.providers.HttpProvider(
            'https://bscrpc.com',
            options.ethereumNodeTimeout || 10000
        );

        // this.web3 = new Web3(ethProvider);
        this.web3 = networkId === 1 ? new Web3(ethProvider) : new Web3(bscProvider);
        this.bscWeb3 = new Web3(bscProvider);

        if (options.defaultAccount) {
            this.web3.eth.defaultAccount = options.defaultAccount;
            this.bscWeb3.eth.defaultAccount = options.defaultAccount;
        }

        // this.contracts = new Contracts(ethProvider, 1, this.web3, options);
        this.contracts = new Contracts(realProvider, networkId, this.web3, options);
        // console.log(options);
        this.ethContracts = new Contracts(ethProvider, 1, this.web3, options);
        this.bscContracts = new Contracts(bscProvider, 56, this.bscWeb3, options);

        this.masterChefAddress = contractAddresses.zunami[1];
        this.bscMasterChefAddress = contractAddresses.zunami[56];
        this.wethAddress = contractAddresses.weth[networkId];
    }

    async resetEVM() {
        this.testing.resetEVM(this.snapshot);
    }

    addAccount(address, number) {
        this.accounts.push(new Account(this.contracts, address, number));
        this.accounts.push(new Account(this.bscContracts, address, number));
        this.accounts.push(new Account(this.ethContracts, address, number));
    }

    getErc20Contract(account, address, chainId = 1) {
        const ethProvider = new Web3.providers.HttpProvider(
            'https://eth-mainnet.alchemyapi.io/v2/Yh5zNTgJkqrOIqLtfkZBGIPecNPDQ1ON',
            {
                autoGasMultiplier: 1.5,
                defaultAccount: account,
                defaultConfirmations: 1,
                defaultGas: '6000000',
                defaultGasPrice: '1000000000000',
                ethereumNodeTimeout: 10000,
                testing: false,
            }
        );

        const bscProvider = new Web3.providers.HttpProvider('https://bscrpc.com');

        const web3 = new Web3(chainId === 1 ? ethProvider : bscProvider);
        const contract = new web3.eth.Contract(erc20Abi);
        contract.options.from = account;
        contract.options.address = address;

        return contract;
    }

    getEthContract(account) {
        const ethProvider = new Web3.providers.HttpProvider(
            'https://eth-mainnet.alchemyapi.io/v2/Yh5zNTgJkqrOIqLtfkZBGIPecNPDQ1ON',
            {
                autoGasMultiplier: 1.5,
                defaultAccount: account,
                defaultConfirmations: 1,
                defaultGas: '6000000',
                defaultGasPrice: '1000000000000',
                ethereumNodeTimeout: 10000,
                testing: false,
            }
        );

        const web3 = new Web3(ethProvider);
        const contract = new web3.eth.Contract(ethAbi);
        contract.options.from = account;
        contract.options.address = getZunamiAddress(1);

        return contract;
    }

    getBscProvider() {
        return new Web3.providers.HttpProvider('https://bscrpc.com');
    }

    getBscContract(account) {
        const bscProvider = new Web3.providers.HttpProvider('https://bscrpc.com');

        const web3 = new Web3(bscProvider);
        const contract = new web3.eth.Contract(bscAbi);
        contract.options.from = account;
        contract.options.address = getZunamiAddress(56);

        return contract;
    }

    setProvider(provider, networkId) {
        if (networkId === 1) {
            this.web3.setProvider(provider);
        } else {
            this.bscWeb3.setProvider(provider);
        }

        this.contracts.setProvider(provider, networkId);
        this.bscContracts.setProvider(provider, networkId);
        this.operation.setNetworkId(networkId);
    }

    setDefaultAccount(account) {
        this.web3.eth.defaultAccount = account;
        this.bscWeb3.eth.defaultAccount = account;

        this.contracts.setDefaultAccount(account);
        this.bscContracts.setDefaultAccount(account);
        this.ethContracts.setDefaultAccount(account);
    }

    getDefaultAccount() {
        console.log(`Default account: ${this.web3.eth.defaultAccount}`);
        return this.web3.eth.defaultAccount;
    }

    loadAccount(account) {
        const newAccount = this.web3.eth.accounts.wallet.add(account.privateKey);
        this.bscWeb3.eth.accounts.wallet.add(account.privateKey);
        this.web3.eth.accounts.wallet.add(account.privateKey);

        if (
            !newAccount ||
            (account.address && account.address.toLowerCase() !== newAccount.address.toLowerCase())
        ) {
            throw new Error(`Loaded account address mismatch.
        Expected ${account.address}, got ${newAccount ? newAccount.address : null}`);
        }
    }

    toBigN(a) {
        return BigNumber(a);
    }
}
