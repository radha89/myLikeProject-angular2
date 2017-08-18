import {Component, OnInit} from '@angular/core';
import {ContentService} from '../../../providers/content.service';
import {LikeService} from '../../../providers/likes.service';
import {Content} from "../../../models/content";
import {Post} from "../../../models/post";
import {Output} from "../../../models/output";


@Component({
  selector: 'home',
  styleUrls: ['./home.component.css'],
  templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  username:string = "Radha";

  contentData;
  postsData;

  contentArray:Content[] = [];
  postsArray:Post[] = [];

  expectedOutput:Output[] = [];

  finalArray:any[] = [];


  constructor(private contentService:ContentService, private likeService:LikeService) {

  }

  ngOnInit() {
    this.contentService.getContent().subscribe(
      data => this.initContentData(data),
      error => console.log(error),
      () => {
        this.likeService.getPostLikes().subscribe(
          data => this.initPostsData(data),
          error => console.log(error),
          () => {
            console.log(this.postsArray);
            this.getLikes();
          }
        );
      }
    );
  }

  initContentData(data) {
    this.contentData = data;
    for(var i = 0; i < this.contentData.length; i++) {
      this.contentArray.push(this.contentData[i]);
    }
  }

  initPostsData(data) {
    this.postsData = data;
    for(var i = 0; i < this.postsData.length; i++) {
      this.postsArray.push(this.postsData[i]);
      this.postsArray[i].iLike = false;
    }
  }

  isPostLiked(post) {
    post.iLike = !post.iLike;
    console.log(post.id);
    for(let i = 0;i < this.postsArray.length; i++) {
      if(post.id == this.postsArray[i].id) {
        this.postsArray[i].iLike = !this.postsArray[i].iLike;
        if (this.postsArray[i].iLike) {
          this.postsArray[i].likes.unshift("You");
          console.log(this.postsArray[i]);
        }
        else {
          this.postsArray[i].likes.splice(0, 1);
          console.log(this.postsArray[i]);
        }
      }
    }
  }

  getIconStyle(post) {
    return post.iLike ? "blue" : "";
  }


  getLikes() {
    this.expectedOutput = [];
    this.finalArray = [];
    for(let i = 0; i < this.postsArray.length; i++) {
      if(this.postsArray[i].likes.length < 1) {
        this.expectedOutput.push({
          id: this.postsArray[i].id,
          text: 'No one likes this'
        });
      }
      else {
        if(this.postsArray[i].likes.length === 1) {
          this.expectedOutput.push({
            id: this.postsArray[i].id,
            text: this.postsArray[i].likes[0] + " likes this"
          });
        }
        else if(this.postsArray[i].likes.length === 2) {
          this.expectedOutput.push({
            id: this.postsArray[i].id,
            text: this.postsArray[i].likes[0] + " and " + this.postsArray[i].likes[1] + " like this"
          });
        }
        else if(this.postsArray[i].likes.length === 3) {
          this.expectedOutput.push({
            id: this.postsArray[i].id,
            text: this.postsArray[i].likes[0] + ", " + this.postsArray[i].likes[1] + " and " + this.postsArray[i].likes[2] + " like this"
          });
        } else {
          this.expectedOutput.push({
            id: this.postsArray[i].id,
            text: this.postsArray[i].likes[0] + ", " + this.postsArray[i].likes[1] + " and " + (this.postsArray[i].likes.length - 2) + " others like this"
          });
        }
      }
    }

    for(var i = 0; i < this.contentArray.length; i++) {
      this.finalArray.push({
        id: this.postsArray[i].id,
        title: this.contentArray[i].title,
        image: this.contentArray[i].image,
        iLike: this.postsArray[i].iLike,
        likesText: this.expectedOutput[i].text
      });
    }
  }
}



