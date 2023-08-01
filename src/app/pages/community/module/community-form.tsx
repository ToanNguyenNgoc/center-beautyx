import TitlePage from "components/TitlePage";
import { ChangeEvent, FC, useEffect, useRef } from "react";
import { useFormik } from "formik";
import { LoadingButton } from "@mui/lab";
import { AppSnack, SelectionOrg } from "components";
import { IOrganization, IService, Media } from "app/interface";
import { accept_image, accept_video } from "app/util";
import { useMessage, usePostMedia } from "app/hooks";
import { Chip, CircularProgress, Tooltip } from "@mui/material";
import { SelectService } from "app/pages/discounts/module/discount-form/select-service";
import "../style.scss"
import { useMutation } from "react-query";
import { communityApi } from "app/api";
import { ReqPostBody } from "@types";

interface InitialValues {
  content: string;
  organization: IOrganization | undefined;
  media: Media[];
  services: IService[]
}

const CommunityForm: FC = () => {
  const { handlePostMedia } = usePostMedia()
  const { resultLoad, noti, onCloseNoti } = useMessage()
  const { mutate, isLoading, } = useMutation({
    mutationFn: (body: ReqPostBody) => communityApi.post(body),
    onSuccess: () => {
      resultLoad({ message: 'Đăng bài thành công', color: 'success' })
    },
    onError: () => {
      resultLoad({ message: 'Đăng bài thất bại', color: 'error' })
    }
  })
  const formik = useFormik<InitialValues>({
    initialValues: {
      content: '',
      organization: undefined,
      media: [],
      services: []
    },
    onSubmit: (values) => {
      if (values.organization) {
        mutate({
          content: values.content,
          organization_id: values.organization.id,
          media_ids: values.media.map(i => i.model_id),
          service_ids: values.services.map(i => i.id),
          status: 1,
          tag_id:2
        })
      }
    }
  })
  const onChangeMedia = (e: ChangeEvent<HTMLInputElement>) => {
    handlePostMedia({
      e,
      callBack: (data) => {
        formik.setFieldValue('media', [...data, ...formik.values.media])
      }
    })
  }

  return (
    <>
      <AppSnack
        open={noti.openAlert}
        close={onCloseNoti}
        message={noti.message}
        severity={noti.color}
      />
      <TitlePage title="Tạo mới bài viết" />
      <div className='d-flex flex-column-fluid' id="kt_post">
        <div className="form-cnt">
          <form onSubmit={formik.handleSubmit} autoComplete="off" className="form">
            <div className="mt-4">
              <label className="required form-label">Nội dung bài viết</label>
              <Textarea
                name="content"
                value={formik.values.content}
                onChange={formik.handleChange}
              />
            </div>
            <div className="mt-4">
              <label className="required form-label">Ảnh/video</label>
              <div className="grid-images my-1">
                {
                  formik.values.media.map(i => (
                    <div key={i.model_id} className="item-image">
                      {i.model_type === "video/mp4" ? <video controls ><source src={i.original_url} /></video> : <img src={i.original_url} alt="" />}
                      {
                        i.model_id > 0 ?
                          <Chip color="error" variant="filled"
                            onDelete={() => formik.setFieldValue('media', formik.values.media.filter(a => a.model_id !== i.model_id))}
                          />
                          :
                          <div className="item-image-load d-flex justify-content-center align-items-center">
                            <CircularProgress size={26} />
                          </div>
                      }
                    </div>
                  ))
                }
              </div>
              <div>
                <input hidden id="media" onChange={onChangeMedia} type="file" accept={`${accept_image}, ${accept_video}`} multiple />
                <Tooltip title='Tải lên ảnh/video' placement="top" >
                  <label htmlFor="media" className="btn btn-icon btn-success btn-upload"><i className="bi bi-file-earmark-plus-fill"></i></label>
                </Tooltip>
              </div>
            </div>
            <div className="mt-4">
              <SelectionOrg
                required
                setOrigin={(e) => { formik.setFieldValue('organization', e); formik.setFieldValue('services', []) }}
                origin={formik.values.organization}
                organization_id={formik.values.organization?.id}
              />
            </div>
            <div className="mt-4">
              <SelectService
                orgsChoose={formik.values.organization ? [formik.values.organization] : []}
                values={formik.values.services}
                onChangeService={(e) => formik.setFieldValue('services', e)}
              />
            </div>
            <div className="d-flex justify-content-end mt-3">
              <LoadingButton loading={isLoading} type="submit" variant="contained" color="success" size="large" >
                Tạo mới bài viết
              </LoadingButton>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
export default CommunityForm


const Textarea: FC<{ name?: string, value?: string, onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void }> = ({
  name = '',
  value = '',
  onChange = () => { }
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const resizeTextArea = () => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      if (value.length > 0) {
        textAreaRef.current.style.height =
          textAreaRef.current.scrollHeight + "px";
      }
    }
  };
  useEffect(resizeTextArea, [value.length]);
  return (
    <textarea
      ref={textAreaRef}
      className="form-control form-control-solid"
      name={name}
      value={value}
      onChange={onChange}
      placeholder="Nội dung của bài viết"
      autoFocus
    />
  )
}