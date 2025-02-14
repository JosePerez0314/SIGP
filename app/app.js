function mainFunction() {
	var user = document.getElementById("username");
	var pass = document.getElementById("password");
	var form = document.getElementById('loginForm');

	/*======Username field autofill events======*/
	user.onfocus = function () {
		if (user.value === "Username") {
			user.value = "";
		}
	};
	user.onblur = function () {
		if (user.value === "") {
			user.value = "Username";
		}
	};
	/*==========================================*/
	/*======Password field autofill events======*/
	pass.onfocus = function () {
		if (pass.value === "Password") {
			pass.value = "";
		}
	};
	pass.onblur = function () {
		if (pass.value === "") {
			pass.value = "Password";
		}
	};
	/*==========================================*/
	/*====== Form validation and redirection ======*/
	form.addEventListener("submit", function (event) {
		event.preventDefault(); // Evita el envío automático

		if (user.value.trim() === "" || user.value === "Username" || pass.value.trim() === "" || pass.value === "Password") {
			alert("Por favor, completa todos los campos.");
		} else {
			window.location.href = "home.html"; // Redirige solo si los campos están completos
		}
	});
	/*==========================================*/

}

window.onload = function () {
	mainFunction();
}

