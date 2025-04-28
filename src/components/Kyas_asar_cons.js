import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./styles/Kyas_asar.css";
import kyas_logo_1 from "../assets/kyas_logo_1.svg";
import kyas_logo_2 from "../assets/kyas_logo_2.svg";
import green_logo from "../assets/green_logo.svg";
import { ToastContainer, toast } from "react-toastify";

function Kyas_asar_show() {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = localStorage.getItem("_id");
    if (!id) {
      navigate("/");
    }
  }, []);

  let { id } = useParams();

  const [cons_comment, setCons_comment] = useState([
    { cons_makan: "عام", cons_subject: "" },
  ]);
  const handleAddComment = (e) => {
    e.preventDefault();
    setCons_comment([...cons_comment, { cons_makan: "عام", cons_subject: "" }]);
  };
  const handleRemoveComment = (index) => {
    setCons_comment(cons_comment.filter((_, i) => i !== index));
  };
  const handleChange = (index, fieldName, value) => {
    const newComments = [...cons_comment];
    newComments[index][fieldName] = value;
    setCons_comment(newComments);
    console.log(cons_comment);
  };
  const handlePost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        `https://suqaya-backend.onrender.com/api/cons/${id}`,
        { cons_comment: cons_comment, cons_seen: "true" }
      );
      navigate(-1);
    } catch (error) {
      console.error("Error while updating user:", error);
    }
  };

  const [asar, setAsar] = useState(null);
  const [cons, setCons] = useState();
  const [loading, setLoading] = useState(true);
  const [isMos, setIsMos] = useState(null);
  const [project_info, setProject_info] = useState(null);
  const [project_goals_1, setProject_goals_1] = useState(null);
  const [project_goals_2, setProject_goals_2] = useState(null);
  const [project_tahlils, setProject_tahlils] = useState(null);
  const [m3neen, setM3neen] = useState(null);
  const [project_natiga, setProject_natiga] = useState(null);
  const [mod5alat, setMod5alat] = useState(null);

  const fetchComm = async (id) => {
    try {
      setLoading(true);
      try {
        const local_id = localStorage.getItem("_id");
        const responseUser = await axios.get(
          `https://suqaya-backend.onrender.com/api/users/${local_id}`
        );
        setIsMos(responseUser.data.isMos);
      } catch (error) {
        console.error("Error while fetching user:", error);
        return; // Exit the function early if user fetch fails
      }
      /*
      let id;
      const local_id = localStorage.getItem("_id");
      const comm_file = localStorage.getItem("comm_file");
      
      if(comm_file){
        id = localStorage.getItem("_id");
      } else {
        try {
          const responseUser = await axios.get(`https://suqaya-backend.onrender.com/api/users/${local_id}`);
          id = responseUser.data.comm_id;
        } catch(error) {
          console.error("Error while fetching user:", error);
          return; // Exit the function early if user fetch fails
        }
      }
 
      const responseComm = await axios.get(`https://suqaya-backend.onrender.com/api/comm/${id}`);
      const responseAsar = await axios.get(`https://suqaya-backend.onrender.com/api/asar/${responseComm.data.comm_asar}`);
      */
      const response = await axios.get(
        `https://suqaya-backend.onrender.com/api/cons/${id}`
      );
      if (Array.isArray(response.data.cons_comment)) {
        setCons_comment(response.data.cons_comment);
      } else {
        console.error(
          "cons_comment is not an array:",
          response.data.cons_comment
        );
        setCons_comment([{ cons_makan: "عام", cons_subject: "" }]);
      }
      console.log("CONS:", response.data.cons_comment);
      const responseAsar = await axios.get(
        `https://suqaya-backend.onrender.com/api/asar/${response.data.cons_asar}`
      );
      console.log("responseASAR" + JSON.stringify(responseAsar.data.draft._id));
      const responseDraft = await axios.get(
        `https://suqaya-backend.onrender.com/api/draft_asar/${responseAsar.data.draft._id}`
      );
      console.log("responseDraft" + JSON.stringify(responseDraft));
      localStorage.setItem(
        "project_info",
        JSON.stringify(
          responseAsar.data.project_info ||
            responseDraft.data.project_info ||
            []
        )
      );
      localStorage.setItem(
        "project_goals_1",
        JSON.stringify(
          responseAsar.data.project_goals_1 ||
            responseDraft.data.project_goals_1 ||
            []
        )
      );
      localStorage.setItem(
        "project_goals_2",
        JSON.stringify(
          responseAsar.data.project_goals_2 ||
            responseDraft.data.project_goals_2 ||
            []
        )
      );
      localStorage.setItem(
        "project_tahlils",
        JSON.stringify(
          responseAsar.data.project_tahlils ||
            responseDraft.data.project_tahlils ||
            []
        )
      );
      localStorage.setItem(
        "m3neen",
        JSON.stringify(
          responseAsar.data.m3neen || responseDraft.data.m3neen || []
        )
      );
      localStorage.setItem(
        "project_natiga",
        JSON.stringify(
          responseAsar.data.project_natiga ||
            responseDraft.data.project_natiga ||
            []
        )
      );
      localStorage.setItem(
        "mod5alat",
        responseAsar.data.mod5alat || responseDraft.data.mod5alat || ""
      );

      const project_info_ls = localStorage.getItem("project_info");
      const project_goals_1_ls = localStorage.getItem("project_goals_1");
      const project_goals_2_ls = localStorage.getItem("project_goals_2");
      const project_tahlils_ls = localStorage.getItem("project_tahlils");
      const m3neen_ls = localStorage.getItem("m3neen");
      const project_natiga_ls = localStorage.getItem("project_natiga");
      const mod5alat_ls = localStorage.getItem("mod5alat");

      if (project_info_ls) setProject_info(JSON.parse(project_info_ls));
      if (project_goals_1_ls)
        setProject_goals_1(JSON.parse(project_goals_1_ls));
      if (project_goals_2_ls)
        setProject_goals_2(JSON.parse(project_goals_2_ls));
      if (project_tahlils_ls)
        setProject_tahlils(JSON.parse(project_tahlils_ls));
      if (m3neen_ls) setM3neen(JSON.parse(m3neen_ls));
      if (project_natiga_ls) setProject_natiga(JSON.parse(project_natiga_ls));
      if (mod5alat_ls) setMod5alat(parseInt(mod5alat_ls));
      setAsar(responseAsar.data);

      console.log(responseAsar.data.project_info);
      setLoading(false);
    } catch (error) {
      console.error("Error while fetching:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComm(id);
  }, [id]);

  if (loading) {
    return <div>Loading...</div>; // Display loading message while data is being fetched
  }
  return (
    <div className="asar_body" id="asar_10" style={{ display: "flex" }}>
      <div className="asar_header">
        <img className="kyas_logo_1" src={kyas_logo_1} />
        <img className="kyas_logo_2" src={kyas_logo_2} />
        <div className="asar_header_text">
          <h1 className="asar_title">الاستشارة</h1>
          <p className="asar_title_2">
            يمكنك رؤية و تحليل قياس الأثر الخاص بالمستشير و الرد على استفساره
            بآليات الرد
          </p>
        </div>
      </div>
      <div className="asar_con table_page">
        <div className="asar_con_con">
          <div className="asar_form_w_btns">
            <form className="asar_form table_form" onSubmit={handlePost}>
              {isMos && (
                <div className="cons_comment_form">
                  <div className="sign_form">
                    <div className="sign_header">
                      <h1 className="sign_title">محتوى الرد</h1>
                      <img className="sign_logo" src={green_logo} alt="Logo" />
                    </div>
                    {cons_comment.map((cons_comment, index) => (
                      <div className="sign_form_con">
                        <div className="sign_element_multi">
                          <div className="sign_element">
                            <label className="sign_label">محل التعليق</label>
                            <select
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "cons_makan",
                                  e.target.value
                                )
                              }
                              value={cons_comment.cons_makan}
                              name="cons_makan"
                              className="sign_input"
                            >
                              <option value="" hidden disabled></option>
                              <option value="عام">عام</option>
                              <option value="معلومات المشروع">
                                معلومات المشروع
                              </option>
                              <option value="الأهداف">الأهداف</option>
                              <option value="التحليل">التحليل</option>
                              <option value="أصحاب المصلحة">
                                أصحاب المصلحة
                              </option>
                              <option value="النتائج">النتائج</option>
                              <option value="أخري">أخري</option>
                            </select>
                          </div>
                          <div className="sign_element">
                            <label className="sign_label">التعليق</label>
                            <textarea
                              onChange={(e) =>
                                handleChange(
                                  index,
                                  "cons_subject",
                                  e.target.value
                                )
                              }
                              value={cons_comment.cons_subject}
                              name="cons_subject"
                              className="sign_input"
                            ></textarea>
                          </div>
                          <button
                            className="comment_x"
                            onClick={() => handleRemoveComment(index)}
                          >
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                    <button onClick={handleAddComment} className="add_btn">
                      اضافة تعليق <i class="fa-solid fa-plus"></i>
                    </button>
                    <input className="submit_btn" type="submit" value="رد" />
                  </div>
                </div>
              )}

              <div className="table_row">
                <div className="table_1">
                  <h1>معلومات المشروع</h1>
                  <div className="table_1_con">
                    <div className="table_1_element">
                      <label className="table_1_title">: اسم المشروع</label>
                      <label className="table_1_info">
                        {asar.project_info.projectName || "_"}
                      </label>
                    </div>
                    <div className="table_1_element_multi">
                      <div className="table_1_element">
                        <label className="table_1_title">: نوع القياس</label>
                        <label className="table_1_info">
                          {asar.project_info.no3_kyas || "_"}
                        </label>
                      </div>
                      <div className="table_1_element">
                        <label className="table_1_title">: مجال المشروع</label>
                        <label className="table_1_info">
                          {asar.project_info.me7war || "_"}
                        </label>
                      </div>
                    </div>
                    <div className="table_1_element">
                      <label className="table_1_title">: المنطقة</label>
                      <label className="table_1_info">
                        {asar.project_info.manteka || "_"}
                      </label>
                    </div>
                    <div className="table_1_element">
                      <label className="table_1_title">
                        : الإطار الزمني المخطط للتحليل
                      </label>
                      <label className="table_1_info">
                        {asar.project_info.etar_zamani || "_"}
                      </label>
                    </div>
                    <div className="table_1_element">
                      <label className="table_1_title">
                        : مصدر دخل المشروع
                      </label>
                      <label className="table_1_info">
                        {asar.project_info.masdar_da5l || "_"}
                      </label>
                    </div>
                    <div className="table_1_element">
                      <label className="table_1_title">
                        القرارت التي تتأثر بالتحليل :
                      </label>
                      {asar.project_info.krarat_tt2sr &&
                      asar.project_info.krarat_tt2sr.length > 0 ? (
                        asar.project_info.krarat_tt2sr.map(
                          (decision, index) => (
                            <div key={index} className="table_1_info">
                              {decision || "_"}
                            </div>
                          )
                        )
                      ) : (
                        <div className="table_1_info">_</div>
                      )}
                    </div>
                    <div className="table_1_element">
                      <label className="table_1_title">
                        : الأنشطة التي ستركز عليها
                      </label>
                      {asar.project_info.an4eta &&
                      asar.project_info.an4eta.length > 0 ? (
                        asar.project_info.an4eta.map((na4at, index) => (
                          <div key={index} className="table_1_info">
                            {na4at || "_"}
                          </div>
                        ))
                      ) : (
                        <div className="table_1_info">_</div>
                      )}
                    </div>
                    <div className="table_1_element">
                      <label className="table_1_title">
                        : الغاية من الأنشطة
                      </label>
                      <label className="table_1_info">
                        {asar.project_info.ghaya_an4eta || "_"}
                      </label>
                    </div>
                    <div className="table_1_element">
                      <label className="table_1_title">: التطوع بالمشروع</label>
                      <label className="table_1_info">
                        {asar.project_info.el_tatawo3 || "_"}
                      </label>
                    </div>
                    <div className="table_1_element_multi">
                      <div className="table_1_element">
                        <label className="table_1_title">: من</label>
                        <label className="table_1_info">
                          {asar.project_info.startDate || "_"}
                        </label>
                      </div>
                      <div className="table_1_element">
                        <label className="table_1_title">: الي</label>
                        <label className="table_1_info">
                          {asar.project_info.endDate || "_"}
                        </label>
                      </div>
                    </div>
                    <div className="table_1_element">
                      <label className="table_1_title">
                        : حالة اغلاق المشروع
                      </label>
                      <label className="table_1_info">
                        {asar.project_info.projectClosed || "_"}
                      </label>
                    </div>
                  </div>
                </div>
                <div className="table_2">
                  <h1>الأهداف</h1>
                  <div className="table_2_header">
                    <label className="table_2_header_item">
                      : أهداف المنظمة الاستراتيجية ذات الارتباط
                    </label>
                    <label className="table_2_header_item">
                      : أهداف تشغيلية مباشرة للأنشطة
                    </label>
                  </div>
                  <div className="table_2_con">
                    {asar.project_goals_2 &&
                      asar.project_goals_2.length > 0 && (
                        <>
                          {asar.project_goals_2.map((item, index) => (
                            <div key={index} className="table_2_content">
                              <label className="table_2_info">
                                {item.project_goals_1 || "_"}
                              </label>
                              <label className="table_2_info">
                                {item.project_goals_2 || "_"}
                              </label>
                            </div>
                          ))}
                        </>
                      )}
                  </div>
                </div>
              </div>
              <div className="table_row">
                <div className="table_2">
                  <h1>موارد المشروع</h1>
                  <div className="table_2_header">
                    <label className="table_2_header_item">البيان</label>
                    <label className="table_2_header_item">القيمة</label>
                    <label className="table_2_header_item">نوع التكلفة</label>
                    <label className="table_2_header_item">
                      النشاط المُصاحب
                    </label>
                  </div>
                  <div className="table_2_con">
                    {asar.project_tahlils &&
                      asar.project_tahlils.length > 0 && (
                        <>
                          {asar.project_tahlils.map((item, index) => (
                            <div key={index} className="table_2_content">
                              <label className="table_2_info">
                                {item.bayan}
                              </label>
                              <label className="table_2_info">
                                {item.kema}
                              </label>
                              <label className="table_2_info">
                                {item.no3_taklefa}
                              </label>
                              <label className="table_2_info">
                                {item.na4at_mosaheb}
                              </label>
                            </div>
                          ))}
                        </>
                      )}
                  </div>
                </div>
              </div>
              <div className="table_row">
                <div className="table_2">
                  <h1>أصحاب المصلحة</h1>
                  <div className="table_2_header">
                    <label className="table_2_header_item flex_2">
                      صاحب المصلحة
                    </label>
                    <label className="table_2_header_item flex_2">
                      تأثيرهم/تأثرهم
                    </label>
                    <label className="table_2_header_item">الإشراك</label>
                    <label className="table_2_header_item">
                      العدد الذي سيتم إشراكه
                    </label>
                    <label className="table_2_header_item flex_2">سبب</label>
                    <label className="table_2_header_item">طريقة الإشراك</label>
                    <label className="table_2_header_item">تاريخ إشراك</label>
                  </div>
                  <div className="table_2_con">
                    {asar.m3neen && asar.m3neen.length > 0 && (
                      <>
                        {asar.m3neen.map((item, index) => (
                          <div key={index} className="table_2_content">
                            <label className="table_2_info flex_2">
                              {item.m3ni}
                            </label>
                            <label className="table_2_info flex_2">
                              {item.ta3ref_m3ni}
                            </label>
                            <label className="table_2_info">
                              {item.e4temal}
                            </label>
                            <label className="table_2_info">
                              {item.mostafed_count || "_"}
                            </label>
                            <label className="table_2_info flex_2">
                              {item.sabab || "_"}
                            </label>
                            <label className="table_2_info">
                              {item.tare2et_e4rak || "_"}
                            </label>
                            <label className="table_2_info">
                              {item.tare5_e4rak || "_"}
                            </label>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="table_row">
                <div className="table_2">
                  <h1>النتائج</h1>
                  <div className="table_2_header">
                    <label className="table_2_header_item flex_2">
                      النتيجة
                    </label>
                    <label className="table_2_header_item flex_2">
                      صاحب المصلحة
                    </label>
                    <label className="table_2_header_item">اسم المؤشر</label>
                    <label className="table_2_header_item">
                      عدد المستفيدين
                    </label>
                    <label className="table_2_header_item">
                      نسبة التغيير %
                    </label>
                    <label className="table_2_header_item">عتبة التغيير</label>
                    <label className="table_2_header_item">
                      المكافئ المالي
                    </label>
                    <label className="table_2_header_item flex_2">
                      شرح المكافئ
                    </label>
                    <label className="table_2_header_item flex_5">
                      مدة التأثير{" "}
                    </label>
                    <label className="table_2_header_item">بداية الأثر</label>
                    <label className="table_2_header_item">
                      الحمل الزائد %
                    </label>
                    <label className="table_2_header_item">الازاحة %</label>
                    <label className="table_2_header_item">العزو %</label>
                    <label className="table_2_header_item">
                      انخفاض الأثر %
                    </label>
                  </div>
                  <div className="table_2_con">
                    {asar.project_natiga && asar.project_natiga.length > 0 && (
                      <>
                        {asar.project_natiga.map((item, index) => (
                          <div key={index} className="table_2_content">
                            <label className="table_2_info flex_2">
                              {item.natiga.natiga}
                            </label>
                            <label className="table_2_info flex_2">
                              {item.m3ni.m3ni}
                            </label>
                            <label className="table_2_info">
                              {item.esm_mo24r}
                            </label>
                            <label className="table_2_info">
                              {item.mostahdaf}
                            </label>
                            <label className="table_2_info">
                              {item.nesbet_ta8yyr}%
                            </label>
                            <label className="table_2_info">
                              {item.ataba_ta8yyr}
                            </label>
                            <label className="table_2_info">
                              {item.mokafe2_maly}
                            </label>
                            <label className="table_2_info flex_2">
                              {item.shar7_mokafe2_maly}
                            </label>
                            <label className="table_2_info flex_5">
                              {item.sneen}
                            </label>
                            <label className="table_2_info">
                              {item.bedayt_m4ro3}
                            </label>
                            <label className="table_2_info">
                              {item.heml_za2ed}%
                            </label>
                            <label className="table_2_info">
                              {item.eza7a}%
                            </label>
                            <label className="table_2_info">{item.azw}%</label>
                            <label className="table_2_info">
                              {item.fatra}%
                            </label>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="table_row">
                <div className="table_2">
                  <h1>قيمة الأثر</h1>
                  <div className="table_2_header">
                    <label className="table_2_header_item">النتيجة</label>
                    <label className="table_2_header_item">اجمالي الأثر</label>
                    <label className="table_2_header_item">السنة 0</label>
                    <label className="table_2_header_item">السنة 1</label>
                    <label className="table_2_header_item">السنة 2</label>
                    <label className="table_2_header_item">السنة 3</label>
                    <label className="table_2_header_item">السنة 4</label>
                    <label className="table_2_header_item">السنة 5</label>
                    <label className="table_2_header_item">
                      اجمالي السنوات
                    </label>
                  </div>
                  <div className="table_2_con">
                    {asar.project_natiga && asar.project_natiga.length > 0 && (
                      <>
                        {asar.project_natiga.map((item, index) => (
                          <div key={index} className="table_2_content">
                            <label className="table_2_info">
                              {item.natiga.natiga || "_"}
                            </label>
                            <label className="table_2_info">
                              {Math.round(item.egmali_el_asar) || "_"}
                            </label>
                            <label className="table_2_info">
                              {Math.round(item.years[0]) || "_"}
                            </label>
                            <label className="table_2_info">
                              {Math.round(item.years[1]) || "_"}
                            </label>
                            <label className="table_2_info">
                              {Math.round(item.years[2]) || "_"}
                            </label>
                            <label className="table_2_info">
                              {Math.round(item.years[3]) || "_"}
                            </label>
                            <label className="table_2_info">
                              {Math.round(item.years[4]) || "_"}
                            </label>
                            <label className="table_2_info">
                              {Math.round(item.years[5]) || "_"}
                            </label>
                            <label className="table_2_info">
                              {Math.round(item.total_years) || "_"}
                            </label>
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="table_row">
                <div className="table_2">
                  <h1>العائد الاجتماعي على الاستثمار</h1>
                  <div className="table_2_header">
                    <label className="table_2_header_item">
                      إجمالي الموارد
                    </label>
                    <label className="table_2_header_item">
                      إجمالي القيمة المجتمعية{" "}
                    </label>
                    <label className="table_2_header_item">
                      صافي القيمة المجتمعية{" "}
                    </label>
                    <label className="table_2_header_item">
                      العائد الاجتماعي على الاستثمار
                    </label>
                  </div>
                  <div className="table_2_con">
                    <div className="table_2_content">
                      <label className="table_2_info important">
                        {asar.mod5alat || "_"}
                      </label>
                      <label className="table_2_info important">
                      {Math.round(asar.kema_mogtama3ya) || "_"}
                      </label>
                      {asar.safy_kema_mogtama3ya > 0 ? (
                        <label className="table_2_info important">
                          {Math.round(asar.safy_kema_mogtama3ya) || "_"}
                        </label>
                      ) : (
                        <label className="table_2_info_red important">
                          {Math.round(asar.safy_kema_mogtama3ya)|| "_"}
                        </label>
                      )}
                      {asar.aed > 1 ? (
                      <label className="table_2_info important">
                      {asar.aed.toFixed(2) || "_"}
                    </label>
                      ) : (
                        <label className="table_2_info_red important">
                        {asar.aed.toFixed(2) || "_"}
                      </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Kyas_asar_show;
