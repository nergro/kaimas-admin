import React from 'react';
import Select from 'react-select';
import { addField } from 'react-admin';
import _ from 'lodash';

const reactSelectField = ({ input, meta, options, selected, ...rest }) => {
    function handleBlur() {
        input.onBlur();
    }
    return (
        <Select
            {...rest}
            {..._.omit(input, ['value'])}
            onBlur={handleBlur}
            options={options}
            defaultValue={selected}
        />
    );
};

export default addField(reactSelectField);
