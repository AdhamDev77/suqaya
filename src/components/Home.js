import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Home_img from "../assets/Home_img.svg";
import Home_img_2 from "../assets/Home_img_2.png";
import Home_img_3 from "../assets/Home_img_3.png";
import book from "../assets/book.svg";
import question from "../assets/question.svg";
import arrow from "../assets/arrow.svg";
import "./styles/Home.css";
import AwesomeTestimonial from "react-awesome-testimonials";
import Testimonials from "react-testimonials";
import khalid from "../assets/khalid.jpeg";
import laith from "../assets/laith.jpeg";
import ramona from "../assets/ramona.jpeg";
import salam from "../assets/salam.jpeg";
import saed from "../assets/saed.jpeg";
import bahaa from "../assets/bahaa.jpeg";

function Home() {
  const navigate = useNavigate();
  // const testimonials = [
  //   {
  //     name: "سيد محمد",
  //     company: "مستشار",
  //     img_src: saed,
  //     review:
  //       "من خلال مكتبة أعمق، نحن نسعى لتوفير مصادر معرفية قيمة تسهم في تعزيز الفهم لدى العاملين في مجال الأثر الاجتماعي",
  //   },
  //   {
  //     name: "خالد الغنام",
  //     company: "مستشار",
  //     img_src: khalid,
  //     review:
  //       "كمؤسس لعيادة أعمق، أرى أن المجلس يمثل خطوة كبيرة نحو تعزيز القياس وإدارة الأثر الاجتماعي في العالم العربي بطريقة منهجية وعلمية",
  //   },
  //   {
  //     name: "سلام الخطيب",
  //     company: "مستشار",
  //     img_src: salam,
  //     review:
  //       "تجربتي في تقديم الاستشارات عبر أعمق أظهرت لي مدى حاجة القطاع الاجتماعي في منطقتنا لهذه الأدوات والمنهجيات",
  //   },
  //   {
  //     name: "بهاء عبدالعظيم",
  //     company: "سفير المجلس العربي",
  //     img_src: bahaa,
  //     review:
  //       "عيادة أعمق تساعدنا في تقديم خدمات تقييم الأثر الاجتماعي بأسلوب علمي ومتقدم، وهذا يساهم في تطوير مشاريعنا الاجتماعية",
  //   },
  //   {
  //     name: "رامونا الدنف",
  //     company: "دكتورة",
  //     img_src: ramona,
  //     review:
  //       "أعتبر المجلس العربي للأثر الاجتماعي منصة حيوية لنشر الوعي بالمعايير العالمية وإضافة القيمة للقطاع الاجتماعي في المنطقة",
  //   },
  // {
  //   name: "ليث أبو جليل",
  //   company: "...",
  //   img_src: laith,
  //   review:
  //     "عيادة أعمق تساعدنا في تقديم خدمات تقييم الأثر الاجتماعي بأسلوب علمي ومتقدم، وهذا يساهم في تطوير مشاريعنا الاجتماعية",
  // },
  // ];

  const review1 = [
    salam,
    "سلام الخطيب",
    "من خلال مكتبة أعمق، نحن نسعى لتوفير مصادر معرفية قيمة تسهم في تعزيز الفهم لدى العاملين في مجال الأثر الاجتماعي",
    "مستشار بالمجلس",
  ];
  const review3 = [
    khalid,
    "خالد الغنام",
    "أعتبر المجلس العربي للأثر الاجتماعي منصة حيوية لنشر الوعي بالمعايير العالمية وإضافة القيمة للقطاع الاجتماعي في المنطقة",
    "مستشار بالمجلس",
  ];
  const review2 = [
    saed,
    "سيد محمد",
    "كمؤسس لعيادة أعمق، أرى أن المجلس يمثل خطوة كبيرة نحو تعزيز القياس وإدارة الأثر الاجتماعي في العالم العربي بطريقة منهجية",
    "مستشار بالمجلس",
  ];
  const review4 = [
    laith,
    "ليث أبو جليل",
    "كخبير في تقييم الأثر الاجتماعي، أعتبر أن أدوات ومنهجيات أعمق تسهم بشكل كبير في تحسين ممارساتنا وتقديم نتائج أكثر دقة وفعالية",
    "مستشار بالمجلس",
  ];
  const review5 = [
    bahaa,
    "بهاء عبدالعظيم",
    "عيادة أعمق تساعدنا في تقديم خدمات تقييم الأثر الاجتماعي بأسلوب علمي ومتقدم، وهذا يساهم في تطوير مشاريعنا الاجتماعية",
    "سفير المجلس",
  ];
  const review6 = [
    ramona,
    "رامونا الدنف",
    "تجربتي في تقديم الاستشارات عبر أعمق أظهرت لي مدى حاجة القطاع الاجتماعي في منطقتنا لهذه الأدوات والمنهجيات",
    "دكتورة بالمجلس",
  ];

  const items = [review1, review2, review3, review4, review5, review6];

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = localStorage.getItem("_id");
    let isComm = localStorage.getItem("comm_file");
    if (id && isComm) {
      navigate(`/comm/profile/${id}`);
    } else if (id && !isComm) {
      navigate(`/profile/${id}`);
    }
  }, [navigate]);

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-text">
          <h1>
            أهلاً بك في <br />
            <span className="cool_text">عيادة أعمق</span>
            {/* <p className="hero_slogan">لأن أثرك أعمق من مجرد مؤشر</p> */}
          </h1>
          <p>
            هل ترغب في معرفة الأثر الاجتماعي لمشروعك؟
            <br /> هل تريد أن تتأكد من أن مبادرتك تترك أثراً إيجابياً في
            المجتمع؟ <br />
            عيادة أعمق تفتح لك بوابة عالم قياس الأثر الاجتماعي وإدارته
          </p>
          <Link to="/sign" className="btn">
            سجل الآن
          </Link>
        </div>
        <div className="hero-img">
          <img src={Home_img_2} alt="Home" />
        </div>
      </section>

      <section className="services">
        <h2>خدماتنا</h2>
        <p className="section_desc">
          المجلس العربي للأثر الاجتماعي (أعمق) شبكة مهنية تأسست لبناء منظومة
          الأثر الاجتماعي في المنطقة العربية، والتوعية بالأدوات والمنهجيات
          والمعايير العالمية، ونشر المعرفة والاسهام في الإضافة النوعية لهذا
          الحقل المعرفي
        </p>
        <div className="cards">
          <Link to="/sign" className="card">
            <img src={arrow} alt="Clinic" />
            <h3>عيادة أعمق</h3>
            <p>
              بوابتك لعالم قياس وإدارة الأثر الاجتماعي بطريقة منهجية وفق
              المعايير العالمية
            </p>
          </Link>
            <Link to="/feedback" className="card">
              <img src={question} alt="Consulting" />
              <h3>استشارات أعمق</h3>
              <p>
                خدمات استشارية متخصصة عبر مستشارينا ممن لديهم الخبرة المحلية
                والعالمية في مجال الأثر الاجتماعي في القطاعات الثلاثة
              </p>
            </Link>
          <Link to="/makalat" className="card">
            <img src={book} alt="Library" />
            <h3>مكتبة أعمق</h3>
            <p>
              مكتبة معرفية تتيح لك التعلم والتعمق في مجال قياس وإدارة الأثر
              الاجتماعي
            </p>
          </Link>
        </div>
      </section>

      <section className="team">
        <h2>فريق عيادة أعمق</h2>
        <p className="section_desc">
          يضم المجلس العربي للأثر الاجتماعي نخبة من المتخصصن ممن لديهم الخبرة
          المحلية والعالمية في مجال الأثر الاجتماعي في القطاعات الثلاثة
        </p>
        {/* <AwesomeTestimonial testimonials={testimonials} /> */}
        <Testimonials items={items} />
      </section>
    </div>
  );
}

export default Home;
