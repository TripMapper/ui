export default function convert(amount, from, to, rates) {
    from = from.toLowerCase();
    to = to.toLowerCase();
    rates = rates.reduce((a, b) => {
        a[b.iso.toLowerCase()] = b.conversionRate;
        return a;
    }, { eur: 1 });
    if (!rates.hasOwnProperty(from) || !rates.hasOwnProperty(to))
        return null;
    if (from === 'eur')
        return amount * rates[to];
    if (to === 'eur')
        return amount * (1 / rates[from]);
    return (amount * (1 / rates[from])) * rates[to];
}
