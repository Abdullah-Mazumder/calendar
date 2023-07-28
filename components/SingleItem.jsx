import areDatesEqual from "@/utils/areDatesEqual";
import daysBetweenArrivalAndDeparture from "@/utils/daysBetweenArrivalAndDeparture";
import isDateInRange from "@/utils/isDateInRange";
import isWeekend from "@/utils/isWeekend";
import { useEffect, useRef } from "react";
import shortid from "shortid";

const SingleItem = ({
  date,
  stays,
  rowIndex,
  style,
  spaces,
  setModalTop,
  setModalLeft,
}) => {
  const unavailableButtonRef = useRef(null);
  // here i am checking current date is equal to every stay arriveDate or current date is between stay arriveDate and stay departDate
  const dateIndexInStaysMyStay = stays.findIndex(
    (stay) =>
      (isDateInRange(date, stay.arriveDate, stay.departDate) === -1 ||
        isDateInRange(date, stay.arriveDate, stay.departDate) === 0 ||
        isDateInRange(date, stay.arriveDate, stay.departDate) === 1) &&
      stay.type === "mystay"
  );

  const dateIndexInUnavailableStays = stays.findIndex(
    (stay) =>
      (isDateInRange(date, stay.arriveDate, stay.departDate) === -1 ||
        isDateInRange(date, stay.arriveDate, stay.departDate) === 0 ||
        isDateInRange(date, stay.arriveDate, stay.departDate) === 1) &&
      stay.type === "unavailable"
  );

  let daysDifference;
  let isCurrentDateInRangeTypeMyStay;
  let isCurrentDateInRangeTypeUnavaliable;

  if (dateIndexInStaysMyStay > -1) {
    // here i am calculating difference between arriveDate and departDate
    daysDifference = daysBetweenArrivalAndDeparture(
      date,
      stays[dateIndexInStaysMyStay]?.arriveDate,
      stays[dateIndexInStaysMyStay]?.departDate
    );

    // here, isDateInRange function will return -1 if current date is equal to arriveDate and will return 0 if current date is between arriveDate and departureDate and will return 1 if current date is equal to departureDate
    isCurrentDateInRangeTypeMyStay = isDateInRange(
      date,
      stays[dateIndexInStaysMyStay].arriveDate,
      stays[dateIndexInStaysMyStay].departDate
    );
  }

  if (dateIndexInUnavailableStays) {
    isCurrentDateInRangeTypeUnavaliable = isDateInRange(
      date,
      stays[dateIndexInUnavailableStays]?.arriveDate,
      stays[dateIndexInUnavailableStays]?.departDate
    );
  }

  // this is for calculating popover postion when click the unavailable button
  const handleCloseButtonClick = () => {
    const container = document.getElementsByClassName("datagrid")[0];
    const containerRect = container.getBoundingClientRect();
    const childRect =
      unavailableButtonRef?.current?.parentNode.getBoundingClientRect();

    // Calculate the distance between the child and the conta.top
    const distanceFromTop = childRect.top - containerRect.top;
    const distanceFromLeft = childRect.left;

    setModalTop(distanceFromTop);
    setModalLeft(distanceFromLeft);
  };

  // this is for hiding the popover on window resize
  useEffect(() => {
    // Add event listeners for window resize
    window.addEventListener("resize", () => {
      setModalTop(0);
      setModalLeft(0);
    });

    // Clean up by removing event listeners when the component unmounts
    return () => {
      window.removeEventListener("resize", () => {
        setModalTop(0);
        setModalLeft(0);
      });
    };
  }, []);

  return (
    <>
      {/* if current date is equal to arriveDate then i am rendring this div as date */}
      {isCurrentDateInRangeTypeMyStay === -1 &&
        stays[dateIndexInStaysMyStay].type === "mystay" && (
          <>
            <div
              className="flex flex-col relative"
              style={style}
              key={shortid.generate()}
            >
              {rowIndex === 0 && (
                <>
                  <div className="px-4 py-0.5 flex gap-1">
                    <span>
                      {new Date(date).toLocaleString(undefined, {
                        weekday: "short",
                      })}
                    </span>
                    <span>
                      {new Date(date).toLocaleString(undefined, {
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="h-3 bg-slate-300"></div>
                </>
              )}

              <div
                className={`h-40 border-r-2 relative border-teal-500 cursor-pointer z-1 ${
                  isWeekend(new Date(date)) ? "bg-teal-100" : ""
                } ${
                  areDatesEqual(date, new Date(Date.now())) ? "bg-red-400" : ""
                }`}
                onClick={() =>
                  console.log(
                    new Date(date).toLocaleString(undefined, {
                      weekday: "short",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  )
                }
              >
                <div className="absolute h-full top-0 left-0 flex items-center z-50">
                  <div
                    className={`h-10 absolute bg-blue-500 rounded-full ml-[39.5px]`}
                    style={{ width: daysDifference * 80 }}
                  >
                    <div className="flex items-center h-full">
                      {stays[dateIndexInStaysMyStay].user?.avater && (
                        <div className="flex items-center h-full ml-1">
                          <img
                            src={stays[dateIndexInStaysMyStay].user?.avater}
                            alt="cookie monster"
                            className="w-8 h-8 rounded-[100px]"
                          />
                        </div>
                      )}
                      <div className="ml-2 font-semibold text-gray-200">
                        {daysDifference === 1 ? (
                          <>...</>
                        ) : (
                          <>{stays[dateIndexInStaysMyStay].user.name}</>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {rowIndex === spaces.length - 1 ? (
                <div className="h-3 bg-slate-300"></div>
              ) : (
                <div className="h-1 bg-slate-300 z-50"></div>
              )}
            </div>
          </>
        )}

      {/* if current date is in between arriveDate and departDate or current date is equal to departDate then i am rendring this div as date */}
      {isCurrentDateInRangeTypeMyStay === 0 &&
        stays[dateIndexInStaysMyStay].type === "mystay" && (
          <>
            <div
              className="flex flex-col"
              style={style}
              key={shortid.generate()}
            >
              {rowIndex === 0 && (
                <>
                  <div className="px-4 py-0.5 flex gap-1">
                    <span>
                      {new Date(date).toLocaleString(undefined, {
                        weekday: "short",
                      })}
                    </span>
                    <span>
                      {new Date(date).toLocaleString(undefined, {
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="h-3 bg-slate-300"></div>
                </>
              )}

              <div
                className={`h-40 border-r-2 border-teal-500 cursor-pointer z-1 ${
                  isWeekend(new Date(date)) ? "bg-teal-100" : ""
                } ${
                  areDatesEqual(date, new Date(Date.now())) ? "bg-red-400" : ""
                }`}
                onClick={() =>
                  console.log(
                    new Date(date).toLocaleString(undefined, {
                      weekday: "short",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  )
                }
              ></div>

              {rowIndex === spaces.length - 1 ? (
                <div className="h-3 bg-slate-300"></div>
              ) : (
                <div className="h-1 bg-slate-300 z-50"></div>
              )}
            </div>
          </>
        )}

      {isCurrentDateInRangeTypeMyStay === 1 &&
        stays[dateIndexInStaysMyStay].type === "mystay" && (
          <>
            <div
              className="flex flex-col relative"
              style={style}
              key={shortid.generate()}
            >
              {rowIndex === 0 && (
                <>
                  <div className="px-4 py-0.5 flex gap-1">
                    <span>
                      {new Date(date).toLocaleString(undefined, {
                        weekday: "short",
                      })}
                    </span>
                    <span>
                      {new Date(date).toLocaleString(undefined, {
                        day: "numeric",
                      })}
                    </span>
                  </div>
                  <div className="h-3 bg-slate-300"></div>
                </>
              )}

              <div
                className={`h-40 border-r-2 relative border-teal-500 cursor-pointer z-1 ${
                  isWeekend(new Date(date)) ? "bg-teal-100" : ""
                } ${
                  areDatesEqual(date, new Date(Date.now())) ? "bg-red-400" : ""
                }`}
                onClick={() =>
                  console.log(
                    new Date(date).toLocaleString(undefined, {
                      weekday: "short",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  )
                }
              >
                <div className="absolute h-full top-0 left-0 flex items-center z-50">
                  <div
                    className={`h-10 absolute bg-blue-500 rounded-full`}
                    style={{
                      width: daysDifference * 80,
                      marginLeft: -(daysDifference * 79) + 40,
                    }}
                  >
                    <div className="flex items-center h-full">
                      {stays[dateIndexInStaysMyStay].user?.avater && (
                        <div className="flex items-center h-full ml-1">
                          <img
                            src={stays[dateIndexInStaysMyStay].user?.avater}
                            alt="cookie monster"
                            className="w-8 h-8 rounded-[100px]"
                          />
                        </div>
                      )}
                      <div className="ml-2 font-semibold text-gray-200">
                        {daysDifference === 1 ? (
                          <>...</>
                        ) : (
                          <>{stays[dateIndexInStaysMyStay].user.name}</>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {rowIndex === spaces.length - 1 ? (
                <div className="h-3 bg-slate-300"></div>
              ) : (
                <div className="h-1 bg-slate-300 z-50"></div>
              )}
            </div>
          </>
        )}

      {isCurrentDateInRangeTypeUnavaliable === -1 ||
      isCurrentDateInRangeTypeUnavaliable === 0 ||
      isCurrentDateInRangeTypeUnavaliable === 1 ? (
        <>
          <div className="flex flex-col" style={style} key={shortid.generate()}>
            {rowIndex === 0 && (
              <>
                <div className="px-4 py-0.5 flex gap-1">
                  <span>
                    {new Date(date).toLocaleString(undefined, {
                      weekday: "short",
                    })}
                  </span>
                  <span>
                    {new Date(date).toLocaleString(undefined, {
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="h-3 bg-slate-300"></div>
              </>
            )}

            <div
              className={`h-40 border-r-2 border-teal-500 cursor-pointer z-1 ${
                isWeekend(new Date(date)) ? "bg-teal-100" : ""
              } ${
                areDatesEqual(date, new Date(Date.now())) ? "bg-red-400" : ""
              }`}
              onClick={() =>
                console.log(
                  new Date(date).toLocaleString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                )
              }
            >
              <div className="absolute h-[inherit] top-0 left-0 flex items-center w-full z-50">
                <div
                  className={`bg-slate-300 z-[9999] flex items-center w-[60px] ml-[50px] rounded-md`}
                  style={{
                    marginTop: rowIndex === 0 ? -10 : -77,
                  }}
                  onClick={handleCloseButtonClick}
                >
                  <div
                    className="flex items-center h-full justify-center text-gray-900 font-semibold my-2 w-[60px]"
                    ref={unavailableButtonRef}
                  >
                    X
                  </div>
                </div>
              </div>
            </div>

            {rowIndex === spaces.length - 1 ? (
              <div className="h-3 bg-slate-300"></div>
            ) : (
              <div className="h-1 bg-slate-300 z-50"></div>
            )}
          </div>
        </>
      ) : (
        <>
          {/* this is for rendering normal date div */}
          <div className="flex flex-col" style={style} key={shortid.generate()}>
            {rowIndex === 0 && (
              <>
                <div className="px-4 py-0.5 flex gap-1">
                  <span>
                    {new Date(date).toLocaleString(undefined, {
                      weekday: "short",
                    })}
                  </span>
                  <span>
                    {new Date(date).toLocaleString(undefined, {
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="h-3 bg-slate-300"></div>
              </>
            )}

            <div
              className={`h-40 border-r-2 border-teal-500 cursor-pointer z-1 ${
                isWeekend(new Date(date)) ? "bg-teal-100" : ""
              } ${
                areDatesEqual(date, new Date(Date.now())) ? "bg-red-400" : ""
              }`}
              onClick={() =>
                console.log(
                  new Date(date).toLocaleString(undefined, {
                    weekday: "short",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                )
              }
            ></div>

            {rowIndex === spaces.length - 1 ? (
              <div className="h-3 bg-slate-300"></div>
            ) : (
              <div className="h-1 bg-slate-300 z-50"></div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default SingleItem;
