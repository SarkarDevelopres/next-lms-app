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
export const fetchCourseDataServer = async (id) => {
    let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/course/fetchSingle`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ id: id })
    })
    let response = await request.json();
    if (response.success == true) {
        console.log(response.data.Image);
        return response.data
    } else {
        // console.log(response.message);
        return response.success
    }
}

export const fetchChapterData = async (id, setChapterData) => {
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
        console.log("Chapter Data:" + response.data);
    } else {
        console.log(response.message);
    }
}

export const fetchUserDetails = async (token, setUserData) => {
    let { id } = jwtDecode(token.toString());
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

export const fetchCourseListForUser = async (token) => {
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
            localStorage.setItem("courseList", response.courseListToken)
        } else {
            localStorage.setItem("courseList", "")
        }
        console.log(response.courseListToken);
    } else {
        console.log(response.message);
    }
}
export const fetchChapterList = async (courseID, setChapterList) => {
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

export const fetchUserProgressData = async (userToken, courseID) => {
    console.log(courseID);
    let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/user/fetchUserProgressData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({ userToken, courseID })
    })
    let response = await request.json();
    if (response.success == true) {
        console.log("UserProgressData: " + response);
        return response.data
        // console.log(response.data.Image);
    } else {
        console.log(response.message);
        return response.message
    }
}

export const fetchUpdateCourse = async (courseID, courseNewData) => {
    if (courseID) {
        let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/course/updateCourse`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ courseID: courseID, courseNewData: courseNewData })
        })
        let response = await request.json();
        if (response.success == true) {
            console.log(true);
            return true
        }
        else {
            return false
        }
    }
}

export const deleteChapterAPI = async (id) => {
    if (id) {
        let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/chapter/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8',
            },
            body: JSON.stringify({ id }),
        });
        let response = await request.json();
        return response; // Return the response directly
    }
};

export const deleteCourseAPI = async (id) => {
    if (id) {
        let chapterList = [];

        try {
            // Fetch the chapter list for the specified course
            let requestChapterList = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/course/fetchCourseChapterList`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8',
                },
                body: JSON.stringify({ courseID: id }),
            });
            let responseChapterList = await requestChapterList.json(); // Use the correct request variable

            if (responseChapterList.success === true) {
                chapterList = [...responseChapterList.data];

                // Iterate through each chapter in the list and delete them
                for (const chapter of chapterList) {
                    const chapterId = chapter._id;
                    try {
                        let deleteResult = await deleteChapterAPI(chapterId);
                        if (deleteResult.success) {
                            console.log(`Chapter ${chapterId} deleted successfully.`);
                        } else {
                            console.error(`Failed to delete chapter ${chapterId}:`, deleteResult.message);
                        }
                    } catch (deleteError) {
                        console.error(`Error deleting chapter ${chapterId}:`, deleteError);
                    }
                }

                // After deleting all chapters, delete the course
                let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/course/delete`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json;charset=utf-8',
                    },
                    body: JSON.stringify({ id }),
                });
                let response = await request.json();
                return response; // Return the response directly
            } else {
                console.error('Failed to fetch chapter list:', responseChapterList.message);
                return responseChapterList; // Return the failed response
            }
        } catch (error) {
            console.error('Error fetching chapter list:', error);
        }
    } else {
        console.error('Course ID is required to delete chapters and the course.');
    }
};

export const fetchCourseListForInstituteID = async (subAdminToken) => {
    if (subAdminToken) {
        let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/course/fetchCourseList`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ subAdminToken })
        })
        let response = await request.json();
        // console.log(true);
        return response

    }
}

export const fetchUpdatedUserProgress = async(userToken,courseID,currentCompletedChapterID)=>{
    console.log("User Token: "+currentCompletedChapterID);
    if (userToken&&courseID&&currentCompletedChapterID) {
        let request = await fetch(`${process.env.NEXT_PUBLIC_PORT}/api/user/fetchUpdatedProgressData`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ userToken, courseID, currentCompletedChapterID  })
        })
        let response = await request.json();
        if (response.success == true) {
            // console.log("UserProgressData: " + response);
            return response.data
            // console.log(response.data.Image);
        } else {
            console.log(response.message);
            return response.message
        }
    }
}