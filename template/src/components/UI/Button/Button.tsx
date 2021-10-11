import "./Button.scss";

type ButtonProps = {
  label: string;
  onClick?: () => void;
  className?: string;
  isLoading?: boolean;
  width?: string;
};

const Button = (props: ButtonProps) => {
  const buttonClasses = ["button", "waves-effect"];
  if (props.className) {
    buttonClasses.push(props.className);
  }
  if (props.isLoading) {
    buttonClasses.push("loading");
  }

  return (
    <button
      className={buttonClasses.join(" ")}
      style={{ width: props.width }}
      onClick={() => {
        if (!props.isLoading) {
          props.onClick();
        }
      }}
    >
      {props.label}
    </button>
  );
};

export default Button;
