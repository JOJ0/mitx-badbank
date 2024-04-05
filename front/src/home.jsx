function Home() {

  return (
    <Card
      txtcolor="black"
      header="Welcome to TermBank"
      title="We terminate your money!"
      text="Quick and hasslefree!"
      body={(<img src="bank.png" className="img-fluid" alt="Responsive image" />)}
    />
  );
}

export default Home;