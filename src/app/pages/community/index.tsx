import { Avatar } from "@mui/material";
import { communityApi } from "app/api";
import { Post } from "app/interface";
import { QR_KEY } from "common";
import TitlePage from "components/TitlePage";
import { FC } from "react";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import "./style.scss"
import { PageCircularProgress, XSwitch } from "components";
import moment from "moment";
import { useSelector } from "react-redux";
import { IRoot } from "app/redux/interface";
import { KTSVG } from "_metronic/helpers";

function Community() {
  const { data, isLoading } = useQuery({
    queryKey: [QR_KEY.COMMUNITY],
    queryFn: () => communityApi.getAll({
      'limit': 15,
      'append': 'media_url',
      'sort': '-created_at'
    })
  })
  return (
    <>
      <TitlePage
        title="Cộng đồng và kiểm duyệt"
        element={
          <Link
            to={{ pathname: "/pages/community-form" }}
            className="btn btn-sm btn-primary"
          >
            Tạo mới bài viết
          </Link>}
      />
      <div className="card">
        <div className='card-header border-0 pt-5'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='card-label fw-bold fs-3 mb-1'>Bài viết</span>
            <span className='text-muted mt-1 fw-semobold fs-7'>{data?.total || 0} bài viết</span>
          </h3>
        </div>
        <div className='card-body py-3'>
          <div className='table-responsive'>
            <table className='table align-middle gs-0 gy-4'>
              <thead>
                <tr className='fw-bold text-muted bg-light'>
                  <th className='ps-4 min-w-200px rounded-start'>Tác giả</th>
                  <th className='min-w-300px'>Nội dung</th>
                  <th className='min-w-80px'>Trạng thái</th>
                  <th className='min-w-150px'>Gắn doanh nghiệp</th>
                  <th className='min-w-150px'>Gắn dịch vụ</th>
                  <th className='min-w-125px'>Tag</th>
                  <th className='min-w-100px'>Bình luận</th>
                  <th className='min-w-100px'>Yêu thích</th>
                  <th className='min-w-100px'>Cập nhật</th>
                  <th className='min-w-100px'>Ngày đăng</th>
                  <th className='min-w-100px'></th>
                </tr>
              </thead>
              <tbody>
                {
                  data?.data?.map(i => (
                    <PostItem key={i.id} post={i} />
                  ))
                }
              </tbody>
            </table>
            <PageCircularProgress loading={isLoading} />
          </div>
        </div>
      </div>
    </>
  );
}

export default Community;

const PostItem: FC<{ post: Post }> = ({ post }) => {
  const navigate = useNavigate()
  const { USER } = useSelector((state: IRoot) => state.ACCOUNT)
  return (
    <tr>
      <td>
        <div className='d-flex align-items-center'>
          <div className='symbol symbol-50px me-5'>
            <Avatar src={post.user?.avatar || post.user?.fullname} alt="" />
          </div>
          <div className='d-flex justify-content-start flex-column'>
            <span className='text-dark fw-bold mb-1 fs-6'>
              {post.user?.fullname}
            </span>
          </div>
        </div>
      </td>
      <td>
        <span className="post-content">{post.content}</span>
      </td>
      <td>
        <XSwitch value={post.status === 1 ? true : false} label="" />
      </td>
      <td>
        <div className="d-flex align-items-center">
          <Avatar className="me-1" src={post.organization?.image_url || post.organization?.name} />
          <span>{post.organization?.name}</span>
        </div>
      </td>
      <td>
        <span className='d-block fs-7'>
          {post.list_service.map(i => i.service_name).join(', ')}
        </span>
      </td>
      <td>
        <span className="badge badge-success">{post.tag?.name}</span>
      </td>
      <td>
        <span className='text-center d-block fs-6'>
          {post.comment_count}
        </span>
      </td>
      <td>
        <span className='text-center d-block fs-6'>
          {post.favorite_count}
        </span>
      </td>
      <td>
        <span> {moment(post.updated_at).format('DD/MM/YYYY')}</span>
      </td>
      <td>
        <span> {moment(post.created_at).format('DD/MM/YYYY')}</span>
      </td>
      <td>
        <div className="d-flex">
          <button
            onClick={() => navigate(`/pages/community/${post.id}`)}
            className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 btn-co'
          >
            <i className="bi bi-eye-fill"></i>
          </button>
          {
            post.user_id === USER?.id &&
            <button
              onClick={() => navigate(`/pages/community/${post.id}`)}
              className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 btn-co'
            >
              <i className='bi bi-pencil-fill fs-6'></i>
            </button>
          }
          <button
            onClick={() => navigate(`/pages/community/${post.id}`)}
            className='btn btn-bg-light btn-color-muted btn-active-color-primary btn-sm px-4 btn-co'
          >
            <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
          </button>
        </div>
      </td>
    </tr>
  )
}