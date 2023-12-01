import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

export class HttpError extends Error {
  code: number;
  url: string;

  constructor(code: number, url: string, message?: string) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
    this.name = HttpError.name;
    this.url = url;
    this.code = code;
  }
}


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  PageList: any;
  PageUrl!:string;
  resetUrl!: string;
 
  errorMessage: any;
  constructor(
    private http: HttpClient
  ) {

  }

  async download(url: string, options = {}) {
    console.log(url);
    
    const response = await fetch(url, options);
    const json = await response.json();

    if (response.status !== 200) {
      if (json && json.status) {
        throw new HttpError(json.status, url, JSON.stringify(json));
      } else {
        throw new HttpError(response.status, url, response.statusText);
      }
    }

    return json;
  }

  async downloadRelative(path: string, options = {}) {
    return this.download(this.PageUrl + path, options);
  }

  async request(url: RequestInfo | URL, options = {}) {
    const response = await fetch(url, options);
    return response;
  }

  async requestRelative(path: string, options = {}) {
    const response = await fetch(this.PageUrl + path, options);
    return response;
  }

  async loadPageData(pagename: string) {
    return this.download(`${window.location.origin}/assets/data/${pagename}.json`);
  }
}
