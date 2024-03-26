import React, { useEffect, useState } from "react";
import { getOwnerReserveListSearch, getOwnerReserveList } from "api/reserveApi";
import { useSelector } from "react-redux";
import moment from "moment";
import PageComponent from "components/common/PageComponent";

const OwnerReserveListPage = () => {
    const [reserveList, setReserveList] = useState([]);
    const [page, setPage] = useState(1);
    const [size] = useState(10);
    const [pageData, setPageData] = useState({});
    const [searchName, setSearchName] = useState("");
    const loginState = useSelector((state) => state.loginSlice);

    const movePage = async ({ page }) => {
        setPage(page);
    };

    const changeTimeToString = (time, unit) => {
        if (typeof time === 'string') {
            const timeList = time.split(",");
            if (timeList.length === 1) {
                return `${timeList[0]}:00 ~ ${parseInt(timeList[0]) + unit}:00`;
            } else {
                return `${timeList[0]}:00 ~ ${parseInt(timeList[timeList.length - 1]) + unit}:00`;
            }
        } else {
            return `${time}:00 ~ ${time + unit}:00`;
        }
    }

    const fetchData = async () => {
        try {
            if (loginState.uNo) {
                let reserveData;
                if (searchName) {
                    reserveData = await getOwnerReserveListSearch(
                        { page, size, searchName },
                        loginState.uNo,
                        searchName
                    );
                } else {
                    reserveData = await getOwnerReserveList(
                        { page, size },
                        loginState.uNo
                    );
                }

                const updatedReserveList = reserveData.dtoList.map(reserve => {
                    reserve.state = reserve.state === 0 ? "예약취소" :
                        moment(reserve.reserveDate).isBefore(moment().subtract(1, "days")) ? "이용완료" :
                            "결제완료";
                    return reserve;
                });

                setReserveList(reserveData.dtoList);
                setPageData(reserveData);
                window.scrollTo(0, 0);
            }
        } catch (error) {
            console.error("Error fetching reservation list:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, [page, size, loginState.uNo, searchName]);

    return (
        <>
            <div className="p-2">
                <div className="font-semibold text-base mt-3 flex items-center justify-between">
                    <h1 className="text-lg font-semibold border-b border-gray-300">
                        예약 내역
                    </h1>
                    <div className="flex-grow"></div>
                    <div className="flex items-center">
                        <label className="input input-bordered flex items-center gap-2 w-60 h-10 flex-grow">
                            <input
                                type="text"
                                value={searchName}
                                onChange={(e) => setSearchName(e.target.value)}
                                placeholder="Search"
                                className="grow"
                            />
                            <button onClick={fetchData}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70">
                                    <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
                                </svg>
                            </button>
                        </label>
                    </div>
                </div>

                <div className="border-b-[1px] border-gray-200 p-3 flex justify-between cursor-pointer">
                    <div className="whitespace-nowrap text-left" style={{ flex: "1" }}>
                        <p className="font-semibold">구장정보</p>
                    </div>
                    <div className="whitespace-nowrap text-center" style={{ flex: "1" }}>
                        <p className="font-semibold">예약자정보</p>
                    </div>
                    <div className="whitespace-nowrap text-right" style={{ flex: "1" }}>
                        <p className="font-semibold">예약내역</p>
                    </div>
                </div>

                <div className="w-full">
                    {reserveList.map((reserve, index) => (
                        <div
                            key={index}
                            className="border-b-[1px] border-gray-200 p-3 flex justify-between cursor-pointer"
                            style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}
                        >
                            <div className="whitespace-nowrap" style={{ flex: "1" }}>
                                <p className="text-md text-ellipsis overflow-hidden">
                                    {reserve.groundName}
                                </p>
                                <p className="text-sm text-gray-500">{reserve.addr}</p>
                            </div>

                            <div className="whitespace-nowrap text-center" style={{ flex: "1" }}>
                                {reserve.userName}
                                <span className="ml-2">[{reserve.tel}]</span>
                                <p>{reserve.email}</p>
                            </div>

                            <div className="whitespace-nowrap text-right" style={{ flex: "1" }}>
                                {moment(reserve.reserveDate).format("YYYY-MM-DD")}
                                <span className="ml-2">[{changeTimeToString(reserve.time, reserve.usageTime)}]</span>
                                <p className={`text-nowrap ${reserve.state === "결제완료" ? 'text-green-400' : reserve.state === "예약취소" ? 'text-red-500' : ''}`}>
                                    {reserve.state}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex justify-center mt-4 items-center">
                <div>
                    {pageData &&
                        pageData.pageNumList &&
                        pageData.pageNumList.length > 0 && (
                            <PageComponent
                                serverData={pageData}
                                movePage={movePage}
                            />
                        )}
                </div>
            </div>
        </>
    );
};

export default OwnerReserveListPage;

