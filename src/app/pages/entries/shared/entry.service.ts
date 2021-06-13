import { Injectable, Injector } from '@angular/core';
import { BaseResourceService } from "../../../shared/service/base-resource.service";

import { Observable } from "rxjs";
import { mergeMap } from "rxjs/operators";

import { CategoryService } from "../../categories/shared/category.service";
import { Entry } from './entry.model';

@Injectable({providedIn: 'root'})
export class EntryService extends BaseResourceService<Entry> {

    constructor(protected injector : Injector, private categoryService : CategoryService ) {
        super("api/entries", injector, Entry.fromJson);

    }   

    create(entry : Entry) : Observable<Entry> {
       return this.SetCategoryAndSendToServer(entry, super.create);
    }

    update(entry : Entry) : Observable<Entry> {        
        return this.SetCategoryAndSendToServer(entry, super.update);
    }

    private SetCategoryAndSendToServer(entry: Entry, sendFn: any) : Observable<any> {

        return this.categoryService.getBydId(entry.categoryId).pipe(
            mergeMap(category => {
                entry.category = category;
                    return sendFn(entry)
                })
        )

    }
    
}