import axios from "axios";

axios.defaults.baseURL = process.env.NEXT_API_URL;

export async function getGenderCategories() {
  const { data } = await axios.get("/api/gendercategories");
  //   console.log(data);
  return data;
}
