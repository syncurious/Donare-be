import cron from "node-cron";
import { Types } from "mongoose";
import { getRandomQuranVerse } from "../services/quran.service";
import { UserModel } from "../models/User";
import {
  saveNotification,
  sendNotification,
} from "../services/notification.service";

const DEFAULT_CRON = "0 8 * * *"; // 8 AM daily

export const sendDailyVerseNotification = async (): Promise<number | undefined> => {
    try {
      const verseResponse = await getRandomQuranVerse();
      const tokensData = await UserModel.find(
        { device_id: { $exists: true, $ne: null } },
        { device_id: 1, full_name: 1, profile_picture: 1, _id: 1 }
      )
        .lean()
        .exec();

      const tokens = tokensData
        .map((user) => user.device_id)
        .filter((deviceId): deviceId is string => Boolean(deviceId));

      if (!tokens.length) {
        return 0;
      }

      const title = `Daily Quran Verse (Surah ${verseResponse.data.surah.englishName} Ayah ${verseResponse.data.numberInSurah})`;
      const body = verseResponse.data.text;

      await sendNotification({
        tokens,
        title,
        body,
        data: {
          surah: verseResponse.data.surah.englishName,
          ayah: verseResponse.data.numberInSurah.toString(),
        },
      });

      await saveNotification({
        multi_receivers: tokensData.map((user) => ({
          id: new Types.ObjectId(user._id),
          username: user.full_name,
          profile: user.profile_picture,
        })),
        notification: {
          title,
          body,
          data: {
            surah: verseResponse.data.surah.englishName,
            ayah: verseResponse.data.numberInSurah.toString(),
          },
        },
      });
      return tokens.length;
    } catch (error) {
      console.error("[cron] daily verse notification failed", error);
      return 0;
    }
  }


  export const scheduleDailyVerseNotification = () => {
    const timezone = process.env.CRON_TZ || "UTC";
  
    return cron.schedule(
      process.env.DAILY_VERSE_CRON || DEFAULT_CRON,
      sendDailyVerseNotification,
      { timezone }
    );
  };
  
  