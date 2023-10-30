let aboutItemsTarget = {};
const loadSelectedImage = (input, target, bg) => {
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = (e) => {
      if (bg == false) {
        $(target).attr("src", e.target.result);
      } else {
        console.log(e.target.result);
        $(target).css("background-image", `url(${e.target.result})`);
      }
    };
    reader.readAsDataURL(input.files[0]);
  }
};

$(document.body).on("click", ".text-edit", (e) => {
  let modal = $(e.target).data("modal");

  $(modal).modal("toggle");
});
$(document.body).on("click", ".close", (e) => {
  let target = $(e.target).data("dismiss");
  $(target).modal("toggle");
});
$(document.body).on("submit", ".change-content", (e) => {
  e.preventDefault();
  let target = $(e.target).data("target");
  let modal = $(e.target).data("modal");
  let source = $(e.target).data("source");
  let name = $(source).attr("name");
  let inf = $(source).val();
  $(target).html(inf);
  $(modal).modal("toggle");
});
$(document.body).on("change", ".file-input-hidden", (e) => {
  let changed = e.target;
  let target = $(e.target).data("target");
  let bg = $(e.target).data("bg") == true ? true : false;
  let name = $(e.target).attr("name");
  loadSelectedImage(changed, target, bg);
});

$(document.body).on("click", ".editable-about-description-action", (e) => {
  let id = $(e.target).data("id");
  let title = $(e.target).data("title");
  let description = $(e.target).data("description");
  aboutItemsTarget = {
    id: id,
    title: title,
    description: description,
  };

  $("#edit_about_item_id").val(id);
  $("#edit_about_item_title").val($(title).html());
  $("#edit_about_item_description").val($(description).html());
  $("#about-items-modal").modal("toggle");
});

$(document.body).on("submit", ".about-edit-item-form", (e) => {
  e.preventDefault();
  let id = $("#edit_about_item_id").val();
  let title = $("#edit_about_item_title").val();
  let description = $("#edit_about_item_description").val();
  let targetRecord = aboutItems.find((item) => {
    return item.id === aboutItemsTarget.id;
  });
  targetRecord.title = title;
  targetRecord.description = description;
  $(aboutItemsTarget.title).html(title);
  $(aboutItemsTarget.description).html(description);
  $("#about-items-modal").modal("toggle");
});
