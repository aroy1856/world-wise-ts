import supabase, { supabaseUrl } from "./supabase";
import type { Cabin, CabinInsert } from "./types";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.log(error.message);
  }

  return data as Cabin[];
}

export async function deleteCabin(id: number | string) {
  const { error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.log(error.message);
    throw new Error("Could not delete cabin");
  }
}

export async function createOrEditCabin(
  cabin: CabinInsert,
  id?: string | undefined
) {
  let imgName = "";
  let imagePath = "";
  if (cabin.image instanceof File) {
    imgName = Math.random().toString() + cabin.image.name.replaceAll("/", "");
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabins-images/${imgName}`;
    const { error: uploadError } = await supabase.storage
      .from("cabins-images")
      .upload(imgName, cabin.image);

    if (uploadError) {
      throw new Error("Could not upload image, please try again");
    }
  } else {
    imagePath = cabin.image;
  }

  let query;
  if (id) {
    query = supabase
      .from("cabins")
      .update({ ...cabin, image: imagePath })
      .eq("id", id);
  } else {
    query = supabase.from("cabins").insert([{ ...cabin, image: imagePath }]);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error("Could not create cabin");
  }

  return data;
}
