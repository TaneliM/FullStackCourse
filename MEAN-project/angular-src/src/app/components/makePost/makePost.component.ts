import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-makepost',
  templateUrl: './makePost.component.html',
  styleUrls: ['./makePost.component.css']
})
export class MakePostComponent implements OnInit {
  
  title: String;
  post: String;

  constructor(
    private postService: PostService, 
    private flashMessages: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onSubmit() {
    const post = {
      title: this.title,
      post: this.post
    }

    this.postService.makeNewPost(post).subscribe(data => {
      if (data.success) {
        this.flashMessages.show(data.msg, {cssClass: 'alert-success', timeout: 2000});
        this.router.navigate(['/']);
      } else {
        this.flashMessages.show(data.msg, {cssClass: 'alert-danger', timeout: 5000});
        this.router.navigate(['#']);
      }
    });
  }
}
