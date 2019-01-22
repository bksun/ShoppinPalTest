import { Injectable } from '@angular/core';
import { Post } from '../posts/post.model';
import { HttpClient } from '@angular/common/http';

import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class PostsService {

private  posts: Post[] = [];
private postsUpdated = new Subject<Post[]>();

  constructor( public http: HttpClient) { }

  getPosts() {
    this.http.get<{ message: string; posts: any}>('http://localhost:3000/api/posts')
    .pipe(map( (postData) => {
      return postData.posts.map( post => {
        return {
          title: post.title,
          content: post.content,
          id: post._id
        };
      });
    }))
    .subscribe(( transformedPosts) => {
      this.posts = transformedPosts;
      this.postsUpdated.next([...this.posts]);
    });
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

   customFun( post ) {
    return {
      title: post.title,
      content: post.content,
      id: post._id
    };
  }

  addPost( title: string, content: string) {
    const post: Post = { id: null, title: title, content: content};
    this.http.post<{message: string, createdId: string}>('http://localhost:3000/api/posts', post)
    .subscribe((postData ) => {
      console.log(postData);
      post.id = postData.createdId;
      this.posts.push(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

  deletePost(postId: string) {
    this.http.delete<{message: string}>('http://localhost:3000/api/posts/' + postId)
    .subscribe( ( message) => {
      this.posts = this.posts.filter( post => post.id !== postId);
      this.postsUpdated.next([...this.posts]);
    });
  }

}
