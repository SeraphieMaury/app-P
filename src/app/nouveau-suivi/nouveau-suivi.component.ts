import { HttpClient } from "@angular/common/http"
import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { Observable } from "rxjs"



@Component({
    selector: "app-nouveau-suivi",
    templateUrl: "./nouveau-suivi.component.html",
    styleUrls: ["./nouveau-suivi.component.css"]
})
export class NouveauSuiviComponent implements OnInit {
    questionnaire: any = [];
    questions: any = [];
    typequestion: any = [];
    careplan: any = [];
    idscareplan: any = [];


    constructor(private router: Router, private http: HttpClient) {
    }

    ngOnInit() {
        this.http.get("https://fhir.alliance4u.io/api/questionnaire/6322c934256fb300187f6e7c").subscribe(data => {
            this.questionnaire = data
            for (let q of this.questionnaire.item) {
                this.questions.push(q.text)
                this.typequestion.push(q.type)
            }
        })
    }

    envoiQuestionnaire() {
    const headers = { 'content-type': 'application/json' }
    //Creation service request :
    const bodycareplan = JSON.stringify({
        "resourceType": "CarePlan",
        "status": "active",
        "intent": "plan",
        "subject": {
          "reference": "Patient/007",
          "display": "Johana Dahan"
        }
      })
    this.http.post("https://fhir.alliance4u.io/api/care-plan", bodycareplan, { 'headers': headers }).subscribe(data => { this.careplan = data})
    
 
        var codeq1 = ""
        var displayq1=""
        var date=(document.getElementById('1') as HTMLInputElement).value
        var poidsactuel =Number((document.getElementById('2') as HTMLInputElement).value)
        var poidscible =Number((document.getElementById('3') as HTMLInputElement).value)
        var tensionarteriellesystolique =Number((document.getElementById('4') as HTMLInputElement).value)
        var tensionarteriellediastolique =Number((document.getElementById('5') as HTMLInputElement).value)
        var temperaturecorporelle =Number((document.getElementById('6') as HTMLInputElement).value)
        var frequencecardiaque =Number((document.getElementById('7') as HTMLInputElement).value)
        var frequencerespiratoire =Number((document.getElementById('8') as HTMLInputElement).value)
        var regime = new Boolean(false)
        var menopause = new Boolean(false)
        var fumeur = new Boolean(false)
        var codeq2 = ""
        var displayq2=""
        var remarques=(document.getElementById('13') as HTMLInputElement).value

        if ((document.getElementById('Première consultation0') as HTMLInputElement).checked){
            codeq1="nouvelle"
            displayq1= (document.getElementById('Première consultation0') as HTMLInputElement).value
        }
        if ((document.getElementById('Consultation de médecine générale0') as HTMLInputElement).checked){
            codeq1="medecineGenerale"
            displayq1= (document.getElementById('Consultation de médecine générale0') as HTMLInputElement).value
        }
        if ((document.getElementById('Consultation de suivi nutritionnel0') as HTMLInputElement).checked){
            codeq1="nutrition"
            displayq1= (document.getElementById('Consultation de suivi nutritionnel0') as HTMLInputElement).value
        }
        if ((document.getElementById('Autre0') as HTMLInputElement).checked){
            codeq1="autre"
            displayq1= (document.getElementById('Autre0') as HTMLInputElement).value
        }

        if ((document.getElementById('oui9') as HTMLInputElement).checked){
            regime=true
        }

        if ((document.getElementById('oui10') as HTMLInputElement).checked){
            menopause=true
        }
        if ((document.getElementById('oui11') as HTMLInputElement).checked){
            fumeur=true
        }
        if ((document.getElementById('Augmenté12') as HTMLInputElement).checked){
            codeq2="augmente"
            displayq2= (document.getElementById('Augmenté12') as HTMLInputElement).value
        }
        if ((document.getElementById('Diminué12') as HTMLInputElement).checked){
            codeq2="diminue"
            displayq2= (document.getElementById('Diminué12') as HTMLInputElement).value
        }
        if ((document.getElementById('Aucun changement12') as HTMLInputElement).checked){
            codeq2="aucun"
            displayq2= (document.getElementById('Aucun changement12') as HTMLInputElement).value
        }



        const bodyquest = JSON.stringify(
            {
                "resourceType": "QuestionnaireResponse",
                "basedOn" : [{
                    "reference": "CarePlan/"+this.careplan.id
                }],
                "questionnaire": "Questionnaire/6322c934256fb300187f6e7c",
                "status": "completed",
                "authored" : (new Date()).toJSON(),
                "source": {
                    "reference": "Patient/007",
                    "display" : "Johana Dahan"
                },
                "item": [
                    {
                        "linkId": "motifConsultation",
                        "text": "Motif de la consultation",
                        "answer": [
                            {
                                "valueCoding": {
                                    "code": codeq1,
                                    "display":displayq1
                                }
                            }
                        ]
                    },
                    {
                        "linkId": "dateConsultation",
                        "text": "Date de la consultation",
                        "answer": [
                            {
                                "valueString": date
                            }
                        ]
                    },
                    {
                        "linkId": "poidsActuel",
                        "text": "Poids actuel",
                        "answer": [
                            {
                                "valueDecimal": poidsactuel
                            }
                        ]
                    },
                    {
                        "linkId": "poidsCible",
                        "text": "Poids ciblé (kg)",
                        "answer": [
                            {
                                "valueDecimal": poidscible
                            }
                        ]
                    },
                    {
                        "linkId": "tensionArterielleSystolique",
                        "text": "Tension artérielle systolique (mmHg)",
                        "answer": [
                            {
                                "valueDecimal": tensionarteriellesystolique
                            }
                        ]
                    },
                    {
                        "linkId": "tensionArterielleDiastolique",
                        "text": "Tension artérielle diastolique (mmHg)",
                        "answer": [
                            {
                                "valueDecimal": tensionarteriellediastolique
                            }
                        ]
                    },
                    {
                        "linkId": "temperatureCorporelle",
                        "text": "Température corporelle (°C)",
                        "answer": [
                            {
                                "valueDecimal": temperaturecorporelle
                            }
                        ]
                    },
                    {
                        "linkId": "frequenceCardiaque",
                        "text": "Fréquence cardiaque (bpm)",
                        "answer": [
                            {
                                "valueInteger": frequencecardiaque
                            }
                        ]
                    },
                    {
                        "linkId": "frequenceRespiratoire",
                        "text": "Fréquence respiratoire (cycles par minute))",
                        "answer": [
                            {
                                "valueInteger": frequencerespiratoire
                            }
                        ]
                    },
                    {
                        "linkId": "changementRegime",
                        "text": "Avez-vous changé de régime depuis votre dernière consultation ?",
                        "answer": [
                            {
                                "valueBoolean": regime
                            }
                        ]
                    },
                    {
                        "linkId": "menopause",
                        "text": "Êtes-vous devenu ménopausé depuis votre dernière consultation ?",
                        "answer": [
                            {
                                "valueBoolean": menopause
                            }
                        ]
                    },
                    {
                        "linkId": "fumeur",
                        "text": "Si vous étiez fumeur, avez-vous arrêté depuis votre dernière consultation ?",
                        "answer": [
                            {
                                "valueBoolean": fumeur
                            }
                        ]
                    },
                    {
                        "linkId": "activitePhysique",
                        "text": "Avez-vous augmenté ou diminué votre activité physique depuis votre dernière consultation ?",
                        "answer": [
                            {
                                "valueCoding": {
                                    "code": codeq2,
                                    "display": displayq2
                                }
                            }
                        ]
                    },
                    {
                        "linkId": "autresRemarques",
                        "text": "Autres remarques",
                        "answer": [
                            {
                                "valueString": remarques
                            }
                        ]
                    }
                ]
            }
        );
        this.http.post(" https://fhir.alliance4u.io/api/questionnaire-response", bodyquest, { 'headers': headers }).subscribe(data => {
         })

    }
}


