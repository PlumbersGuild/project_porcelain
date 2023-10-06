function AboutPage() {
  return (
    <>
      <div className="title">
        <h1>2307-FSA-ET-WEB-FT-SF</h1>
      </div>

      <div className="about-us">
        <h1 className="about">About Us</h1>

        <div className="description">
          <p>
            Amazoni is an innovative and user-friendly E-commerce website that
            provides an exceptional online shopping experience for customers
            with interests and preferences for programming.
          </p>
          <p>
            With a sleek and modern design, the website offers a wide range of
            book products that users can read to enhance their coding abilities.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi nobis
            nulla quam culpa amet eveniet facilis aliquid dolorum libero nemo
            voluptatem, voluptatibus corporis.
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ad ipsa
            molestias quod cupiditate, dignissimos omnis repudiandae! Nulla
            delectus quae porro itaque doloremque.
          </p>
        </div>
      </div>

      <div className="contributors">
        <h1 className="about">Contributors</h1>
      </div>
      <div className="container">
        <div className="card">
          <h2 className="card__name">Calvin Thang</h2>
          <li>
            <a href="https://www.linkedin.com/in/calthang/">
              Visit Calvin's LinkedIn!
            </a>
          </li>
          <li>
            <a href="https://github.com/calvieTech">Visit Calvin's GitHub!</a>
          </li>
        </div>
        <div className="card">
          <h2 className="card__name">Garrett Gorman</h2>
          <li>
            <a href="https://www.linkedin.com/in/garrett-gorman/">
              Visit Garrett's LinkedIn!
            </a>
          </li>
          <li>
            <a href="https://github.com/ggorms">Visit Garrett's GitHub!</a>
          </li>
        </div>
        <div className="card">
          <h2 className="card__name">Shaheer Malik</h2>
          <li>
            <a href="https://www.linkedin.com/in/shaheer-m/">
              Visit Shaheer's LinkedIn!
            </a>
          </li>
          <li>
            <a href="https://github.com/Shaheer-Malik">
              Visit Shaheer's GitHub!
            </a>
          </li>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
