import { ChangeEvent, useState } from "react";
import axios from "axios";
import { mediaBaseURL } from "app/api/api-3rd-client/client";

type Media = {
  mediaId: number;
  original_url: string;
}

type PostType = {
  e: ChangeEvent<HTMLInputElement>,
  callBack?: (data: Media[]) => void
}

export function usePostMedia() {
  const [medias, setMedias] = useState<Media[]>([])
  const handlePostMedia = async ({ e, callBack }: PostType) => {
    if (e.target.files) {
      try {
        const mediaList: Media[] = []
        for (var i = 0; i < e.target.files?.length; i++) {
          const fileItem = e.target.files[i]
          let formData = new FormData()
          let resMedia = {
            original_url: '',
            mediaId: i
          }
          formData.append('file', fileItem)
          const res: any = await axios.post(`${mediaBaseURL}/media`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          if (res) {
            resMedia = {
              original_url: res.original_url,
              mediaId: res.id
            }
          }
          mediaList.push(resMedia)
        }
        setMedias(mediaList)
        if (callBack) {
          callBack(mediaList)
        }
      } catch (error) {

      }
    }
  }
  return {
    medias,
    handlePostMedia
  }
}