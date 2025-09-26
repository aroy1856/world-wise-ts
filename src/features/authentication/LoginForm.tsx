import { useState, type ChangeEvent, type FormEvent } from "react";
import Button from "../../ui/Button";
import Form from "../../ui/Form";
import Input from "../../ui/Input";
import FormRowVertical from "../../ui/FormRowVertical";
import { useLogin } from "./useLogin";
import SpinnerMini from "../../ui/SpinnerMini";

function LoginForm() {
  const [email, setEmail] = useState("abc@def.com");
  const [password, setPassword] = useState("abcd1234");
  const { login, isPending } = useLogin();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      return;
    }

    login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRowVertical id="email" label="Email address">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          disabled={isPending}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      </FormRowVertical>
      <FormRowVertical id="password" label="Password">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          disabled={isPending}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setPassword(e.target.value)
          }
        />
      </FormRowVertical>
      <FormRowVertical>
        <Button size="large">{isPending ? <SpinnerMini /> : "Login"}</Button>
      </FormRowVertical>
    </Form>
  );
}

export default LoginForm;
