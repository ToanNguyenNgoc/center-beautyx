import React from 'react';
import TitlePage from 'components/TitlePage';
import { useVerifyRoute, useSwr } from 'app/hooks'
import { API_ROUTE } from 'app/api/api-route';
import { useParams } from 'react-router-dom';
import { IPermission } from 'app/interface'

function Permissions() {
    const params: any = useParams()
    const id = params.id
    const { response } = useSwr(true, API_ROUTE.ROLES_ID_PERMISSIONS(id))
    console.log(response)
    const permissions: IPermission[] = response ?? []
    return (
        <>
            <TitlePage
                title='Phân quyền'
            />
            <div>
                {JSON.stringify(response)}
            </div>
        </>
    );
}

export default Permissions;