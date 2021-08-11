const cur1 = document.querySelector(".input-currency");
const cur2 = document.querySelector(".output-currency");
const rate = document.querySelector(".rate");

/**
 * Coverts the input value to output currency value
 * @param {String} from from select element
 * @param {String} to To select element
 * @param {Number} input value to convert
 * @param {Number} output output value
 */
const convert = async (from, to, input, output) => {
    const url = `https://api.exchangerate-api.com/v4/latest/${from}`;
    const data = await (await fetch(url)).json();
    const rates = data.rates;

    // console.log(rates);
    // console.log(rates[from]);
    // console.log(rates[to]);
    // console.log(from, to, input, output);

    cur1.value = rates[from] * input;
    cur2.value = (rates[to] * input).toFixed(3);

    rate.textContent = rates[to];
};

document.querySelectorAll("input").forEach((input) => {
    input.addEventListener("input", function (e) {
        const cur1 = document.querySelector(".input-currency");
        const cur2 = document.querySelector(".output-currency");

        if (!cur1.value) cur2.value = "";

        if (cur1.value.match(/[^\d\.]/g)) {
            document.querySelector(".message").classList.remove("hidden");

            setTimeout(() => {
                document.querySelector(".message").classList.add("hidden");
            }, 1500);

            this.value = this.value.replace(/[^\d\.]/g, "");
        } else {
            const from = document.querySelector("#from").value;
            const to = document.querySelector("#to").value;
            const input = document.querySelector(".input-currency").value;
            const output = document.querySelector(".output-currency").value;

            convert(from, to, +input, +output);
        }
    });
});

const select = document.querySelectorAll("select");
select.forEach((el) => {
    el.addEventListener("change", function (ev) {
        const from = document.querySelector("#from").value;
        const to = document.querySelector("#to").value;
        const input = document.querySelector(".input-currency").value;
        const output = document.querySelector(".output-currency").value;

        if (input || output) convert(from, to, +input, +output);
    });
});
