import { scheduleDailyVerseNotification } from "./dailyVerse.job";

let jobsStarted = false;

export const registerJobs = () => {
  if (jobsStarted) return;
  scheduleDailyVerseNotification();
  jobsStarted = true;
};


