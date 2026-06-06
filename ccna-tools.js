document.addEventListener("DOMContentLoaded", function () {
    const input = document.getElementById("vlsmHostsInput");
    const button = document.getElementById("vlsmCalcBtn");
    const output = document.getElementById("vlsmResult");

    if (!input || !button || !output) return;

    function nextPowerOfTwo(n) {
        let p = 1;
        while (p < n) p *= 2;
        return p;
    }

    function prefixForBlock(block) {
        return 32 - Math.log2(block);
    }

    button.addEventListener("click", function () {
        const hosts = input.value
            .split(",")
            .map(v => Number(v.trim()))
            .filter(v => !isNaN(v) && v > 0)
            .sort((a, b) => b - a);

        if (hosts.length === 0) {
            output.innerHTML = "<p>Zadaj aspoň jeden počet hostov.</p>";
            return;
        }

        output.innerHTML = hosts.map((host, index) => {
            const needed = host + 2;
            const block = nextPowerOfTwo(needed);
            const prefix = prefixForBlock(block);
            const usable = block - 2;

            return `<div class="tool-result-row">
                <strong>Sieť ${index + 1}</strong>
                <span>Hosty: ${host}</span>
                <span>Blok: ${block} adries</span>
                <span>Prefix: /${prefix}</span>
                <span>Použiteľné hosty: ${usable}</span>
            </div>`;
        }).join("");
    });
});
