const form = document.getElementById('form');
const tagsInput = document.getElementById('tagsInput');
const tagsList = document.getElementById('tagsList');
const readonly = document.getElementById('readonly');

function clearTagsList() {
    tagsList.innerHTML = '';
};

function createTagsListItem(tag) {
    const li = document.createElement('li');
    const tagText = document.createElement('span');
    const deleteTag = document.createElement('button');

    tagText.innerText = tag;
    deleteTag.innerText = 'X';
    deleteTag.addEventListener('click', () => {
        if (readonly.checked) {
            return;
        }

        li.remove();
        const storageList = localStorage.getItem('tagsList').split(' ');
        const newStorageList = storageList.filter(el => el !== tag);
        localStorage.setItem('tagsList', newStorageList.join(' '));
    })

    li.appendChild(tagText);
    li.appendChild(deleteTag);
    tagsList.appendChild(li);
}

function createTagsList(tagsList) {
    tagsList.forEach(tag => createTagsListItem(tag));
}

function loadStorage() {
    const storageList = localStorage.getItem('tagsList');

    if (storageList.length !== 0) {
        createTagsList(storageList.split(' '));
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();

    if (readonly.checked) {
        return;
    }

    const tagsForm = tagsInput.value.split(' ') || [];
    if (tagsForm.length === 0) {
        return;
    }

    const tagsStorage = localStorage.getItem('tagsList') ?
        localStorage.getItem('tagsList').split(' ') : [];

    tagsForm.forEach(tag => {
        if (tagsStorage.find(el => el === tag) === undefined) {
            tagsStorage.push(tag);
        }
    });

    clearTagsList();
    createTagsList(tagsStorage);
    localStorage.setItem('tagsList', tagsStorage.join(' '));
    tagsInput.value = '';
});

loadStorage();
