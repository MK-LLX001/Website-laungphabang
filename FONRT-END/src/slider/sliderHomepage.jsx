import React, { useEffect, useState } from "react";
import "../styecss/style.css";
import img01 from "../imgs/sliderImage/Sliderimg1.jpg";
import img02 from "../imgs/sliderImage/Sliderimg2.jpg";
import img03 from "../imgs/sliderImage/Sliderimg3.jpg";
import img04 from "../imgs/sliderImage/Sliderimg4.jpg";

const SliderHomepage = () => {
  
    const [timeRunning, setTimeRunning] = useState(7500);
    const [timeAutoNext, setTimeAutoNext] = useState(8000);
    const [runTimeOut, setRunTimeOut] = useState(null);
    let runNextAuto;
  
    useEffect(() => {
      const nextDom = document.getElementById("next");
      const prevDom = document.getElementById("prev");
      const carouselDom = document.querySelector(".carousel");
      const SliderDom = carouselDom.querySelector(".carousel .list");
      const thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
      const thumbnailItemsDom = thumbnailBorderDom.querySelectorAll(".item");
      const timeDom = document.querySelector(".carousel .time");
  
      thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
  
      runNextAuto = setTimeout(() => {
        nextDom.click();
      }, timeAutoNext);
  
      nextDom.onclick = () => showSlider("next");
      prevDom.onclick = () => showSlider("prev");
  
      return () => {
        clearTimeout(runTimeOut);
        clearTimeout(runNextAuto);
      };
    }, [timeAutoNext, runTimeOut]);
  
    const showSlider = (type) => {
      const carouselDom = document.querySelector(".carousel");
      const SliderDom = carouselDom.querySelector(".carousel .list");
      const thumbnailBorderDom = document.querySelector(".carousel .thumbnail");
      const SliderItemsDom = SliderDom.querySelectorAll(".carousel .list .item");
      const thumbnailItemsDom = document.querySelectorAll(
        ".carousel .thumbnail .item"
      );
  
      if (type === "next") {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add("next");
      } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(
          thumbnailItemsDom[thumbnailItemsDom.length - 1]
        );
        carouselDom.classList.add("prev");
      }
  
      // Remove active class from all slides
      SliderItemsDom.forEach((item) => {
        item.classList.remove("active");
      });
  
      // Add active class to the current slide
      SliderItemsDom[0].classList.add("active");
  
      clearTimeout(runTimeOut);
      const newRunTimeOut = setTimeout(() => {
        carouselDom.classList.remove("next");
        carouselDom.classList.remove("prev");
      }, timeRunning);
  
      setRunTimeOut(newRunTimeOut);
  
      clearTimeout(runNextAuto);
      const nextAutoTimeout = setTimeout(() => {
        document.getElementById("next").click();
      }, timeAutoNext);
  
      runNextAuto = nextAutoTimeout;
    };
  
  

  return (
    <>


    
<div className="carousel  py-4 px-[5vw] md:px-[7vw] lg:px-[10vw]">
        {/* list items  */}
        <div className="list">
          {/* items 1  */}
          <div className="item">
            <img src={img03} alt="Slider Item" />
            <div className="content">
            <div className="author">ທ່ຽວຫຼວງພະບາງ</div>
              <div className="title">ເມືອງມໍລະດົກໂລກ</div>
              <div className="topic">ວັດຊຽງທອງ</div>
             
              <div className="des">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut
                sequi, rem magnam nesciunt minima placeat, itaque eum neque
                officiis unde, eaque optio ratione aliquid assumenda facere ab
                et quasi ducimus aut doloribus non numquam. Explicabo,
                laboriosam nisi reprehenderit tempora at laborum natus unde. Ut,
                exercitationem eum aperiam illo illum laudantium?
              </div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
          {/* items 2  star */}
          <div className="item">
            <img src={img02} alt="Slider Item" />
            <div className="content">
              <div className="author">ສະບາຍດີຫຼວງພະບາງ</div>
              <div className="title">ເມືອງມໍລະດົກໂລກ</div>
              <div className="topic">ພຣະທາດພູສີ</div>
              <div className="des">
              ພະທາດພູສີ ເປັນພະທາດເກົ່າແກ່ ທີ່ຕັ້ງຢູ່ເທິງຍອດພູສີ ໃຈກາງເມືອງຫຼວງພະບາງ ປະເທດລາວ ເຊື່ອວ່າສ້າງຂຶ້ນໃນສະຕະວັດທີ 3 ກ່ອນຄິດສະຕາກະລາດ, ພະທາດພູສີເປັນສີເຫຼືອງທອງສູງປະມານ 20 ເເມັດ ແລະ ຕັ້ງຢູ່ເທິງຖານຫີນຂະຫນາດໃຫຍ່. 
              </div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
          {/* items 2 end  */}

          {/* items 3  star */}
          <div className="item">
            <img src={img01} alt="Slider Item" />
            <div className="content">
            <div className="author">ທ່ຽວຫຼວງພະບາງ</div>
              <div className="title">ເມືອງມໍລະດົກໂລກ</div>
              <div className="topic">ໜູ່ບ້ານໃນເມືອງ</div>
              <div className="des">
              ແຂວງຫຼວງພະບາງຕັ້ງຢູ່ທາງພາກເຫນືອຂອງ ສປປ ລາວ ອ້ອມຮອບພູເຂົາທຳມະຊາດທີ່ສວຍສົດງົດງາມມີແມ່ນ້ຳຄານ ແລະ ແມ່ນ້ຳຂອງໄຫຼຜ່ານເຊິ່ງມີປະຊາກອນອາໄສຢູ່ 431,889 ຄົນປະກອບມີຫຼາຍຊົນເຜົ່າຢູ່ຮ່ວມກັນເຊັ່ນ: ລາວລຸ່ມ, ລື້, ຜູ້ໄທ, ກຶມມຸ, ເຜົ່າມົ້ງ,ເຜົ່າຢ້າວ, ເຜົ່າອີກໍ້, ເຊິ່ງປະກອບດ້ວຍ 58 ບ້ານ
              </div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>

          {/* items 4  star */}
          <div className="item">
            <img src={img04} alt="Slider Item" />
            <div className="content">
              <div className="author">ທ່ຽວຫຼວງພະບາງ</div>
              <div className="title">ເມືອງມໍລະດົກໂລກ</div>
              <div className="topic">ຕາດກວາງຊີ</div>
              <div className="des">
              ເປັນນ້ຳຕົກຕາດທີ່ສວຍງາມທີ່ສຸດຂອງຫຼວງພະບາງ. ບໍລິເວນອ້ອມຮອບນ້ຳຕົກຕາດມີປ່າໄມ້ຮົ່ມເຢັນ. ອາກາດແມ່ນເຢັນ. ນັກທ່ອງທ່ຽວມັກມາຊົມຄວາມງາມຂອງນ້ຳຕົກ, ລົງຫຼິ້ນນ້ຳ, ລອຍນ້ຳ, ຖ່າຍຮູບ,ພັກຜ່ອນຢ່ອນອາລົມ.
              </div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
          {/* the end  */}
        </div>

        {/* list thumbnail Star  */}
        <div className="thumbnail">
          {/* thumbnail 1 */}
          <div className="item">
            <img src={img03} alt="Thumbnail" />
            <div className="content">
              <div className="title">ວັດຊຽງທອງ</div>
              <div className="description">ວັດທະນາທຳ</div>
            </div>
          </div>

          {/* thumbnail 2 */}
          <div className="item">
            <img src={img02} alt="Thumbnail" />
            <div className="content">
              <div className="title">ພຣະທາດພູສີ</div>
              <div className="description">ວັດທະນາທຳ</div>
            </div>
          </div>

          {/* thumbnail 3 */}
          <div className="item">
            <img src={img01} alt="Thumbnail" />
            <div className="content">
              <div className="title">ໝູ່ບ້ານ</div>
              <div className="description">ໃນຕົວເມືອງ</div>
            </div>
          </div>

          {/* thumbnail 4 */}
          <div className="item">
            <img src={img04} alt="Thumbnail" />
            <div className="content">
              <div className="title">ຕາດກວາງຊີ</div>
              <div className="description">ທຳມະຊາດ</div>
            </div>
          </div>
        </div>
        {/* list thumbnail end  */}

        {/* <!-- next prev --> */}
        <div className="arrows hidden">
          <button id="prev">
            <i className="fi fi-br-angle-left"></i>
          </button>

          <button id="next">
            <i className="fi fi-sr-angle-right"></i>
          </button>
        </div>
        {/* <!-- time running --> */}
        <div className="time"></div>

 </div>



    </>
  );
};

export default SliderHomepage;