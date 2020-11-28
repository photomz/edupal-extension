/* eslint-disable react/jsx-props-no-spreading */
import React, { Suspense } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Skeleton from '@material-ui/lab/Skeleton';

const LazyAvatar = (props) => (
  <Suspense fallback={<Skeleton variant="circle" />}>
    <Avatar {...props} />
  </Suspense>
);

export default LazyAvatar;
