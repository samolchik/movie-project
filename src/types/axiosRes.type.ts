import {AxiosPromise} from "axios";

export type IRes<T> = Promise<AxiosPromise<T>>;