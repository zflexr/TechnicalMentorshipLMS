// Get All Courses

const coursesLink = "https://tmlms.herokuapp.com/courses"

let coursesContainer = document.querySelector('.courses')

fetchCourses(coursesLink)



function fetchCourses(link) {
    axios.get(coursesLink)
        .then(response => {
            let datas = response.data;
            datas.forEach(data => {
                let courseEl = document.createElement('div')
                courseEl.classList.add('course')
                courseEl.innerHTML = `
                <img src="${data.image}">
                <p>${data.title}</p>
                <button onClick = "handleClick('${data._id}')">View Course</button>
            `
                coursesContainer.appendChild(courseEl)
            })

        })
        .catch(err => console.log(err));
}


function handleClick(id) {
    localStorage.setItem("eduID", id)
    window.location.href = 'https://startling-duckanoo-23c999.netlify.app//course.html'
}


// Add New Course

let addCourseBtn = document.getElementById("addBtn")
let title = document.getElementById("title")
let description = document.getElementById("description")
let image = document.getElementById("image")
let video = document.getElementById("video")

addCourseBtn.addEventListener('click', (e) => {
    e.preventDefault()
    axios.post(coursesLink, {
        "title": `${title.value}`,
        "description": `${description.value}`,
        "videoLink": `${video.value}`,
        "image": `${image.value}`
    })
        .then(res => {
            console.log(res);
            if (res.statusText === "Created") {
                window.location.replace('http://127.0.0.1:5500/')
            }
        })
        .catch(err => { console.error(err) })
})
