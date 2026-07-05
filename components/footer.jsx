export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        The Imperial &mdash; built on the Demo Hotels API &mdash; {new Date().getFullYear()}
      </div>
    </footer>
  );
}