/**
 * Created by radhabhambwani on 2017-08-17.
 */

import {Injectable} from "@angular/core";
import {Headers, Http, RequestMethod, RequestOptions, Response} from "@angular/http";
import {Observable, Subject} from "rxjs/Rx";
import {Content} from "../models/content";

@Injectable()
export class ContentService {

  constructor(private http: Http) {

  }

  public getContent(): Observable<Content> {
    return this.http.get("../assets/data.json")
      .map(res => <Content>res.json());
  }

}
