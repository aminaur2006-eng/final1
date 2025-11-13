// contact form validation
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contactForm");
  if (!form) return; // 🚀 если формы нет — выходим, ничего не ломаем
  
  const nameInput = document.getElementById("name");
  const emailInput = document.getElementById("email");
  const messageInput = document.getElementById("message");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");
  const strengthMsg = document.getElementById("strengthMsg");
  const confirmFeedback = document.getElementById("confirmFeedback");
  const formAlert = document.getElementById("formAlert");


  // Create small elements for other errors
  const nameError = document.createElement("small");
  const emailError = document.createElement("small");
  const messageError = document.createElement("small");

  [nameError, emailError, messageError].forEach(el => el.classList.add("text-danger"));

  nameInput.parentNode.appendChild(nameError);
  emailInput.parentNode.appendChild(emailError);
  messageInput.parentNode.appendChild(messageError);

  //  Real-time password strength (with CSS classes)
  passwordInput.addEventListener("input", function () {
    const value = passwordInput.value;
    let strength = "";
    let colorClass = "";

    // remove any old color class first
    strengthMsg.classList.remove("red", "orange", "green");

    if (value.length < 6) {
      strength = "Weak";
      colorClass = "red";
    } else if (value.match(/[A-Z]/) && value.match(/[0-9]/)) {
      strength = "Strong";
      colorClass = "green";
    } else {
      strength = "Medium";
      colorClass = "orange";
    }

    strengthMsg.textContent = `${strength} password`;
    strengthMsg.classList.add(colorClass);
  });

  // Password confirmation check
  confirmFeedback.classList.add("text-danger"); // stays red for errors
  confirmPasswordInput.addEventListener("input", function () {
    if (confirmPasswordInput.value === passwordInput.value) {
      confirmFeedback.textContent = "";
    } else {
      confirmFeedback.textContent = "Passwords do not match!";
    }
  });

  // Form submission validation
  form.addEventListener("submit", function (e) {
    let isValid = true;
    nameError.textContent = "";
    emailError.textContent = "";
    messageError.textContent = "";
    confirmFeedback.textContent = "";

    // Name check
    if (nameInput.value.trim() === "") {
      nameError.textContent = "Name is required!";
      isValid = false;
    }

    // Email with RegEx
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
      emailError.textContent = "Enter a valid email!";
      isValid = false;
    }

    // Password strength
    if (passwordInput.value.length < 6) {
      strengthMsg.textContent = "Password must be at least 6 characters!";
      strengthMsg.classList.remove("orange", "green");
      strengthMsg.classList.add("red");
      isValid = false;
    }

    // Password confirmation
    if (passwordInput.value !== confirmPasswordInput.value) {
      confirmFeedback.textContent = "Passwords do not match!";
      isValid = false;
    }

    // Message check
    if (messageInput.value.trim() === "") {
      messageError.textContent = "Write a message!";
      isValid = false;
    }

    // Final validation result
    if (!isValid) {
      e.preventDefault();
    } else {
      e.preventDefault(); // to prevent real submission while testing
      alert("Message sent successfully!");
      form.reset();
      strengthMsg.textContent = "";
      strengthMsg.classList.remove("red", "orange", "green");
    }
  });
});




// welcome popup
$(document).ready(function() {
  // fade in the popup when About page loads
  $("#welcomeModal").fadeIn(500); //500 - is animation in milliseconds

  // close button hides the popup
  $("#closeWelcome").click(function() {
    $("#welcomeModal").fadeOut(400);
  });

  // auto close after 5 seconds
  setTimeout(function() {
    $("#welcomeModal").fadeOut(700);
  }, 5000);
});




//menu filtration
$(document).ready(function() {
      $("#searchInput").on("keyup", function() {
        var value = $(this).val().toLowerCase();
        $("#menuItems .menu-item").filter(function() {
          $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      });

      // "All options" shows everything
      $("#showAll").on("click", function() {
        $("#searchInput").val("");
        $("#menuItems .menu-item").show();
      });

// opens modal
$(".menu-item").on("click", function() {
  var drinkName = $(this).find("p").text();
  $("#drink").val(drinkName);
  $("#orderModal").modal("show");
});

// confirm order
$("#orderForm").on("submit", function(e) {
  e.preventDefault();
  alert("Your order confirmed! Thank you!");
  $("#orderModal").modal("hide");
  $(this).trigger("reset");
});
});



//staff table
$(document).ready(function () {
  let editingRow = null;

  // search filter
  $("#searchInput").on("keyup", function () {
    const value = $(this).val().toLowerCase();
    $("#teamTable tbody tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });

  // add member
  $("#addMemberBtn").click(function () {
    $("#modalTitle").text("Add Member");
    $("#nameInput, #positionInput, #experienceInput").val("");
    $("#memberModal").fadeIn();
    editingRow = null;
  });

  // edit member
  $(document).on("click", ".editBtn", function () {
    editingRow = $(this).closest("tr");
    $("#modalTitle").text("Edit Member");
    $("#nameInput").val(editingRow.find("td:eq(0)").text());
    $("#positionInput").val(editingRow.find("td:eq(1)").text());
    $("#experienceInput").val(editingRow.find("td:eq(2)").text());
    $("#memberModal").fadeIn();
  });

  // save member 
  $("#saveMemberBtn").click(function () {
    const name = $("#nameInput").val();
    const position = $("#positionInput").val();
    const experience = $("#experienceInput").val();

    if (name && position && experience) {
      if (editingRow) {
        // update 
        editingRow.find("td:eq(0)").text(name);
        editingRow.find("td:eq(1)").text(position);
        editingRow.find("td:eq(2)").text(experience);
      } else {
        // add new
        $("#teamTable tbody").append(`
          <tr style="display:none;">
            <td>${name}</td>
            <td>${position}</td>
            <td>${experience}</td>
            <td>
              <button class="btn btn-sm btn-outline-dark editBtn">Edit</button>
              <button class="btn btn-sm btn-outline-dark deleteBtn">Delete</button>
            </td>
          </tr>
        `);
        $("#teamTable tbody tr:last").slideDown(); // animation
      }
      $("#memberModal").fadeOut();
    } else {
      alert("Please fill in all fields!");
    }
  });

  // delete member
  $(document).on("click", ".deleteBtn", function () {
    if (confirm("Are you sure you want to delete this member?")) {
      $(this).closest("tr").fadeOut(500, function () {
        $(this).remove();
      });
    }
  });

  // cancel modal
  $("#cancelBtn").click(function () {
    $("#memberModal").fadeOut();
  });
});


$(function() {
  // --- FILTERING ---
  $(".filter-btn").click(function() {
    const filter = $(this).attr("data-filter");
    $(".filter-btn").removeClass("active");
    $(this).addClass("active");

    if (filter === "all") {
      $(".gallery-item").fadeIn(400);
    } else {
      $(".gallery-item").each(function() {
        if ($(this).attr("data-category") === filter) {
          $(this).fadeIn(400);
        } else {
          $(this).fadeOut(400);
        }
      });
    }
  });

  // --- LIGHTBOX ---
  $(".gallery-item img").click(function() {
    const src = $(this).attr("src");
    $(".lightbox-image").attr("src", src);
    $("#lightbox").fadeIn(300);
  });

  // Close when clicking × or outside image
  $(".close-lightbox, #lightbox").click(function(e) {
    if (e.target !== this) return; // avoid closing when clicking image
    $("#lightbox").fadeOut(300);
  });
});
