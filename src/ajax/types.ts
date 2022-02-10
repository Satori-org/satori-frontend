export default interface IPost<R = any> {
    code: number
    data: R
    msg: string
    error: boolean
}

export type IResArr<R = any> = {
    pageNo: number
    pageSize: number
    records: R[]
    total: number
}

export const getNotice = "/contract-provider/notice/list";
export type INotice = {
    createTime: string,
    id: number,
    title: string
    info: string
}
