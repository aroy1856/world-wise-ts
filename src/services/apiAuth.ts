import supabase, { supabaseUrl } from "./supabase";

export async function login({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error(error);
    throw new Error("Supabase could not log in user");
  }

  console.log(data);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);

  return data.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function signUp({
  email,
  fullName,
  password,
}: {
  email: string;
  password: string;
  fullName: string;
}) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function updateCurrentUser({
  fullName,
  password,
  avatar,
}: {
  fullName?: string;
  password?: string;
  avatar?: File | null;
}) {
  const updatedData: Parameters<typeof supabase.auth.updateUser>[0] = {};

  if (password) updatedData.password = password;
  if (fullName) updatedData.data = { fullName };

  const { data, error } = await supabase.auth.updateUser(updatedData);
  if (error) throw new Error(error.message);

  let user = data.user;

  let imagePath = null;

  if (avatar) {
    const imgName = `avatar-${data.user.id}-${Math.random()}-${avatar.name}`;
    imagePath = `${supabaseUrl}/storage/v1/object/public/avatar/${imgName}`;
    const { error: uploadError } = await supabase.storage
      .from("avatar")
      .upload(imgName, avatar);

    if (uploadError) {
      throw new Error("Could not upload image, please try again");
    }

    const { data: updatedUserData, error: updateError } =
      await supabase.auth.updateUser({ data: { avatar: imagePath } });

    if (updateError) throw new Error(updateError.message);
    user = updatedUserData.user;
  }

  return user;
}
