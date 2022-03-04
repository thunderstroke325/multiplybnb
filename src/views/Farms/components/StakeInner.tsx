import BigNumber from 'bignumber.js'
import React, { useState, useMemo, useCallback } from 'react'
import styled from 'styled-components'
import { Modal, Flex, useModal, FlexProps, Text, IconButton, CalculateIcon, Box } from '@pancakeswap/uikit'
import { ModalInput } from 'components/Modal'
import RoiCalculatorModal from 'components/RoiCalculatorModal'
import { useTranslation } from 'contexts/Localization'
// import useToast from 'hooks/useToast'
import { useGetBnbBalance } from 'hooks/useTokenBalance'
import { getFullDisplayBalance, formatNumber } from 'utils/formatBalance'

interface StakeInnerProps extends FlexProps {
  days?: string
  pdaily?: number
  pid?: number
  total?: number
}

const StyledModal = styled(Modal)`
  width: 565px;
  & > :nth-child(2) {
    padding: 0;
  }
  @media (max-width: 600px) {
    width: 90%;
  }
`

const StyledTable = styled.table`
  width: 90%;
  margin: auto;
`

const TableHead = styled.thead`
    border-bottom: 1px solid #dee2e6!important;
`

const StyleTh = styled.th`
    padding: 15px 20px;
    vertical-align: middle;
`;

const TableBody = styled.tbody`
  & tr {
    td {
      padding: 15px 20px;
      font-size: 16px;
      vertical-align: middle;
      text-align: center;
    }
  }
`

const StakeInner: React.FC<StakeInnerProps> = ({ days, pdaily, pid, total }) => {
  const [expected, setExpected] = useState(0)
  const [val, setVal] = useState('')

  const { t } = useTranslation()
  const { balance : bnbbalance } = useGetBnbBalance()
  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(bnbbalance)
  }, [bnbbalance])
  const maxBalance = useMemo(() => {
    return getFullDisplayBalance(bnbbalance.minus(3000000000000000))
  }, [bnbbalance])


  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {

    setVal(maxBalance)
  }, [maxBalance, setVal])


  return (
    <>
      <ModalInput
          value={val}
          onSelectMax={handleSelectMax}
          onChange={handleChange}
          max={fullBalance}
          symbol='BNB'
          addLiquidityUrl='/'
          inputTitle={t('Invest')}
          pid={pid}
      />
    </>
  )
}

export default StakeInner