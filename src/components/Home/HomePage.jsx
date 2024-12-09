import About from "../About";
import Banner from "../Banner";
import Choose from "../Choose";
import Main from "../main";
import Products from "../Products";

export default function HomePage() {
  return (
    <div>
      <Main />
      <About />
      <Products />
      <Choose />
      <Banner />
    </div>
  );
}
