import React from 'react'
import { Card, Heading, CardHeader, CardBody, Text, Flex, Box, Grid } from '@pancakeswap/uikit'
import styled from 'styled-components'
import Page from 'components/Layout/Page'
import { useTranslation } from 'contexts/Localization'
import PageHeader from 'components/PageHeader'
import Footer from 'views/Home/components/Footer'
import StakeCard from './components/StakeCard'
import BountyCard from './components/BountyCard'
import ReferralCard from './components/ReferralCard'
import config from './config'

const StyledFlex = styled(Flex)`
  max-width: 1600px;
  width: 100%;
  margin: auto;
  flex-direction: row;

  @media (max-width: 1100px) {
    flex-direction: column;
    flex-wrap: wrap;
  }
`

const StyledPage = styled(Page)`
  max-width: 1600px;
`

const Farms: React.FC = () => {
  
  const { t } = useTranslation()

  return (
    <>
      {/* <PageHeader>
        <StyledFlex justifyContent="space-between">
          <Flex flex="1" flexDirection="column" mr={['0', null, '8px']} ml={['0', null, '8px']}  mt="20px" width="100%">
            <BountyCard />
          </Flex>
          <Flex flex="2" flexDirection="column" mr={['0', null, '8px']} ml={['0', null, '8px']}  mt="20px">
            <ReferralCard />
          </Flex>
        </StyledFlex>
      </PageHeader> */}
      <StyledPage>
          <StakeCard header={t('Invest BNB')} config={config(t)} m="auto" />
          {/* <Box  maxWidth="888px" m="auto">
            <Card mt="30px">
            <CardHeader>
              <Heading scale="lg" color="secondary">
                {t('Read before use')}
              </Heading>
            </CardHeader>
            <CardBody>
              <Text>
                {t('The principal deposit cannot be withdrawn, the only return users can get are daily dividends and referral rewards. Payments is possible only if contract balance have enough BNB. Please analyze the transaction history and balance of the smart contract before investing. High risk - high profit, DYOR')}
              </Text>
            </CardBody>
          </Card>
          </Box> */}
          <Footer />
      </StyledPage>
    </>
  )
}

export default Farms
