import "./Layout.scss";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout = (props: ILayoutProps) => {
  return <div className="content">{props.children}</div>;
};

export default Layout;
