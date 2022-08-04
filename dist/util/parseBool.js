export default function parseBool(val) {
    val = String(val).toLowerCase();
    switch (val) {
        case 'true':
        case 'yes':
        case '1':
            return true;
        default:
            return false;
    }
}
