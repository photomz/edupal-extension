import React from 'react';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Skeleton from '@material-ui/lab/Skeleton';

const StyledCard = styled(Card)`
  padding-bottom: ${({ theme }) => theme.spacing(1)};
`;

const CardSkeleton = () => (
  <StyledCard>
    <CardHeader
      avatar={<Skeleton variant="circle" width={40} height={40} />}
      title={<Skeleton height={10} width="80%" style={{ marginBottom: 6 }} />}
      subheader={<Skeleton height={10} width="40%" />}
      action={<Skeleton variant="circle" width={24} height={24} />}
    />
    <Skeleton variant="rect" style={{ height: 190 }} />

    <CardContent>
      <Skeleton height={10} style={{ marginBottom: 6 }} />
      <Skeleton height={10} width="80%" />
    </CardContent>
  </StyledCard>
);

export default CardSkeleton;
