export interface paginationResponse<T> {
  pageNo: number;
  pageSize: number;
  total: number;
  data: T;
  success: boolean;
}
