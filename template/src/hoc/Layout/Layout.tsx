import "./Layout.scss";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = (props: LayoutProps) => {
  return <div className="content">{props.children}</div>;
};

export default Layout;
