import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 0.4rem;
`;

const FilterButton = styled.button<{ $active?: boolean }>`
  background-color: var(--color-grey-0);
  border: none;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

interface FilterProps {
  filterField: string;
  options: {
    value: string;
    label: string;
  }[];
  paramToReset?: {
    field: string;
    value: string | number;
  };
}

export default function Filter({
  filterField,
  options,
  paramToReset,
}: FilterProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleClick(value: string) {
    searchParams.set(filterField, value);
    if (paramToReset)
      searchParams.set(paramToReset.field, String(paramToReset.value));

    setSearchParams(searchParams);
  }

  const discount = searchParams.get(filterField) || "all";

  return (
    <StyledFilter>
      {options.map((option) => (
        <FilterButton
          onClick={() => handleClick(option.value)}
          $active={discount === option.value}
          key={option.value}
        >
          {option.label}
        </FilterButton>
      ))}
    </StyledFilter>
  );
}
