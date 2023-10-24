let posts = [];
let titles = [];
let trashposts = [];
let trashtitles = [];
load();


function addPost() {

    let title = document.getElementById('title').value;
    let message = document.getElementById('message').value;
    if (title === "" || message === "") {
        alert("Titel oder Notizen sind leer!");
    } else {

        titles.push(title);
        posts.push(message);

        showPosts();
        save();

        document.getElementById('title').value = '';
        document.getElementById('message').value = '';

    }
}

function showPosts() {

    let myposts = document.getElementById('myposts');
    myposts.innerHTML = '';

    for (i = 0; i < posts.length; i++) {
        myposts.innerHTML += `
    <div class="post">
        <b>${titles[i]}</b> <br><br>
        ${posts[i]}
        <button onclick="deletePost(${i})">Delete</button>
    </div>
    `;
    }

}


function deletePost(position) {

    trashposts.push(posts[position]);
    trashtitles.push(titles[position]);

    posts.splice(position, 1);
    titles.splice(position, 1);

    showPosts();
    save();
}

function save() {
    let postsAsText = JSON.stringify(posts);
    localStorage.setItem('posts', postsAsText);

    let titlesAsText = JSON.stringify(titles);
    localStorage.setItem('titles', titlesAsText);

    let trashpostsAsText = JSON.stringify(trashposts);
    localStorage.setItem('trashposts', trashpostsAsText);

    let trashtitlesAsText = JSON.stringify(trashtitles);
    localStorage.setItem('trashtitles', trashtitlesAsText);
}

function load() {
    let postsAsText = localStorage.getItem('posts');
    let titlesAsText = localStorage.getItem('titles');
    let trashpostsAsText = localStorage.getItem('trashposts');
    let trashtitlesAsText = localStorage.getItem('trashtitles');

    if (postsAsText && titlesAsText && trashpostsAsText && trashtitlesAsText) {
        posts = JSON.parse(postsAsText);
        titles = JSON.parse(titlesAsText);
        trashposts = JSON.parse(trashpostsAsText);
        trashtitles = JSON.parse(trashtitlesAsText);
    }

}

function showTrash() {
    let trashPosts = document.getElementById('trashPosts');
    trashPosts.innerHTML = '';

    for (let i = 0; i < trashposts.length; i++) {
        trashPosts.innerHTML += `
            <div class="post">
                <b>${trashtitles[i]}</b> <br><br>
                ${trashposts[i]}
                <button onclick="completeDelete(${i})">delete completely</button>
            </div>
        `;
    }
}

function completeDelete(i){
    trashposts.splice(i, 1);
    trashtitles.splice(i, 1);

    showTrash();
    save();
}

function restorePosts() {
    if (trashposts.length === 0) {
        alert("Es gibt keine gelöschten Beiträge zum Wiederherstellen.");
        return;
    }

   
    let restoredPost = trashposts.pop();
    let restoredTitle = trashtitles.pop();

   
    posts.push(restoredPost);
    titles.push(restoredTitle);

    showPosts();
    save();
}
