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
