import React, {Fragment, useEffect, useState} from 'react';

import Grid from '@material-ui/core/Grid';

import Select from 'react-select';

export default function SelectActivity() {
        const [valueArray, setValueArray] = useState('')
        useEffect(() => {
            fetch('/api/activities_list', {
                method: 'get',
            }).then(r => r.json()).then(value => setValueArray(value.message))
        }, [])
        return (
            <Grid item xs={6} sm={3}>
                <Fragment>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        defaultValue={"Activity"}
                        isDisabled={false}
                        isLoading={false}
                        isClearable={false}
                        isRtl={false}
                        isSearchable={true}
                        name="color"
                        options={valueArray}
                    />
                </Fragment>
            </Grid>
        );
}
