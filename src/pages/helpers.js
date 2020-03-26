import React from 'react';

export const SectionTitle = ({ action, record }) => {
  return (
    <span>
      {action} {record ? `"${record.email}"` : ''}
    </span>
  );
};
