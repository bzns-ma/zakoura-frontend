import { Component, OnInit } from '@angular/core';
import { ActivitiesService } from '../../services/activities.service';
import { Activity } from '../../models/activity';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss']
})
export class ActivitiesComponent implements OnInit {

  activities: Activity[] = [];
  activitiesData = [{
    "title": "Accueil et Orientation",
    "description": "Offrir un service d’accueil et d’orientation socio-professionnelle au profit de la population locale",
    "iconclass":"lni-direction-alt"
},
{
    "title": "Employabilité",
    "description": "Renforcer les aspects de l’employabilité des jeunes chercheurs d’emplois",
    "iconclass":"lni-briefcase"

},
{
    "title": "Accompagnement",
    "description": "Accompagner les porteurs de projets dans les démarches de la maturité entrepreneuriale",
    "iconclass":"lni-customer"

},
{
    "title": "Innovation sociale",
    "description": "Renforcer la cohésion entre les collaborateurs du SMT et la commune à travers l’innovation sociale",
    "iconclass":"lni-invention"

},
{
    "title": "Inclusion sociale",
    "description": "Renforcer les aspects d’inclusion sociale auprès des populations vulnérables.",
    "iconclass":"lni-handshake"

},
{
    "title": "Synergies territoriales",
    "description": "Construire une stratégie territoriale commune pour le développement économique et social.",
    "iconclass":"lni-users"

}
]

  constructor(private api: ActivitiesService) { }

  ngOnInit(): void {
    this.getActivities();
  }

  getActivities() {
    // this.activities = this.activitiesData;
    // this.api.getActivities().subscribe(response => {
    //   for (const data of response.body) {
    //     this.activities.push(data);
    //   }
    // });
  }
}
