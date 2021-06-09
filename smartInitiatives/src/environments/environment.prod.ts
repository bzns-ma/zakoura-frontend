import { ɵbypassSanitizationTrustResourceUrl } from "@angular/core";

export const environment = {
  production: ɵbypassSanitizationTrustResourceUrl,
  backendUrl: {
    api: "http://smartinitiatives.ma/",
    activities : "assets/data/activities.json",
    achievement: "",
    artisan: "allArtisans",

    projects: "",
    createProject: "",
    deleteProject: "",
    updateProject: "",

    createEvent: "create_event",
    deleteEvent: "delete_event",
    updateEvent: "update_event",

    createArtisan: "create_artisan",
    deleteArtisan: "delete_artisan",
    updateArtisan: "update_artisan",

    createAchievement: "",
    deleteAchievement: "",
    updateAchievement: "",
    createActivity: "",
    deleteActivity: "",
    updateActivity: "",
    events:"allEvents"
}
};
