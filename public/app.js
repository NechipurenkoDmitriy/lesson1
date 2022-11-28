document.addEventListener('click', event => {
    if (event.target.dataset.type === 'remove') {
        const id = event.target.dataset.id

        remove(id).then(() => {
            event.target.closest('li').remove()
        })
    }

    if (event.target.dataset.type === 'edit') {
        const id = event.target.dataset.id

        edit(id).then(()=>{
            console.log('edit ok')
            document.getElementById(`t_${id}`).textContent = localStorage.getItem('tempNewTitle')
            localStorage.clear('tempNewTitle')
        })
    }
})


async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}


async function edit(id) {
    const newTitle = prompt('Введите новое название:')
    if (newTitle) {
        await fetch(`/${id}/${newTitle}`, {method: `PUT`})
        localStorage.setItem('tempNewTitle', newTitle)
        return
    }
    console.log('Cancel rename')
}