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

  contentData;
  postsData;

  contentList:Content[] = [];
  postsList:Post[] = [];

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
            console.log(this.postsList);
            this.getLikes();
          }
        );
      }
    );
  }

  initContentData(data) {
    this.contentData = data;
    this.contentData.forEach(content => {
      this.contentList.push(content);
    });
  }

  initPostsData(data) {
    this.postsData = data;
    for(let i = 0; i < this.postsData.length; i++) {
      this.postsList.push(this.postsData[i]);
      this.postsList[i].iLike = false;
    }
  }

  isPostLiked(post) {
    post.iLike = !post.iLike;
    console.log(post.id);
    for(let i = 0;i < this.postsList.length; i++) {
      if(post.id == this.postsList[i].id) {
        this.postsList[i].iLike = !this.postsList[i].iLike;
        if (this.postsList[i].iLike) {
          this.postsList[i].likes.unshift("You");
          console.log(this.postsList[i]);
        }
        else {
          this.postsList[i].likes.splice(0, 1);
          console.log(this.postsList[i]);
        }
      }
    }
  }

  getIconStyle(post) {
    return post.iLike ? "blue" : "";
  }

  finalizeArray() {
    for(let i = 0; i < this.contentList.length; i++) {
      this.finalArray.push({
        id: this.postsList[i].id,
        title: this.contentList[i].title,
        image: this.contentList[i].image,
        iLike: this.postsList[i].iLike,
        likesText: this.expectedOutput[i].text
      });
    }
  }


  getLikes() {
    this.expectedOutput = [];
    this.finalArray = [];
    for(let i = 0; i < this.postsList.length; i++) {
      if(this.postsList[i].likes.length < 1) {
        this.expectedOutput.push({
          id: this.postsList[i].id,
          text: 'No one likes this'
        });
      }
      else {
        if(this.postsList[i].likes.length === 1) {
          this.expectedOutput.push({
            id: this.postsList[i].id,
            text: this.postsList[i].likes[0] + " likes this"
          });
        }
        else if(this.postsList[i].likes.length === 2) {
          this.expectedOutput.push({
            id: this.postsList[i].id,
            text: this.postsList[i].likes[0] + " and " + this.postsList[i].likes[1] + " like this"
          });
        }
        else if(this.postsList[i].likes.length === 3) {
          this.expectedOutput.push({
            id: this.postsList[i].id,
            text: this.postsList[i].likes[0] + ", " + this.postsList[i].likes[1] + " and " + this.postsList[i].likes[2] + " like this"
          });
        } else {
          this.expectedOutput.push({
            id: this.postsList[i].id,
            text: this.postsList[i].likes[0] + ", " + this.postsList[i].likes[1] + " and " + (this.postsList[i].likes.length - 2) + " others like this"
          });
        }
      }
    }
    this.finalizeArray();
  }
}



