import { ChangeEvent, useState } from "react";
import { request3rdApi } from "app/api/api-3rd-client";
import { mediaApi } from "app/api";
import { Media } from "app/interface";

type PostType = {
  e: ChangeEvent<HTMLInputElement>,
  callBack?: (data: Media[]) => void,
  resetOriginalResult?: boolean,
  version?: 'myspa' | 'api.beautyx' | 'api.beautyx/cloud'
}

export function usePostMedia() {
  const [medias, setMedias] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const handlePostMedia = async ({ e, callBack, version = 'myspa', resetOriginalResult }: PostType) => {
    if (e.target.files) {
      setIsLoading(true)
      let tempImages: Media[] = []
      for (var j = 0; j < e.target.files?.length; j++) {
        const item = {
          id: -j,
          model_id: -j,
          original_url: URL.createObjectURL(e.target.files[j]),
          mime_type: e.target.files[j].type
        }
        tempImages.push(item)
      }
      if (callBack) { callBack(tempImages) }
      try {
        const mediaList: Media[] = []
        for (var i = 0; i < e.target.files?.length; i++) {
          const fileItem = e.target.files[i]
          let formData = new FormData()
          let resMedia: Media = {
            id: i,
            original_url: URL.createObjectURL(fileItem),
            model_id: i,
            mime_type: e.target.files[i].type
          }
          formData.append('file', fileItem)
          let res: any
          if (version === 'api.beautyx') {
            res = await request3rdApi.media(formData).then(res => res.data)
          }
          if (version === 'api.beautyx/cloud') {
            res = await request3rdApi.mediaCloud(formData).then(res => res.data)
          }
          if (version === 'myspa') {
            res = await mediaApi.postMedia(formData).then(res => res.data.context)
          }
          if (res) {
            resMedia = {
              ...resMedia,
              id: res.id,
              model_id: res.model_id,
              original_url: resetOriginalResult ? res.original_url : resMedia.original_url
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