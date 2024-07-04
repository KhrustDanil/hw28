function getPost() {
    const postId = document.getElementById('postNum').value;

    if (postId >= 1 && postId <= 100) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then((post) => {
                const postContainer = document.getElementById('postContainer');

                postContainer.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.body}</p>
                    <button id="btnComments" onclick="presenceComments(${post.id})">Get Comments</button>
                `;
            })
            .catch((error) => {
                console.error(error);
            })
    } else {
        console.log('Введене не вірне число!!! Оберіть від 1 до 100! Дякую!💚');
    }
 }

 function presenceComments(postId) {
    if (!document.getElementById(`comments-${postId}`)) {
        getComments(postId);
    } else {
        console.log('Коментарі вже завантажені.');
    }
}

 function getComments(postId) {
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then((comments) => {
            const commentContainer = document.createElement('div');
            commentContainer.id = `comments-${postId}`;
            commentContainer.innerHTML = `
            <h3>Comments</h3>
                            <ul>
                    ${comments.map((comment) => `<li>${comment.name}: ${comment.body}</li>`).join('')}
                </ul>
            `;
            const postContainer = document.getElementById('postContainer');
            postContainer.appendChild(commentContainer);
        })
        .catch((error) => {
            console.error(error);
        })
 }


