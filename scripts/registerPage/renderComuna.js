
document.addEventListener("DOMContentLoaded", function () {
  const regionSelect = document.getElementById("region");
  const comunaSelect = document.getElementById("comuna");

  regionSelect.addEventListener("change", function () {
    const region = this.value;

    // limpiar el select de comunas
    comunaSelect.innerHTML = "";

    if (comunasPorRegion[region] && comunasPorRegion[region].length > 0) {
      // opción por defecto
      const defaultOption = document.createElement("option");
      defaultOption.value = "";
      defaultOption.textContent = "-- Seleccione una comuna --";
      defaultOption.disabled = true;
      defaultOption.selected = true;
      comunaSelect.appendChild(defaultOption);

      // cargar comunas de esa región
      comunasPorRegion[region].forEach((comuna) => {
        const option = document.createElement("option");
        option.value = comuna;
        option.textContent = comuna;
        comunaSelect.appendChild(option);
      });

      comunaSelect.disabled = false;
    } else {
      // si la región no tiene comunas cargadas
      const option = document.createElement("option");
      option.value = "";
      option.textContent = "No hay comunas disponibles";
      option.disabled = true;
      option.selected = true;
      comunaSelect.appendChild(option);
      comunaSelect.disabled = true;
    }
  });
});