import BigNumber from 'bignumber.js'
import {useEffect, useState} from 'react'
import {getMasterChefContract} from '../sushi/utils'
import useSushi from "./useSushi";
import {getLpPrice} from "../utils/erc20";
import {BIG_ZERO} from "../utils/formatbalance";

const useLpPrice = () => {
    const [allowance, setAllowance] = useState(BIG_ZERO)
    const sushi = useSushi()
    const masterChefContract = getMasterChefContract(sushi)

    useEffect(() => {
        const fetchLpPrice = async () => {
            const allowance = await getLpPrice(
                masterChefContract
            )
            setAllowance(new BigNumber(allowance))
        }

        if (masterChefContract) {
            fetchLpPrice()
        }
        let refreshInterval = setInterval(fetchLpPrice, 10000)
        return () => clearInterval(refreshInterval)
    }, [masterChefContract])

    return allowance
}

export default useLpPrice