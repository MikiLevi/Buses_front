interface Props {
  title: string;
  subtitle: string;
}

export default function PageHeader(props: Props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h2>{props.subtitle}</h2>
    </div>
  );
}

// className="page-header"
// className="page-header__title"
// className="page-header__subtitle"
