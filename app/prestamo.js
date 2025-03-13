window.addEventListener('DOMContentLoaded', () => {
    // Referencias a los inputs del formulario
    const capitalInput = document.getElementById('capital');
    const closingCostInput = document.getElementById('closing-cost');
    const rateInput = document.getElementById('rate');
    const installmentsInput = document.getElementById('installments');
    const insuranceInput = document.getElementById('insurance');
    const divideInsuranceInp = document.getElementById('divide-insurance');
    const gpsInput = document.getElementById('gps');
    const divideGpsInp = document.getElementById('divide-gps');
    const amortTypeSelect = document.getElementById('amortization-type');

    // Referencias a los botones
    const calculateBtn = document.getElementById('calculate');
    const cotizarBtn = document.querySelector('.cotizar');

    // Referencias al modal
    const modal = document.getElementById('quote-modal');
    const closeModalBtn = document.getElementById('close-modal');
    const quoteResults = document.getElementById('quote-results');

    // Cerrar modal al hacer clic en la "X"
    closeModalBtn.onclick = () => (modal.style.display = 'none');
    // Cerrar modal si se hace clic fuera del contenido
    window.onclick = (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    };

    // Listeners de los botones
    if (calculateBtn) calculateBtn.addEventListener('click', showQuote);
    if (cotizarBtn) cotizarBtn.addEventListener('click', showQuote);

    /**
     * Muestra la cotización en el modal
     */
    function showQuote() {
        // Leer valores del formulario
        const capital = parseFloat(capitalInput.value) || 0;
        const closingCost = parseFloat(closingCostInput.value) || 0;
        const monthlyRatePerc = parseFloat(rateInput.value) || 0; // % (ej: 2.0)
        const installments = parseInt(installmentsInput.value) || 1;
        const insurance = parseFloat(insuranceInput.value) || 0; // Seguro/Mes
        const insuranceMonths = parseInt(divideInsuranceInp.value) || 0; // Cuántos meses
        const gps = parseFloat(gpsInput.value) || 0; // GPS/Mes
        const gpsMonths = parseInt(divideGpsInp.value) || 0;
        const amortType = amortTypeSelect.value; // "absolute" o "fijo", etc.

        // Calcular el monto financiado
        const financed = capital + closingCost;
        // Calcular la tasa de interés mensual
        const monthlyRate = monthlyRatePerc / 100;
        // Calcular el capital mensual prorrateado
        const capitalMonth = parseFloat((capital / installments).toFixed(2));
        // Calcular el cierre mensual prorrateado
        const closingMonth = parseFloat((closingCost / installments).toFixed(2));
        // Calcular el interés mensual
        let interestMonth = financed * monthlyRate;
        interestMonth = parseFloat(interestMonth.toFixed(2));

        // Calcular el subtotal mensual (capital + cierre + interés)
        let subtotal = capitalMonth + closingMonth + interestMonth;
        subtotal = parseFloat(subtotal.toFixed(2));

        // Ajuste para redondear la cuota final
        let leftover = 30;
        let basePayment = subtotal + leftover;

        // Generar filas de la tabla con seguro y GPS
        let rows = [];
        let baseDate = new Date('2025-03-13');

        for (let i = 1; i <= installments; i++) {
            let insuranceFee = (i <= insuranceMonths) ? insurance : 0;
            let gpsFee = (i <= gpsMonths) ? gps : 0;
            let finalPayment = basePayment + insuranceFee + gpsFee;
            let dueDate = new Date(baseDate);
            dueDate.setMonth(baseDate.getMonth() + (i - 1));
            let options = { day: 'numeric', month: 'long', year: 'numeric' };
            let dueDateStr = dueDate.toLocaleDateString('es-ES', options);

            rows.push({
                installment: i,
                vence: dueDateStr,
                cuota: finalPayment.toFixed(2),
                cierre: closingMonth.toFixed(2),
                seguro: insuranceFee.toFixed(2),
                gps: gpsFee.toFixed(2),
                capital: capitalMonth.toFixed(2),
                interes: interestMonth.toFixed(2)
            });
        }

        // Construir la tabla HTML
        let tableHTML = `
            <table class="quote-table">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Vence en</th>
                        <th>Cuota</th>
                        <th>Cierre</th>
                        <th>Seguro</th>
                        <th>GPS</th>
                        <th>Capital</th>
                        <th>Interés</th>
                    </tr>
                </thead>
                <tbody>
        `;

        rows.forEach(row => {
            tableHTML += `
                <tr>
                    <td>${row.installment}</td>
                    <td style="text-align:left;">${row.vence}</td>
                    <td>${row.cuota}</td>
                    <td>${row.cierre}</td>
                    <td>${row.seguro}</td>
                    <td>${row.gps}</td>
                    <td>${row.capital}</td>
                    <td>${row.interes}</td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;

        // Mostrar la tabla en el modal
        quoteResults.innerHTML = tableHTML;
        modal.style.display = 'flex';
    }
});