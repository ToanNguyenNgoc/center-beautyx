export const rYoutube = /^(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([A-Za-z0-9_-]{11})$/;
export const testLinkYoutube = (link: string) => {
  let embedLink = ''
  let isYoutubeLink = false
  if (rYoutube.test(link)) {
    isYoutubeLink = true
    const id: any = link.match(rYoutube)
    embedLink = `https://www.youtube.com/embed/${id[1]}?autoplay=1&mute=1&loop=1&color=white&controls=0`
  }
  return { embedLink, isYoutubeLink }
}