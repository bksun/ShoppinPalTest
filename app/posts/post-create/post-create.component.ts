import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Content } from '@angular/compiler/src/render3/r3_ast';
import { NgForm } from '@angular/forms';


import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {

  constructor(public postsServ: PostsService) { }

  ngOnInit() {
  }

  onAddPost( form: NgForm) {

    if (form.invalid) {
      return;
    }

      this.postsServ.addPost(form.value.title, form.value.content);
      form.resetForm();
    }

}
