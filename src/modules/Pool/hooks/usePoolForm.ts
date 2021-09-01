import * as React from 'react'
import { reaction } from 'mobx'
import { useHistory, useParams } from 'react-router-dom'

import { usePool } from '@/modules/Pool/stores/PoolStore'
import { PoolStoreData, TokenSide } from '@/modules/Pool/types'
import { useTokensCache } from '@/stores/TokensCacheService'
import { useWallet } from '@/stores/WalletService'
import { debounce, error } from '@/utils'


type PoolFormShape = {
    isTokenListShown: boolean;
    tokenSide: TokenSide | null;
    debouncedSyncPoolShare: () => void;
    hideTokensList: () => void;
    showTokensList: (side: TokenSide) => () => void;
    onChangeData: <K extends keyof PoolStoreData>(key: K) => (value: PoolStoreData[K]) => void;
    onSelectToken: (root: string) => void;
    onDismissTransactionReceipt: () => void;
}


export function usePoolForm(): PoolFormShape {
    const pool = usePool()
    const {
        leftTokenAddress,
        rightTokenAddress,
    } = useParams<{ leftTokenAddress: string, rightTokenAddress: string }>()
    const history = useHistory()
    const tokensCache = useTokensCache()
    const wallet = useWallet()

    const [isTokenListShown, setTokenListVisible] = React.useState(false)

    const [tokenSide, setTokenSide] = React.useState<TokenSide | null>(null)

    const debouncedSyncPoolShare = debounce(async () => {
        await pool.fetchPoolShare()
    }, 500)

    const hideTokensList = () => {
        setTokenSide(null)
        setTokenListVisible(false)
    }

    const showTokensList = (side: TokenSide) => () => {
        if (
            pool.isDepositingRight
            || pool.isDepositingLeft
            || pool.isDepositingLiquidity
            || pool.isSyncPairBalances
            || pool.isSyncPairRoots
        ) {
            return
        }

        setTokenSide(side)
        setTokenListVisible(true)
    }

    const onChangeData = <K extends keyof PoolStoreData>(key: K) => (value: PoolStoreData[K]) => {
        pool.changeData(key, value)
    }

    const onSelectToken = (root: string) => {
        let pathname = '/pool'
        if (tokenSide === 'leftToken') {
            const rightTokenRoot = (pool.rightToken?.root !== undefined && pool.rightToken.root !== root)
                ? `/${pool.rightToken.root}`
                : ''
            pathname += `/${root}${rightTokenRoot}`
        }
        else if (
            tokenSide === 'rightToken'
            && pool.leftToken?.root !== undefined
            && pool.leftToken.root !== root
        ) {
            pathname += `/${pool.leftToken.root}/${root}`
        }
        else if (tokenSide) {
            pool.changeData(tokenSide, root)
        }
        history.push({ pathname })
        hideTokensList()
    }

    const onDismissTransactionReceipt = () => {
        pool.cleanDepositLiquidityResult()
    }

    React.useEffect(() => {
        (async () => {
            await pool.init()
        })()

        // Initial update tokens state by the given uri params and after list of the tokens loaded
        const tokensListDisposer = reaction(() => tokensCache.tokens, () => {
            if (
                (pool.leftToken === undefined || pool.leftToken.root !== leftTokenAddress)
                && tokensCache.has(leftTokenAddress)
            ) {
                pool.changeData('leftToken', leftTokenAddress)
            }

            if (
                (pool.rightToken === undefined || pool.rightToken.root !== rightTokenAddress)
                && tokensCache.has(rightTokenAddress)
            ) {
                pool.changeData('rightToken', rightTokenAddress)
            }
        })

        return () => {
            pool.dispose().catch(reason => error(reason))
            tokensListDisposer()
        }
    }, [])

    // Update tokens state after change the uri params
    React.useEffect(() => {
        if (leftTokenAddress !== undefined && tokensCache.has(leftTokenAddress)) {
            pool.changeData('leftToken', leftTokenAddress)
        }

        if (rightTokenAddress !== undefined && tokensCache.has(rightTokenAddress)) {
            pool.changeData('rightToken', rightTokenAddress)
        }
    }, [leftTokenAddress, rightTokenAddress, wallet.address])

    return {
        isTokenListShown,
        tokenSide,
        debouncedSyncPoolShare,
        hideTokensList,
        showTokensList,
        onChangeData,
        onSelectToken,
        onDismissTransactionReceipt,
    }
}
