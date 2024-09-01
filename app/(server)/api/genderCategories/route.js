import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_API_URL;

export async function getGenderCategories() {
  try {
    const { data } = await axios.get("/api/gendercategories");
    return data;
  } catch (error) {
    console.log(error);
  }
}
