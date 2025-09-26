import { useSearchParams } from "react-router-dom";
import Select from "./Select";
import type { ChangeEvent } from "react";

interface SortByProps {
  options: { label: string; value: string }[];
}

export default function SortBy({ options }: SortByProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    searchParams.set("sortBy", e.target.value);
    setSearchParams(searchParams);
  }

  const sortBy = searchParams.get("sortBy") || "";

  return <Select options={options} value={sortBy} onChange={handleChange} />;
}
