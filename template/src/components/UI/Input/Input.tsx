import "./Input.scss";

type InputProps = {
  type: "email" | "password" | "text";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const Input = (props: InputProps) => {
  const inputClasses = ["input"];
  if (props.className) {
    inputClasses.push(props.className);
  }

  return (
    <input
      className={inputClasses.join(" ")}
      placeholder={props.placeholder}
      type={props.type}
      onChange={({ target: { value } }) => props.onChange(value)}
    />
  );
};

export default Input;
