const params = new URLSearchParams(window.location.search);
const blogId = params.get('id');

function getBlogs() {
    return JSON.parse(localStorage.getItem('blogs')) || [];
}

function renderBlogDetail() {
    const blogs = getBlogs();
    const blog = blogs.find(b => b.id == blogId);
    const container = document.getElementById('blogDetailContainer');
    if (!blog) {
        container.innerHTML = '<div class="alert alert-danger">Blog no encontrado.</div>';
        return;
    }
    container.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h2 class="card-title">${blog.titulo}</h2>
                <h6 class="card-subtitle mb-2 text-muted">${blog.fecha}</h6>
                    <p class="card-text">${blog.descripcion}</p>
            <p class="card-text">${blog.contenido}</p>
            </div>
        </div>
    `;
}

function getComments() {
    return JSON.parse(localStorage.getItem('comments_' + blogId)) || [];
}
function saveComment(comment) {
    const comments = getComments();
    comments.push(comment);
    localStorage.setItem('comments_' + blogId, JSON.stringify(comments));
}
function renderComments() {
    const comments = getComments();
    const section = document.getElementById('commentsSection');
    let html = '<h4>Comentarios</h4>';
    if (comments.length === 0) {
        html += '<p>No hay comentarios aún.</p>';
    } else {
        html += '<ul class="list-group">';
        comments.forEach(c => {
        html += `<li class="list-group-item"><strong>${c.nombre}:</strong> ${c.texto}</li>`;
    });
        html += '</ul>';
    }
    section.innerHTML = html;
}
document.getElementById('commentForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('commentName').value.trim();
    const texto = document.getElementById('commentText').value.trim();
    if (nombre && texto) {
        saveComment({ nombre, texto });
        renderComments();
        this.reset();
    }
});
renderBlogDetail();
renderComments();