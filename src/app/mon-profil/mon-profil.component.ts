import { HttpClient } from "@angular/common/http"
import { Component, OnInit } from "@angular/core"
import { Router } from "@angular/router"
import { Observable } from "rxjs"
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';


import { FormBuilder, FormControl, FormGroup } from '@angular/forms';



// import 'rxjs/add/observable/of';
// import 'rxjs/add/operator/filter';



@Component({
    selector: "app-mon-profil",
    templateUrl: "./mon-profil.component.html",
    styleUrls: ["./mon-profil.component.css"]
})
export class MonProfilComponent implements OnInit {
    sexe = ""
    nom = ""
    prenom = ""
    dtn: Date = new Date()
    adresse = ""
    email = ""
    num = ""
    patient: any = [];
    allergiesdata: any = [];
    observationsdata : any = [];
    allergies: any = [];
    tailles: any = [];
    datestailles: any = [];
    taille = ""
    readonly separatorKeysCodes = [ENTER, COMMA] as const;
    addOnBlur = true;


    constructor(private router: Router, private http: HttpClient) {
    }

    ngOnInit() {
        this.http.get("https://fhir.alliance4u.io/api/patient/007").subscribe(data => {
            this.patient = data
            if (this.patient.gender == "female") {
                this.sexe = "F"
            }
            if (this.patient.gender == "male") {
                this.sexe = "H"
            }
            this.nom = this.patient.name[0].family; //récupération nom
            this.prenom = this.patient.name[0].given;//récupération prénom
            this.dtn = this.patient.birthDate;//récupération date de naissance
            this.adresse = this.patient.address[0].line + " " + this.patient.address[0].city + " " + this.patient.address[0].country //récupération adresse
            // récupératiton adresse mail si elle existe : 
            for (let x of this.patient.telecom) {
                if (x.system == "email") {
                    this.email = x.value
                    break
                }
                else {
                    this.email = "Aucune"
                }
            }
            // récupératiton numéro de téléphone si il existe : 
            for (let x of this.patient.telecom) {
                if (x.system == "phone") {
                    this.num = x.value
                    break
                }
                else {
                    this.num = "Aucun"
                }
            }

        })

        this.http.get("https://fhir.alliance4u.io/api/allergy-intolerance?patient.reference=Patient/007").subscribe(data => {
            this.allergiesdata = data
            for (let x of this.allergiesdata) {
                this.allergies.push(x.code.coding[0].display)
            }

            
  
        })
        this.http.get("https://fhir.alliance4u.io/api/observation?subject.reference=Patient/007").subscribe(data => {
            this.observationsdata = data
            for (let x of this.observationsdata) {
                for (let y of x.code.coding){
                    if (y.display=="Taille" || y.display=="taille"){
                      this.tailles.push(x.valueQuantity.value)
                      this.datestailles.push(new Date(x.valueDateTime))

                    }
      
                }

                let compteur = 0
                for (let i=0;  i<this.datestailles.length; i++){
                  if (this.datestailles[i]<this.datestailles[i+1]){
                    compteur=i+1
                  }
                }
                this.taille = this.tailles[compteur] 
            }       



        })
}

modifierTaille() {
var nouvelletaille = (document.getElementById('taille') as HTMLInputElement).value
console.log(nouvelletaille)
const headers = { 'content-type': 'application/json'}  
const body=JSON.stringify({
  "resourceType": "Observation",
  "status": "final",
  "code": {
      "coding": [
          {
              "display": "Taille"
          }
      ]
  },
  "subject": {
      "reference": "Patient/007",
      "display": "Johana DAHAN"
  },
  "valueQuantity": {
      "value": Number(nouvelletaille),
      "unit": "cm"
  },
  "valueDateTime": (new Date()).toJSON()
});
this.http.post("https://fhir.alliance4u.io/api/observation", body,{'headers':headers}).subscribe(data => {}) 
}

ajouterAllergie(event: MatChipInputEvent) {
    const value = (event.value || '').trim();
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify({
        "resourceType": "AllergyIntolerance",
        "code": {
            "coding": [
                {
                    "display": value
                }
            ]
        },
        "patient": {
            "reference": "Patient/007"
        }
    })
    this.http.post(" https://fhir.alliance4u.io/api/allergy-intolerance", body,{'headers':headers}).subscribe(data => {}) 
    
}

    supprimerAllergie(allergie: any){
        const index = this.allergies.indexOf(allergie);
        if (index >= 0) {
            this.allergies.splice(index, 1);
        }
        for (let x of this.allergiesdata) {
            if(x.code.coding[0].display == allergie){
                this.http.delete("https://fhir.alliance4u.io/api/allergy-intolerance/"+x.id).subscribe(data => {
                });
            }
        }
        console.log(this.allergiesdata)

        
    }
    calculerIdAllergie(index: any){



    }

}


