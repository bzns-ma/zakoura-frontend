// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  backendUrl: {
      api: "http://localhost:3000/",
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
      //events :"assets/data/events.json"
      events:"allEvents"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
