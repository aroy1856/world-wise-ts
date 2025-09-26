import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type SyntheticEvent,
} from "react";

import { HiOutlineEllipsisVertical } from "react-icons/hi2";
import styled from "styled-components";
import { useOutSideClick } from "../hooks/useOutsideClick";

const StyledMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
`;

const StyledToggle = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-700);
  }
`;

const StyledList = styled.ul<{ position: { x: number; y: number } }>`
  position: absolute;
  z-index: 1;
  /* min-width: 5rem; */

  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-md);
  border-radius: var(--border-radius-md);

  right: ${(props) => props.position.x}px;
  top: ${(props) => props.position.y}px;
`;

const StyledButton = styled.button`
  /* width: 200%; */
  text-align: left;
  background: none;
  border: none;
  padding: 1.2rem 2.4rem;
  font-size: 1.4rem;
  transition: all 0.2s;

  display: flex;
  align-items: center;
  gap: 1.6rem;

  white-space: nowrap;
  flex: 1;

  &:hover {
    background-color: var(--color-grey-50);
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }
`;

interface MenuContextType {
  openId: string;
  close: () => void;
  open: (id: string) => void;
  position: { x: number; y: number };
  setPosition: (position: { x: number; y: number }) => void;
}

const MenuContext = createContext({} as MenuContextType);

function Menus({ children }: { children: ReactNode }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const close = () => setOpenId("");
  const open = (id: string) => setOpenId(id);
  const ref = useOutSideClick<HTMLDivElement>(close);

  return (
    <MenuContext.Provider
      value={{
        openId,
        close,
        open,
        position,
        setPosition,
      }}
    >
      <StyledMenu ref={ref}>{children}</StyledMenu>
    </MenuContext.Provider>
  );
}

function Toggle({ id }: { id: string }) {
  const { open, close, openId, setPosition } = useContext(MenuContext);

  function handleClick(e: SyntheticEvent) {
    const rect = (e.target as HTMLElement)
      .closest("button")
      ?.getBoundingClientRect();

    setPosition({
      x: -20,
      y: (rect?.height || 0) + 5,
    });

    if (openId === "" || openId !== id) open(id);
    else close();
  }

  return (
    <StyledToggle onClick={handleClick}>
      <HiOutlineEllipsisVertical />
    </StyledToggle>
  );
}

function List({ children, id }: { children: ReactNode; id: string }) {
  const { openId, position } = useContext(MenuContext);

  if (openId !== id) return null;

  return <StyledList position={position}>{children}</StyledList>;
}

function Button({
  children,
  icon,
  isDisabled,
  onClick,
}: {
  children: ReactNode;
  icon: ReactNode;
  isDisabled?: boolean;
  onClick?: () => void;
}) {
  const { close } = useContext(MenuContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li>
      <StyledButton onClick={handleClick} disabled={isDisabled}>
        {icon}
        <span>{children}</span>
      </StyledButton>
    </li>
  );
}

Menus.Menu = StyledMenu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
