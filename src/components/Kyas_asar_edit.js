import { useState, useEffect } from "react";
import axios from "axios";
import "./styles/Kyas_asar.css";
import kyas_logo_1 from "../assets/kyas_logo_1.svg";
import kyas_logo_2 from "../assets/kyas_logo_2.svg";
import cuate from "../assets/cuate.svg";
import amico from "../assets/amico.svg";
import cuate2 from "../assets/cuate2.svg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";

function Kyas_asar() {
  let { id } = useParams();
  const navigate = useNavigate();
  const isAdmin = localStorage.getItem("admin_admin");

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = localStorage.getItem("_id");
    if (!isAdmin) {
      if (!id) {
        navigate("/");
      }
    }
  }, []);

  const [currentStep, setCurrentStep] = useState(1);
  const [maxStepReached, setMaxStepReached] = useState(10);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [asar, setAsar] = useState(null);
  const [loading, setLoading] = useState(true);
  const [project_info, setProject_info] = useState({
    projectName: "",
    no3_kyas: "تقييمي",
    krarat_tt2sr: [""],
    an4eta: [""],
  });
  const [project_goals_1, setProject_goals_1] = useState([
    { project_goals: "" },
  ]);
  const [project_goals_2, setProject_goals_2] = useState([
    { project_goals_1: "", project_goals_2: "" },
  ]);
  const [project_tahlils, setProject_tahlils] = useState([
    { bayan: "", kema: "", na4at_mosaheb: "", no3_taklefa: "" },
  ]);
  const [m3neen, setM3neen] = useState([
    { m3ni_id: 0, m3ni: "", ta3ref_m3ni: "", e4temal: "" },
  ]);
  const [project_natiga, setProject_natiga] = useState([
    {
      case_id: "",
      m3ni: { m3ni_id: 0, m3ni: "", mostafed_count: "" },
      natiga: { natiga_id: 1, natiga: "" },
      esm_mo24r: "",
      mostahdaf: "",
      nesbet_ta8yyr: "",
      ataba_ta8yyr: "",
      mokafe2_maly: "",
      shar7_mokafe2_maly: "",
      sneen: "",
      bedayt_m4ro3: "",
      heml_za2ed: "",
      eza7a: "",
      azw: "",
      fatra: "",
    },
  ]);
  const [mod5alat, setMod5alat] = useState(0);

  const handleArrayChange = (arrayName, index, value, e) => {
    e.preventDefault();
    setProject_info((prevState) => {
      const newState = {
        ...prevState,
        [arrayName]: prevState[arrayName].map((item, i) =>
          i === index ? value : item
        ),
      };
      localStorage.setItem("project_info", JSON.stringify(newState));
      return newState;
    });
  };

  const handleAddToArray = (arrayName, e) => {
    e.preventDefault();
    setProject_info((prevState) => {
      const newState = {
        ...prevState,
        [arrayName]: [...prevState[arrayName], ""],
      };
      localStorage.setItem("project_info", JSON.stringify(newState));
      return newState;
    });
  };

  const handleRemoveFromArray = (arrayName, index, e) => {
    e.preventDefault();
    setProject_info((prevState) => {
      const newState = {
        ...prevState,
        [arrayName]: prevState[arrayName].filter((_, i) => i !== index),
      };
      localStorage.setItem("project_info", JSON.stringify(newState));
      return newState;
    });
  };

  const fetchComm = async () => {
    try {
      setLoading(true);
      let local_id = localStorage.getItem("_id");
      let isComm = localStorage.getItem("comm_file");
      if (isComm) {
        const responseComm = await axios.get(
          `https://suqaya-backend.onrender.com/api/comm/${local_id}`
        );
        if (!responseComm.data.comm_asar.includes(id)) {
          return navigate("/");
        }
      } else if (isAdmin) {
      } else {
        const responseUser = await axios.get(
          `https://suqaya-backend.onrender.com/api/users/${local_id}`
        );
        if (!responseUser.data.toggable_asars.includes(id)) {
          return navigate("/");
        }
      }
      const responseAsar = await axios.get(
        `https://suqaya-backend.onrender.com/api/asar/${id}`
      );
      console.log("asar: " + JSON.stringify(responseAsar.data.draft));

      const project_info_ls = JSON.stringify(
        responseAsar.data.draft.project_info
      );
      const project_goals_1_ls = JSON.stringify(
        responseAsar.data.draft.project_goals_1
      );
      const project_goals_2_ls = JSON.stringify(
        responseAsar.data.draft.project_goals_2
      );
      const project_tahlils_ls = JSON.stringify(
        responseAsar.data.draft.project_tahlils
      );
      const m3neen_ls = JSON.stringify(responseAsar.data.draft.m3neen);
      const project_natiga_ls = JSON.stringify(
        responseAsar.data.draft.project_natiga
      );
      const mod5alat_ls = responseAsar.data.draft.mod5alat;

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
    fetchComm();
  }, []);

  const toggleShowClass = (i) => {
    // Select elements with error handling
    const asar_1 = document.querySelector("#asar_1");
    const asar_2 = document.querySelector("#asar_2");
    const asar_3 = document.querySelector("#asar_3");
    const asar_4 = document.querySelector("#asar_4");
    const asar_5 = document.querySelector("#asar_5");
    const asar_6 = document.querySelector("#asar_6");
    const asar_7 = document.querySelector("#asar_7");
    const asar_8 = document.querySelector("#asar_8");
    const asar_9 = document.querySelector("#asar_9");
    const asar_10 = document.querySelector("#asar_10");

    // Check if each element is not null before accessing classList
    if (asar_1) asar_1.classList.remove("show");
    if (asar_2) asar_2.classList.remove("show");
    if (asar_3) asar_3.classList.remove("show");
    if (asar_4) asar_4.classList.remove("show");
    if (asar_5) asar_5.classList.remove("show");
    if (asar_6) asar_6.classList.remove("show");
    if (asar_7) asar_7.classList.remove("show");
    if (asar_8) asar_8.classList.remove("show");
    if (asar_9) asar_9.classList.remove("show");
    if (asar_10) asar_10.classList.remove("show");

    // Add 'show' class to the selected element
    const selectedElement = document.querySelector(`#asar_${i}`);
    if (selectedElement) selectedElement.classList.add("show");
  };

  const getAdadByM3niId = (m3niId) => {
    const matchingM3ni = m3neen.find((m) => m.m3ni_id === m3niId);
    return matchingM3ni ? parseInt(matchingM3ni.mostafed_count, 10) : 0;
  };
  const handleNavigate = (dir, i, e) => {
    e.preventDefault();

    window.scrollTo(0, 0);

    const validateStep = (i) => {
      if (i === 2) {
        const today = new Date();
        const isTanabo2i = project_info.no3_kyas === "تنبؤي";
        const isTakymy = project_info.no3_kyas === "تقييمي";
        const isValid =
          project_info.projectName &&
          project_info.no3_kyas &&
          project_info.me7war &&
          project_info.manteka &&
          project_info.startDate &&
          project_info.endDate &&
          project_info.projectClosed &&
          project_info.an4eta &&
          project_info.ghaya_an4eta &&
          project_info.masdar_da5l &&
          project_info.krarat_tt2sr &&
          project_info.el_tatawo3;
        const isDateValid =
          new Date(project_info.startDate) < new Date(project_info.endDate);

        // Validate lengths of projectName, me7war, and manteka
        if (project_info.projectName.length > 50) {
          toast.error("يجب ألا يزيد اسم المشروع عن 50 حرفًا");
          return false;
        } else if (project_info.me7war.length > 100) {
          toast.error("يجب ألا يزيد مجال المشروع عن 100 حرفًا");
          return false;
        } else if (project_info.manteka.length > 20) {
          toast.error("يجب ألا تزيد المنطقة عن 20 حرفًا");
          return false;
        }

        if (!isValid) {
          toast.error("يجب ملأ جميع الخانات أولاً");
          return false;
        } else if (!isDateValid) {
          toast.error("يجب إدخال التواريخ بطريقة صحيحة");
          return false;
        } else if (isTakymy) {
          if (new Date(project_info.endDate) > today) {
            toast.info(
              "يجب إدخال تاريخ النهاية في يوم ماضي بما أن نوع القياس تقييمي"
            );
            return false;
          }
        } else if (isTanabo2i) {
          if (new Date(project_info.endDate) < today) {
            toast.info(
              "يجب إدخال تاريخ النهاية مستقبلي بما أن نوع القياس تنبؤي"
            );
            return false;
          }
        }
      } else if (i === 3) {
        const allGoalsFilled = project_goals_1.every(
          (item) =>
            item.project_goals.trim() !== "" && item.project_goals.length <= 150
        );

        if (!allGoalsFilled) {
          project_goals_1.forEach((item, index) => {
            if (item.project_goals.trim() === "") {
              toast.error(`يجب ملأ الهدف رقم ${index + 1} أولا`);
            } else if (item.project_goals.length > 150) {
              toast.error(`يجب أن يكون الهدف 150 حرف أو أقل`);
            }
          });
          return false;
        }
      } else if (i === 4) {
        const allGoalsFilled = project_goals_2.every(
          (item) =>
            item.project_goals_1.trim() !== "" &&
            item.project_goals_2.trim() !== "" &&
            item.project_goals_1.length <= 150 &&
            item.project_goals_2.length <= 150
        );

        if (!allGoalsFilled) {
          project_goals_2.forEach((item, index) => {
            if (
              item.project_goals_1.trim() === "" ||
              item.project_goals_2.trim() === ""
            ) {
              toast.error(`يجب ملأ الهدف رقم ${index + 1} أولا`);
            } else if (
              item.project_goals_1.length > 150 ||
              item.project_goals_2.length > 150
            ) {
              toast.error(`يجب أن يكون الهدف 150 حرف أو أقل`);
            }
          });
          return false;
        }
      } else if (i === 5) {
        const allBayansFilled = project_tahlils.every(
          (item) =>
            item.bayan.trim() !== "" &&
            item.bayan.length <= 50 &&
            item.kema.trim() !== "" &&
            parseInt(item.kema.trim()) > 0 &&
            parseInt(item.kema.trim()) <= 100000000000 &&
            item.no3_taklefa.trim() !== "" &&
            item.na4at_mosaheb.trim() !== ""
        );

        if (!allBayansFilled) {
          project_tahlils.forEach((item, index) => {
            if (item.bayan.trim() === "") {
              toast.error(`يجب ملأ البيان رقم ${index + 1} أولا`);
            } else if (item.bayan.length > 50) {
              toast.error(`يجب أن يكون البيان 50 حرف أو أقل`);
            } else if (item.kema.trim() === "") {
              toast.error(`يجب ملأ القيمة رقم ${index + 1} أولا`);
            } else if (parseInt(item.kema.trim()) <= 0) {
              toast.error(`يجب أن تكون القيمة رقم ${index + 1} موجبة`);
            } else if (parseInt(item.kema.trim()) > 100000000000) {
              toast.error(`يجب أن تكون القيمة رقم ${index + 1} أقل`);
            } else if (item.no3_taklefa.trim() === "") {
              toast.error(`يجب ملأ نوع التكلفة رقم ${index + 1} أولا`);
            } else if (item.na4at_mosaheb.trim() === "") {
              toast.error(`يجب ملأ النشاط المرافق رقم ${index + 1} أولا`);
            }
          });
          return false;
        }
      } else if (i === 6) {
        let allValid = true;

        m3neen.forEach((item, index) => {
          if (!item.m3ni || item.m3ni.trim() === "") {
            toast.error(`يجب ملأ صاحب المصلحة رقم ${index + 1} أولا`);
            allValid = false;
          } else if (item.m3ni.length > 50) {
            toast.error(`يجب أن يكون صاحب المصلحة 50 حرف أو أقل`);
            allValid = false;
          } else if (!item.ta3ref_m3ni || item.ta3ref_m3ni.trim() === "") {
            toast.error(`يجب ملأ تعريف صاحب المصلحة رقم ${index + 1} أولا`);
            allValid = false;
          } else if (item.ta3ref_m3ni.length > 150) {
            toast.error(`يجب أن يكون تأثيرهم/تأثرهم 150 حرف أو أقل`);
            allValid = false;
          } else if (!item.e4temal || item.e4temal.trim() === "") {
            toast.error(`يجب ملأ احتمالية صاحب المصلحة رقم ${index + 1} أولا`);
            allValid = false;
          } else if (
            item.e4temal === "مشمول" &&
            (!item.sabab || item.sabab.trim() === "")
          ) {
            toast.error(`يجب ملأ سبب الإستثناء لصاحب المصلحة رقم ${index + 1} أولا`);
            allValid = false;
          } else if (
            item.e4temal === "مشمول" &&
            (item.mostafed_count === undefined || isNaN(item.mostafed_count))
          ) {
            toast.error(
              `يجب ملأ العدد الذي سيتم اشراكه بشكل صحيح لصاحب المصلحة رقم ${index + 1}`
            );
            allValid = false;
          } else if (
            item.e4temal === "مشمول" &&
            parseInt(item.mostafed_count.trim()) > 1000000
          ) {
            toast.error(
              `يجب أن يكون العدد الذي سيتم اشراكه رقم ${index + 1} أقل من مليون`
            );
            allValid = false;
          } 
          // else if (
          //   item.e4temal === "مشمول" &&
          //   (!item.tare2et_e4rak || item.tare2et_e4rak.trim() === "")
          // ) {
          //   toast.error(
          //     `يجب ملأ طريقة الإشراك لصاحب المصلحة رقم ${index + 1} أولا`
          //   );
          //   allValid = false;
          // }
          else if (
            item.e4temal === "مشمول" &&
            (!item.tare5_e4rak || item.tare5_e4rak.trim() === "")
          ) {
            toast.error(`يجب ملأ تاريخ الإشراك لصاحب المصلحة رقم ${index + 1}`);
            allValid = false;
          } 
          // else if (
          //   item.e4temal === "مشمول" &&
          //   item.tare5_e4rak &&
          //   item.tare5_e4rak.trim() !== "" &&
          //   ((project_info.no3_kyas === "تقييمي" &&
          //     new Date(item.tare5_e4rak) <= new Date(project_info.endDate)) ||
          //     (project_info.no3_kyas === "تنبؤي" &&
          //       new Date(item.tare5_e4rak) >= new Date(project_info.endDate)))
          // ) {
          //   toast.error(
          //     project_info.no3_kyas === "تقييمي"
          //       ? `يجب أن يكون تاريخ الإشراك بعد ${project_info.endDate}`
          //       : `يجب أن يكون تاريخ الإشراك قبل ${project_info.endDate}`
          //   );
          //   allValid = false;
          // }

        });

        if (!allValid) {
          return false;
        }
      } else if (i === 7) {
        const allNatigaFilled = project_natiga.every(
          (item) =>
            item.m3ni.m3ni.trim() !== "" &&
            item.natiga.natiga.trim() !== "" &&
            item.natiga.natiga.length <= 100 &&
            item.esm_mo24r.trim() !== "" &&
            item.esm_mo24r.length <= 100 &&
            item.mostahdaf.trim() !== "" &&
            parseInt(item.mostahdaf.trim()) > 0 &&
            parseInt(item.mostahdaf.trim()) <=
              getAdadByM3niId(item.m3ni.m3ni_id)
        );

        if (!allNatigaFilled) {
          project_natiga.forEach((item, index) => {
            const adad = getAdadByM3niId(item.m3ni.m3ni_id);
            if (item.m3ni.m3ni.trim() === "") {
              toast.error(`يجب ملأ النتيجة رقم ${index + 1} أولا`);
            } else if (item.natiga.natiga.trim() === "") {
              toast.error(`يجب ملأ النتيجة رقم ${index + 1} أولا`);
            } else if (item.natiga.natiga.length > 100) {
              toast.error(`يجب أن تكون النتيجة 100 حرف أو أقل`);
            } else if (item.esm_mo24r.trim() === "") {
              toast.error(`يجب ملأ اسم المقرر رقم ${index + 1} أولا`);
            } else if (item.esm_mo24r.length > 100) {
              toast.error(`يجب أن تكون اسم المؤشر 100 حرف أو أقل`);
            } else if (item.mostahdaf.trim() === "") {
              toast.error(`يجب ملأ العدد المستهدف رقم ${index + 1} أولا`);
            } else if (parseInt(item.mostahdaf.trim()) < 1) {
              toast.error(`يجب ان يكون رقم عدد المستفيدين رقم موجب`);
            } else if (parseInt(item.mostahdaf.trim()) > adad) {
              toast.error(
                `يجب ان تكون عدد المستفيدين أقل من أو تساوي عدد أصحاب المصلحة لهذة النتيجة`
              );
            }
          });
          return false;
        }
      } else if (i === 8) {
        const allNatigaFilled = project_natiga.every((item) => {
          const { nesbet_ta8yyr, ataba_ta8yyr } = item;
        
          // Check if fields are not empty
          const isFilled = nesbet_ta8yyr.trim() !== "" && ataba_ta8yyr.trim() !== "";
        
          // Check if nesbet_ta8yyr is a valid percentage (0 to 100)
          const isPercentageValid =
            !isNaN(parseInt(nesbet_ta8yyr)) &&
            parseInt(nesbet_ta8yyr) >= 0 &&
            parseInt(nesbet_ta8yyr) <= 100;
        
          return isFilled && isPercentageValid;
        });
        
        if (!allNatigaFilled) {
          project_natiga.forEach((item, index) => {
            const { nesbet_ta8yyr, ataba_ta8yyr } = item;
        
            // Check if fields are empty
            if (nesbet_ta8yyr.trim() === "" || ataba_ta8yyr.trim() === "") {
              toast.error(`يجب ملأ النتيجة رقم ${index + 1} أولا`);
            }
        
            // Check if nesbet_ta8yyr is a valid percentage
            else if (
              isNaN(parseInt(nesbet_ta8yyr)) ||
              parseInt(nesbet_ta8yyr) < 0 ||
              parseInt(nesbet_ta8yyr) > 100
            ) {
              toast.error(`يجب أن تكون نسبة التغيير في النتيجة رقم ${index + 1} بين 0% و 100%`);
            }
          });
        
          return false;
        }
      } else if (i === 9) {
        const allNatigaFilled = project_natiga.every(
          (item) =>
            item.mokafe2_maly.trim() !== "" &&
            item.shar7_mokafe2_maly.trim() !== "" &&
            item.sneen.trim() !== "" &&
            item.bedayt_m4ro3.trim() !== "" &&
            parseInt(item.sneen) > 0 &&
            parseInt(item.sneen) <= 5 &&
            parseInt(item.mokafe2_maly) > 0 &&
            parseInt(item.mokafe2_maly) <= 1000000 &&
            item.shar7_mokafe2_maly.length <= 150
        );

        if (!allNatigaFilled) {
          project_natiga.forEach((item, index) => {
            if (item.mokafe2_maly.trim() === "") {
              toast.error(`يجب ملأ المكافئ المالي رقم ${index + 1} أولا`);
            } else if (parseInt(item.mokafe2_maly) <= 0) {
              toast.error(`يجب أن يكون المكافئ المالي رقم ${index + 1} موجب`);
            } else if (parseInt(item.mokafe2_maly) > 1000000) {
              toast.error(
                `يجب أن يكون المكافئ المالي رقم ${index + 1} أقل من مليون`
              );
            } else if (item.shar7_mokafe2_maly.trim() === "") {
              toast.error(`يجب ملأ شرح المكافئ المالي رقم ${index + 1} أولا`);
            } else if (item.shar7_mokafe2_maly.length > 150) {
              toast.error(
                `يجب أن يكون شرح المكافئ المالي رقم ${
                  index + 1
                } أقل من 150 حرفًا`
              );
            } else if (item.sneen.trim() === "") {
              toast.error(`يجب ملأ عدد السنين رقم ${index + 1} أولا`);
            } else if (
              !(parseInt(item.sneen) > 0 && parseInt(item.sneen) <= 5)
            ) {
              toast.error(
                `يجب أن تكون مدة التأثير رقم ${
                  index + 1
                } من سنة واحدة إلى 5 سنين`
              );
            } else if (item.bedayt_m4ro3.trim() === "") {
              toast.error(`يجب ملأ بداية المشروع رقم ${index + 1} أولا`);
            }
          });
          return false;
        }
      } else if (i === 10) {
        const allNatigaFilled = project_natiga.every((item) => {
          const { heml_za2ed, eza7a, azw, fatra } = item;
      
          // Check if fields are not empty
          const isFilled =
            heml_za2ed.trim() !== "" &&
            eza7a.trim() !== "" &&
            azw.trim() !== "" &&
            fatra.trim() !== "";
      
          // Check if all fields are valid percentages (0 to 100)
          const isPercentageValid =
            !isNaN(parseInt(heml_za2ed)) &&
            parseInt(heml_za2ed) >= 0 && // Allow 0%
            parseInt(heml_za2ed) <= 100 &&
            !isNaN(parseInt(eza7a)) &&
            parseInt(eza7a) >= 0 && // Allow 0%
            parseInt(eza7a) <= 100 &&
            !isNaN(parseInt(azw)) &&
            parseInt(azw) >= 0 && // Allow 0%
            parseInt(azw) <= 100 &&
            !isNaN(parseInt(fatra)) &&
            parseInt(fatra) >= 0 && // Allow 0%
            parseInt(fatra) <= 100;
      
          return isFilled && isPercentageValid;
        });
      
        if (!allNatigaFilled) {
          project_natiga.forEach((item, index) => {
            const { heml_za2ed, eza7a, azw, fatra } = item;
      
            // Check if fields are empty
            if (
              heml_za2ed.trim() === "" ||
              eza7a.trim() === "" ||
              azw.trim() === "" ||
              fatra.trim() === ""
            ) {
              toast.error(`يجب ملأ النتيجة رقم ${index + 1} أولا`);
            }
      
            // Check if fields are valid percentages (0 to 100)
            else if (
              isNaN(parseInt(heml_za2ed)) ||
              parseInt(heml_za2ed) < 0 || // Allow 0%
              parseInt(heml_za2ed) > 100 ||
              isNaN(parseInt(eza7a)) ||
              parseInt(eza7a) < 0 || // Allow 0%
              parseInt(eza7a) > 100 ||
              isNaN(parseInt(azw)) ||
              parseInt(azw) < 0 || // Allow 0%
              parseInt(azw) > 100 ||
              isNaN(parseInt(fatra)) ||
              parseInt(fatra) < 0 || // Allow 0%
              parseInt(fatra) > 100
            ) {
              toast.error(`يجب أن تكون جميع الخانات في النتيجة رقم ${index + 1} أرقام مئوية صحيحة بين 0% و 100%`);
            }
          });
      
          return false;
        }
      }
      return true;
    };

    if (dir === true) {
      if (validateStep(i)) {
        setCurrentStep(i);
        if (i > maxStepReached) {
          setMaxStepReached(i);
        }
        toggleShowClass(i);
      }
    } else {
      setCurrentStep(i);
      toggleShowClass(i);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const allData = {
        project_info,
        project_goals_1,
        project_goals_2,
        project_tahlils,
        m3neen,
        mod5alat,
        project_natiga,
      };

      const response = await axios.patch(
        `https://suqaya-backend.onrender.com/api/asar/${id}`,
        allData
      );
      const responseDraft = await axios.patch(
        `https://suqaya-backend.onrender.com/api/draft_asar/${id}`,
        allData
      );
      toast.success("تم تأكيد قياس الأثر");
      console.log("Patch successful:", response.data);
      navigate(`/asar/${id}`);
    } catch (error) {
      console.error("Error while posting:", error);
    }
  };
  function generateArray(mod5alat, fatra, nesba, sneen, isAfter) {
    let resultArray = [];
    console.log("asd",(1-(fatra/100))/(1+nesba))
    if (isAfter) {
      let currentValue = mod5alat / ( (nesba / 100)+1);
      for (let i = 0; i < 5; i++) {
        if (isAfter && i === 0) {
          resultArray.push(0);
        }
        if (i < sneen) {
          resultArray.push(Math.max(0, currentValue));
          currentValue = Math.max(
            0,
            (currentValue * (1-(fatra/100)))/(1+(nesba/100))
          );
        } else {
          resultArray.push(0);
        }
      }
      console.log(sneen);
    } else {
      let currentValue = mod5alat;
      for (let i = 0; i < 6; i++) {
        if (isAfter && i === 0) {
          resultArray.push(0);
        }
        if (i < sneen) {
          resultArray.push(Math.max(0, currentValue));
       
            currentValue = Math.max(
              0,
              (currentValue * (1-(fatra/100)))/(1+(nesba/100))
            );
          
        } else {
          resultArray.push(0);
        }
      }
      console.log(sneen);
    }

    return resultArray;
  }
  function sumArray(numbers) {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
      if (typeof numbers[i] === "number") {
        sum += numbers[i];
      }
    }
    return sum;
  }
  const handleRemoveGoal1 = (e, index) => {
    e.preventDefault();

    // Get the project goal at the specified index
    const goalToRemove = project_goals_1[index].project_goals;
    console.log("Goal to remove:", goalToRemove);

    // Extract all project_goals_2 keys from project_goals_2
    const keysInProjectGoals2 = project_goals_2.map(
      (item) => item.project_goals_2
    );
    console.log("Keys in project_goals_2:", keysInProjectGoals2);

    // Check if the goalToRemove is empty or not included in project_goals_2
    const isOk =
      goalToRemove === "" || !keysInProjectGoals2.includes(goalToRemove);

    console.log("isOk:", isOk);

    if (isOk) {
      const newResources = [...project_goals_1];
      newResources.splice(index, 1); // Remove the item at the specified index
      setProject_goals_1(newResources);
      localStorage.setItem("project_goals_1", JSON.stringify(newResources));
    } else {
      toast.info(
        "يجب عليك ازالة هذا الهدف من مرحلة الأهداف التشغيلية أولا حتى تتمكن من ازالته"
      );
    }
  };

  const handleRemoveGoal2 = (e, index) => {
    e.preventDefault();
    const newResources = [...project_goals_2];
    newResources.splice(index, 1); // Remove the item at the specified index
    setProject_goals_2(newResources);
    localStorage.setItem("project_goals_2", JSON.stringify(newResources));
  };
  const handleRemoveM3neen = (e, index) => {
    e.preventDefault();
    Swal.fire({
      title: "تأكيد الحذف",
      html: "هل أنت متأكد أنك تريد حذف هذا المعني؟<br>(سيتم حذف جميع النتائج المبنية على هذا المعني)",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "نعم",
      cancelButtonText: "لا",
    }).then((result) => {
      if (result.isConfirmed) {
        const m3niToRemove = m3neen[index].m3ni_id;

        // Filter out the m3neen item
        const newM3neen = m3neen.filter((_, idx) => idx !== index);

        // Filter out the project_natiga items that reference the removed m3ni
        const newProjectNatiga = project_natiga.filter(
          (item) => item.m3ni.m3ni_id !== m3niToRemove
        );

        // Update state and localStorage
        setM3neen(newM3neen);
        setProject_natiga(newProjectNatiga);

        localStorage.setItem("m3neen", JSON.stringify(newM3neen));
        localStorage.setItem(
          "project_natiga",
          JSON.stringify(newProjectNatiga)
        );
      }
    });
  };

  const handleRemoveTahlil = (e, index) => {
    e.preventDefault();
    const newResources = [...project_tahlils];
    newResources.splice(index, 1); // Remove the item at the specified index
    setProject_tahlils(newResources);
    localStorage.setItem("project_tahlils", JSON.stringify(newResources));
  };
  const handleRemoveNatiga = (e, index) => {
    e.preventDefault();
    const newResources = [...project_natiga];
    newResources.splice(index, 1); // Remove the item at the specified index
    setProject_natiga(newResources);
    localStorage.setItem("project_natiga", JSON.stringify(newResources));
  };

  const handleChange1 = (e) => {
    const { name, value } = e.target;
    setProject_info((prevState) => {
      const newState = {
        ...prevState,
        [name]: value,
      };
      // Save to localStorage
      console.log(newState); // Return the new state

      return newState;
    });
  };

  const handleChange2 = (index, value) => {
    const newGoals = [...project_goals_1];
    newGoals[index].project_goals = value;
    setProject_goals_1(newGoals);
    console.log(project_goals_1);
  };

  const handleAddGoal = (e) => {
    e.preventDefault();
    setProject_goals_1([...project_goals_1, { project_goals: "" }]);
  };

  const handleChange3 = (index, fieldName, value) => {
    const newGoals = [...project_goals_2];
    newGoals[index][fieldName] = value;
    setProject_goals_2(newGoals);
    console.log(project_goals_2);
  };

  const handleAddGoal2 = (e) => {
    e.preventDefault();
    setProject_goals_2([
      ...project_goals_2,
      { project_goals_1: "", project_goals_2: "" },
    ]);
  };

  const handleChange4 = (index, fieldName, value) => {
    const newResources = [...project_tahlils];
    newResources[index][fieldName] = value;
    setProject_tahlils(newResources);
    setMod5alat(
      newResources.reduce((acc, tahlil) => {
        const kemaValue = parseFloat(tahlil.kema) || 0;
        return acc + kemaValue;
      }, 0)
    );
    console.log(mod5alat);
    console.log(
      newResources.reduce((acc, tahlil) => {
        const kemaValue = parseFloat(tahlil.kema) || 0;
        return acc + kemaValue;
      }, 0)
    );

    console.log(project_tahlils);
  };

  const handleAddTahlil = (e) => {
    e.preventDefault();
    setProject_tahlils([
      ...project_tahlils,
      { bayan: "", kema: "", no3_taklefa: "", na4at_mosaheb: "" },
    ]);
  };

  const handleChange5 = (index, fieldName, value) => {
    const newMeanings = [...m3neen];

    if (fieldName === "e4temal" && value === "غير مشمول") {
      Swal.fire({
        title: "تأكيد التغيير",
        html: "هل أنت متأكد أنك تريد الغاء اشتمال صاحب المصلحة؟<br>(سيتم حذف جميع النتائج المبنية على صاحب المصلحة)",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "نعم",
        cancelButtonText: "لا",
      }).then((result) => {
        if (result.isConfirmed) {
          newMeanings[index][fieldName] = value;
          newMeanings[index].mostafed_count = "";
          newMeanings[index].tare2et_e4rak = "";
          newMeanings[index].tare5_e4rak = "";
          newMeanings[index].ta3ref_m3ni = ""; // Clear ta3ref_m3ni field

          setM3neen(newMeanings);

          // Find the corresponding m3ni object in project_natiga and update it
          const newNatigas = [...project_natiga];
          newNatigas.forEach((item) => {
            if (item.m3ni.m3ni_id === index) {
              item.m3ni[fieldName] = value;
            }
          });
          setProject_natiga(newNatigas);

          const updatedProjectNatiga = newNatigas.filter(
            (item) => item.m3ni.m3ni_id !== index
          );
          setProject_natiga(updatedProjectNatiga);

          console.log(m3neen);
          console.log(project_natiga);
        }
      });
    } else {
      newMeanings[index][fieldName] = value;
      setM3neen(newMeanings);

      // Find the corresponding m3ni object in project_natiga and update it
      const newNatigas = [...project_natiga];
      newNatigas.forEach((item) => {
        if (item.m3ni.m3ni_id === index) {
          item.m3ni[fieldName] = value;
        }
      });
      setProject_natiga(newNatigas);

      console.log(m3neen);
      console.log(project_natiga);
    }
  };

  const handleAddMeaning = (e) => {
    e.preventDefault();
    const newM3niId = m3neen.length;
    setM3neen([
      ...m3neen,
      { m3ni_id: newM3niId, m3ni: "", ta3ref_m3ni: "", e4temal: "" },
    ]);
  };

  const handleChange6 = (index, fieldName, value) => {
    const newNatigas = [...project_natiga];
    if (fieldName === "m3ni") {
      newNatigas[index].m3ni = {
        m3ni_id: value.m3ni_id,
        m3ni: value.m3ni,
        mostafed_count: parseInt(value.mostafed_count), // Parsing as integer
      };
    } else if (fieldName === "natiga") {
      const natigaId = index + 1;
      newNatigas[index].natiga = {
        natiga_id: natigaId,
        natiga: value,
      };
      const newCaseId = `${natigaId}${newNatigas[index].m3ni.m3ni_id}`;
      newNatigas[index].case_id = newCaseId;
    } else {
      // For other fields, directly update the value
      newNatigas[index][fieldName] = value;
    }

    let newEgmali = (Math.round(
      parseInt(newNatigas[index].mostahdaf) *
        parseInt(newNatigas[index].mokafe2_maly) *
        ((100 - parseInt(newNatigas[index].azw)) / 100) *
        ((100 - parseInt(newNatigas[index].heml_za2ed)) / 100) *
        ((100 - parseInt(newNatigas[index].eza7a)) / 100)
    ));
    // let newEgmali = Math.round(
    //   parseInt(newNatigas[index].mostahdaf) *
    //     parseInt(newNatigas[index].mokafe2_maly) *
    //     ((100 - parseInt(newNatigas[index].azw)) / 100) *
    //     ((100 - parseInt(newNatigas[index].heml_za2ed)) / 100) *
    //     ((100 - parseInt(newNatigas[index].eza7a)) / 100)
    // );

    console.log(newEgmali);

    newNatigas[index].egmali_el_asar = newEgmali;
    let newYears;
    if (newNatigas[index].bedayt_m4ro3 === "بعد المشروع") {
      newYears = generateArray(
        newEgmali,
        parseInt(newNatigas[index].fatra),
        3.5,
        parseInt(newNatigas[index].sneen),
        true
      );
    } else {
      newYears = generateArray(
        newEgmali,
        parseInt(newNatigas[index].fatra),
        3.5,
        parseInt(newNatigas[index].sneen),
        false
      );
    }

    newNatigas[index].years = newYears;

    let newTotalYears = sumArray(newYears);

    newNatigas[index].total_years = newTotalYears;

    setProject_natiga(newNatigas);

    console.log(newNatigas);
  };

  const handleAddResult = (e) => {
    e.preventDefault();
    const newNatigaId = project_natiga.length + 1;
    setProject_natiga([
      ...project_natiga,
      {
        case_id: "",
        m3ni: {
          m3ni_id: 0,
          m3ni: m3neen[0].m3ni,
          mostafed_count: m3neen[0].mostafed_count,
        },
        natiga: { natiga_id: newNatigaId, natiga: "" },
        esm_mo24r: "",
        mostahdaf: "",
        nesbet_ta8yyr: "",
        ataba_ta8yyr: "",
        mokafe2_maly: "",
        shar7_mokafe2_maly: "",
        sneen: "",
        bedayt_m4ro3: "",
        heml_za2ed: "",
        eza7a: "",
        azw: "",
        fatra: "",
      },
    ]);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    let isComm = localStorage.getItem("comm_file");
    let local_id = localStorage.getItem("_id");
    if (!isComm) {
      let userId = localStorage.getItem("_id");
      let responseUser = await axios.get(
        `https://suqaya-backend.onrender.com/api/users/${userId}`
      );
      let responseAsar = await axios.get(
        `https://suqaya-backend.onrender.com/api/users/${userId}`
      );
      local_id = responseUser.data.comm_id;
      console.log("comm_user");
      console.log(localStorage.getItem("comm_file"));
    }
    try {
      const allData = {
        project_info,
        project_goals_1,
        project_goals_2,
        project_tahlils,
        m3neen,
        mod5alat: parseInt(localStorage.getItem("mod5alat")),
        project_natiga,
      };
      console.log("CHECK"+JSON.stringify(asar.draft._id))
      const response = await axios.patch(
        `https://suqaya-backend.onrender.com/api/draft_asar/${asar._id}`,
        allData
      );
      console.log("Post successful:", response.data);
      toast.success("تم حفظ قياس الأثر كمسودة بنجاح");
      navigate(-1);
    } catch (error) {
      console.error("Error while posting:", error);
      toast.error(error);
    }
  };
  return (
    <>
      <div className="asar_body_body">
        <div className="draft_btns">
          <button onClick={handleSave} className="link_btn">
            حفظ كمسودة و انهاء <i class="fa-solid fa-cloud-arrow-up"></i>
          </button>
        </div>
        <div className="op">
          <hr className="op_hr" />
          {[...Array(10)].map((_, index) => (
            <div
              key={index + 1}
              className={`op_item ${
                currentStep === index + 1
                  ? "now"
                  : index + 1 <= maxStepReached
                  ? "before"
                  : "not-allowed"
              }`}
              onClick={(e) =>
                index + 1 <= maxStepReached &&
                handleNavigate(false, index + 1, e)
              }
            >
              <label className="op_number">{index + 1}</label>
              <label className="op_info">
                {index + 1 === 1 && "تعريف المشروع"}
                {index + 1 === 2 && "أهداف استراتيجية"}
                {index + 1 === 3 && "الأهداف التشغيلية"}
                {index + 1 === 4 && "موارد المشروع"}
                {index + 1 === 5 && "أصحاب المصلحة"}
                {index + 1 === 6 && "النتائج 1"}
                {index + 1 === 7 && "النتائج 2"}
                {index + 1 === 8 && "المكافئ المالي"}
                {index + 1 === 9 && "النسب"}
                {index + 1 === 10 && "التأكيد"}
              </label>
            </div>
          ))}
        </div>
        <div className="asar_body show" id="asar_1">
          <div className="asar_con">
            <h1 className="asar_con_title">قم بتعريف مشروعك</h1>
            <div className="asar_con_con">
              <img src={cuate} />
              <div className="asar_form_w_btns">
                <form className="asar_form" onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                  <div className="input_element">
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                      >
                        <i class="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>{" "}
                      اسم المشروع
                    </label>
                    <input
                      value={project_info.projectName}
                      name="projectName"
                      onChange={handleChange1}
                      className="input_input"
                      id="input_test"
                    />
                  </div>
                  <div className="input_element">
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      نوع القياس
                    </label>

                    <select
                      value={project_info.no3_kyas}
                      name="no3_kyas"
                      onChange={handleChange1}
                      className="input_input"
                    >
                      <option value="تقييمي" selected>
                        تقييمي
                      </option>
                      <option value="تنبؤي">تنبؤي</option>
                    </select>
                  </div>
                  <div className="input_element">
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      مجال المشروع
                    </label>
                    <input
                      value={project_info.me7war}
                      name="me7war"
                      onChange={handleChange1}
                      className="input_input"
                    />
                  </div>
                  <div className="input_element">
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      المنطقة
                    </label>

                    <input
                      value={project_info.manteka}
                      name="manteka"
                      onChange={handleChange1}
                      className="input_input"
                    />
                  </div>
                  <div className="input_element">
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      مصدر دخل المشروع
                    </label>
                    <input
                      value={project_info.masdar_da5l}
                      name="masdar_da5l"
                      onChange={handleChange1}
                      className="input_input"
                    />
                  </div>
                  <div className="input_element">
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      التطوع بالمشروع
                    </label>

                    <input
                      value={project_info.el_tatawo3}
                      name="el_tatawo3"
                      onChange={handleChange1}
                      className="input_input"
                    />
                  </div>

                  <div className="input_element">
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      الفترة الزمنية للمشروع
                    </label>

                    <div className="input_element_multi">
                      <div className="input_element_inner">
                        <label className="input_label">: من</label>
                        <input
                          value={project_info.startDate}
                          name="startDate"
                          onChange={handleChange1}
                          type="date"
                          className="input_input"
                        />
                      </div>
                      <div className="input_element_inner">
                        <label className="input_label">: الي</label>
                        <input
                          value={project_info.endDate}
                          name="endDate"
                          onChange={handleChange1}
                          type="date"
                          className="input_input"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="input_element">
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      <span className="text-red">(اختياري)</span>
                      الإطار الزمني المخطط للتحليل{" "}
                    </label>
                    <input
                      type="date"
                      value={project_info.etar_zamani}
                      name="etar_zamani"
                      onChange={handleChange1}
                      className="input_input"
                    />
                  </div>
                  <div className="input_element">
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      هل تم اغلاق المشروع ؟
                    </label>

                    <div className="input_element_multi">
                      <div className="input_element_inner inner_boolean">
                        <input
                          type="radio"
                          id="yes"
                          value="مغلق"
                          name="projectClosed"
                          checked={project_info.projectClosed === "مغلق"}
                          onChange={handleChange1}
                        />
                        <label htmlFor="yes">نعم</label>
                      </div>
                      <div className="input_element_inner inner_boolean">
                        <input
                          type="radio"
                          id="no"
                          value="غير مغلق"
                          name="projectClosed"
                          checked={project_info.projectClosed === "غير مغلق"}
                          onChange={handleChange1}
                        />
                        <label htmlFor="no">لا</label>
                      </div>
                    </div>
                  </div>
                  <form className="asar_form_info">
                    <div className="input_element">
                      <label className="input_label">
                        <a
                          data-tooltip-id="my-tooltip"
                          className="text-sky"
                          data-tooltip-content="Hello world!"
                        >
                          <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                        </a>
                        القرارت التي تتأثر بالتحليل
                      </label>

                      {project_info.krarat_tt2sr.map((item, index) => (
                        <div className="input_elements_row" key={index}>
                          <input
                            className="input_input"
                            value={item}
                            onChange={(e) =>
                              handleArrayChange(
                                "krarat_tt2sr",
                                index,
                                e.target.value,
                                e
                              )
                            }
                            placeholder="أكتب القرار هنا ..."
                          />
                          <button
                            onClick={(e) =>
                              handleRemoveFromArray("krarat_tt2sr", index, e)
                            }
                            className="re_btn"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={(e) => handleAddToArray("krarat_tt2sr", e)}
                      className="add_btn"
                    >
                      أضف قرار
                    </button>
                  </form>

                  <form className="asar_form_info">
                    <div className="input_element">
                      <label className="input_label">
                        <a
                          data-tooltip-id="my-tooltip"
                          className="text-sky"
                          data-tooltip-content="Hello world!"
                        >
                          <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                        </a>
                        الأنشطة التي ستركز عليها
                      </label>

                      {project_info.an4eta.map((item, index) => (
                        <div className="input_elements_row" key={index}>
                          <input
                            className="input_input"
                            value={item}
                            onChange={(e) =>
                              handleArrayChange(
                                "an4eta",
                                index,
                                e.target.value,
                                e
                              )
                            }
                            placeholder="أكتب النشاط هنا ..."
                          />
                          <button
                            onClick={(e) =>
                              handleRemoveFromArray("an4eta", index, e)
                            }
                            className="re_btn"
                          >
                            <i className="fa-solid fa-trash-can"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                    <button
                      onClick={(e) => handleAddToArray("an4eta", e)}
                      className="add_btn"
                    >
                      أضف نشاط
                    </button>
                  </form>
                  <div className="input_element">
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      الغاية من الأنشطة
                    </label>
                    <input
                      value={project_info.ghaya_an4eta}
                      name="ghaya_an4eta"
                      onChange={handleChange1}
                      className="input_input"
                    />
                  </div>
                </form>
                <div className="navigate_btns">
                  <button
                    onClick={(e) => handleNavigate(true, 2, e)}
                    className="navigate_btn next"
                  >
                    التالي
                  </button>
                  <button
                    onClick={(e) => handleNavigate(false, 10, e)}
                    className="navigate_btn back"
                  >
                    السابق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="asar_body" id="asar_2">
          <div className="asar_con">
            <h1 className="asar_con_title">الأهداف الإستراتيجية</h1>
            <div className="asar_con_con">
              <img src={amico} />
              <div className="asar_form_w_btns">
                <form className="asar_form" onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                  <div className="input_element">
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      أهداف المنظمة الاستراتيجية ذات الارتباط

                    </label>

                    {project_goals_1.map((goal, index) => (
                      <div className="input_elements_row" key={index}>
                        <input
                          className="input_input"
                          value={goal.project_goals}
                          name="project_goals"
                          onChange={(e) => handleChange2(index, e.target.value)}
                          placeholder="أكتب الهدف هنا ..."
                        />
                        <button
                          onClick={(e) => handleRemoveGoal1(e, index)}
                          className="re_btn"
                        >
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    ))}
                  </div>
                  <button onClick={handleAddGoal} className="add_btn">
                    أضف هدف
                  </button>
                </form>
                <div className="navigate_btns">
                  <button
                    onClick={(e) => handleNavigate(true, 3, e)}
                    className="navigate_btn next"
                  >
                    التالي
                  </button>
                  <button
                    onClick={(e) => handleNavigate(false, 1, e)}
                    className="navigate_btn back"
                  >
                    السابق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="asar_body" id="asar_3">
          <div className="asar_con">
            <h1 className="asar_con_title">الأهداف التشغيلية</h1>
            <div className="asar_con_con">
              <img src={cuate2} />
              <div className="asar_form_w_btns">
                <form className="asar_form" onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                  <div className="flex_labels">
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      أهداف المنظمة الاستراتيجية ذات الارتباط
                    </label>

                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      أهداف تشغيلية مباشرة للأنشطة
                    </label>
                  </div>

                  {project_goals_2.map((goal, index) => (
                    <div className="input_elements_row" key={index}>
                      <div className="input_element">
                        <select
                          className="input_input"
                          value={goal.project_goals_2}
                          onChange={(e) =>
                            handleChange3(
                              index,
                              "project_goals_2",
                              e.target.value
                            )
                          }
                        >
                          <option value="" hidden disabled></option>
                          {project_goals_1.map((goal, index) => (
                            <option key={index} value={goal.project_goals}>
                              {goal.project_goals}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="input_element">
                        <input
                          className="input_input"
                          value={goal.project_goals_1}
                          onChange={(e) =>
                            handleChange3(
                              index,
                              "project_goals_1",
                              e.target.value
                            )
                          }
                        />
                      </div>

                      <button
                        onClick={(e) => handleRemoveGoal2(e, index)}
                        className="re_btn"
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  ))}
                  <button onClick={handleAddGoal2} className="add_btn">
                    أضف هدف
                  </button>
                </form>
                <div className="navigate_btns">
                  <button
                    onClick={(e) => handleNavigate(true, 4, e)}
                    className="navigate_btn next"
                  >
                    التالي
                  </button>
                  <button
                    onClick={(e) => handleNavigate(false, 2, e)}
                    className="navigate_btn back"
                  >
                    السابق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="asar_body" id="asar_4">
          <div className="asar_con">
            <h1 className="asar_con_title">تحليل موارد المشروع</h1>
            <div className="asar_con_con">
              <div className="asar_form_w_btns">
                <form className="asar_form" onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                  <div className="input_labels">
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      البيان
                    </label>
                    <label className="input_label flex_num">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      القيمة
                    </label>
                    <label className="input_label flex_5">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      نوع التكلفة
                    </label>
                    <label className="input_label flex_5">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      النشاط المُصاحب
                    </label>
                  </div>

                  {project_tahlils.map((resource, index) => (
                    <div className="input_elements_row">
                      <div className="input_element_single">
                        <input
                          value={resource.bayan}
                          onChange={(e) =>
                            handleChange4(index, "bayan", e.target.value)
                          }
                          className="input_input"
                        />
                      </div>
                      <div className="input_element_single flex_num">
                        <input
                          type="number"
                          value={resource.kema}
                          onChange={(e) =>
                            handleChange4(index, "kema", e.target.value)
                          }
                          className="input_input"
                        />
                      </div>
                      <div className="input_element_single flex_5">
                        <select
                          className="input_input"
                          value={resource.no3_taklefa}
                          onChange={(e) =>
                            handleChange4(index, "no3_taklefa", e.target.value)
                          }
                        >
                          <option value="" hidden disabled></option>
                          <option value="نقدية">نقدية</option>
                          <option value="عينية">عينية</option>
                          <option value="تخفيض التزام">تخفيض التزام</option>
                          <option value="خصم مكتسب">خصم مكتسب</option>
                          <option value="تطوع">تطوع</option>
                        </select>
                      </div>
                      <div className="input_element_single flex_5">
                        <select
                          className="input_input"
                          value={resource.na4at_mosaheb}
                          onChange={(e) =>
                            handleChange4(
                              index,
                              "na4at_mosaheb",
                              e.target.value
                            )
                          }
                        >
                          <option value="" hidden disabled></option>
                          <option value="مباشر">مباشر</option>
                          <option value="غير مباشر">غير مباشر</option>
                        </select>
                      </div>
                      <button
                        onClick={(e) => handleRemoveTahlil(e, index)}
                        className="re_btn"
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  ))}
                  <button onClick={handleAddTahlil} className="add_btn">
                    أضف تكلفة
                  </button>
                </form>
                <div className="navigate_btns">
                  <button
                    onClick={(e) => handleNavigate(true, 5, e)}
                    className="navigate_btn next"
                  >
                    التالي
                  </button>
                  <button
                    onClick={(e) => handleNavigate(false, 3, e)}
                    className="navigate_btn back"
                  >
                    السابق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="asar_body" id="asar_5">
          <div className="asar_con">
            <h1 className="asar_con_title">تحديد أصحاب المصلحة</h1>
            <div className="asar_con_con">
              <div className="asar_form_w_btns">
                <form className="asar_form" onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                  <div className="input_labels">
                    <label className="input_label flex_2">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      صاحب المصلحة
                    </label>
                    <label className="input_label flex_2">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      تأثيرهم/تأثرهم
                    </label>
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      الإشراك
                    </label>
                    <label className="input_label flex_2">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      سبب الإستثناء
                    </label>
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      العدد الذي سيتم اشراكه
                    </label>
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      طريقة الإشراك
                    </label>
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      تاريخ الإشراك
                    </label>
                  </div>

                  {m3neen.map((meaning, index) => (
                    <div className="input_elements_row" key={index}>
                      <div className="input_element_single flex_2">
                        <input
                          className="input_input"
                          value={meaning.m3ni}
                          onChange={(e) =>
                            handleChange5(index, "m3ni", e.target.value)
                          }
                        />
                      </div>
                      <div className="input_element_single flex_2">
                        <input
                          className="input_input"
                          value={meaning.ta3ref_m3ni}
                          onChange={(e) =>
                            handleChange5(index, "ta3ref_m3ni", e.target.value)
                          }
                        />
                      </div>
                      <div className="input_element_single">
                        <select
                          className="input_input"
                          value={meaning.e4temal}
                          onChange={(e) =>
                            handleChange5(index, "e4temal", e.target.value)
                          }
                        >
                          <option value="" hidden disabled></option>
                          <option value="مشمول">مشمول</option>
                          <option value="غير مشمول">غير مشمول</option>
                        </select>
                      </div>
                      <div className="input_element_single flex_2">
                        <input
                          type="text"
                          className="input_input"
                          value={meaning.sabab}
                          onChange={(e) =>
                            handleChange5(index, "sabab", e.target.value)
                          }
                        />
                      </div>
                      {meaning.e4temal === "مشمول" ? (
                        <>
                          <div className="input_element_single">
                            <input
                              type="number"
                              className="input_input"
                              value={meaning.mostafed_count}
                              onChange={(e) =>
                                handleChange5(
                                  index,
                                  "mostafed_count",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="input_element_single">
                            <input
                              type="text"
                              className="input_input"
                              value={meaning.tare2et_e4rak}
                              onChange={(e) =>
                                handleChange5(
                                  index,
                                  "tare2et_e4rak",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                          <div className="input_element_single">
                            <input
                              type="date"
                              className="input_input"
                              value={meaning.tare5_e4rak}
                              onChange={(e) =>
                                handleChange5(
                                  index,
                                  "tare5_e4rak",
                                  e.target.value
                                )
                              }
                            />
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="input_element_single">
                            <input
                              disabled
                              type="text"
                              className="input_input"
                              value=""
                            />
                          </div>
                          <div className="input_element_single">
                            <input
                              disabled
                              type="text"
                              className="input_input"
                              value=""
                            />
                          </div>
                          <div className="input_element_single">
                            <input
                              disabled
                              type="date"
                              className="input_input"
                              value=""
                            />
                          </div>
                        </>
                      )}

                      <button
                        onClick={(e) => handleRemoveM3neen(e, index)}
                        className="re_btn"
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  ))}
                  <button onClick={handleAddMeaning} className="add_btn">
                    أضف معني
                  </button>
                </form>

                <div className="navigate_btns">
                  <button
                    onClick={(e) => handleNavigate(true, 6, e)}
                    className="navigate_btn next"
                  >
                    التالي
                  </button>
                  <button
                    onClick={(e) => handleNavigate(false, 4, e)}
                    className="navigate_btn back"
                  >
                    السابق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="asar_body" id="asar_6">
          <div className="asar_con">
            <h1 className="asar_con_title">تحديد النتائج (المرحلة الأولى)</h1>
            <div className="asar_con_con">
              <div className="asar_form_w_btns">
                <form className="asar_form" onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                  <div className="input_labels">
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      صاحب المصلحة
                    </label>
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      النتيجة
                    </label>
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      اسم المؤشر
                    </label>
                    <label className="input_label flex_5">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      عدد المستفيدين
                    </label>
                  </div>

                  {project_natiga.map((natiga, index) => (
                    <div className="input_elements_row" key={index}>
                      <div className="input_element_single">
                        <select
                          className="input_input"
                          value={natiga.m3ni.m3ni_id}
                          onChange={(e) =>
                            handleChange6(
                              index,
                              "m3ni",
                              m3neen.find(
                                (item) =>
                                  item.m3ni_id === parseInt(e.target.value)
                              )
                            )
                          }
                        >
                          <option value="" hidden></option>
                          {m3neen
                            .filter((m3ni) => m3ni.e4temal === "مشمول")
                            .map((m3ni) => (
                              <option key={m3ni.m3ni_id} value={m3ni.m3ni_id}>
                                {m3ni.m3ni}
                              </option>
                            ))}
                        </select>
                      </div>
                      <div className="input_element_single">
                        <input
                          className="input_input"
                          value={natiga.natiga.natiga} // Set the value of the input to the current value in project_natiga
                          onChange={(e) =>
                            handleChange6(index, "natiga", e.target.value)
                          } // Update the 'natiga' property in project_natiga
                        />
                      </div>
                      <div className="input_element_single">
                        <input
                          className="input_input"
                          value={natiga.esm_mo24r}
                          onChange={(e) =>
                            handleChange6(index, "esm_mo24r", e.target.value)
                          }
                        />
                      </div>
                      <div className="input_element_single flex_5">
                        <input
                          type="number"
                          className="input_input"
                          value={natiga.mostahdaf}
                          onChange={(e) =>
                            handleChange6(index, "mostahdaf", e.target.value)
                          }
                        />
                      </div>
                      <button
                        onClick={(e) => handleRemoveNatiga(e, index)}
                        className="re_btn"
                      >
                        <i class="fa-solid fa-trash-can"></i>
                      </button>
                    </div>
                  ))}
                  <button onClick={handleAddResult} className="add_btn">
                    أضف نتيجة
                  </button>
                </form>

                <div className="navigate_btns">
                  <button
                    onClick={(e) => handleNavigate(true, 7, e)}
                    className="navigate_btn next"
                  >
                    التالي
                  </button>
                  <button
                    onClick={(e) => handleNavigate(false, 5, e)}
                    className="navigate_btn back"
                  >
                    السابق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="asar_body" id="asar_7">
          <div className="asar_con">
            <h1 className="asar_con_title">تحديد النتائج (المرحلة الثانية)</h1>
            <div className="asar_con_con">
              <div className="asar_form_w_btns">
                <form className="asar_form" onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                  <div className="input_labels">
                    <label className="input_label flex_2">صاحب المصلحة</label>
                    <label className="input_label flex_2">النتيجة</label>
                    <label className="input_label flex_5">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      نسبة التغيير %
                    </label>
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      عتبة التغيير
                    </label>
                  </div>
                  {project_natiga.map((natiga, index) => (
                    <div className="input_elements_row" key={index}>
                      <div className="input_element_single flex_2">
                        <label className="show_label">{natiga.m3ni.m3ni}</label>
                      </div>
                      <div className="input_element_single flex_2">
                        <label className="show_label">
                          {natiga.natiga.natiga}
                        </label>
                      </div>
                      <div className="input_element_single flex_5">
                        <input
                          type="number"
                          className="input_input"
                          value={natiga.nesbet_ta8yyr}
                          onChange={(e) =>
                            handleChange6(
                              index,
                              "nesbet_ta8yyr",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="input_element_single">
                        <input
                          className="input_input"
                          value={natiga.ataba_ta8yyr}
                          onChange={(e) =>
                            handleChange6(index, "ataba_ta8yyr", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </form>

                <div className="navigate_btns">
                  <button
                    onClick={(e) => handleNavigate(true, 8, e)}
                    className="navigate_btn next"
                  >
                    التالي
                  </button>
                  <button
                    onClick={(e) => handleNavigate(false, 6, e)}
                    className="navigate_btn back"
                  >
                    السابق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="asar_body" id="asar_8">
          <div className="asar_con">
            <h1 className="asar_con_title">المكافئات المالية</h1>
            <div className="asar_con_con">
              <div className="asar_form_w_btns">
                <form className="asar_form" onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                  <div className="input_labels">
                    <label className="input_label">صاحب المصلحة</label>
                    <label className="input_label">النتيجة</label>
                    <label className="input_label flex_5">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      قيمة المكافئ المالي
                    </label>
                    <label className="input_label">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      شرح المكافئ المالي
                    </label>
                    <label className="input_label flex_num">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      مدة التأثير
                    </label>
                    <label className="input_label flex_5">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      بداية الأثر
                    </label>
                  </div>
                  {project_natiga.map((natiga, index) => (
                    <div className="input_elements_row" key={index}>
                      <div className="input_element_single">
                        <label className="show_label">{natiga.m3ni.m3ni}</label>
                      </div>
                      <div className="input_element_single">
                        <label className="show_label">
                          {natiga.natiga.natiga}
                        </label>
                      </div>
                      <div className="input_element_single flex_5">
                        <input
                          type="number"
                          className="input_input"
                          value={natiga.mokafe2_maly}
                          onChange={(e) =>
                            handleChange6(index, "mokafe2_maly", e.target.value)
                          }
                        />
                      </div>
                      <div className="input_element_single">
                        <input
                          className="input_input"
                          value={natiga.shar7_mokafe2_maly}
                          onChange={(e) =>
                            handleChange6(
                              index,
                              "shar7_mokafe2_maly",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="input_element_single flex_num">
                        <input
                          type="number"
                          className="input_input"
                          value={natiga.sneen}
                          onChange={(e) =>
                            handleChange6(index, "sneen", e.target.value)
                          }
                        />
                      </div>
                      <div className="input_element_single flex_5">
                        <select
                          className="input_input"
                          value={natiga.bedayt_m4ro3}
                          onChange={(e) =>
                            handleChange6(index, "bedayt_m4ro3", e.target.value)
                          }
                        >
                          <option value="" hidden disabled></option>
                          <option value="بعد المشروع">بعد المشروع</option>
                          <option value="أثناء المشروع">أثناء المشروع</option>
                        </select>
                      </div>
                    </div>
                  ))}
                </form>

                <div className="navigate_btns">
                  <button
                    onClick={(e) => handleNavigate(true, 9, e)}
                    className="navigate_btn next"
                  >
                    التالي
                  </button>
                  <button
                    onClick={(e) => handleNavigate(false, 7, e)}
                    className="navigate_btn back"
                  >
                    السابق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="asar_body" id="asar_9">
          <div className="asar_con">
            <h1 className="asar_con_title">الإضافة النوعية</h1>
            <div className="asar_con_con">
              <div className="asar_form_w_btns">
                <form className="asar_form" onKeyDown={(e) => e.key === 'Enter' && e.preventDefault()}>
                  <div className="input_labels">
                    <label className="input_label flex_2">صاحب المصلحة</label>
                    <label className="input_label flex_2">النتيجة</label>
                    <label className="input_label">قيمة المكافئ المالي</label>
                    <label className="input_label flex_5">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      الحمل الزائد %
                    </label>
                    <label className="input_label flex_5">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      الازاحة %
                    </label>
                    <label className="input_label flex_5">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      العزو %
                    </label>
                    <label className="input_label flex_5">
                      <a
                        data-tooltip-id="my-tooltip"
                        className="text-sky"
                        data-tooltip-content="Hello world!"
                      >
                        <i className="fa-solid fa-circle-info text-sky text-sky"></i>
                      </a>
                      انخفاض الأثر %
                    </label>
                  </div>
                  {project_natiga.map((natiga, index) => (
                    <div className="input_elements_row" key={index}>
                      <div className="input_element_single flex_2">
                        <label className="show_label">{natiga.m3ni.m3ni}</label>
                      </div>
                      <div className="input_element_single flex_2">
                        <label className="show_label">
                          {natiga.natiga.natiga}
                        </label>
                      </div>
                      <div className="input_element_single">
                        <label className="show_label">
                          {natiga.mokafe2_maly}
                        </label>
                      </div>
                      <div className="input_element_single flex_5">
                        <input
                          type="number"
                          className="input_input"
                          value={natiga.heml_za2ed}
                          onChange={(e) =>
                            handleChange6(index, "heml_za2ed", e.target.value)
                          }
                        />
                      </div>
                      <div className="input_element_single flex_5">
                        <input
                          type="number"
                          className="input_input"
                          value={natiga.eza7a}
                          onChange={(e) =>
                            handleChange6(index, "eza7a", e.target.value)
                          }
                        />
                      </div>
                      <div className="input_element_single flex_5">
                        <input
                          type="number"
                          className="input_input"
                          value={natiga.azw}
                          onChange={(e) =>
                            handleChange6(index, "azw", e.target.value)
                          }
                        />
                      </div>
                      <div className="input_element_single flex_5">
                        <input
                          type="number"
                          className="input_input"
                          value={natiga.fatra}
                          onChange={(e) =>
                            handleChange6(index, "fatra", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  ))}
                </form>

                <div className="navigate_btns">
                  <button
                    onClick={(e) => handleNavigate(true, 10, e)}
                    className="navigate_btn next"
                  >
                    التالي
                  </button>
                  <button
                    onClick={(e) => handleNavigate(false, 8, e)}
                    className="navigate_btn back"
                  >
                    السابق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="asar_body" id="asar_10">
          <div className="asar_con table_page">
            <div className="asar_con_con">
              <div className="asar_form_w_btns">
                <form className="asar_form table_form">
                  <div className="table_row">
                    <div className="table_1">
                      <h1>معلومات المشروع</h1>
                      <div className="table_1_con">
                        <div className="table_1_element">
                          <label className="table_1_title">: اسم المشروع</label>
                          <label className="table_1_info">
                            {project_info.projectName}
                          </label>
                        </div>
                        <div className="table_1_element_multi">
                          <div className="table_1_element">
                            <label className="table_1_title">
                              : نوع القياس
                            </label>
                            <label className="table_1_info">
                              {project_info.no3_kyas}
                            </label>
                          </div>
                          <div className="table_1_element">
                            <label className="table_1_title">
                              : مجال المشروع
                            </label>
                            <label className="table_1_info">
                              {project_info.me7war}
                            </label>
                          </div>
                        </div>
                        <div className="table_1_element">
                          <label className="table_1_title">: المنطقة</label>
                          <label className="table_1_info">
                            {project_info.manteka}
                          </label>
                        </div>
                        <div className="table_1_element">
                          <label className="table_1_title">
                            : الإطار الزمني المخطط للتحليل
                          </label>
                          <label className="table_1_info">
                            {project_info.etar_zamani || "_"}
                          </label>
                        </div>

                        <div className="table_1_element">
                          <label className="table_1_title">
                            : مصدر دخل المشروع
                          </label>
                          <label className="table_1_info">
                            {project_info.masdar_da5l || "_"}
                          </label>
                        </div>
                        <div className="table_1_element">
                          <label className="table_1_title">
                            القرارت التي تتأثر بالتحليل :
                          </label>
                          {project_info.krarat_tt2sr.length > 0 ? (
                            project_info.krarat_tt2sr.map((decision, index) => (
                              <div key={index} className="table_1_info">
                                {decision || "_"}
                              </div>
                            ))
                          ) : (
                            <div className="table_1_info">_</div>
                          )}
                        </div>
                        <div className="table_1_element">
                          <label className="table_1_title">
                            : الأنشطة التي ستركز عليها
                          </label>
                          {project_info.an4eta.length > 0 ? (
                            project_info.an4eta.map((na4at, index) => (
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
                            {project_info.ghaya_an4eta || "_"}
                          </label>
                        </div>

                        <div className="table_1_element">
                          <label className="table_1_title">
                            : التطوع بالمشروع
                          </label>
                          <label className="table_1_info">
                            {project_info.el_tatawo3 || "_"}
                          </label>
                        </div>
                        <div className="table_1_element_multi">
                          <div className="table_1_element">
                            <label className="table_1_title">: من</label>
                            <label className="table_1_info">
                              {project_info.startDate}
                            </label>
                          </div>
                          <div className="table_1_element">
                            <label className="table_1_title">: الي</label>
                            <label className="table_1_info">
                              {project_info.endDate}
                            </label>
                          </div>
                        </div>
                        <div className="table_1_element">
                          <label className="table_1_title">
                            : حالة اغلاق المشروع
                          </label>
                          <label className="table_1_info">
                            {project_info.projectClosed}
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
                        {project_goals_2.map((item, index) => (
                          <div key={index} className="table_2_content">
                            <label className="table_2_info">
                              {item.project_goals_1}
                            </label>
                            <label className="table_2_info">
                              {item.project_goals_2}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="table_row">
                    <div className="table_2">
                      <h1>موارد المشروع</h1>
                      <div className="table_2_header">
                        <label className="table_2_header_item">البيان</label>
                        <label className="table_2_header_item">القيمة</label>
                        <label className="table_2_header_item">
                          نوع التكلفة
                        </label>
                        <label className="table_2_header_item">
                          النشاط المُصاحب
                        </label>
                      </div>
                      <div className="table_2_con">
                        {project_tahlils.map((item, index) => (
                          <div key={index} className="table_2_content">
                            <label className="table_2_info">{item.bayan}</label>
                            <label className="table_2_info">{item.kema}</label>
                            <label className="table_2_info">
                              {item.no3_taklefa}
                            </label>
                            <label className="table_2_info">
                              {item.na4at_mosaheb}
                            </label>
                          </div>
                        ))}
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
                        <label className="table_2_header_item flex_2">
                          سبب
                        </label>
                        <label className="table_2_header_item">
                          طريقة الإشراك
                        </label>
                        <label className="table_2_header_item">
                          تاريخ إشراك
                        </label>
                      </div>
                      <div className="table_2_con">
                        {m3neen.map((item, index) => (
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
                        <label className="table_2_header_item">
                          اسم المؤشر
                        </label>
                        <label className="table_2_header_item">
                          عدد المستفيدين
                        </label>
                        <label className="table_2_header_item">
                          نسبة التغيير %
                        </label>
                        <label className="table_2_header_item">
                          عتبة التغيير
                        </label>
                        <label className="table_2_header_item">
                          المكافئ المالي
                        </label>
                        <label className="table_2_header_item flex_2">
                          شرح المكافئ
                        </label>
                        <label className="table_2_header_item flex_5">
                          مدة التأثير{" "}
                        </label>
                        <label className="table_2_header_item">
                          بداية الأثر
                        </label>
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
                        {project_natiga.map((item, index) => (
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
                      </div>
                    </div>
                  </div>
                </form>
                <div className="navigate_btns">
                  <button
                    onClick={(e) => handlePost(e)}
                    className="navigate_btn next"
                    disabled={isSubmitting}
                  >
                    تأكيد
                  </button>

                  <button
                    onClick={(e) => handleNavigate(false, 9, e)}
                    className="navigate_btn back"
                  >
                    السابق
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Tooltip id="my-tooltip" />
      </div>
    </>
  );
}

export default Kyas_asar;
