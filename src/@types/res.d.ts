export type ResponseList<D> = {
  current_page: string;
  data: D,
  next_page: number;
  prev_page: number;
  total: number;
  last_page: number
}
export type ResponseDetail<D> = {
  context: D
}