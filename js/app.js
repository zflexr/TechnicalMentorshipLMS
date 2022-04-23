const coursesLink = "https://tmlms.herokuapp.com/courses"

fetchCourses(coursesLink)

function fetchCourses(link) {
    fetch(coursesLink)
        .then(response => response.json())
        .then(data => console.log(data));
}