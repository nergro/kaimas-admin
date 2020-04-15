import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Wrapper = styled.div`
  max-width: 70vw;
`;

const Title = styled.p`
  font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
  color: rgba(0, 0, 0, 0.54);
  font-size: 1rem;
  font-weight: 400;
  line-height: 1;
  letter-spacing: 0.00938em;
`;

const Images = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImageWrapper = styled.div`
  width: 240px;
  height: 160px;
  margin: 15px 15px 0 0;
`;

const Image = styled.img`
  margin: 0.5rem;
  width: 100%;
  height: 100%;
`;

export const MultiImageField = ({ source, record = {}, label }) => {
  return (
    <Wrapper>
      <Title>{label || source}</Title>
      <Images>
        {record[source] &&
          record[source].map((image) => (
            <ImageWrapper key={image.imageId}>
              <Image src={image.url} />
            </ImageWrapper>
          ))}
      </Images>
    </Wrapper>
  );
};

MultiImageField.propTypes = {
  label: PropTypes.string,
  record: PropTypes.object,
  source: PropTypes.string.isRequired,
};
