function Home() {

  return (
    <Card
      txtcolor="black"
      header="BadBank Landing Page"
      title="Welcome to the bank"
      text="You can use this bank"
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image" />)}
    />
  );
}