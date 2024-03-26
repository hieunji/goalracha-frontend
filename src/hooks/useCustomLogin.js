import { useDispatch, useSelector } from "react-redux"
import { Navigate, createSearchParams, useNavigate } from "react-router-dom"
import { getCookie, setCookie, removeCookie } from "../util/cookieUtil";
import { loginPostAsync, logout, update } from "../slices/loginSlice"

const useCustomLogin = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()  
    const loginState = useSelector(state => state.loginSlice) //-------로그인 상태
    const isLogin = loginState.email ? true : false //----------로그인 여부

    const isOwnerLogin = loginState.businessId ? true : false //----------사업자로그인 여부

    const doLogin = async (loginParam) => { //----------로그인 함수
        const action = await dispatch(loginPostAsync(loginParam))
        return action.payload
    }

    const doLogout = () => { //---------------로그아웃 함수
        dispatch(logout())
    }
    const doUpdate =(loginParam) => { //정보 업데이트
        dispatch(update(loginParam)) 
    }
    const moveToPath = (path) => { //----------------페이지 이동
        navigate({ pathname: path }, { replace: true })
    }
    const moveToLogin = () => { //----------------------로그인 페이지로 이동
        navigate({ pathname: '/login' }, { replace: true })
    }
    const moveToLoginWithCookie = (path) => { //----------------------로그인 페이지로 이동
        setCookie("loginurl", path, 1) //1 일
        navigate({ pathname: '/login' }, { replace: true })
    }
    const moveToDefault = () => { //----------------------일반 유저가 로그인할 시 메인페이지로 이동
        navigate({ pathname: '/' }, { replace: true })
    }
    const afterLogin = () => {
        var url = getCookie("loginurl")
        //닉네임 처리
        if(url && url != '') {
            removeCookie("loginurl")
            navigate({pathname: url}, {replace: true})
        } else {
            navigate({ pathname: '/' }, { replace: true })
        }
        
    }
    const moveToLoginReturn = () => { //--------------------로그인 페이지로 이동 컴포넌트
        return <Navigate replace to="/login" />
    }

    const moveToOwnerLoginReturn = () => { //--------------------로그인 페이지로 이동 컴포넌트
        return <Navigate replace to="/login" />
    }

    const exceptionHandle = (ex) => {
        console.log("Exception------------------------")
        console.log(ex)
        const errorMsg = ex.response.data.error
        const errorStr = createSearchParams({ error: errorMsg }).toString()
        if (errorMsg === 'REQUIRE_LOGIN') {
            alert("로그인 해야만 합니다.")
            navigate({ pathname: '/user/login', search: errorStr })
            return
        }
        if (ex.response.data.error === 'ERROR_ACCESSDENIED') {
            alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.")
            navigate({ pathname: '/user/login', search: errorStr })
            return
        }
    }
    return {
        loginState, isLogin, isOwnerLogin, doLogin, doLogout, doUpdate,moveToPath, moveToLogin,
        moveToLoginReturn, exceptionHandle, moveToLoginWithCookie,afterLogin,moveToOwnerLoginReturn, moveToDefault
    }
}


export default useCustomLogin