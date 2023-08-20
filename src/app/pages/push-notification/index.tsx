import TitlePage from "components/TitlePage";
import { Link } from "react-router-dom";

function PushNotification() {
  return (
    <>
      <TitlePage
        element={
          // METHOD?.includes("POST") &&
          <Link
            to={{ pathname: "/pages/push-notifications-form" }}
            className="btn btn-sm btn-primary"
          >
            Tạo mới thông báo
          </Link>
        }
        title="Danh sách thông báo"
      />
    </>
  );
}

export default PushNotification;