import { ɵbypassSanitizationTrustResourceUrl } from "@angular/core";

export const environment = {
  production: ɵbypassSanitizationTrustResourceUrl,
  backendUrl: {
      api: "smartinitiatives.ma:3000/",
      activities : "activities",
      achievement: "achivements",
      artisan: "allArtisans",
      projects: "projects",
      createProject: "create_project",
      deleteProject: "delete_project",
      updateProject: "update_project",
      createEvent: "create_event",
      deleteEvent: "delete_event",
      updateEvent: "update_event",
      createArtisan: "create_artisan",
      deleteArtisan: "delete_artisan",
      updateArtisan: "update_artisan",
      createAchievement: "create_Achievement",
      deleteAchievement: "delete_Achievement",
      updateAchievement: "update_achievement",
      events : "allEvents"
  }
};
