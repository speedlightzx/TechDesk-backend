export class HttpError extends Error {

    private code
    constructor(message:string, code:number) {
        super(message)
        this.name = 'HttpError'
        this.code = code
    }
}