import React from 'react';
import { useVerifyRoute } from 'app/hooks'

function OrgDetail() {
    const { METHOD } = useVerifyRoute()
    console.log(METHOD)
    return (
        <div>
            OrgDetail
        </div>
    );
}

export default OrgDetail;