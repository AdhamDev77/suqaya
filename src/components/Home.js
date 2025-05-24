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
import bahaa from "../assets/bahaa.jpeg";https://suqaya-backend.onrender.com
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
  const items = [review1, review2, review1, review2, review1, review2];

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
      carouselInnerRef.current.style.transform = `translateX(-${
        currentIndex * 100
      }%)`;
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
                    <img
                      src="https://sekaya.org.sa/wp-content/uploads/2024/07/ثقيف1-9.jpg"
                      alt="Social Impact News"
                    />
                    <div className="carousel-content">
                      <h3>تأمين صهاريج</h3>
                      <p>
                        تأمين وتوفير صهاريج مخصصة لنقل وتوزيع المياه بشكل آمن
                        وفعّال، بما يضمن إيصال المياه النظيفة إلى المستفيدين في
                        المناطق النائية والمحرومة من شبكات المياه الرئيسية
                      </p>
                    </div>
                  </div>
                  {/* <div className="carousel-item">
                    <img
                      src="https://media.sssinstagram.com/get?__sig=KbPnM94awtgzUYknux0SaQ&__expires=1748078369&uri=https%3A%2F%2Finstagram.fphl1-1.fna.fbcdn.net%2Fv%2Ft51.29350-15%2F470910578_1357647708975730_7407777402999593986_n.jpg%3Fstp%3Ddst-jpg_e35_s1080x1080_tt6%26_nc_ht%3Dinstagram.fphl1-1.fna.fbcdn.net%26_nc_cat%3D110%26_nc_oc%3DQ6cZ2QHoOkCY8HRxkpCYiFD_9bTQoX725zlvV1AEOR8P46E3zHk5bOlipJyMVHoG9W0BZGLDhnSvYJl-5wclb-Ccm_MB%26_nc_ohc%3DcKdOFOgiEbQQ7kNvwGsd2sP%26_nc_gid%3DnV1pi-CxqVVMZdrSLCRQMg%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AfIpfZ94uB0Omsy1y4lCWLK4vTCxP7BFPuz6dv7Yi8MO8w%26oe%3D68377138%26_nc_sid%3Dd885a2&filename=470910578_1357647708975730_7407777402999593986_n.jpg"
                      alt="Social Value Measurement"
                    />
                    <div className="carousel-content">
                      <h3>فاعليات رسمية</h3>
                      <p>
                        ينطلق الآن اللقاء الثاني للجهات الأهلية العاملة في مجال
                        سقيا الماء بحضور وكيل وزارة البيئة والمياه والزراعة
                        للمياة
                      </p>
                    </div>
                  </div> */}
                  <div className="carousel-item">
                    <img
                      src="https://sekaya.org.sa/wp-content/uploads/2024/07/%D8%A3%D8%B6%D9%85.jpg"
                      alt="Non-Profit Effectiveness"
                    />
                    <div className="carousel-content">
                      <h3>إقامة محطات التحلية</h3>
                      <p>
                        إقامة محطات التحلية والتنقية المصغرة، بالإضافة إلى تقديم
                        خدمات الصيانة الدورية والتشغيل المستمر لضمان جودة المياه
                        وتحقيق الاستدامة البيئية.
                      </p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://sekaya.org.sa/wp-content/uploads/2024/05/inside-well-scaled-1-2048x1366.jpg"
                      alt="Social Impact News"
                    />
                    <div className="carousel-content">
                      <h3>حفر الآبار الأنبوبية واليدوية</h3>
                      <p>
                        تنفيذ مشاريع حفر الآبار الأنبوبية واليدوية بهدف توفير
                        مصادر مياه آمنة ومستدامة للمجتمعات المحتاجة، مع مراعاة
                        الشروط الفنية والبيئية
                      </p>
                    </div>
                  </div>
                  <div className="carousel-item">
                    <img
                      src="https://sekaya.org.sa/wp-content/uploads/2024/07/%D8%A7%D9%84%D9%85%D8%B1%D9%82%D8%A8%D8%A7%D9%8611-5.jpg"
                      alt="Social Impact News"
                    />
                    <div className="carousel-content">
                      <h3>تأمين خزانات</h3>
                      <p>
                        تأمين وتوريد خزانات مركزية ومنزلية عالية الجودة بمواصفات
                        فنية تضمن سلامة المياه وتلبي احتياجات الاستخدام اليومي
                        بكفاءة وموثوقية
                      </p>
                    </div>
                  </div>
                </div>
                <div className="carousel-indicators">
                  {[4, 3, 2, 1, 0].map((index) => (
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
              <h1>أهلًا وسهلًا بكم في منصة سقاية لقياس الأثر الاجتماعي</h1>
              <p>
                التي صُممت لتكون جسرًا بين العطاء الهادف والتأثير الحقيقي في
                حياة المستفيدين. نؤمن في مؤسسة سقاية أن كل مشروع وكل قطرة ماء
                تصل لمستحقها تستحق أن تُقاس وتُوثّق، لتكون دافعًا نحو تحسين
                الأداء، وزيادة الكفاءة، وتعظيم الأثر المجتمعي. ومن هذا المنطلق،
                أطلقنا هذه المنصة لتمكينكم من مشاركة تجاربكم، وتقديم آرائكم،
                والمساهمة في تطوير المشاريع التي تخدمكم.
              </p>
              <Link to="/sign" className="btn">
                كن شريكًا
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
