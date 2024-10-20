import { jwtDecode } from "jwt-decode";

export const fetchCourseData = async (id, setCourseData) => {
    let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/course/fetchSingle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ id: id })
    })
    let response = await request.json();
    if (response.success == true) {
        setCourseData({ ...response.data })
        // console.log(response.data.Image);
    } else {
        console.log(response.message);
    }
}

export const fetchChapterData = async(id,setChapterData) => {
    let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/chapter/fetchSingle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ id: id })
    })
    let response = await request.json();
    if (response.success == true) {
        setChapterData({ ...response.data })
        console.log("Chapter Data:"+response.data);
    } else {
        console.log(response.message);
    }
}

export const fetchUserDetails = async(token,setUserData)=>{
    let {id} = jwtDecode(token.toString());
    let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/user/fetchSingleDetails`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ id: id })
    })
    let response = await request.json();
    if (response.success == true) {
        setUserData({ ...response.data })
    } else {
        console.log(response.message);
    }
}

export const fetchCourseListForInstituteID = async(token)=>{
    let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/course/fetchCourseListforUser`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ userToken: token })
    })
    let response = await request.json();
    if (response.success == true) {
        if (response.courseListToken) {
            localStorage.setItem("courseList",response.courseListToken)
        } else {
            localStorage.setItem("courseList","")
        }
        console.log(response.courseListToken);
    } else {
        console.log(response.message);
    }
}
export const fetchChapterList = async (courseID,setChapterList) => {
    if (courseID) {
        let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/course/fetchCourseChapterList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ courseID })
        })
        let response = await request.json();
        if (response.success == true) {
            setChapterList([...response.data])
            console.log(response.data);
        }
    }
}

export const fetchUserProgressData = async(userToken, courseID)=>{
    let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/user/fetchUserProgressData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ userToken,courseID })
    })
    let response = await request.json();
    if (response.success == true) {
        console.log("UserProgressData: "+response);
        return response.data
        // console.log(response.data.Image);
    } else {
        console.log(response.message);
        return response.message
    }
}