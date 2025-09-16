function getBlogs() {
    return JSON.parse(localStorage.getItem('blogs')) || [];
}
function saveBlogs(blogs) {
    localStorage.setItem('blogs', JSON.stringify(blogs));
}
function renderBlogs() {
    const blogs = getBlogs();
    const container = document.getElementById('blogsList');
    if (blogs.length === 0) {
        container.innerHTML = '<div class="col-12"><div class="alert alert-info">No hay blogs publicados aún.</div></div>';
        return;
    }
    let html = '';
    blogs.slice().reverse().forEach(blog => {
        html += `
        <div class="col-md-6">
            <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title">${blog.titulo}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${blog.fecha}</h6>
                    <p class="card-text">${blog.descripcion}</p>
                    <a href="blog.html?id=${blog.id}" class="btn btn-primary">Leer más</a>
                </div>
            </div>
        </div>
        `;
    });
    container.innerHTML = html;
}
document.getElementById('newBlogForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const titulo = document.getElementById('blogTitulo').value.trim();
    const descripcion = document.getElementById('blogDescripcion').value.trim();
    const contenido = document.getElementById('blogContenido').value.trim();
    if (titulo && descripcion && contenido) {
        const blogs = getBlogs();
        const id = Date.now();
        const fecha = new Date().toLocaleDateString('es-CL', { day: 'numeric', month: 'long', year: 'numeric' });
        blogs.push({ id, titulo, descripcion, contenido, fecha });
        saveBlogs(blogs);
        renderBlogs();
        this.reset();
    }
});

renderBlogs();