import { ChangeEvent, useState } from "react";
import { request3rdApi } from "app/api/api-3rd-client";
import { mediaApi } from "app/api";

type Media = {
  mediaId: number;
  original_url: string;
}

type PostType = {
  e: ChangeEvent<HTMLInputElement>,
  callBack?: (data: Media[]) => void,
  version?: 'myspa' | 'media.beautyx' | 'media.beautyx/cloud'
}

export function usePostMedia() {
  const [medias, setMedias] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const handlePostMedia = async ({ e, callBack, version = 'myspa' }: PostType) => {
    if (e.target.files) {
      setIsLoading(true)
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
          let res: any
          if (version === 'media.beautyx') {
            res = await request3rdApi.media(formData)
          }
          if (version === 'media.beautyx/cloud') {
            res = await request3rdApi.mediaCloud(formData)
          }
          if (version === 'myspa') {
            res = await mediaApi.postMedia(formData).then(res => res.data.context)
          }
          if (res) {
            resMedia = {
              original_url: res.original_url,
              mediaId: res.id
            }
          }
          mediaList.push(resMedia)
        }
        setMedias(mediaList)
        setIsLoading(false)
        if (callBack) {
          callBack(mediaList)
        }
      } catch (error) {

      }
    }
  }
  return {
    medias,
    handlePostMedia,
    isLoading
  }
}