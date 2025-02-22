import { ReactNode } from "react";

type MainProps = {
    children: ReactNode;
};

export default function Footer({ children }: MainProps) {
    return (
        <footer>
            {children}
        </footer>
    )
}
