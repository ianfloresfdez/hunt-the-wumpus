import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  //definition of parameters recieved by the html to create the board
  parameters = new FormGroup({
    board: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]\d*$/),
      Validators.min(2),
      Validators.max(10),
    ]),
    wells: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]\d*$/),
      Validators.min(1),
    ]),
    spears: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]\d*$/),
      Validators.min(1),
    ]),
  });
  //var to see if form is submitted
  submitted: boolean;
  //var to see if there are less wells than boardLength
  errorWellsBoard: boolean;

  constructor(private router: Router) {
    //implementation of defined vars
    this.submitted = false;
    this.errorWellsBoard = false;
  }

  ngOnInit(): void {}

  start() {
    //controlling the inputs recieved in the form
    //mark form as submitted
    this.submitted = true;
    //controlling if there are less wells than boardLength
    if (
      Number(this.parameters.controls['board'].value) <
      Number(this.parameters.controls['wells'].value)
    ) {
      this.errorWellsBoard = true;
      return;
    } else {
      this.errorWellsBoard = false;
    }
    //checking if Validators errors before redirect
    if (
      this.parameters.controls['board'].invalid ||
      this.parameters.controls['wells'].invalid ||
      this.parameters.controls['spears'].invalid
    ) {
      return;
    }
    //redirect to game
    this.router.navigate([
      '/game',
      this.parameters.value.board,
      this.parameters.value.wells,
      this.parameters.value.spears,
    ]);
  }
}
