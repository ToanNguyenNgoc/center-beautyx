import TitlePage from "components/TitlePage";
import "./form.scss"
import { useFormik } from "formik";
import { MenuItem, Select } from "@mui/material";
import { IMGS } from "_metronic/assets/imgs/imgs";
import { LoadingButton } from "@mui/lab";

function PushNotificationForm() {
  const { values, errors, setFieldValue, handleChange, handleSubmit } = useFormik({
    initialValues: {
      title: '',
      content: '',
      type: '',
      link: ''
    },
    onSubmit: (values) => {

    }
  })
  return (
    <>
      <TitlePage title="Thông báo" />
      <div className='post d-flex flex-column-fluid' id="kt_post">
        <div className="notification-cnt">
          <form onSubmit={handleSubmit} className="form-left">
            <div className="column">
              <div className="required form-label">Tiêu đề</div>
              <input
                value={values.title}
                onChange={handleChange}
                type="text"
                name="title"
                className="form-control form-control-solid mt-1 mb-4"
              />
            </div>
            <div className="column">
              <div className="required form-label">Nội dung thông báo</div>
              <input
                value={values.content}
                onChange={handleChange}
                type="text"
                name="content"
                className="form-control form-control-solid mt-1 mb-4"
              />
            </div>
            <div className="column mb-4">
              <div className="required form-label">Thông báo cho</div>
              <Select
                size="small"
                name="type"
                value={values.type}
                onChange={handleChange}
              >
                <MenuItem value={"ORGANIZATION"}>Doanh nghiệp</MenuItem>
                <MenuItem value={"DEAL"}>Deal</MenuItem>
                <MenuItem value={"PROMOTION"}>Campaign promotion</MenuItem>
              </Select>
            </div>
            <div className="column">
              <div className="required form-label">Đường dẫn</div>
              <input
                value={values.link}
                onChange={handleChange}
                type="text"
                name="link"
                className="form-control form-control-solid mt-1 mb-4"
              />
            </div>
            <div className="d-flex justify-content-end mt-6">
              <LoadingButton type="submit" variant="contained" color="success" >
                Push thông báo
              </LoadingButton>
            </div>
          </form>
          <div className="preview-right">
            <span className="title">Giao diện thông báo</span>
            <div className="device-cnt">
              <div className="device">
                <img className="device-img" src={IMGS.android} alt="" />
                <div className="device-noti">
                  <div className="item">
                    <div className="item-icon">
                      <img src={IMGS.beautyxIcon} alt="" />
                    </div>
                    <div className="item-right">
                      <p className="item-right-title">{values.title}</p>
                      <p className="item-right-content">{values.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="device-cnt">
              <div className="device">
                <img className="device-img" src={IMGS.iphone} alt="" />
                <div className="device-noti" style={{ marginTop: '50px' }}>
                  <div className="item">
                    <div className="item-icon">
                      <img src={IMGS.beautyxIcon} alt="" />
                    </div>
                    <div className="item-right">
                      <p className="item-right-title">{values.title}</p>
                      <p className="item-right-content">{values.content}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PushNotificationForm;