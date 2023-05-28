import { Component, OnInit} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-question',
  templateUrl: './update-question.component.html',
  styleUrls: ['./update-question.component.css']
})
export class UpdateQuestionComponent implements OnInit{

  //public Editor = ClassicEditor;
  // quesId;
  // qTitle;
  // question = {
  //   quiz: {},
  //   content: '',
  //   option1: '',
  //   option2: '',
  //   option3: '',
  //   option4: '',
  //   answer: '',
  // };

  quesId = 0;
  question;

  constructor(
    private _route: ActivatedRoute,
    private _question: QuestionService,
    private _router: Router,
    private _snack: MatSnackBar
  ) { }

  ngOnInit(): void {

    //console.log("inside");

    this.quesId = this._route.snapshot.params['quesId'];

    console.log(this.quesId);

    this._question.getSingleQuestion(this.quesId).subscribe(

      (data: any) => {

        this.question = data;

        console.log(this.question);

      },

      (error) => {

        console.log(error);
        console.log("Not found!!");

      }

    );

  }

  //Update

  public updateData() {

    console.log(this.question.content);

    if (this.question.content.trim() == '' || this.question.content == null) {

      return;

    }

    if (this.question.option1.trim() == '' || this.question.option1 == null) {

      return;

    }

    if (this.question.option2.trim() == '' || this.question.option2 == null) {

      return;

    }

    if (this.question.answer.trim() == '' || this.question.answer == null) {

      return;

    }

    //Update finally

    Swal.fire({

      title: 'Are you sure?',

      text: "You won't be able to revert this!",

      icon: 'info',

      showCancelButton: true,

      confirmButtonColor: '#3085d6',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes, update it!'

    }).then((result) => {

      if (result.isConfirmed) {

        //delete...

        this._question.updateQuestion(this.question).subscribe(

          (data) => {

            Swal.fire('Success !!', 'question updated', 'success').then((e) => {

              //this._router.navigate(['/admin/view-questions']);

            });

          },

          (error) => {

            Swal.fire('Error', 'error in updating question', 'error');

            console.log(error);

          }

        );

      }

    });

  }

}
