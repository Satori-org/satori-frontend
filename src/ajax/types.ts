export default interface IPost<R = any> {
    code: number
    data: R
    message: string
    success: boolean
    time: string
}
