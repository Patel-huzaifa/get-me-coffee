// app/login/layout.js or app/login/page.js (if your login page is directly in 'app/login')

export const metadata = {
  title: "Login - Get Me a Coffee",
  description: "Login or sign up to support creators on Get Me a Coffee.",
};

export default function LoginLayout({ children }) {
  return <>{children}</>;
}
