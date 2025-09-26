import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>
      <UpdateUserDataForm />
      <UpdatePasswordForm />
    </>
  );
}

export default Account;
