/**
 * Created by radhabhambwani on 2017-08-17.
 */

import {Injectable} from "@angular/core";
import {Headers, Http, RequestMethod, RequestOptions, Response} from "@angular/http";
import {Observable, Subject} from "rxjs/Rx";
import {Post} from "../models/post";

@Injectable()
export class LikeService {


  constructor(private http: Http) {

  }

  public getPostLikes(): Observable<Post> {
    return this.http.get("../assets/posts.json")
      .map(res => <Post>res.json());
  }



}
