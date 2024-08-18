// Carrega os comentários salvos no LocalStorage ao iniciar a página
document.addEventListener('DOMContentLoaded', function() {
    loadComments();
});

function filterComments(category) {
    var comments = document.querySelectorAll('.comment');
    comments.forEach(function(comment) {
        if (category === 'todas' || comment.getAttribute('data-category') === category) {
            comment.style.display = 'block';
        } else {
            comment.style.display = 'none';
        }
    });
}

function addComment(event) {
    event.preventDefault();
    var commentText = document.getElementById('comment-text').value;
    var commentCategory = document.getElementById('comment-category').value;

    var commentDiv = document.createElement('div');
    commentDiv.className = 'comment';
    commentDiv.setAttribute('data-category', commentCategory);

    var categoryTitle = document.createElement('div');
    categoryTitle.className = 'comment-category';
    categoryTitle.textContent = commentCategory.charAt(0).toUpperCase() + commentCategory.slice(1);

    var commentContent = document.createElement('p');
    commentContent.textContent = commentText;

    commentDiv.appendChild(categoryTitle);
    commentDiv.appendChild(commentContent);

    document.getElementById('comments-section').appendChild(commentDiv);

    saveComment(commentCategory, commentText);

    document.getElementById('comment-text').value = '';
    document.getElementById('comment-category').value = 'basquete';
}

function saveComment(category, text) {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.push({ category: category, text: text });
    localStorage.setItem('comments', JSON.stringify(comments));
}

function loadComments() {
    var comments = JSON.parse(localStorage.getItem('comments')) || [];
    comments.forEach(function(comment) {
        var commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.setAttribute('data-category', comment.category);

        var categoryTitle = document.createElement('div');
        categoryTitle.className = 'comment-category';
        categoryTitle.textContent = comment.category.charAt(0).toUpperCase() + comment.category.slice(1);

        var commentContent = document.createElement('p');
        commentContent.textContent = comment.text;

        commentDiv.appendChild(categoryTitle);
        commentDiv.appendChild(commentContent);

        document.getElementById('comments-section').appendChild(commentDiv);
    });
}
