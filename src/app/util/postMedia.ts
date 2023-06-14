import mediaApi from "app/api/mediaApi"

export async function postMedia(file: any) {
    let formData = new FormData()
    let model_id
    let original_url
    formData.append('file', file)
    const res = await mediaApi.postMedia(formData)
    if (res) {
        original_url = res.data.context.original_url
        model_id = res.data.context.model_id
    }
    return { original_url, model_id }
}