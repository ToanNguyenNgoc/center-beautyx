import { ChangeEvent, useState } from "react";
import { request3rdApi } from "app/api/api-3rd-client";
import { mediaApi } from "app/api";

type Media = {
  model_id: number;
  original_url: string;
  model_type: string
}

type PostType = {
  e: ChangeEvent<HTMLInputElement>,
  callBack?: (data: Media[]) => void,
  version?: 'myspa' | 'api.beautyx' | 'api.beautyx/cloud'
}

export function usePostMedia() {
  const [medias, setMedias] = useState<Media[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const handlePostMedia = async ({ e, callBack, version = 'myspa' }: PostType) => {
    if (e.target.files) {
      setIsLoading(true)
      let tempImages: Media[] = []
      for (var j = 0; j < e.target.files?.length; j++) {
        const item = {
          model_id: -j,
          original_url: URL.createObjectURL(e.target.files[j]),
          model_type: e.target.files[j].type
        }
        tempImages.push(item)
      }
      if (callBack) { callBack(tempImages) }
      try {
        const mediaList: Media[] = []
        for (var i = 0; i < e.target.files?.length; i++) {
          const fileItem = e.target.files[i]
          let formData = new FormData()
          let resMedia = {
            original_url: URL.createObjectURL(fileItem),
            model_id: i,
            model_type: e.target.files[i].type
          }
          formData.append('file', fileItem)
          let res: any
          if (version === 'api.beautyx') {
            res = await request3rdApi.media(formData)
          }
          if (version === 'api.beautyx/cloud') {
            res = await request3rdApi.mediaCloud(formData)
          }
          if (version === 'myspa') {
            res = await mediaApi.postMedia(formData).then(res => res.data.context)
          }
          if (res) {
            resMedia = { ...resMedia, model_id: res.model_id }
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