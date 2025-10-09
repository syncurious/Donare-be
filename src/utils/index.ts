import { UserModel as user } from "../models/User";
import { userProjectionData } from "./filters";

export let getUserByEmail = async (email: string) => {
  let User = await user.findOne({ email: email });
  if (!User) return false;
  return User;
};

export let getUserByEmailAndUsername = async (email: string, username: string) => {
  let User = await user.findOne(
    {
      $or: [{ email: email }, { username: username }],
    },
    { ...userProjectionData },
  );
  if (!User) return false;
  return User;
};

// export let getVerifyGoogleUser = async (token: string) => {
//   try {
//     const response = await axios.get(`https://oauth2.googleapis.com/tokeninfo?access_token=${token}`);
//     return Boolean(response.data?.email_verified); // This will include the "name" field
//   } catch (error: any) {
//     console.error("Error fetching user info:", error.data || error?.message);
//     throw new Error("Failed to fetch user information.");
//   }
// };

// export let getVerifyFacebookUser = async (token: string) => {
//   try {
//     const response = await axios.get(`https://graph.facebook.com/v13.0/me?fields=name,picture.type(large)&access_token=${token}`);
//     return response.data; // This will include the "name" field
//   } catch (error: any) {
//     console.error("Error fetching user info: facebook", error.data || error?.message);
//     throw new Error("Failed to fetch user information.");
//   }
// };
