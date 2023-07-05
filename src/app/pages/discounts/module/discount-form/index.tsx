/* eslint-disable react-hooks/exhaustive-deps */
import './style.scss'
import Form from './form';
import { useParams } from 'react-router-dom';
import { useVerifyRoute } from 'app/hooks';
import { useQuery } from 'react-query';
import { QR_KEY } from 'common';
import { discountsApi } from 'app/api';
import TitlePage from 'components/TitlePage';
import { PageCircularProgress } from 'components';

function DiscountForm() {
    const { METHOD } = useVerifyRoute()
    const params: any = useParams()
    let isForm = "ADD";
    if (params && params.id) {
        isForm = "EDIT"
    }
    const { data, refetch, isLoading } = useQuery({
        queryKey: [[QR_KEY.DISCOUNT, params.id]],
        queryFn: () => discountsApi.getDiscountDetail({
            id: params.id
        }),
        enabled: params.id ? true : false
    })
    const discount = data?.context

    return (
        <>
            <TitlePage
                title={params?.id ? "Chỉnh thông tin giảm giá" : "Tạo mới mã giảm giá"}
            />
            <div className='post d-flex flex-column-fluid' id="kt_post">
                <div className="container">
                    {isLoading && <PageCircularProgress/>}
                    {(isForm === "ADD" || discount) &&
                        <Form
                            isForm={isForm}
                            discount={discount}
                            onRestoreFormEdit={refetch}
                        />
                    }
                </div>
            </div>
        </>
    );
}

export default DiscountForm;
export * from './export-code'