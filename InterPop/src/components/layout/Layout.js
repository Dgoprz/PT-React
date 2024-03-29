import Header from './Header';

import './Layout.css';

function Layout({ children, title, ...props }) {
  return (
    <div className="layout">
      <Header className="layout-header bordered" {...props} />
      <main className="layout-main bordered">
        <h2 className="layout-title bordered">{title}</h2>
        <section className="layout-content">{children}</section>
      </main>
    </div>
  );
}

export default Layout;
