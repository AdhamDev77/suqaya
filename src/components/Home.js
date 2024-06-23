import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Home_img from "../assets/Home_img.svg";
import book from "../assets/book.svg";
import question from "../assets/question.svg";
import arrow from "../assets/arrow.svg";
import "./styles/Home.css";
import AwesomeTestimonial from "react-awesome-testimonials";

function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const img1 = "";
  const img2 = "";
  const img3 = "";
  const img4 = "";
  const img5 = "";
  const img6 = "";

  const review1 = [
    img1,
    "Put The Names here",
    "Put the Designations here",
    "Put the reviews here",
  ];
  const review2 = [
    img2,
    "Put The Names here",
    "Put the Designations here",
    "Put the reviews here",
  ];
  const review3 = [
    img3,
    "Put The Names here",
    "Put the Designations here",
    "Put the reviews here",
  ];
  const review4 = [
    img4,
    "Put The Names here",
    "Put the Designations here",
    "Put the reviews here",
  ];
  const review5 = [
    img5,
    "Put The Names here",
    "Put the Designations here",
    "Put the reviews here",
  ];
  const review6 = [
    img6,
    "Put The Names here",
    "Put the Designations here",
    "Put the reviews here",
  ];

  const items = [review1, review2, review3, review4, review5, review6];
  return (
    <div className="home_body">
      <div className="home_con">
        <div className="hero_section">
          <div className="blur_circle"></div>
          <div className="hero_section_text">
            <h1 className="hero_title">
              أهلاً بك في <br />
              <span>عيادة أعمق</span>
            <p className="hero_slogan">لأن أثرك أعمق من مجرد مؤشر</p>
            </h1>
            <p>
              هل ترغب في معرفة الأثر الاجتماعي لمشروعك؟
              <br /> هل تريد أن تتأكد من أن مبادرتك تترك أثراً إيجابياً في
              المجتمع؟ <br />
              عيادة أعمق تفتح لك بوابة عالم قياس الأثر الاجتماعي وإدارته
            </p>
            <Link to="/sign">سجل الآن</Link>
          </div>
          <div className="hero_section_img">
            <img className="hero_section_img" src={Home_img} />
          </div>
        </div>
        <div className="service_section">
          <div className="section_info">
            <h1 className="section_title">خدماتنا</h1>
            <p className="section_desc">
            المجلس العربي للأثر الاجتماعي (أعمق) شبكة مهنية تأسست لبناء منظومة الأثر الاجتماعي في المنطقة العربية، والتوعية بالأدوات والمنهجيات والمعايير العالمية، ونشر المعرفة والاسهام في الإضافة النوعية لهذا الحقل المعرفي
            </p>
          </div>
          <div className="cards_container">
            <a href="/sign" className="card">
              <img src={arrow} />
              <h2 className="card_title">عيادة أعمق</h2>
              <p className="card_desc">
              بوابتك لعالم قياس وإدارة الأثر الاجتماعي بطريقة منهجية وفق المعايير العالمية
              </p>
            </a>
            <a className="card">
              <img src={question} />
              <h2 className="card_title">استشارات أعمق</h2>
              <p className="card_desc">
              خدمات استشارية متخصصة عبر مستشارينا ممن لديهم الخبرة المحلية والعالمية في مجال الأثر الاجتماعي في القطاعات الثلاثة
              </p>
            </a>
            <a href="/makalat" className="card">
              <img src={book} />
              <h2 className="card_title">مكتبة أعمق</h2>
              <p className="card_desc">
              مكتبة معرفية تتيح لك التعلم والتعمق في مجال قياس وإدارة الأثر الاجتماعي
              </p>
            </a>
          </div>
        </div>
        <div className="service_section">
          <div className="section_info">
            <h1 className="section_title">مستشارو أعمق</h1>
            <p className="section_desc">
            يضم المجلس العربي للأثر الاجتماعي  نخبة من المتخصصن ممن لديهم الخبرة المحلية والعالمية في مجال الأثر الاجتماعي في القطاعات الثلاثة
            </p>
          </div>
          <div className="cards_container">
            <AwesomeTestimonial
              testimonials={[
                {
                  name: "Eva",
                  company: "Amazon",
                  img_src: "https://i.ibb.co/84h8svL/eight.png",
                  review:
                    "Lorem 1 ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
                },
                {
                  name: "Evelyn",
                  company: "Netflix",
                  img_src: "https://i.ibb.co/k8Jnx61/five.png",
                  review:
                    "Lorem 2 ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
                },
                {
                  name: "Jack",
                  company: "Google",
                  img_src: "https://i.ibb.co/Yj8pMF8/four.png",
                  review:
                    "Lorem 3 ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
                },
                {
                  name: "Sam",
                  company: "Microsoft",
                  img_src: "https://i.ibb.co/ph360c6/nine.png",
                  review:
                    "Lorem 4 ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
                },
                {
                  name: "Abigail",
                  company: "Netflix",
                  img_src: "https://i.ibb.co/gwNmrLn/one.png",
                  review:
                    "Lorem 5 ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
                },
                {
                  name: "Mortal",
                  company: "Google",
                  img_src: "https://i.ibb.co/6PF0kMg/seven.png",
                  review:
                    "Lorem 6 ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
                },
                {
                  name: "Bruno",
                  company: "Netflix",
                  img_src: "https://i.ibb.co/7G9rtfD/six.png",
                  review:
                    "Lorem 7 ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
                },
                {
                  name: "Vernoica",
                  company: "Facebook",
                  img_src: "https://i.ibb.co/pXMvXhK/three.png",
                  review:
                    "Lorem 8 ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
                },
                {
                  name: "Astro",
                  company: "Netflix",
                  img_src: "https://i.ibb.co/WzJD5sj/two.png",
                  review:
                    "Lorem 9 ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh, viverra non, semper suscipit, posuere a, pede.",
                },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
