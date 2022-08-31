const o = n => {
    const s = ["th", "st", "nd", "rd"];
    const v = n % 100;
    return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
export default function ordinal(str) {
    return str.replace(/(\d+)(.*)/g, (_, a, b) => `${o(a | 0)} ${b}`);
}
