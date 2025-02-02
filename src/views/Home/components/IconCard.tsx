import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Card, CardBody, Box, CardProps, Heading } from '@multiplybnb/uikit'

const StyledCard = styled(Card)<{ background: string; rotation?: string }>`
  height: fit-content;
  padding: 1px 1px 4px 1px;
  box-sizing: border-box;

  ${({ theme }) => theme.mediaQueries.md} {
    ${({ rotation }) => (rotation ? `transform: rotate(${rotation});` : '')}
  }
`

const IconWrapper = styled(Box)<{ rotation?: string }>`
  position: absolute;
  top: 24px;
  right: 24px;

  ${({ theme }) => theme.mediaQueries.md} {
    ${({ rotation }) => (rotation ? `transform: rotate(${rotation});` : '')}
  }
`

interface IconCardProps extends IconCardData, CardProps {
  children: ReactNode
}

export interface IconCardData {
  icon: ReactNode
  title?: string
  color?: string
  background?: string
  borderColor?: string
  rotation?: string
}

const IconCard: React.FC<IconCardProps> = ({ icon, background, title, color, borderColor, rotation, children, ...props }) => {
  return (
    <StyledCard background={background} borderBackground={borderColor} rotation={rotation} {...props}>
      <CardBody>
        <Heading scale="xl" color={color}>{title}</Heading>
        <IconWrapper rotation={rotation}>{icon}</IconWrapper>
        {children}
      </CardBody>
    </StyledCard>
  )
}

export default IconCard
