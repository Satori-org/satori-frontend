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
