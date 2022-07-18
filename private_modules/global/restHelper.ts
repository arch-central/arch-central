import axios, { AxiosError, AxiosResponse, Method } from "axios"

export interface RestHelperData {
    host: string
    port: number
    api: number
    auth?: string
}

export interface RestHelperResponse<T> {
    message: string,
    status: number,
    data: T[] | null
    isValid: boolean
}

export default class RestHelper {

    static restData: RestHelperData = { host: process.env.API_HOST, port: 3000, api: 1}
    
    static SET = (host: string, port: number = 3000) => {
        this.restData.host = host
        this.restData.port = port
    }

    static SETAUTH = (token: string) => this.restData.auth = "Bearer " + token

    static URL = (path: string) => `http://${this.restData.host}:${this.restData.port}/api/${this.restData.api}${path}`

    static ToJSON = (val: string) => {
        try {
            return { valid: true, json: JSON.parse(val) }
        }
        catch (e) {
            return { valid: false, json: {} }
        }
    }

    static AnyArrToType = <T>(data: any) : T[] => {
        var vals: T[] = []

        data.forEach((v: any) => {
            vals.push(v)
        });

        return vals
    }

    static jsonToResponse = <T>(json: AxiosResponse<any, any>) : RestHelperResponse<T> => {
        if (!json.data.error || !json.data.message || !json.data.status)
            return { message: "", data: [], isValid: false, status: 0 }

        var data: T[] =  []

        if (json.data.data) {
            if (Array.isArray(json.data.data))
                data = this.AnyArrToType(json.data.data)
            else
                data = [json.data.data]           
        }

        return {
            message: json.data.message,
            data,
            status: json.data.status,
            isValid: true
        }
    }

    static REQUEST = <T>(path: string, data: any, method: Method, callback: (data: RestHelperResponse<T>) => void) => {
        axios(this.URL(path), { params: data, method, headers: { ...(this.restData.auth ? { Authorization: this.restData.auth } : {}) } }).then(
        (response) => {
            callback(this.jsonToResponse(response))
        }, (err: AxiosError) => {
            callback(err.response ? this.jsonToResponse(err.response) : {
                message: "",
                status: 0,
                data: null,
                isValid: false
            })
        })
    }

    static GET = <T>(path: string, data: any, callback: (data: RestHelperResponse<T>) => void) => this.REQUEST(path, data, 'GET', callback)
    static POST = <T>(path: string, data: any, callback: (data: RestHelperResponse<T>) => void) => this.REQUEST(path, data, 'POST', callback)
    static DELETE = <T>(path: string, data: any, callback: (data: RestHelperResponse<T>) => void) => this.REQUEST(path, data, 'DELETE', callback)
    static GET_URL = (path: string) => this.URL(path);
}