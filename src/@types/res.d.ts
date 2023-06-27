export type ResponseList<D> = {
  current_page: string;
  data: D,
  next_page: number;
  prev_page: number;
  total: number;
  last_page: number;
  currentPage: number;
  currentItemCount: number;
}
export type ResponseDetail<D> = {
  context: D
}