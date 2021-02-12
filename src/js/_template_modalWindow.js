function createModalWindow() {
  return `
    <div class="modal" role="dialog" aria-labelledby="Modal_Title" aria-describedby="Modal_Description" aria-hidden="true" >
    <div class="modal-wrap">
        <div class="modal-content">
             <button class="button-close close-modal">
                <svg class="details-close">
                    <use href="./images/symbol-defs.svg#close"></use>
                </svg>
            </button>
            <h2 id="modal_Title">Our team</h2>
            <ul class="modal-our_team_list">
                
            </ul> 
        </div>
    </div>
  </div>
</div>
    `;
}
