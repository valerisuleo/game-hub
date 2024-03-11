import http from '../api-client';

class HttpService {
    constructor(private url: string) {}
    getAll<T>() {
        const controller = new AbortController();
        const request = http.get<T[]>(this.url, { signal: controller.signal });

        return {
            request,
            cancel: () => controller.abort(),
        };
    }

    create<T>(item: T) {
        return http.post(this.url, item);
    }

    update<T>(id: number, item: T) {
        return http.put(`${this.url}/${id}`, item);
    }

    delete(id: number) {
        return http.delete(`${this.url}/${id}`);
    }
}

const create = (url: string) => new HttpService(url);

export default create;
