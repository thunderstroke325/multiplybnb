import React from 'react'
import { useWeb3React } from '@web3-react/core'
import styled from 'styled-components'
import {
  Flex,
  LogoutIcon,
  useModal,
  UserMenu as UIKitUserMenu,
  UserMenuDivider,
  UserMenuItem,
  Text,
  Link
} from '@multiplybnb/uikit'
import useAuth from 'hooks/useAuth'
import { useProfile } from 'state/profile/hooks'
import ConnectWalletButton from 'components/ConnectWalletButton'
import { FetchStatus, useGetBnbBalance } from 'hooks/useTokenBalance'
import { useTranslation } from 'contexts/Localization'
import WalletModal, { WalletView, LOW_BNB_BALANCE } from './WalletModal'
import ProfileUserMenuItem from './ProfileUserMenutItem'
import WalletUserMenuItem from './WalletUserMenuItem'

const UserMenu = () => {
  const { t } = useTranslation()
  const { account } = useWeb3React()
  const { logout } = useAuth()
  const { balance, fetchStatus } = useGetBnbBalance()
  const { isInitialized, isLoading, profile } = useProfile()
  const [onPresentWalletModal] = useModal(<WalletModal initialView={WalletView.WALLET_INFO} />)
  const [onPresentTransactionModal] = useModal(<WalletModal initialView={WalletView.TRANSACTIONS} />)
  const hasProfile = isInitialized && !!profile
  const avatarSrc = profile && profile.nft ? `/images/nfts/${profile.nft.images.sm}` : undefined
  const hasLowBnbBalance = fetchStatus === FetchStatus.SUCCESS && balance.lte(LOW_BNB_BALANCE)
  const StyledLink = styled(Link)`
    height: 100%;
    width: 100%;
    justify-content: center;
  `;
  if (!account) {
    return (
    <>
      <StyledLink mr="16px" href="/invest" style={{width: "100px"}}>
        <Text color="background" style={{fontSize: "20px", color: "white"}}>Invest</Text>
      </StyledLink>
      <StyledLink mr="16px" href="/dice" style={{width: "100px"}}>
        <Text color="background" style={{fontSize: "20px", color: "white"}}>Dice</Text>
      </StyledLink>
      <ConnectWalletButton scale="sm" />
    </>
    )
  }

  return (
    <>
      <StyledLink mr="16px" href="/invest" style={{width: "100px"}}>
        <Text color="background" style={{fontSize: "20px", color: "white"}}>Invest</Text>
      </StyledLink>
      <StyledLink mr="16px" href="/dice" style={{width: "100px"}}>
        <Text color="background" style={{fontSize: "20px", color: "white"}}>Dice</Text>
      </StyledLink>
    <UIKitUserMenu account={account} avatarSrc={avatarSrc}>
      <WalletUserMenuItem hasLowBnbBalance={hasLowBnbBalance} onPresentWalletModal={onPresentWalletModal} />
      {/* <UserMenuDivider />
      <UserMenuItem as="button" onClick={onPresentTransactionModal}>
        {t('Transactions')}
      </UserMenuItem> */}
      {/* <UserMenuDivider />
      <ProfileUserMenuItem isLoading={isLoading} hasProfile={hasProfile} /> */}
      <UserMenuDivider />
      <UserMenuItem as="button" onClick={logout}>
        <Flex alignItems="center" justifyContent="space-between" width="100%">
          {t('Disconnect')}
          <LogoutIcon />
        </Flex>
      </UserMenuItem>
    </UIKitUserMenu>
    </>
  )
}

export default UserMenu
