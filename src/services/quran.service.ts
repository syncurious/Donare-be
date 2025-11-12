import axios from "axios";

export interface QuranVerseResponse {
  data: {
    number: number;
    text: string;
    edition: {
      identifier: string;
      language: string;
      name: string;
    };
    surah: {
      number: number;
      name: string;
      englishName: string;
      englishNameTranslation: string;
      numberOfAyahs: number;
    };
    numberInSurah: number;
  };
}

const TOTAL_AYAHS = 6236;

export const getRandomQuranVerse = async (
  edition = "en.asad"
): Promise<QuranVerseResponse> => {
  const randomAyahNumber = Math.floor(Math.random() * TOTAL_AYAHS) + 1;

  const response = await axios.get<QuranVerseResponse>(
    `https://api.alquran.cloud/v1/ayah/${randomAyahNumber}/${edition}`
  );

  return response.data;
};


