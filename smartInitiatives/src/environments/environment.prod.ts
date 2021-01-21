import { ɵbypassSanitizationTrustResourceUrl } from "@angular/core";

export const environment = {
  production: ɵbypassSanitizationTrustResourceUrl,
  backendUrl: {
      api: "assets/data/",
      activities : "activities.json",
      achievement: "achivements.json",
      artisan: "artisan.json",
      projects: "projects.json"
  }
};
