import { Component, Input, OnInit, AfterViewInit } from '@angular/core';

@Component({
  selector: 'message',
  templateUrl: './message.html',
  styleUrls: ['./message.css']
})
export class MessageComponent implements AfterViewInit {
  @Input() message

  ngAfterViewInit() {
    window.scrollTo(0,document.body.scrollHeight)
  }
}
