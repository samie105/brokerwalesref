import Signout from "@/components/auth/Signout";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Signout /> {children}
      </body>
    </html>
  );
}
