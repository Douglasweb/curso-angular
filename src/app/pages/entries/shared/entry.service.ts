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

        return this
            .categoryService
            .getBydId(entry.categoryId).pipe(
                mergeMap(category => {
                    entry.category = category;
                    return super.create(entry);
                    }
                    )
            )
    }

    update(entry : Entry) : Observable<Entry> {        

        return this
            .categoryService
            .getBydId(entry.categoryId).pipe(
                mergeMap(category => {
                    entry.category = category; 
                    return super.update(entry);
                    }
                )
            )

    }
    
}