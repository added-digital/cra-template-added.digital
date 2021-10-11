import "./Dropdown.scss";
import Select from "react-select";

type DropdownProps = {
  options: { label: string; value: string }[];
  title: string;
  onSelect: (value: string) => void;
  value: string;
  width?: number | string;
  isSearchable?: boolean;
  isLoading?: boolean;
};

const Dropdown = (props: DropdownProps) => {
  const dropdownStyles = {
    control: (styles: any, state: any) => ({
      ...styles,
      borderColor: "rgba(223, 223, 227, 0.7)",
      width: props.width ? props.width : 200,
      color: "#2B2B2B",
      borderRadius: "40px",
      boxShadow: "0px 8px 24px rgba(149, 157, 165, 0.15)",
    }),
    option: (styles: any, state: any) => ({
      ...styles,
      backgroundColor: state.isFocused ? "#ecc08a83" : "transparent",
      color: "black",
      zIndex: 1000,
    }),
    menu: (provided: any) => ({ ...provided, zIndex: 1000 }),
    dropdownIndicator: (base: any, state: any) => ({
      ...base,
      transition: "all 200ms ease",
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
    }),
  };

  return (
    <Select
      options={props.options}
      value={props.value === "" ? null : props.options.find((obj) => obj.value === props.value)}
      placeholder={props.title}
      styles={dropdownStyles}
      loadingMessage={() => "Laddar..."}
      isLoading={props.isLoading}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: "black",
        },
      })}
      onChange={(value) => props.onSelect(value?.value || "")}
      noOptionsMessage={() => "Inga resultat"}
      components={{
        IndicatorSeparator: () => null,
      }}
      isSearchable={props.isSearchable === undefined ? false : props.isSearchable}
    />
  );
};

export default Dropdown;
