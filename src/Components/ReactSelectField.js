import React from 'react';
import Select from 'react-select';
import { addField } from 'react-admin';
import _ from 'lodash';
import styled from 'styled-components';

const SelectWithError = styled(Select)`
    & > div {
        ${({ error }) =>
            error &&
            `
        border: 1px solid red;
  `}
    }
`;
const Error = styled.p`
    color: #ff0000;
    margin: 5px 0 0 0;
`;

const reactSelectField = ({ input, meta, options, getSelected, ...rest }) => {
    function handleBlur() {
        input.onBlur();
    }
    let selected;
    if (meta && meta.initial) {
        options.forEach(x => {
            if (x.value === meta.initial) {
                selected = x;
            }
        });
    }
    const onChange = value => {
        input.onChange(value);
        if (getSelected) {
            getSelected(value);
        }
    };

    return (
        <>
            <SelectWithError
                {...rest}
                {..._.omit(input, ['value'])}
                onBlur={handleBlur}
                options={options}
                // defaultValue={selected}
                value={typeof input.value === 'object' ? input.value : selected}
                error={meta.error && meta.touched ? true : false}
                onChange={onChange}
            />
            {meta.error && meta.touched ? <Error>{meta.error}</Error> : null}
        </>
    );
};

export default addField(reactSelectField);
