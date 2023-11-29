"use client";

import { useEffect } from "react";
import Button from "./Button";
import Input from "./Input";

export default function TestForm(): JSX.Element {
  function onSubmit() {
    console.log("OK");
  }

  useEffect(() => {
    console.log("Lancé !");
  }, []);

  return (
    <>
      <form onSubmit={onSubmit}>
        <Input type="email" name="email" placeholder="Votre adresse mail" />
        <Input
          type="password"
          name="password"
          placeholder="Votre mot de passe"
          generatePassword
        />

        <Button variant="default">Soumettre</Button>
      </form>
    </>
  );
}
