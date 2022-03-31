import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages';

import { PostService } from '../../../services/post.service';

import { Post } from '../../../post';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  posts: Post[] = [];

  constructor(
    private postService: PostService,
    private router: Router,
    private flashMessages: FlashMessagesService
    ) { }

  ngOnInit() {
    this.getPosts()
  }

  getPosts() {
    this.postService.getPosts().subscribe(data => {
      if (data.success) {
        this.posts = data.posts;
      } else {
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['/']);
      }
    });
    
  }
}
