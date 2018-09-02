import React from 'react';
import ContentLoader from 'react-content-loader';

const Loader = props => (
    <ContentLoader height={652} width={1080} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb" {...props}>
        <rect x="0" y="0" rx="0" ry="0" width="180" height="36" />
        <rect x="0" y="52" rx="5" ry="5" width="100%" height="600" />
    </ContentLoader>
);

export default Loader;
