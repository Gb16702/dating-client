import { useEffect, type FormEvent } from "react";
import Button from "../Button";

export default function LoginForm(): JSX.Element {

    useEffect(() => {
        console.log("OK");
    }
    , [])

    function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log("Formulaire envoyé");
    }

    return (
        <>
            <h1>
                Formulaire de connexion
            </h1>
            <form onSubmit={onSubmit}>
                <Button variant="default" width="340px">
                    Inscription
                </Button>
            </form>
        </>
    )
}

