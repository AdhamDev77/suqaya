import React from 'react';
import logo from "../assets/white_logo_text.svg";
import headerBg from '../assets/bg2.png'
import "./styles/Footer.css";
import { Link } from 'react-router-dom';

function AboutUs() {
  return (
    <div className="!font-tajawal !bg-gray-50">
      {/* Header with Background Image */}
      <header 
        className="!relative !py-20 !bg-blue-900 !text-white"
        style={{
          background: `linear-gradient(rgba(12, 74, 110, 0), rgba(12, 74, 110, 0)), url(${headerBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="!absolute !inset-0 !bg-blue-900 !opacity-40"></div>
        <div className="!container !mx-auto !px-4 !relative !z-10 !text-center">
          <h1 className="!text-5xl !font-extrabold !mb-4 !drop-shadow-lg !text-white">مؤسسة سقاية الأهلية</h1>
          <p className="!text-xl !text-blue-100 !font-medium !max-w-2xl !mx-auto !leading-relaxed">
            توفير مياه الشرب النظيفة للمحتاجين منذ 2020
          </p>
        </div>
      </header>


      {/* About Section */}
      <section className="!py-20">
        <div className="!container !mx-auto !px-4">
          <div className="!flex !flex-col md:!flex-row !gap-12 !items-center">
            <div className="md:!w-1/2">
              <img 
                src="https://media.sssinstagram.com/get?__sig=KbPnM94awtgzUYknux0SaQ&__expires=1748078369&uri=https%3A%2F%2Finstagram.fphl1-1.fna.fbcdn.net%2Fv%2Ft51.29350-15%2F470910578_1357647708975730_7407777402999593986_n.jpg%3Fstp%3Ddst-jpg_e35_s1080x1080_tt6%26_nc_ht%3Dinstagram.fphl1-1.fna.fbcdn.net%26_nc_cat%3D110%26_nc_oc%3DQ6cZ2QHoOkCY8HRxkpCYiFD_9bTQoX725zlvV1AEOR8P46E3zHk5bOlipJyMVHoG9W0BZGLDhnSvYJl-5wclb-Ccm_MB%26_nc_ohc%3DcKdOFOgiEbQQ7kNvwGsd2sP%26_nc_gid%3DnV1pi-CxqVVMZdrSLCRQMg%26edm%3DANTKIIoBAAAA%26ccb%3D7-5%26oh%3D00_AfIpfZ94uB0Omsy1y4lCWLK4vTCxP7BFPuz6dv7Yi8MO8w%26oe%3D68377138%26_nc_sid%3Dd885a2&filename=470910578_1357647708975730_7407777402999593986_n.jpg" 
                alt="توزيع مياه نظيفة" 
                className="!rounded-xl !shadow-2xl !w-full !h-auto !object-cover !min-h-[400px]"
              />
            </div>
            <div className="md:!w-1/2">
              <h2 className="!text-3xl !font-bold !text-blue-800 !mb-6">عن مؤسسة سقاية</h2>
              <p className="!text-gray-700 !mb-4 !leading-relaxed !text-lg">
مؤسسة أهلية تحت مظلة المركز الوطني لتنمية القطاع غيـر الربحي، وبإشـراف ودعم من وزارة البيئة والمياه والزراعة، وتهدف إلـى تمكين المجتمع من الإسهام في مشاريع وبرامج سقيا الماء في القرى والهجر والمناطق النائية، ترسيخًا لدور الوزارة في تفعيل المشاركة المجتمعية. تمثل (سقاية) فرصة للتكامل بين المجتمع ومختلف الجهات العاملة في مجـالات سقيا الماء، كما تـتبنـى دورًا مـحوريًّا في الإشـراف والتنظيم لبـرامج السقيا الحالية، بهدف رفع كفاءتها وتوسيع نطاق تأثيرها عبـر مناطق المملكة، بإيجاد حلول مستدامة، وتسـريع وصول المياه إلـى المناطق المحتاجة بجودة عالية وتكلفة مناسبة.              </p>
              <p className="!text-gray-700 !mb-4 !leading-relaxed !text-lg">
                تأسست مؤسسة سقاية الأهلية بتاريخ 21 أكتوبر 2020م، الموافق 4 ربيع الأول 1442هـ، بقرار من وزارة الموارد البشرية والتنمية الاجتماعية، تحت إشراف وزارة البيئة والمياه والزراعة والمركز الوطني لتنمية القطاع غير الربحي.
              </p>
              <p className="!text-gray-700 !leading-relaxed !text-lg">
                نحن مؤسسة غير ربحية متخصصة في توفير مياه الشرب النظيفة والمستدامة في المناطق الأشد احتياجًا، من خلال شراكات فعّالة وبرامج مبتكرة، بهدف تحسين جودة الحياة وتعزيز التنمية المستدامة في المجتمع.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="!py-20 !bg-gray-100">
        <div className="!container !mx-auto !px-4">
          <div className="!grid md:!grid-cols-2 !gap-8">
            {/* Vision */}
            <div className="!bg-white !p-10 !rounded-xl !shadow-lg hover:!shadow-xl !transition-all !duration-300">
              <div className="!text-blue-600 !mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="!h-14 !w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h3 className="!text-2xl !font-bold !text-blue-800 !mb-4">رؤيتنا</h3>
              <p className="!text-gray-700 !text-lg">
                أن نكون المؤسسة الرائدة في توفير حلول مستدامة ومبتكرة لسقيا المياه، تسهم في تحسين جودة الحياة بالمجتمع.
              </p>
            </div>
            
            {/* Mission */}
            <div className="!bg-white !p-10 !rounded-xl !shadow-lg hover:!shadow-xl !transition-all !duration-300">
              <div className="!text-blue-600 !mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="!h-14 !w-14" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="!text-2xl !font-bold !text-blue-800 !mb-4">رسالتنا</h3>
              <p className="!text-gray-700 !text-lg">
                تقديم خدمات نوعية ومستدامة في مجال سقيا المياه، من خلال شراكات فاعلة وبرامج توعوية مبتكرة، تلبي احتياجات المجتمع وترسّخ الوعي بأهمية استدامة مصادر المياه.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Goals Section */}
      <section className="!py-20">
        <div className="!container !mx-auto !px-4">
          <h2 className="!text-4xl !font-bold !text-center !text-blue-800 !mb-16">أهدافنا الاستراتيجية</h2>
          
          <div className="!grid md:!grid-cols-2 lg:!grid-cols-4 !gap-6">
            {/* Goal 1 */}
            <div className="!bg-white !p-8 !rounded-xl !shadow-md hover:!shadow-lg !border-t-4 !border-blue-600 !transition-all !duration-300">
              <div className="!text-blue-600 !mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="!h-10 !w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <h3 className="!text-xl !font-bold !text-blue-800 !mb-3">توفير مياه نظيفة</h3>
              <p className="!text-gray-700">
                توفير حلول مستدامة لمياه الشرب النظيفة في المناطق الأكثر احتياجًا.
              </p>
            </div>
            
            {/* Goal 2 */}
            <div className="!bg-white !p-8 !rounded-xl !shadow-md hover:!shadow-lg !border-t-4 !border-blue-600 !transition-all !duration-300">
              <div className="!text-blue-600 !mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="!h-10 !w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="!text-xl !font-bold !text-blue-800 !mb-3">بناء الشراكات</h3>
              <p className="!text-gray-700">
                بناء شراكات استراتيجية فاعلة لتعزيز التكامل وتحقيق الأثر الاجتماعي.
              </p>
            </div>
            
            {/* Goal 3 */}
            <div className="!bg-white !p-8 !rounded-xl !shadow-md hover:!shadow-lg !border-t-4 !border-blue-600 !transition-all !duration-300">
              <div className="!text-blue-600 !mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="!h-10 !w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="!text-xl !font-bold !text-blue-800 !mb-3">رفع الوعي</h3>
              <p className="!text-gray-700">
                رفع الوعي المجتمعي بأهمية ترشيد واستخدام المياه بكفاءة.
              </p>
            </div>
            
            {/* Goal 4 */}
            <div className="!bg-white !p-8 !rounded-xl !shadow-md hover:!shadow-lg !border-t-4 !border-blue-600 !transition-all !duration-300">
              <div className="!text-blue-600 !mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="!h-10 !w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="!text-xl !font-bold !text-blue-800 !mb-3">تمكين القطاع</h3>
              <p className="!text-gray-700">
                تمكين وتعزيز قدرات القطاع غير الربحي العامل في مجال سقيا المياه.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AboutUs;