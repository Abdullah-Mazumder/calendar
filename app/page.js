"use client";

import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { VariableSizeGrid as Grid } from "react-window";
import areDatesEqual from "@/utils/areDatesEqual";
import getFirstDayOfPreviousMonth from "@/utils/getFirstDayOfPreviousMonth";
import getFirstDayOfNextMonth from "@/utils/getFirstDayOfNextMonth";
import shortid from "shortid";
import SingleItem from "@/components/SingleItem";

export default function Home() {
  const containerRef = useRef(null);
  const [currentDate, setCurrentDate] = useState(null);
  const [dates, setDates] = useState([]);
  const [inViewDateIndex, setInViewDateIndex] = useState(0);
  const [scrollIndex, setScrollIndex] = useState(null);
  const [modalTop, setModalTop] = useState(0);
  const [modalLeft, setModalLeft] = useState(0);

  // this useEffect for generating date like previous 3 months and next 24 months
  useEffect(() => {
    const currentDate = moment();

    const datesToRender = [];

    const addDays = (date, days) => {
      const result = new Array(days);
      for (let i = 0; i < days; i++) {
        result[i] = date.clone().add(i, "days");
      }
      return result;
    };

    const calculateDatesForMonths = (startMonthOffset, endMonthOffset) => {
      for (let i = startMonthOffset; i <= endMonthOffset; i++) {
        const startDate = currentDate.clone().add(i, "months").startOf("month");
        const daysInMonth = startDate.daysInMonth();
        const datesForMonth = addDays(startDate, daysInMonth);
        datesToRender.push(...datesForMonth);
      }
    };

    // Calculate dates for the previous 3 months
    calculateDatesForMonths(-3, -1);

    // Add the current month's dates
    calculateDatesForMonths(0, 0);

    // Calculate dates for the next 24 months
    calculateDatesForMonths(1, 24);

    setDates(datesToRender);
  }, []);

  // this function for handling today button click
  const setDateToToday = () => {
    const currentDate = new Date();
    const todayIndex = dates.findIndex((date) =>
      areDatesEqual(date, currentDate)
    );

    if (todayIndex !== -1) {
      // Determine the target scroll index based on the current inViewDateIndex
      const targetScrollIndex =
        inViewDateIndex > todayIndex ? todayIndex - 2 : todayIndex + 12;

      containerRef.current.scrollToItem({
        columnIndex: targetScrollIndex,
      });
    }
  };

  // this function for handling previous month button click
  const previousMonth = () => {
    const prevMonthFirstDate = getFirstDayOfPreviousMonth(currentDate);
    const targetIndex = dates.findIndex((date) =>
      areDatesEqual(date, prevMonthFirstDate)
    );

    if (targetIndex !== -1) {
      setScrollIndex(targetIndex + 1 - 1);
    }
  };

  // this function for handling next month button click
  const nextMonth = () => {
    const nextMonthFirstDate = getFirstDayOfNextMonth(currentDate);
    const targetIndex = dates.findIndex((date) =>
      areDatesEqual(date, nextMonthFirstDate)
    );

    if (targetIndex !== -1) {
      setScrollIndex(targetIndex + 14);
    }
  };

  // initially when dates will be available then set today date in first render
  useEffect(() => {
    setDateToToday();
  }, [dates]);

  // when scrolling horizontally then when months are changing then render the month in ui
  useEffect(() => {
    if (dates) setCurrentDate(new Date(dates[inViewDateIndex]));
  }, [inViewDateIndex, dates]);

  // this is for scrolling to a specific date index
  useEffect(() => {
    containerRef?.current?.scrollToItem({
      columnIndex: scrollIndex,
    });
  }, [scrollIndex]);

  const stays1 = {
    property: "Bedroom 1",
    guestLimit: "4",
    type: "sleeping space",
    stays: [
      {
        user: {
          name: "Cookie Monster",
        },
        type: "mystay",
        arriveDate: "20-July-2023",
        departDate: "22-July-2023",
      },
      {
        user: {
          name: "Cookie Monster",
          avater: "/assets/cookie-monster.webp",
        },
        type: "mystay",
        comment:
          "Hey everyone, I’m bringing snacks and drinks! Could everyone pick a day and plan a for dinner for everyone that evening? ",
        arriveDate: "22-July-2023",
        departDate: "23-July-2023",
      },
      {
        user: {
          name: "Ducky",
          avater: "/assets/duckey.jpg",
        },
        type: "mystay",
        arriveDate: "23-July-2023",
        departDate: "24-July-2023",
      },
      {
        user: {
          name: "Cookie Monster",
        },
        type: "mystay",
        arriveDate: "25-July-2023",
        departDate: "29-July-2023",
      },
      {
        user: {
          name: "Cookie Monster",
        },
        type: "unavailable",
        arriveDate: "29-July-2023",
        departDate: "30-July-2023",
      },
      {
        user: {
          name: "Cookie Monster",
        },
        type: "unavailable",
        arriveDate: "30-July-2023",
        departDate: "30-July-2023",
      },
      {
        user: {
          name: "Cookie Monster",
        },
        type: "unavailable",
        arriveDate: "31-July-2023",
        departDate: "31-July-2023",
      },
      {
        user: {
          name: "Shamim",
          avater: "/assets/dogu.jpg",
        },
        type: "mystay",
        comment:
          "Hey everyone, I’m bringing snacks and drinks! Could everyone pick a day and plan a for dinner for everyone that evening? ",

        arriveDate: "01-August-2023",
        departDate: "4-August-2023",
      },
    ],
  };

  const stays2 = {
    property: "Bedroom 2",
    guestLimit: "2",
    type: "sleeping space",
    stays: [
      {
        user: {
          name: "Cookie Monster",
          avater: "/assets/cookie-monster.webp",
        },
        type: "mystay",
        comment:
          "Hey everyone, I’m bringing snacks and drinks! Could everyone pick a day and plan a for dinner for everyone that evening? ",
        arriveDate: "22-July-2023",
        departDate: "25-July-2023",
      },
      {
        user: {
          name: "Cookie Monster",
        },
        type: "unavailable",
        arriveDate: "01-April-2023",
        departDate: "02-April-2023",
      },
      {
        user: {
          name: "Ducky",
          avater: "/assets/duckey.jpg",
        },
        type: "mystay",
        arriveDate: "25-July-2023",
        departDate: "28-July-2023",
      },
      {
        user: {
          name: "Wonder Woman",
          avater: "/assets/wonderwoman.jpg",
        },
        type: "mystay",
        comment:
          "Hey everyone, I’m bringing snacks and drinks! Could everyone pick a day and plan a for dinner for everyone that evening? ",

        arriveDate: "29-July-2023",
        departDate: "4-August-2023",
      },
    ],
  };

  const spaces = [stays1, stays2, stays1, stays2];

  // this is for setting the first element index when scrolling horizontally
  const onItemsRendered = ({ visibleColumnStartIndex }) => {
    setInViewDateIndex(visibleColumnStartIndex);
  };

  // this is a every single date div
  const item = ({ columnIndex, rowIndex, style }) => {
    const date = dates[columnIndex];
    const stays = spaces[rowIndex].stays;

    return (
      <SingleItem
        date={date}
        rowIndex={rowIndex}
        stays={stays}
        style={style}
        spaces={spaces}
        setModalTop={setModalTop}
        setModalLeft={setModalLeft}
      />
    );
  };

  const handleCloseModal = (e) => {
    if (e.target.classList.contains("popover")) {
      setModalTop(0);
      setModalLeft(0);
    }
  };

  return (
    <>
      {dates.length > 0 ? (
        <div className="w-screen relative flex justify-center">
          <div className="w-[1200px] mt-32 h-fit bg-slate-200 rounded-md">
            <div className="flex justify-between items-center p-4">
              <div className="flex gap-2">
                <button
                  className="text-sm font-semibold bg-teal-600 text-gray-200 px-4 py-1 rounded-md"
                  onClick={previousMonth}
                >
                  Prev
                </button>
                <div className="text-lg font-semibold">
                  {moment(currentDate).format("MMMM YYYY")}
                </div>
                <button
                  className="text-sm font-semibold bg-teal-600 text-gray-200 px-4 py-1 rounded-md"
                  onClick={nextMonth}
                >
                  Next
                </button>
              </div>
              <div>
                <button
                  className="text-lg font-semibold bg-teal-600 text-gray-200 px-4 py-1 rounded-md"
                  onClick={setDateToToday}
                >
                  Today
                </button>
              </div>
            </div>
            <div className="border-t-2 relative border-blue-200 w-full flex">
              {/* this is for every spaces property */}
              <div className="w-[180px] bg-gray-300 z-10 mt-7">
                {spaces.map((space, i) => (
                  <div
                    key={shortid.generate()}
                    className={`w-full flex justify-center items-center border-b-2 border-teal-300`}
                    style={{
                      height: i === 0 ? 88 : 82,
                    }}
                  >
                    <h4>{space.property}</h4>
                  </div>
                ))}
              </div>

              <Grid
                className="datagrid"
                onItemsRendered={onItemsRendered}
                ref={containerRef}
                columnCount={dates.length}
                columnWidth={() => 79}
                height={(spaces.length - 1) * 82 + 135}
                rowCount={spaces.length}
                rowHeight={(index) => {
                  return index === 0 ? 116 : 82;
                }}
                width={1185}
                style={{ overflowY: "hidden" }}
              >
                {item}
              </Grid>
            </div>
          </div>

          {/* this is for showing popover when clicking the unavailable button */}
          {modalLeft && modalTop ? (
            <div
              className={`absolute w-full h-full top-0 left-0 bg-teal-500/0 z-[99999] popover cursor-pointer`}
              onClick={handleCloseModal}
            >
              <div
                className={`absolute w-[280px] p-3 h-[160px] bg-indigo-400 shadow-md rounded-md`}
                // here, 245 top and -110 left can be changed in your developement environment. but if you fix this one time then it will be responsible
                style={{ top: modalTop + 245, left: modalLeft - 110 }}
              >
                <div>
                  <span
                    className="text-white font-semibold ml-2 text-xl"
                    onClick={() => {
                      setModalTop(0);
                      setModalLeft(0);
                    }}
                  >
                    X
                  </span>
                </div>
                <div className="text-center text-gray-50 font-semibold">
                  <h4>Unavailable Night</h4>
                </div>

                <div className="mt-3">
                  <div className="border-2 border-slate-300 rounded-full">
                    <h4 className="py-2 px-12 text-center text-gray-50 font-semibold">
                      Make Available
                    </h4>
                  </div>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      ) : (
        <></>
      )}

      <p className="w-[300px] mt-96">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
        voluptate deleniti iure neque aspernatur facere quibusdam totam enim
        error nihil est, quis fugiat nisi id quo expedita porro. Optio sunt
        quidem odio recusandae amet! Cupiditate eligendi quod optio dicta iusto
        officiis minus saepe nemo qui maiores id esse quos recusandae eos atque
        doloribus, doloremque, laudantium ipsum eum? Totam at vel corporis eum
        nostrum hic repellat dignissimos aperiam quis dolores mollitia eveniet
        doloremque, officia porro quia soluta, eaque quod dolorem repellendus
        quo unde harum ut nulla nisi. Minus, cum repellendus, sint id qui
        nostrum optio impedit, molestias vel est exercitationem? Quos,
        repellendus quasi fugit doloremque quod, necessitatibus possimus
        praesentium unde ipsa quae vitae expedita perspiciatis! Officiis
        dignissimos nisi modi asperiores iure nemo aliquid, placeat blanditiis
        aperiam voluptas accusamus quaerat qui nam maiores rem eius
        necessitatibus omnis mollitia. Suscipit odio earum repellendus.
        Similique voluptate iusto quis ad vitae, repellat dignissimos soluta.
        Quas rerum labore fuga excepturi odio quam iste ipsum tenetur rem. Odio,
        vel. Tenetur explicabo ea quam optio sapiente magni dolorum delectus
        modi. Optio omnis asperiores neque, sapiente, id libero, distinctio ab
        consequatur ipsum natus consequuntur vitae deserunt! Tenetur aspernatur
        nemo tempora voluptatum, animi labore accusantium, ea, perspiciatis
        accusamus quidem sint! Dolorum, fugiat. Obcaecati, id. Accusantium ad
        veniam eos quasi assumenda, voluptate labore ipsam, odit ullam, nostrum
        vel dolor quidem. Numquam sapiente illum unde et voluptate nam sit
        praesentium deleniti culpa ad nihil mollitia molestiae quaerat
        voluptatibus nostrum, odit quos hic ducimus. Deserunt animi cum natus
        qui a voluptatum rerum ullam id saepe ut. Pariatur adipisci molestiae
        perferendis. Velit, quos ea eaque, ipsam quia autem voluptas rerum,
        tempore reprehenderit fuga recusandae beatae quod neque. A, tenetur
        iusto! Natus deserunt adipisci neque soluta corrupti eos beatae maiores
        tenetur repellat, facilis porro quibusdam necessitatibus enim. Facere
        rem molestiae consequuntur, iste aspernatur et inventore veniam autem id
        tenetur quam accusantium expedita, porro quasi, est accusamus eos hic.
        Odit quos, possimus, nihil excepturi, est fuga nulla fugiat eaque
        inventore nobis aspernatur eos laudantium itaque qui. Ipsa quas neque
        eius, maiores corrupti voluptatum consequuntur sit expedita quam et,
        exercitationem quae adipisci ea in totam qui? Praesentium, consequuntur.
        Veniam minima quod repellat vel sit eos aliquid consequatur corporis
        aliquam libero, temporibus nisi repellendus blanditiis quae odio est
        deserunt ea mollitia culpa reiciendis? Fugit nisi, ducimus consequuntur
        et laudantium possimus ipsum ab dolor sit quaerat delectus inventore!
        Porro deleniti expedita, consequatur perspiciatis rerum nemo repellendus
        adipisci qui delectus reiciendis obcaecati reprehenderit soluta ducimus,
        exercitationem dolor voluptatem perferendis repudiandae totam. Velit
        perspiciatis modi consectetur quis laudantium id libero accusantium
        placeat similique. Reprehenderit itaque quia, nobis quos tempore
        distinctio cupiditate adipisci repellat enim animi neque molestiae, non,
        harum ipsa ex quae voluptatibus praesentium libero autem quam? Dolorem,
        accusamus fuga? Quaerat quod placeat accusamus iusto aliquid. Obcaecati
        officiis eius reiciendis non, consectetur quibusdam provident labore
        repellat fugit adipisci explicabo commodi ut expedita, ipsum voluptatum?
        Quo ullam modi quam cupiditate laboriosam, ipsum libero ab, fuga
        obcaecati repellendus asperiores temporibus odit. Hic consectetur
        consequatur animi earum fuga ratione quibusdam odio sunt, ab, voluptates
        eveniet ducimus numquam nisi sint quae saepe quod atque aperiam
        reprehenderit sequi debitis! Quisquam minus officiis nostrum
        perspiciatis alias eligendi eaque commodi ex hic fugiat id impedit
        sapiente incidunt neque, quo facilis? Nesciunt ducimus debitis eaque
        earum labore et est beatae, adipisci suscipit cupiditate, mollitia aut
        nobis delectus distinctio voluptas cumque qui vero nihil, quod
        consectetur accusamus unde. Ipsum, saepe exercitationem quae eveniet
        amet autem esse. Modi repudiandae aliquam commodi eaque adipisci. Rem
        nemo similique, quia molestias consequuntur, ipsam dolore, suscipit sit
        dignissimos cupiditate quo hic soluta voluptates harum voluptatem. Eius,
        fugit facere voluptatibus ipsa perspiciatis hic consectetur, nesciunt
        impedit culpa laborum dolorem corporis debitis explicabo asperiores
        quasi dolores adipisci nobis repudiandae sed! Facere porro voluptas
        soluta velit beatae doloribus minus veritatis expedita quia laborum
        similique iusto mollitia eveniet, maxime optio! At magnam, voluptate
        doloremque nihil et provident possimus, modi officiis doloribus ipsam
        ipsum facilis voluptas mollitia itaque quod dignissimos. Animi, cumque
        quaerat aliquid fuga eum ab reiciendis facilis praesentium molestias rem
        id excepturi similique at temporibus officiis in, distinctio eligendi.
        Voluptas consectetur quos nesciunt magnam. Soluta voluptatibus ipsum at
        ipsam omnis quasi hic iste aspernatur vitae, cumque provident modi
        neque, atque harum quod inventore ab itaque iure possimus maiores vero
        ad quam? Architecto, explicabo expedita natus in modi adipisci dolores,
        tenetur dolor magni fuga officiis numquam maiores illum aliquid!
        Repellat, maxime voluptatibus libero modi fuga assumenda ullam, dicta
        expedita iusto blanditiis mollitia cum quia beatae rem cumque esse rerum
        non voluptates odio quasi ipsam adipisci fugiat inventore voluptas.
        Corrupti facere enim nesciunt excepturi veritatis iste reiciendis quos.
        Ex asperiores sequi itaque dolorem minima adipisci unde deleniti autem
        magnam iste fugiat laudantium suscipit consequuntur, accusantium
        consequatur blanditiis earum accusamus commodi? Officia dignissimos
        labore unde vitae magni non recusandae incidunt consequatur, quis
        consequuntur adipisci error dolorum iste ea! Eveniet quae impedit ipsa,
        facilis quis deserunt itaque iste at aliquam adipisci beatae illum ab, a
        quas et reprehenderit eius laborum enim? Adipisci ut fugit omnis impedit
        illo quam est iure, autem atque voluptatum quod, suscipit illum sed
        facilis id quia eligendi debitis ratione et eius modi aut veritatis cum
        esse. Quos ipsa illum aperiam optio quod molestias aut porro eum fuga.
        Nihil ab et quibusdam quas, velit veritatis maxime! Dolorum nobis
        dolorem, saepe porro veniam, ut blanditiis possimus eos cum rem
        inventore aliquam repellendus fuga nulla. Assumenda eos aut ipsum
        recusandae, obcaecati maxime doloremque laborum vitae itaque iure cum,
        quas libero voluptatibus inventore quis eveniet expedita totam, saepe
        placeat minima quod et veritatis! Cumque minus, nihil dolore repellendus
        error ratione quidem in reprehenderit libero! Sed veniam odio, porro
        accusamus nobis earum dolorum atque cumque rem beatae in amet culpa
        eaque aliquid quisquam quae tempore magni iure autem ducimus. Atque
        deleniti earum veritatis cum libero corrupti accusamus laudantium
        maiores tenetur voluptatum exercitationem nam cumque doloribus fugiat ut
        omnis provident iste illo, incidunt accusantium modi numquam. Aspernatur
        consequatur vero ullam quas voluptatem voluptatum. Perferendis accusamus
        veniam pariatur ullam neque laudantium, assumenda veritatis numquam
        magnam, tempora voluptate perspiciatis molestias. Nam minus libero
        incidunt accusamus iste?
      </p>
    </>
  );
}
