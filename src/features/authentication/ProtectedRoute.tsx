import { useEffect, type ReactNode } from "react";
import { useUser } from "./useUser";
import styled from "styled-components";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: ReactNode;
}

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isPending, isAuthenticated } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isPending && !isAuthenticated) navigate("/login");
  }, [isPending, isAuthenticated, navigate]);

  if (isPending)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;
  return null;
}
