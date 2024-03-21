import React from 'react';

export const ContextProviderComposer = ({ contexts, children }) => {
    return contexts.reduceRight(
        (kids, parent) => React.cloneElement(parent, { children: kids }),
        children
    );
};
