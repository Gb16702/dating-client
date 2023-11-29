"use client";

import Button from "../Button";
import Input from "../Input";

export default function RegisterForm(): JSX.Element {
  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit} className="mt-[35px]">
      <div className="flex flex-col gap-y-4">
        <div>
          <Input
            label="Adresse mail"
            type="email"
            placeholder="toi@exemple.com"
            name="email"
            ariaLabel="Adresse email"
            width="340px"
          />
        </div>
        <div>
          <Input
            label="Mot de passe"
            type="password"
            placeholder="•••••••"
            name="password"
            ariaLabel="Mot de passe"
            width="340px"
          />
        </div>
      </div>
      <div className="mt-[20px]">
        <Button variant="default" width="340px" loadable>
          Inscription
        </Button>
      </div>
    </form>
  );
}
