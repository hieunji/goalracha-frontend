import BasicLayout from "layouts/BasicLayout";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <BasicLayout>
        <div className="w-full  md:px-0 mt-40 flex items-center justify-center">
            <div className="bg-white  border-gray-200 flex flex-col items-center justify-center py-8 rounded-lg ">
                <p className="text-6xl md:text-7xl lg:text-9xl font-bold tracking-wider text-gray-300">404</p>
                <p className="text-2xl md:text-3xl lg:text-5xl font-bold tracking-wider text-gray-500 mt-4">존재하지 않는 페이지입니다</p>
                <p className="text-gray-500 mt-4 pb-4 border-b-2 text-center">URL을 확인해주세요</p>
                <Link to="/" className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-gray-100 px-4 py-2 mt-6 rounded transition duration-150" title="Return Home">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fill-rule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clip-rule="evenodd"></path>
                    </svg>
                    <span>홈으로 가기</span>
                </Link>
            </div>
        </div>
    </BasicLayout>
  );
};
export default ErrorPage;