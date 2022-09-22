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
    dates: any = []
    questionnaire: any = [];
    questions: any = [];
    typequestion: any = [];
    careplanid: any = [];
    diagnostiques: any = [];
    ordonnances: any = [];
    popupquest = false;
    popupordo = false;
    questaffiche: number = 0;
    ordoaffiche: number = 0;
    isShown: boolean = false;

    constructor(private router: Router, private http: HttpClient) {
    }

    ngOnInit() {
        //Récupération anciens questionnaires
        this.http.get(" https://fhir.alliance4u.io/api/questionnaire-response?source.reference=Patient/007").subscribe(data => {
            this.questionnairesreponse = data;
            for (let questionnairereponse of this.questionnairesreponse) {
                var mois = ((new Date(questionnairereponse.authored)).getMonth() + 1).toString();
                if ((new Date(questionnairereponse.authored)).getMonth() + 1 < 10) {
                    mois = "0" + ((new Date(questionnairereponse.authored)).getMonth() + 1);
                }
                this.dates.push((new Date(questionnairereponse.authored)).getDate() + "/" + mois + "/" + (new Date(questionnairereponse.authored)).getFullYear());
                this.careplanid.push((questionnairereponse.basedOn[0].reference));

            }

        })
        //Récupération des questions
        this.http.get("https://fhir.alliance4u.io/api/questionnaire/6322c934256fb300187f6e7c").subscribe(data => {
            this.questionnaire = data;
            for (let q of this.questionnaire.item) {
                this.questions.push(q.text);
                this.typequestion.push(q.type);
            }
        })
        //Récupération des diagnostiques (seulement ceux du patient car sinon trop lourd et erreur de chargement de page)
        this.http.get(" https://fhir.alliance4u.io/api/diagnostic-report?subject.reference=Patient/007").subscribe(data => {
            this.diagnostiques = data;
        })
        //Récupération des ordonnances
        this.http.get("https://fhir.alliance4u.io/api/medication-request").subscribe(data => {
            this.ordonnances = data;
        })


    }

    transfoBoolean(boolean: Boolean) { 
        if (boolean == true) {
            return "oui"
        }
        else {
            return "non"
        }

    }

    visuQuest(number: number) {
        this.questaffiche = number;
        this.popupquest = true;

    }

    visuOrdo(number: number) {
        this.ordoaffiche = number;
        this.popupordo = true;
    }



    fermepopupquest() {
        this.popupquest = false;

    }

    fermepopupordo() {
        this.popupordo = false;


    }

}
