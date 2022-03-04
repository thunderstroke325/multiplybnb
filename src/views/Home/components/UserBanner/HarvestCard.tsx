import React, { useState, useCallback } from 'react'
import styled from 'styled-components'
import { AutoRenewIcon, Button, Card, CardBody, Flex, Skeleton, Text } from '@pancakeswap/uikit'
import BigNumber from 'bignumber.js'
import { useTranslation } from 'contexts/Localization'
import useToast from 'hooks/useToast'
import useDividendsInfo from 'hooks/useDividend'
import useCurrentBlockTimestamp from 'hooks/useCurrentBlockTimestamp'
import { useCake } from 'hooks/useContract'
import { claimReward } from 'utils/calls/claim'
import { getBalanceNumber } from 'utils/formatBalance'
import Balance from 'components/Balance'

const StyledCard = styled(Card)`
  width: 100%;
  height: fit-content;
`

const HarvestCard = () => {    
  const [pendingTx, setPendingTx] = useState(false)
  const { t } = useTranslation()
  const { toastSuccess, toastError } = useToast()
  const dividends = useDividendsInfo()
  const claimable = dividends.fetchStatus === 'success' ? getBalanceNumber(new BigNumber(dividends.info[3].toString())) : 0
  const blockTimestamp = useCurrentBlockTimestamp()
  const nextclaimtime = dividends.fetchStatus === 'success' && dividends.info[6].toString() !== '0' && blockTimestamp ? (dividends.info[6]).sub(blockTimestamp).toString() : 0
  const cakePriceBusd = new BigNumber(1) /* usePriceCakeBusd() */
  const earningsBusd = new BigNumber(claimable).multipliedBy(cakePriceBusd)
  const toCollectText = t('to claim')

  const shivaContract = useCake()
  const claimBTCB = useCallback(async () => {
    setPendingTx(true)
      try {
        // eslint-disable-next-line no-await-in-loop
        await claimReward(shivaContract)
        toastSuccess(
          `${t('Claimed')}!`,
          t('Your %symbol% rewards have been sent to your wallet!', { symbol: 'BTCB' }),
        )
      } catch (error) {
        toastError(t('Error'), t('Please try again. Confirm the transaction and make sure you are paying enough gas!'))
      }
    setPendingTx(false)
  }, [ shivaContract, toastSuccess, toastError, t])

  return (
    <StyledCard>
      <CardBody>
        <Flex flexDirection={['column', null, null, 'row']} justifyContent="space-between" alignItems="center">
          <Flex flexDirection="column" alignItems={['center', null, null, 'flex-start']}>
            {!earningsBusd.isNaN() ? (
              <Balance
                decimals={earningsBusd.gt(0) ? 6 : 0}
                fontSize="24px"
                bold
                prefix={earningsBusd.gt(0) ? '~$' : '$'}
                lineHeight="1.1"
                value={earningsBusd.toNumber()}
              />
            ) : (
              <Skeleton width={96} height={24} my="2px" />
            )}
            <Text mb={['16px', null, null, '0']} color="textSubtle">
              {toCollectText}
            </Text>
          </Flex>
          {nextclaimtime >= 0 ? (
            <Button width={['100%', null, null, 'auto']} variant="secondary">
              <Text color="primary" bold>
                {t('Claim Next')}
              </Text>
            </Button>
          ) : (
            <Button
              width={['100%', null, null, 'auto']}
              id="harvest-all"
              isLoading={pendingTx}
              endIcon={pendingTx ? <AutoRenewIcon spin color="currentColor" /> : null}
              disabled={pendingTx}
              onClick={claimBTCB}
            >
              <Text color="invertedContrast" bold>
                {pendingTx ? t('Claiming') : t('Claim BTCB')}
              </Text>
            </Button>
          )}
        </Flex>
      </CardBody>
    </StyledCard>
  )
}

export default HarvestCard
