import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Home_img from "../assets/Home_img.svg";
import Home_img_2 from "../assets/Home_img_2.png";
import Home_img_3 from "../assets/Home_img_3.png";
import book from "../assets/book.png";
import question from "../assets/question.png";
import arrow from "../assets/arrow.png";
import "./styles/Home.css";
import Testimonials from "react-testimonials";
import khalid from "../assets/khalid.jpeg";
import laith from "../assets/laith.jpeg";
import ramona from "../assets/ramona.jpeg";
import salam from "../assets/salam.jpeg";
import saed from "../assets/saed.jpeg";
import bahaa from "../assets/bahaa.jpeg";
function Home() {
  const navigate = useNavigate();
  const carouselInnerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const review1 = [
    salam,
    "سلام الخطيب",
    "من خلال مكتبة سقاية، نحن نسعى لتوفير مصادر معرفية قيمة تسهم في تعزيز الفهم لدى العاملين في مجال الأثر الاجتماعي",
    "مستشار بالمؤسسة",
  ];
  const review2 = [
    saed,
    "سيد محمد",
    "كمؤسس لمؤسسة سقاية الأهلية، أرى أن المؤسسة يمثل خطوة كبيرة نحو تعزيز القياس وإدارة الأثر الاجتماعي في العالم العربي بطريقة منهجية",
    "مستشار بالمؤسسة",
  ];
  const review3 = [
    khalid,
    "خالد الغنام",
    "أعتبر المؤسسة العربي للأثر الاجتماعي منصة حيوية لنشر الوعي بالمعايير العالمية وإضافة القيمة للقطاع الاجتماعي في المنطقة",
    "مستشار بالمؤسسة",
  ];
  const review4 = [
    laith,
    "ليث أبو جليل",
    "كخبير في تقييم الأثر الاجتماعي، أعتبر أن أدوات ومنهجيات سقاية تسهم بشكل كبير في تحسين ممارساتنا وتقديم نتائج أكثر دقة وفعالية",
    "مستشار بالمؤسسة",
  ];
  const review5 = [
    bahaa,
    "بهاء عبدالعظيم",
    "مؤسسة سقاية الأهلية تساعدنا في تقديم خدمات تقييم الأثر الاجتماعي بأسلوب علمي ومتقدم، وهذا يساهم في تطوير مشاريعنا الاجتماعية",
    "سفير المؤسسة",
  ];
  const review6 = [
    ramona,
    "رامونا الدنف",
    "تجربتي في تقديم الاستشارات عبر سقاية أظهرت لي مدى حاجة القطاع الاجتماعي في منطقتنا لهذه الأدوات والمنهجيات",
    "دكتورة بالمؤسسة",
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % 3); // Assuming 3 items in the carousel
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (carouselInnerRef.current) {
      carouselInnerRef.current.style.transform = `translateX(-${currentIndex * 100}%)`;
    }
  }, [currentIndex]);

  return (
    <>
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
          
            <div className="news-carousel">
              <div className="carousel">
                <div className="carousel-inner" ref={carouselInnerRef}>
                  <div className="carousel-item">
                    <img src="https://i0.wp.com/www.alwatantoday.net/wp-content/uploads/2021/10/233200.jpg" alt="Social Value Measurement" />
                    <div className="carousel-content">
                      <h3>قياس القيمة الاجتماعية</h3>
                      <p>تعرف على أحدث الأدوات والمنهجيات لقياس القيمة الاجتماعية وتأثيرها على المجتمع.</p>
                      <button>اقرأ المزيد</button>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="https://alsaudiapress.com/wp-content/uploads/2024/08/2381867.jpeg" alt="Non-Profit Effectiveness" />
                    <div className="carousel-content">
                      <h3>فعالية المنظمات غير الربحية</h3>
                      <p>كيف يمكن للمنظمات غير الربحية تحسين فعاليتها وزيادة تأثيرها الاجتماعي؟</p>
                      <button>اقرأ المزيد</button>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img src="https://vid.alarabiya.net/images/2023/07/24/68b59cf6-c42f-4622-932f-e8237b7c589e/68b59cf6-c42f-4622-932f-e8237b7c589e_16x9_1200x676.jpg?width=372&format=jpg" alt="Social Impact News" />
                    <div className="carousel-content">
                      <h3>أحدث الأخبار في قياس الأثر الاجتماعي</h3>
                      <p>تعرف على آخر التطورات في مجال قياس الأثر الاجتماعي وإدارة المشاريع ذات التأثير الإيجابي.</p>
                      <button>اقرأ المزيد</button>
                    </div>
                  </div>
                </div>
                <div className="carousel-indicators">
                  {[0, 1, 2].map((index) => (
                    <span
                      key={index}
                      className={index === currentIndex ? "active" : ""}
                      onClick={() => setCurrentIndex(index)}
                    ></span>
                  ))}
                </div>
              </div>
            </div>
            <div className="hero-text">
              <h1>
                أهلاً بك في 
                مؤسسة سقاية الأهلية 
              </h1>
              <p>
                هل ترغب في معرفة الأثر الاجتماعي لمشروعك؟
                <br /> هل تريد أن تتأكد من أن مبادرتك تترك أثراً إيجابياً في
                المجتمع؟ <br />
                مؤسسة سقاية الأهلية تفتح لك بوابة عالم قياس الأثر الاجتماعي وإدارته
              </p>
              <Link to="/sign" className="btn">
                سجل الآن
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="services">
        <h2>خدماتنا</h2>
        <p className="section-desc">
          المؤسسة العربي للأثر الاجتماعي (سقاية) شبكة مهنية تأسست لبناء منظومة
          الأثر الاجتماعي في المنطقة العربية، والتوعية بالأدوات والمنهجيات
          والمعايير العالمية، ونشر المعرفة والاسهام في الإضافة النوعية لهذا
          الحقل المعرفي
        </p>
        <div className="cards">
          <Link to="/sign" className="card">
            <img src={arrow} alt="Clinic" />
            <h3>مؤسسة سقاية الأهلية</h3>
            <p>
              بوابتك لعالم قياس وإدارة الأثر الاجتماعي بطريقة منهجية وفق
              المعايير العالمية
            </p>
          </Link>
          <Link to="/feedback" className="card">
            <img src={question} alt="Consulting" />
            <h3>استشارات سقاية</h3>
            <p>
              خدمات استشارية متخصصة عبر مستشارينا ممن لديهم الخبرة المحلية
              والعالمية في مجال الأثر الاجتماعي في القطاعات الثلاثة
            </p>
          </Link>
          <Link to="/makalat" className="card">
            <img src={book} alt="Library" />
            <h3>مكتبة سقاية</h3>
            <p>
              مكتبة معرفية تتيح لك التعلم والتعمق في مجال قياس وإدارة الأثر
              الاجتماعي
            </p>
          </Link>
        </div>
      </section>

      <section className="team">
        <h2>فريق مؤسسة سقاية الأهلية</h2>
        <p className="section-desc">
          يضم المؤسسة العربي للأثر الاجتماعي نخبة من المتخصصن ممن لديهم الخبرة
          المحلية والعالمية في مجال الأثر الاجتماعي في القطاعات الثلاثة
        </p>
        <Testimonials items={items} />
      </section>
    </>
  );
}

export default Home;