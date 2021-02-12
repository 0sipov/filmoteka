function renderCollaboratorCard(obj) {
    return `
    <li class="modal-our_team_item">
        <div class="modal-our_tem_card-wrapper">
            <div class="modal_window-thumb">
                <img class="modal_window-img" src="${obj.src}" alt="${obj.alt}">
            </div>
            <p class="modal-developer_name">${obj.collaboratorName}</p>
            <button class="modal-card_btn">
                <span class="modal-card_btn_text">
                    ${obj.filmName}
                </span>
            </button>
        </div>
    </li>
    `;
};