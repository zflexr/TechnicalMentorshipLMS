const id = localStorage.getItem('eduID')
// comment post

document.getElementById('addpost').addEventListener('submit', Submitbutton)

function Submitbutton(ev) {
    ev.preventDefault();

    let postData = {
        "author": document.getElementById('author').value,
        "comment": document.getElementById('Comment').value
    };


    axios.post(`https://tmlms.herokuapp.com/courses/${id}/comments`, postData).then((response) => {
        // console.log(response.data)
    }).catch((e) => {
        console.error(e)
    })

};





axios.get(`https://tmlms.herokuapp.com/courses/${id}`).then((response) => {
    console.log(response.data)



    // get description


    document.getElementById('description').innerText = response.data.description;



    // get video link

    let url = response.data.videoLink
    let result = url.replace('watch', 'embed');
    let finalResult = result.replace('?v=', '/')


    document.getElementById('videolink').src = finalResult



    // get title
    document.getElementById('title').innerText = response.data.title;


    // comment get
    let totalContent = ""

    for (index = 0; index < response.data.comments.length; index++) {
        let comments = response.data.comments[index]

        totalContent += `<div class="flex flex-col ">
            <h1 class="text-lg font-semibold">${comments.author}</h1>
            <p class="text-sm">
              ${comments.comment}
            </p>
         </div>`
    }

    const commentContainer = document.getElementById("commentsContainer");

    commentContainer.innerHTML = totalContent


}).catch((e) => {
    console.error(e)
})



