/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SetupService {
    currentPageInfo: any;

    private readonly currentPage = new BehaviorSubject<string>(
        'art'
    );
    readonly currentPage$ = this.currentPage.asObservable();
    initialized: any;
 
    get current(): string {
        return this.currentPage.getValue();
    }

    set current(val: string) {
        this.currentPage.next(val);
    }

    constructor(private api: ApiService) {}

    async getPageData(pagename: string) {

        const data = await this.api.loadPageData(pagename);

        this.currentPageInfo = data;
         if (this.currentPageInfo?.color) {
            document.documentElement.style.setProperty(
                '--accent',
                this.currentPageInfo?.color
            );
        }
        return this.currentPageInfo;
    }

 

 
}
