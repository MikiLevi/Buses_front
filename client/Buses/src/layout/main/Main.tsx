interface Props {
  children: React.ReactNode;
}

export default function Main({ children }: Props) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
