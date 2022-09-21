import { HttpClient } from "@angular/common/http"
import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { Observable } from "rxjs"



@Component({
    selector: "app-anciens-suivis",
    templateUrl: "./anciens-suivis.component.html",
    styleUrls: ["./anciens-suivis.component.css"]
})
export class AnciensSuivisComponent implements OnInit {
    questionnairesreponse: any = [];
    dates :any = []
    questionnaire: any = [];
    questions: any = [];
    typequestion: any = []

    constructor(private router: Router, private http: HttpClient) {
    }

    ngOnInit() {
        this.http.get(" https://fhir.alliance4u.io/api/questionnaire-response?source.reference=Patient/007").subscribe(data => {
            this.questionnairesreponse = data
            for (let questionnairereponse of this.questionnairesreponse){
                this.dates.push((new Date(questionnairereponse.authored)).getDate()+"/"+((new Date(questionnairereponse.authored)).getMonth()+1)+"/"+(new Date(questionnairereponse.authored)).getFullYear())
            }
            
        })
        this.http.get("https://fhir.alliance4u.io/api/questionnaire/6322c934256fb300187f6e7c").subscribe(data => {
            this.questionnaire = data
            for (let q of this.questionnaire.item) {
                this.questions.push(q.text)
                this.typequestion.push(q.type)
            }
        })
    }

    transfoBoolean(boolean : Boolean ){
        if (boolean==true){
            return "oui"
        }
        else{  
            return "non"
        }
          
        }

}
