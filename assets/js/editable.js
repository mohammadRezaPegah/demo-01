let aboutItemsTarget = {};
let statisticTarget = {};
let teamMemberTargetId;
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

$(document.body).on("click", ".editable-statistic-number .text-edit", (e) => {
  let countTarget = $(e.target).data("count");
  let descriptionTarget = $(e.target).data("description");
  let countData = $(countTarget).data("to");
  let descriptionData = $(descriptionTarget).html();
  statisticTarget = {
    countTarget: countTarget,
    descriptionTarget: descriptionTarget,
  };
  $("#edit_statistic_count").val(countData);
  $("#edit_statistic_text").val(descriptionData);
  $("#statistic-modal").modal("toggle");
});

$(document.body).on("submit", ".statistic-edit-form", (e) => {
  e.preventDefault();
  let count = $("#edit_statistic_count").val();
  let description = $("#edit_statistic_text").val();
  $(statisticTarget.countTarget).data("to", count);
  $(statisticTarget.countTarget).html(count);
  $(statisticTarget.descriptionTarget).html(description);
  $("#statistic-modal").modal("toggle");
});

$(document.body).on("click", ".sale-expert-edit", (e) => {
  let id = $(e.target).data("id");
  teamMemberTargetId = id;
  let targetRecord = saleExperts.find((item) => {
    return item.id === id;
  });
  $("#edit_team_member_image").attr("src", baseImageUrl + targetRecord.image);
  $("#edit_team_member_image").attr("alt", targetRecord.name);
  $("#edit_team_id").val(targetRecord.id);
  $("#edit_team_work_field").val(targetRecord.work_field);
  $("#edit_team_name").val(targetRecord.name);
  $("#edit_team_phone").val(targetRecord.phone);
  $("#edit_team_instagram").val(targetRecord.instagram);
  $("#edit_team_email").val(targetRecord.email);
  $("#sale-expert-edit-modal").modal("toggle");
});

$(document.body).on("submit", ".team-edit-form", (e) => {
  e.preventDefault();
  let targetRecord = saleExperts.find((item) => {
    return item.id === teamMemberTargetId;
  });
  const data = new FormData(e.target);
  const id = teamMemberTargetId;
  const workField = data.get("work_field");
  const name = data.get("name");
  const phone = data.get("phone");
  const email = data.get("email");
  const instagram = data.get("instagram");
  const imageUri = $("#edit_team_member_image").attr("src");
  // Handle the file input
  const imageInput = document.getElementById("edit_team_image");
  data.append("image", imageInput.files[0]); // Assuming you want to upload only one file.

  $(`.team-member-${id} .team-member-image`).attr("alt", name);
  $(`.team-member-${id} .team-member-image`).attr("src", imageUri);
  $(`.team-member-${id} .team-member-work-field`).html(workField);
  $(`.team-member-${id} .team-member-name`).html(name);
  $(`.team-member-${id} .team-member-email`).attr("href", `mailto:${email}`);
  $(`.team-member-${id} .team-member-phone`).attr("href", `tel:${phone}`);
  $(`.team-member-${id} .team-member-instagram`).attr("href", instagram);
  $("#sale-expert-edit-modal").modal("toggle");
});
