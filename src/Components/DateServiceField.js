import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 700px;
`;

const Title = styled.p`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  color: rgba(0, 0, 0, 0.54);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.00938em;
`;

const P = styled.p`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  font-size: 0.875rem;
  line-height: 20px;
`;

export const DateServiceField = ({ source, record = {}, label, showTitle = false }) => {
  return (
    <Wrapper>
      {showTitle && <Title>{label || source}</Title>}
      <P>{record['serviceId'].nameEN}</P>
    </Wrapper>
  );
};

DateServiceField.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};
